<?php
/**
 * Email Service - Faithfully emulates email notifications from Node.js (email.ts)
 */

class EmailService {
    private array $config;

    public function __construct(array $config) {
        $this->config = $config['email'];
    }

    private function send(string $to, string $subject, string $body, ?string $replyTo = null): bool {
        $fromEmail = $this->config['from_email'];
        $fromName  = $this->config['from_name'];

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/plain; charset=utf-8";
        $headers[] = "From: {$fromName} <{$fromEmail}>";
        if ($replyTo) {
            $headers[] = "Reply-To: {$replyTo}";
        }
        $headers[] = "X-Mailer: PHP/" . phpversion();

        return @mail($to, $subject, $body, implode("\r\n", $headers));
    }

    public function sendEnquiryNotification(array $data): void {
        $smtpUser = $this->config['smtp_user'];
        $budget = !empty($data['budget']) ? $data['budget'] : "Not specified";

        $bodyText = implode("\n", [
            "New speaking enquiry received on templeobike.com",
            "",
            "Name:         " . $data['name'],
            "Email:        " . $data['email'],
            "Organization: " . $data['organization'],
            "Event Date:   " . $data['eventDate'],
            "Audience:     " . $data['audienceSize'],
            "Topic:        " . $data['topic'],
            "Budget:       " . $budget,
            "",
            "Message:",
            $data['message'],
            "",
            "---",
            "Reply directly to " . $data['email'] . " to follow up.",
            "View all enquiries: https://templeobike.com/admin"
        ]);

        $subject = "Speaking Inquiry: " . $data['organization'] . " — " . $data['eventDate'];
        $this->send($smtpUser, $subject, $bodyText, $data['email']);
    }

    public function sendRetreatNotification(array $data): void {
        $smtpUser = $this->config['smtp_user'];
        $pkg = !empty($data['virtualTier']) ? " (" . $data['virtualTier'] . ")" : "";

        $lines = [
            "New retreat booking received on templeobike.com",
            "",
            "Name:     " . $data['name'],
            "Partner:  " . $data['partner'],
            "Email:    " . $data['email'],
            "Phone:    " . $data['phone'],
            "Location: " . $data['location'] . $pkg,
        ];

        if (!empty($data['note'])) {
            $lines[] = "Note:     " . $data['note'];
        }

        $lines[] = "";
        $lines[] = "---";
        $lines[] = "Reply directly to " . $data['email'] . " to follow up.";
        $lines[] = "View all bookings: https://templeobike.com/admin";

        $bodyText = implode("\n", $lines);
        $subject = "Retreat Booking: " . $data['name'] . " & " . $data['partner'] . " — " . $data['location'];

        $this->send($smtpUser, $subject, $bodyText, $data['email']);
    }

    public function sendPreorderNotification(array $data): void {
        $smtpUser = $this->config['smtp_user'];

        $lines = [
            "New FERRG book pre-order received on templeobike.com",
            "",
            "Name:  " . $data['name'],
            "Email: " . $data['email'],
        ];

        if (!empty($data['phone'])) {
            $lines[] = "Phone: " . $data['phone'];
        }
        if (!empty($data['note'])) {
            $lines[] = "Note:  " . $data['note'];
        }

        $lines[] = "";
        $lines[] = "---";
        $lines[] = "Reply directly to " . $data['email'] . " to follow up.";
        $lines[] = "View all pre-orders: https://templeobike.com/admin";

        $bodyText = implode("\n", $lines);
        $subject = "Book Pre-order: " . $data['name'];

        $this->send($smtpUser, $subject, $bodyText, $data['email']);
    }

    public function sendAutoResponse(string $toName, string $toEmail, string $subject, string $bodyTemplate, string $locationPart = ''): void {
        $body = str_replace('{name}', $toName, $bodyTemplate);
        $body = str_replace('{location_part}', $locationPart, $body);

        $finalSubject = str_replace('{name}', $toName, $subject);
        $this->send($toEmail, $finalSubject, $body);
    }
}
