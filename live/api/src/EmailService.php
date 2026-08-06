<?php
/**
 * Email Service - Executive High-End HTML Email Templates for Temple Obike
 */

class EmailService {
    private array $config;

    public function __construct(array $config) {
        $this->config = $config['email'];
    }

    /**
     * Send email via direct SMTP socket (STARTTLS authentication)
     */
    private function send(string $to, string $subject, string $htmlBody, ?string $replyTo = null, ?string $customFromName = null): bool {
        $host = $this->config['smtp_host'] ?? 'smtp.zeptomail.com';
        $port = (int)($this->config['smtp_port'] ?? 587);
        $user = $this->config['smtp_user'] ?? '';
        $pass = $this->config['smtp_pass'] ?? '';
        $fromEmail = $this->config['from_email'] ?? 'noreply@templeobike.com';
        $fromName  = $customFromName ?? ($this->config['from_name'] ?? 'Temple Obike');

        // Fallback to php mail() if SMTP credentials are missing
        if (empty($host) || empty($user) || empty($pass)) {
            $headers = [
                "MIME-Version: 1.0",
                "Content-type: text/html; charset=utf-8",
                "From: {$fromName} <{$fromEmail}>",
                "X-Mailer: PHP/" . phpversion()
            ];
            if ($replyTo) $headers[] = "Reply-To: {$replyTo}";
            return @mail($to, $subject, $htmlBody, implode("\r\n", $headers));
        }

        try {
            $socket = @stream_socket_client("tcp://{$host}:{$port}", $errno, $errstr, 15);
            if (!$socket) return false;

            $this->readResponse($socket); // 220 banner

            $this->sendCommand($socket, "EHLO " . gethostname(), 250);

            // STARTTLS encryption
            $this->sendCommand($socket, "STARTTLS", 220);
            stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLSv1_2_CLIENT | STREAM_CRYPTO_METHOD_TLSv1_3_CLIENT);

            $this->sendCommand($socket, "EHLO " . gethostname(), 250);

            // AUTH LOGIN
            $this->sendCommand($socket, "AUTH LOGIN", 334);
            $this->sendCommand($socket, base64_encode($user), 334);
            $this->sendCommand($socket, base64_encode($pass), 235);

            // MAIL FROM & RCPT TO
            $this->sendCommand($socket, "MAIL FROM: <{$fromEmail}>", 250);
            $this->sendCommand($socket, "RCPT TO: <{$to}>", 250);

            // DATA
            $this->sendCommand($socket, "DATA", 354);

            $headers = [
                "MIME-Version: 1.0",
                "Content-Type: text/html; charset=utf-8",
                "From: {$fromName} <{$fromEmail}>",
                "To: <{$to}>",
                "Subject: " . '=?UTF-8?B?' . base64_encode($subject) . '?=',
                "Date: " . date(DATE_RFC2822)
            ];
            if ($replyTo) {
                $headers[] = "Reply-To: {$replyTo}";
            }

            $message = implode("\r\n", $headers) . "\r\n\r\n" . $htmlBody . "\r\n.";
            $this->sendCommand($socket, $message, 250);

            $this->sendCommand($socket, "QUIT", 221);
            fclose($socket);

            return true;
        } catch (Exception $e) {
            error_log("SMTP Error: " . $e->getMessage());
            return false;
        }
    }

    private function readResponse($socket): string {
        $response = '';
        while ($line = fgets($socket, 512)) {
            $response .= $line;
            if (substr($line, 3, 1) === ' ') break;
        }
        return $response;
    }

    private function sendCommand($socket, string $command, int $expectedCode): void {
        fputs($socket, $command . "\r\n");
        $response = $this->readResponse($socket);
        $code = (int)substr($response, 0, 3);
        if ($code !== $expectedCode) {
            throw new Exception("SMTP Command '{$command}' failed with response: {$response}");
        }
    }

    private function wrapHtmlTemplate(string $title, string $contentHtml): string {
        $logoUrl = "https://templeobike.com/assets/logo-horizontal-CWFMXk9e.png";
        $year = date('Y');
        
        return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #05080e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0; -webkit-font-smoothing: antialiased;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #05080e; padding: 40px 12px;">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #0b111e; border-radius: 16px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                    <!-- Top Accent Gold Line -->
                    <tr>
                        <td style="height: 4px; background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #d97706 100%);"></td>
                    </tr>
                    
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 38px 24px 28px 24px; background-color: #0f172a; border-bottom: 1px solid #1e293b;">
                            <img src="{$logoUrl}" alt="Temple Obike" style="max-width: 220px; height: auto; display: block;" />
                        </td>
                    </tr>
                    
                    <!-- Main Body Area -->
                    <tr>
                        <td style="padding: 38px 32px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                            {$contentHtml}
                        </td>
                    </tr>

                    <!-- Luxury Footer -->
                    <tr>
                        <td style="padding: 28px 32px; background-color: #070c16; border-top: 1px solid #1e293b; text-align: center; font-size: 13px; color: #64748b;">
                            <p style="margin: 0 0 10px 0; font-weight: 500; color: #94a3b8;">TEMPLE OBIKE &bull; RELATIONSHIP & HIGH-PERFORMANCE COUNSEL</p>
                            <p style="margin: 0 0 8px 0;">&copy; {$year} Temple Obike. All rights reserved.</p>
                            <p style="margin: 0;"><a href="https://templeobike.com" style="color: #d97706; text-decoration: none; font-weight: 600;">templeobike.com</a></p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
HTML;
    }

    public function sendEnquiryNotification(array $data): void {
        $budget = !empty($data['budget']) ? htmlspecialchars($data['budget']) : "Not specified";
        $name = htmlspecialchars($data['name']);
        $email = htmlspecialchars($data['email']);
        $org = htmlspecialchars($data['organization']);
        $date = htmlspecialchars($data['eventDate']);
        $audience = htmlspecialchars($data['audienceSize']);
        $topic = htmlspecialchars($data['topic']);
        $msg = nl2br(htmlspecialchars($data['message']));

        $content = <<<HTML
<!-- Header Badge -->
<div style="text-align: center; margin-bottom: 25px;">
    <span style="background-color: rgba(217, 119, 6, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 20px; display: inline-block;">
        NEW SPEAKING INQUIRY
    </span>
</div>

<h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 10px 0; text-align: center;">
    Speaking Engagement Request
</h1>
<p style="margin: 0 0 30px 0; text-align: center; color: #94a3b8; font-size: 14px;">
    A new inquiry has been submitted via <strong>templeobike.com</strong>
</p>

<!-- Lead Details Card -->
<div style="background-color: #0f172a; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; margin-bottom: 25px;">
    <div style="padding: 16px 20px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px;">
        Client & Event Overview
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; width: 35%; font-weight: 600;">Speaker / Client:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #ffffff; font-size: 15px; font-weight: 600;">{$name}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Organization:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px;">{$org}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Email Address:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #d97706; font-size: 14px;"><a href="mailto:{$email}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">{$email}</a></td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Target Date:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px;">{$date}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Audience Size:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px;">{$audience}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Topic Interest:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px;">{$topic}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; color: #94a3b8; font-size: 14px; font-weight: 600;">Budget Range:</td>
            <td style="padding: 14px 20px; color: #38bdf8; font-size: 14px; font-weight: 600;">{$budget}</td>
        </tr>
    </table>
</div>

<!-- Message Callout -->
<div style="background-color: #0f172a; border-radius: 12px; border: 1px solid #1e293b; border-left: 4px solid #d97706; padding: 20px; margin-bottom: 30px;">
    <div style="font-size: 12px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
        Inquiry Message
    </div>
    <div style="color: #e2e8f0; font-size: 14px; line-height: 1.7;">
        {$msg}
    </div>
</div>

<!-- CTA Actions -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="padding: 10px 0 20px 0;">
            <a href="mailto:{$email}?subject=RE:%20Speaking%20Inquiry%20-%20{$org}" style="background-color: #d97706; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">
                Reply to {$name} &rarr;
            </a>
        </td>
    </tr>
</table>
HTML;

        $subject = "🔥 New Speaking Inquiry: " . $data['organization'] . " — " . $data['name'];
        $html = $this->wrapHtmlTemplate($subject, $content);
        
        $recipients = ['templeobike@gmail.com'];
        foreach ($recipients as $recipient) {
            $this->send($recipient, $subject, $html, $data['email'], 'Temple Obike Site');
        }
    }

    public function sendRetreatNotification(array $data): void {
        $pkg = !empty($data['virtualTier']) ? " (" . htmlspecialchars($data['virtualTier']) . ")" : "";
        $name = htmlspecialchars($data['name']);
        $partner = htmlspecialchars($data['partner']);
        $email = htmlspecialchars($data['email']);
        $phone = htmlspecialchars($data['phone']);
        $loc = htmlspecialchars($data['location']) . $pkg;
        $note = !empty($data['note']) ? nl2br(htmlspecialchars($data['note'])) : null;

        $noteHtml = $note ? <<<HTML
<div style="background-color: #0f172a; border-radius: 12px; border: 1px solid #1e293b; border-left: 4px solid #d97706; padding: 20px; margin-bottom: 30px;">
    <div style="font-size: 12px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
        Applicant Notes
    </div>
    <div style="color: #e2e8f0; font-size: 14px; line-height: 1.7;">
        {$note}
    </div>
</div>
HTML : '';

        $content = <<<HTML
<!-- Header Badge -->
<div style="text-align: center; margin-bottom: 25px;">
    <span style="background-color: rgba(217, 119, 6, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 20px; display: inline-block;">
        NEW GOLD RETREAT APPLICATION
    </span>
</div>

<h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 10px 0; text-align: center;">
    Retreat Reservation Request
</h1>
<p style="margin: 0 0 30px 0; text-align: center; color: #94a3b8; font-size: 14px;">
    A high-value retreat booking has been submitted for <strong>{$loc}</strong>
</p>

<!-- Lead Details Card -->
<div style="background-color: #0f172a; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; margin-bottom: 25px;">
    <div style="padding: 16px 20px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px;">
        Applicant Information
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; width: 35%; font-weight: 600;">Applicant Name:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #ffffff; font-size: 15px; font-weight: 700;">{$name}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Partner Name:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px; font-weight: 600;">{$partner}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Email Address:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #d97706; font-size: 14px;"><a href="mailto:{$email}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">{$email}</a></td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Phone / WhatsApp:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #f8fafc; font-size: 14px; font-weight: 600;">{$phone}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; color: #94a3b8; font-size: 14px; font-weight: 600;">Selected Experience:</td>
            <td style="padding: 14px 20px; color: #f59e0b; font-size: 15px; font-weight: 700;">{$loc}</td>
        </tr>
    </table>
</div>

{$noteHtml}

<!-- CTA Actions -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="padding: 10px 0 20px 0;">
            <a href="https://templeobike.com/admin" style="background-color: #d97706; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">
                View in Admin Dashboard &rarr;
            </a>
        </td>
    </tr>
</table>
HTML;

        $subject = "👑 New Gold Retreat Booking: " . $data['name'] . " & " . $data['partner'] . " (" . $data['location'] . ")";
        $html = $this->wrapHtmlTemplate($subject, $content);
        
        $recipients = ['templeobike@gmail.com'];
        foreach ($recipients as $recipient) {
            $this->send($recipient, $subject, $html, $data['email'], 'Temple Obike Site');
        }
    }

    public function sendPreorderNotification(array $data): void {
        $name = htmlspecialchars($data['name']);
        $email = htmlspecialchars($data['email']);
        $phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : 'N/A';
        $note = !empty($data['note']) ? nl2br(htmlspecialchars($data['note'])) : null;

        $noteHtml = $note ? <<<HTML
<div style="background-color: #0f172a; border-radius: 12px; border: 1px solid #1e293b; border-left: 4px solid #d97706; padding: 20px; margin-bottom: 30px;">
    <div style="font-size: 12px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">
        Pre-order Note
    </div>
    <div style="color: #e2e8f0; font-size: 14px; line-height: 1.7;">
        {$note}
    </div>
</div>
HTML : '';

        $content = <<<HTML
<!-- Header Badge -->
<div style="text-align: center; margin-bottom: 25px;">
    <span style="background-color: rgba(217, 119, 6, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; padding: 6px 14px; border-radius: 20px; display: inline-block;">
        NEW BOOK PRE-ORDER
    </span>
</div>

<h1 style="color: #ffffff; font-size: 22px; font-weight: 700; margin: 0 0 10px 0; text-align: center;">
    FERRG Book VIP List Reservation
</h1>
<p style="margin: 0 0 30px 0; text-align: center; color: #94a3b8; font-size: 14px;">
    A new reader has reserved their copy of <strong>FERRG</strong>
</p>

<!-- Lead Details Card -->
<div style="background-color: #0f172a; border-radius: 12px; border: 1px solid #1e293b; overflow: hidden; margin-bottom: 25px;">
    <div style="padding: 16px 20px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 700; color: #f59e0b; text-transform: uppercase; letter-spacing: 1px;">
        Reader Details
    </div>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; width: 35%; font-weight: 600;">Reader Name:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #ffffff; font-size: 15px; font-weight: 700;">{$name}</td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #94a3b8; font-size: 14px; font-weight: 600;">Email Address:</td>
            <td style="padding: 14px 20px; border-bottom: 1px solid #1e293b; color: #d97706; font-size: 14px;"><a href="mailto:{$email}" style="color: #f59e0b; text-decoration: none; font-weight: 600;">{$email}</a></td>
        </tr>
        <tr>
            <td style="padding: 14px 20px; color: #94a3b8; font-size: 14px; font-weight: 600;">Phone Number:</td>
            <td style="padding: 14px 20px; color: #f8fafc; font-size: 14px;">{$phone}</td>
        </tr>
    </table>
</div>

{$noteHtml}

<!-- CTA Actions -->
<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
        <td align="center" style="padding: 10px 0 20px 0;">
            <a href="https://templeobike.com/admin" style="background-color: #d97706; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);">
                View in Admin Dashboard &rarr;
            </a>
        </td>
    </tr>
</table>
HTML;

        $subject = "📚 Book Pre-order: " . $data['name'];
        $html = $this->wrapHtmlTemplate($subject, $content);
        
        $recipients = ['templeobike@gmail.com'];
        foreach ($recipients as $recipient) {
            $this->send($recipient, $subject, $html, $data['email'], 'Temple Obike Site');
        }
    }

    public function sendAutoResponse(string $toName, string $toEmail, string $subject, string $bodyTemplate, string $locationPart = ''): void {
        $body = str_replace('{name}', htmlspecialchars($toName), $bodyTemplate);
        $body = str_replace('{location_part}', htmlspecialchars($locationPart), $body);
        $bodyHtml = nl2br($body);

        $content = <<<HTML
<div style="font-size: 15px; line-height: 1.8; color: #e2e8f0; background-color: #0f172a; padding: 25px; border-radius: 12px; border: 1px solid #1e293b;">
    {$bodyHtml}
</div>

<p style="margin-top: 25px; text-align: center; color: #94a3b8; font-size: 13px;">
    Need to get in touch? Simply reply directly to this email.
</p>
HTML;

        $finalSubject = str_replace('{name}', $toName, $subject);
        $html = $this->wrapHtmlTemplate($finalSubject, $content);
        $this->send($toEmail, $finalSubject, $html);
    }
}
