<?php
/**
 * Main Application Router & Controller logic for all REST API endpoints
 */

require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/EmailService.php';

class Router
{
    private array $config;
    private PDO $db;
    private EmailService $emailService;

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->db = Database::getConnection($config['db']);
        $this->emailService = new EmailService($config);
    }

    public function handleRequest(): void
    {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Normalize base path if prefix exists
        $uri = preg_replace('#^/api#', '', $uri);
        if ($uri === '') {
            $uri = '/';
        }

        // Handle OPTIONS preflight for CORS
        if ($method === 'OPTIONS') {
            http_response_code(200);
            exit;
        }

        // Route Matching
        if ($method === 'GET' && $uri === '/health') {
            $this->jsonResponse(['status' => 'ok']);
        } elseif ($method === 'GET' && $uri === '/availability') {
            $this->getAvailability();
        } elseif ($method === 'POST' && $uri === '/submissions/preorder') {
            $this->postPreorder();
        } elseif ($method === 'POST' && $uri === '/submissions/retreat') {
            $this->postRetreat();
        } elseif ($method === 'POST' && $uri === '/submissions/enquiry') {
            $this->postEnquiry();
        } elseif ($method === 'GET' && $uri === '/admin/submissions') {
            $this->getAdminSubmissions();
        } elseif ($method === 'PATCH' && preg_match('#^/admin/submissions/([^/]+)/([^/]+)/followed-up$#', $uri, $matches)) {
            $this->patchFollowedUp($matches[1], $matches[2]);
        } elseif ($method === 'GET' && $uri === '/admin/settings') {
            $this->getAdminSettings();
        } elseif ($method === 'PUT' && $uri === '/admin/settings') {
            $this->putAdminSettings();
        } elseif ($method === 'GET' && $uri === '/settings/email-templates') {
            $this->getPublicSettings();
        } else {
            $this->jsonResponse(['error' => 'Not Found'], 404);
        }
    }

    private function jsonResponse(array $data, int $statusCode = 200): void
    {
        http_response_code($statusCode);
        echo json_encode($data);
        exit;
    }

    private function getJsonInput(): array
    {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);
        return is_array($data) ? $data : [];
    }

    private function isAuthorised(): bool
    {
        $secret = $this->config['auth']['session_secret'];
        if (empty($secret))
            return false;

        $authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
        if (empty($authHeader))
            return false;

        $token = str_starts_with($authHeader, 'Bearer ') ? substr($authHeader, 7) : $authHeader;
        return $token === $secret;
    }

    private function getBookingCount(string $location): int
    {
        $stmt = $this->db->prepare("SELECT COUNT(*) as count FROM retreat_bookings WHERE location = ?");
        $stmt->execute([$location]);
        $row = $stmt->fetch();
        return (int) ($row['count'] ?? 0);
    }

    private function getAvailability(): void
    {
        try {
            $accraCount = $this->getBookingCount('Accra');
            $mauritiusCount = $this->getBookingCount('Mauritius');

            $accraCap = $this->config['seat_caps']['Accra'] ?? PHP_INT_MAX;
            $mauritiusCap = $this->config['seat_caps']['Mauritius'] ?? PHP_INT_MAX;

            $this->jsonResponse([
                'Accra' => [
                    'count' => $accraCount,
                    'cap' => $accraCap,
                    'full' => $accraCount >= $accraCap
                ],
                'Mauritius' => [
                    'count' => $mauritiusCount,
                    'cap' => $mauritiusCap,
                    'full' => $mauritiusCount >= $mauritiusCap
                ]
            ]);
        } catch (Exception $e) {
            $this->jsonResponse(['error' => 'Failed to fetch availability'], 500);
        }
    }

    private function postPreorder(): void
    {
        $input = $this->getJsonInput();

        if (empty($input['name']) || empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            $this->jsonResponse(['error' => 'Invalid request', 'details' => 'Name and a valid Email are required'], 400);
        }

        try {
            $stmt = $this->db->prepare("INSERT INTO preorder_submissions (name, email, phone, note) VALUES (?, ?, ?, ?)");
            $stmt->execute([
                $input['name'],
                $input['email'],
                $input['phone'] ?? null,
                $input['note'] ?? null
            ]);

            $insertId = (int) $this->db->lastInsertId();

            // Email notification to Temple
            $this->emailService->sendPreorderNotification([
                'name' => $input['name'],
                'email' => $input['email'],
                'phone' => $input['phone'] ?? null,
                'note' => $input['note'] ?? null,
            ]);

            // Auto-response to subscriber
            $settings = $this->getMergedSettings();
            $subject = $settings['preorder_autoresponse_subject'] ?? '';
            $template = $settings['preorder_autoresponse_message'] ?? '';
            if ($subject && $template) {
                $this->emailService->sendAutoResponse($input['name'], $input['email'], $subject, $template);
            }

            $this->jsonResponse(['ok' => true, 'id' => $insertId], 201);
        } catch (Exception $e) {
            $this->jsonResponse(['error' => 'Failed to save submission'], 500);
        }
    }

    private function postRetreat(): void
    {
        $input = $this->getJsonInput();

        if (empty($input['name']) || empty($input['partner']) || empty($input['email']) || empty($input['phone']) || empty($input['location'])) {
            $this->jsonResponse(['error' => 'Invalid request', 'details' => 'Missing required fields'], 400);
        }

        if (!in_array($input['location'], ['Accra', 'Mauritius', 'Virtual'])) {
            $this->jsonResponse(['error' => 'Invalid location'], 400);
        }

        // Seat cap check
        $cap = $this->config['seat_caps'][$input['location']] ?? null;
        if ($cap !== null) {
            $currentCount = $this->getBookingCount($input['location']);
            if ($currentCount >= $cap) {
                $this->jsonResponse(['error' => 'LOCATION_FULL', 'location' => $input['location']], 409);
            }
        }

        try {
            $stmt = $this->db->prepare("INSERT INTO retreat_bookings (name, partner, email, phone, location, virtual_tier, note) VALUES (?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['name'],
                $input['partner'],
                $input['email'],
                $input['phone'],
                $input['location'],
                $input['virtualTier'] ?? null,
                $input['note'] ?? null
            ]);

            $insertId = (int) $this->db->lastInsertId();

            // Email notification to Temple
            $this->emailService->sendRetreatNotification([
                'name' => $input['name'],
                'partner' => $input['partner'],
                'email' => $input['email'],
                'phone' => $input['phone'],
                'location' => $input['location'],
                'virtualTier' => $input['virtualTier'] ?? null,
                'note' => $input['note'] ?? null,
            ]);

            // Auto-response to subscriber
            $settings = $this->getMergedSettings();
            $subject = $settings['retreat_autoresponse_subject'] ?? '';
            $template = $settings['retreat_autoresponse_message'] ?? '';
            $locationPart = $input['location'] !== 'Virtual' ? " — " . $input['location'] : "";
            if ($subject && $template) {
                $this->emailService->sendAutoResponse($input['name'], $input['email'], $subject, $template, $locationPart);
            }

            $this->jsonResponse(['ok' => true, 'id' => $insertId], 201);
        } catch (Exception $e) {
            $this->jsonResponse(['error' => 'Failed to save submission'], 500);
        }
    }

    private function postEnquiry(): void
    {
        $input = $this->getJsonInput();

        $required = ['name', 'organization', 'email', 'eventDate', 'audienceSize', 'topic', 'message'];
        foreach ($required as $field) {
            if (empty($input[$field])) {
                $this->jsonResponse(['error' => 'Invalid request', 'details' => "Missing required field: {$field}"], 400);
            }
        }

        try {
            $stmt = $this->db->prepare("INSERT INTO speaking_enquiries (name, organization, email, event_date, audience_size, topic, budget, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->execute([
                $input['name'],
                $input['organization'],
                $input['email'],
                $input['eventDate'],
                $input['audienceSize'],
                $input['topic'],
                $input['budget'] ?? null,
                $input['message']
            ]);

            $insertId = (int) $this->db->lastInsertId();

            // Email notification to Temple
            $this->emailService->sendEnquiryNotification([
                'name' => $input['name'],
                'email' => $input['email'],
                'organization' => $input['organization'],
                'eventDate' => $input['eventDate'],
                'audienceSize' => $input['audienceSize'],
                'topic' => $input['topic'],
                'budget' => $input['budget'] ?? null,
                'message' => $input['message']
            ]);

            $this->jsonResponse(['ok' => true, 'id' => $insertId], 201);
        } catch (Exception $e) {
            $this->jsonResponse(['error' => 'Failed to save enquiry'], 500);
        }
    }

    private function getAdminSubmissions(): void
    {
        if (!$this->isAuthorised()) {
            $this->jsonResponse(['error' => 'Unauthorised'], 401);
        }

        try {
            $locationFilter = $_GET['location'] ?? null;

            // Preorders
            $preStmt = $this->db->query("SELECT id, name, email, phone, note, followed_up as followedUp, created_at as createdAt FROM preorder_submissions ORDER BY created_at DESC");
            $preorders = array_map(function ($row) {
                $row['id'] = (int) $row['id'];
                $row['followedUp'] = (bool) $row['followedUp'];
                return $row;
            }, $preStmt->fetchAll());

            // Retreats
            if ($locationFilter && in_array($locationFilter, ['Accra', 'Mauritius', 'Virtual'])) {
                $retStmt = $this->db->prepare("SELECT id, name, partner, email, phone, location, virtual_tier as virtualTier, note, followed_up as followedUp, created_at as createdAt FROM retreat_bookings WHERE location = ? ORDER BY created_at DESC");
                $retStmt->execute([$locationFilter]);
            } else {
                $retStmt = $this->db->query("SELECT id, name, partner, email, phone, location, virtual_tier as virtualTier, note, followed_up as followedUp, created_at as createdAt FROM retreat_bookings ORDER BY created_at DESC");
            }
            $retreats = array_map(function ($row) {
                $row['id'] = (int) $row['id'];
                $row['followedUp'] = (bool) $row['followedUp'];
                return $row;
            }, $retStmt->fetchAll());

            // Enquiries
            $enqStmt = $this->db->query("SELECT id, name, organization, email, event_date as eventDate, audience_size as audienceSize, topic, budget, message, followed_up as followedUp, created_at as createdAt FROM speaking_enquiries ORDER BY created_at DESC");
            $enquiries = array_map(function ($row) {
                $row['id'] = (int) $row['id'];
                $row['followedUp'] = (bool) $row['followedUp'];
                return $row;
            }, $enqStmt->fetchAll());

            $this->jsonResponse([
                'preorders' => $preorders,
                'retreats' => $retreats,
                'enquiries' => $enquiries
            ]);
        } catch (Exception $e) {
            $this->jsonResponse(['error' => 'Failed to fetch submissions'], 500);
        }
    }

    private function patchFollowedUp(string $type, string $idStr): void
    {
        if (!$this->isAuthorised()) {
            $this->jsonResponse(['error' => 'Unauthorised'], 401);
        }

        $rowId = (int) $idStr;
        if ($rowId <= 0) {
            $this->jsonResponse(['error' => 'Invalid id'], 400);
        }

        $input = $this->getJsonInput();
        if (!isset($input['followedUp']) || !is_bool($input['followedUp'])) {
            $this->jsonResponse(['error' => 'followedUp must be a boolean'], 400);
        }

        $followedUpInt = $input['followedUp'] ? 1 : 0;

        try {
            if ($type === 'retreat') {
                $stmt = $this->db->prepare("UPDATE retreat_bookings SET followed_up = ? WHERE id = ?");
            } elseif ($type === 'preorder') {
                $stmt = $this->db->prepare("UPDATE preorder_submissions SET followed_up = ? WHERE id = ?");
            } elseif ($type === 'enquiry') {
                $stmt = $this->db->prepare("UPDATE speaking_enquiries SET followed_up = ? WHERE id = ?");
            } else {
                $this->jsonResponse(['error' => 'type must be retreat, preorder, or enquiry'], 400);
            }

            $stmt->execute([$followedUpInt, $rowId]);
            $this->jsonResponse(['ok' => true]);
        } catch (Exception $e) {
            $this->jsonResponse(['error' => 'Failed to update followed_up'], 500);
        }
    }

    private function getMergedSettings(): array
    {
        $stmt = $this->db->query("SELECT setting_key, setting_value FROM settings");
        $rows = $stmt->fetchAll();
        $dbMap = [];
        foreach ($rows as $row) {
            $dbMap[$row['setting_key']] = $row['setting_value'];
        }

        $defaults = $this->config['setting_defaults'];
        $result = [];
        foreach ($defaults as $key => $defaultVal) {
            $result[$key] = $dbMap[$key] ?? $defaultVal;
        }

        return $result;
    }

    private function getAdminSettings(): void
    {
        if (!$this->isAuthorised()) {
            $this->jsonResponse(['error' => 'Unauthorised'], 401);
        }
        $this->jsonResponse($this->getMergedSettings());
    }

    private function putAdminSettings(): void
    {
        if (!$this->isAuthorised()) {
            $this->jsonResponse(['error' => 'Unauthorised'], 401);
        }

        $input = $this->getJsonInput();
        $validKeys = array_values($this->config['setting_keys']);
        $updates = [];

        foreach ($input as $k => $v) {
            if (in_array($k, $validKeys, true) && is_string($v)) {
                $updates[] = ['key' => $k, 'value' => $v];
            }
        }

        if (empty($updates)) {
            $this->jsonResponse(['error' => 'No valid setting keys provided'], 400);
        }

        try {
            $stmt = $this->db->prepare("INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value), updated_at = NOW()");
            $updatedKeys = [];
            foreach ($updates as $item) {
                $stmt->execute([$item['key'], $item['value']]);
                $updatedKeys[] = $item['key'];
            }

            $this->jsonResponse(['ok' => true, 'updated' => $updatedKeys]);
        } catch (Exception $e) {
            $this->jsonResponse(['error' => 'Failed to update settings'], 500);
        }
    }

    private function getPublicSettings(): void
    {
        $this->jsonResponse($this->getMergedSettings());
    }
}
