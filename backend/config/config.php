<?php
// Load .env file if available
if (file_exists(__DIR__ . '/../.env')) {
    $lines = file(__DIR__ . '/../.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#')) continue;
        $parts = explode('=', $line, 2);
        if (count($parts) === 2) {
            $k = trim($parts[0]);
            $v = trim($parts[1], " \t\n\r\0\x0B\"'");
            if ($k !== '') {
                putenv("{$k}={$v}");
                $_ENV[$k] = $v;
                $_SERVER[$k] = $v;
            }
        }
    }
}

return [
    'db' => [
        'host'     => getenv('DB_HOST') ?: 'localhost',
        'port'     => getenv('DB_PORT') ?: '3306',
        'dbname'   => getenv('DB_NAME') ?: 'temple_obike',
        'user'     => getenv('DB_USER') ?: 'root',
        'pass'     => getenv('DB_PASS') ?: '',
        'charset'  => 'utf8mb4',
    ],
    'auth' => [
        'session_secret' => getenv('SESSION_SECRET') ?: 'your_secure_admin_secret_here',
    ],
    'email' => [
        'smtp_user'  => getenv('SMTP_USER') ?: 'templescounsel@gmail.com',
        'smtp_pass'  => getenv('SMTP_PASS') ?: '',
        'smtp_host'  => getenv('SMTP_HOST') ?: 'smtp.gmail.com',
        'smtp_port'  => getenv('SMTP_PORT') ?: 587,
        'from_email' => getenv('FROM_EMAIL') ?: 'templescounsel@gmail.com',
        'from_name'  => 'Temple Obike Site',
    ],
    'seat_caps' => [
        'Accra'     => 12,
        'Mauritius' => 8,
        // Virtual is uncapped
    ],
    'setting_keys' => [
        'PREORDER_SUBJECT' => 'preorder_autoresponse_subject',
        'PREORDER_MESSAGE' => 'preorder_autoresponse_message',
        'RETREAT_SUBJECT'  => 'retreat_autoresponse_subject',
        'RETREAT_MESSAGE'  => 'retreat_autoresponse_message',
    ],
    'setting_defaults' => [
        'preorder_autoresponse_subject' => 'Your name is on the list',
        'preorder_autoresponse_message' => "Hi {name},\n\nThank you for reserving your copy. Your name is on the list.\n\nWhen the book is ready, you will be among the first to know and the first to receive it. If companion courses, workshops, or private cohorts open before then, pre-order readers hear about them first.\n\nThere is nothing you need to do right now. We have your details and we will be in touch.\n\nWith gratitude,\nThe Temple Obike Team",
        'retreat_autoresponse_subject'  => 'We received your Gold Retreat request',
        'retreat_autoresponse_message'  => "Hi {name},\n\nWe have received your request for The Gold Retreat{location_part} and we are glad you reached out.\n\nSpaces are held on a first-come basis, so reaching out when you did matters. Our team will follow up by email and WhatsApp shortly with the next steps.\n\nIf you have any questions before then, simply reply to this email.\n\nWith gratitude,\nThe Temple Obike Team",
    ],
];
