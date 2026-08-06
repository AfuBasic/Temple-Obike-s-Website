<?php
/**
 * Email Service - Rich HTML Email Templates for Temple Obike
 */

class EmailService {
    private array $config;

    public function __construct(array $config) {
        $this->config = $config['email'];
    }

    private function send(string $to, string $subject, string $htmlBody, ?string $replyTo = null): bool {
        $fromEmail = $this->config['from_email'];
        $fromName  = $this->config['from_name'];

        $headers = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "Content-type: text/html; charset=utf-8";
        $headers[] = "From: {$fromName} <{$fromEmail}>";
        if ($replyTo) {
            $headers[] = "Reply-To: {$replyTo}";
        }
        $headers[] = "X-Mailer: PHP/" . phpversion();

        return @mail($to, $subject, $htmlBody, implode("\r\n", $headers));
    }

    private function wrapHtmlTemplate(string $title, string $contentHtml): string {
        $logoUrl = "https://templeobike.com/assets/logo-horizontal-CWFMXk9e.png";
        
        return <<<HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{$title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b0f17; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #e2e8f0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0b0f17; padding: 40px 10px;">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #141c2b; border-radius: 12px; overflow: hidden; border: 1px solid #1e293b; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
                    <!-- Header -->
                    <tr>
                        <td align="center" style="padding: 35px 20px 25px 20px; background: linear-gradient(180deg, #1e293b 0%, #141c2b 100%); border-bottom: 2px solid #d97706;">
                            <img src="{$logoUrl}" alt="Temple Obike" style="max-width: 220px; height: auto; display: block;" />
                        </td>
                    </tr>
                    
                    <!-- Content Area -->
                    <tr>
                        <td style="padding: 35px 30px; font-size: 15px; line-height: 1.7; color: #cbd5e1;">
                            {$contentHtml}
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 25px 30px; background-color: #0f172a; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
                            <p style="margin: 0 0 8px 0;">&copy; " . date('Y') . " Temple Obike. All rights reserved.</p>
                            <p style="margin: 0;"><a href="https://templeobike.com" style="color: #d97706; text-decoration: none;">templeobike.com</a></p>
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
        $smtpUser = $this->config['smtp_user'];
        $budget = !empty($data['budget']) ? htmlspecialchars($data['budget']) : "Not specified";
        $name = htmlspecialchars($data['name']);
        $email = htmlspecialchars($data['email']);
        $org = htmlspecialchars($data['organization']);
        $date = htmlspecialchars($data['eventDate']);
        $audience = htmlspecialchars($data['audienceSize']);
        $topic = htmlspecialchars($data['topic']);
        $msg = nl2br(htmlspecialchars($data['message']));

        $content = <<<HTML
<h2 style="color: #f59e0b; margin-top: 0; font-size: 20px; font-weight: 600;">New Speaking Inquiry</h2>
<p style="margin-bottom: 25px;">A new speaking enquiry was received on <strong>templeobike.com</strong>.</p>

<table border="0" cellpadding="8" cellspacing="0" width="100%" style="background-color: #0f172a; border-radius: 8px; margin-bottom: 25px; border: 1px solid #1e293b;">
    <tr><td width="30%" style="color: #94a3b8; font-weight: 600;">Name:</td><td style="color: #f8fafc;">{$name}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Email:</td><td style="color: #f8fafc;"><a href="mailto:{$email}" style="color: #d97706;">{$email}</a></td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Organization:</td><td style="color: #f8fafc;">{$org}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Event Date:</td><td style="color: #f8fafc;">{$date}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Audience:</td><td style="color: #f8fafc;">{$audience}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Topic:</td><td style="color: #f8fafc;">{$topic}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Budget:</td><td style="color: #f8fafc;">{$budget}</td></tr>
</table>

<div style="background-color: #0f172a; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #d97706; margin-bottom: 25px;">
    <strong style="color: #f59e0b; display: block; margin-bottom: 8px;">Message:</strong>
    <div style="color: #e2e8f0;">{$msg}</div>
</div>

<p style="text-align: center; margin-top: 30px;">
    <a href="https://templeobike.com/admin" style="background-color: #d97706; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View in Admin Dashboard</a>
</p>
HTML;

        $subject = "Speaking Inquiry: " . $data['organization'] . " — " . $data['eventDate'];
        $html = $this->wrapHtmlTemplate($subject, $content);
        $this->send($smtpUser, $subject, $html, $data['email']);
    }

    public function sendRetreatNotification(array $data): void {
        $smtpUser = $this->config['smtp_user'];
        $pkg = !empty($data['virtualTier']) ? " (" . htmlspecialchars($data['virtualTier']) . ")" : "";
        $name = htmlspecialchars($data['name']);
        $partner = htmlspecialchars($data['partner']);
        $email = htmlspecialchars($data['email']);
        $phone = htmlspecialchars($data['phone']);
        $loc = htmlspecialchars($data['location']) . $pkg;
        $note = !empty($data['note']) ? nl2br(htmlspecialchars($data['note'])) : null;

        $noteHtml = $note ? <<<HTML
<div style="background-color: #0f172a; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #d97706; margin-bottom: 25px;">
    <strong style="color: #f59e0b; display: block; margin-bottom: 8px;">Note:</strong>
    <div style="color: #e2e8f0;">{$note}</div>
</div>
HTML : '';

        $content = <<<HTML
<h2 style="color: #f59e0b; margin-top: 0; font-size: 20px; font-weight: 600;">New Retreat Booking</h2>
<p style="margin-bottom: 25px;">A new retreat booking request was received on <strong>templeobike.com</strong>.</p>

<table border="0" cellpadding="8" cellspacing="0" width="100%" style="background-color: #0f172a; border-radius: 8px; margin-bottom: 25px; border: 1px solid #1e293b;">
    <tr><td width="30%" style="color: #94a3b8; font-weight: 600;">Name:</td><td style="color: #f8fafc;">{$name}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Partner:</td><td style="color: #f8fafc;">{$partner}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Email:</td><td style="color: #f8fafc;"><a href="mailto:{$email}" style="color: #d97706;">{$email}</a></td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Phone / WA:</td><td style="color: #f8fafc;">{$phone}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Location:</td><td style="color: #f59e0b; font-weight: bold;">{$loc}</td></tr>
</table>

{$noteHtml}

<p style="text-align: center; margin-top: 30px;">
    <a href="https://templeobike.com/admin" style="background-color: #d97706; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View in Admin Dashboard</a>
</p>
HTML;

        $subject = "Retreat Booking: " . $data['name'] . " & " . $data['partner'] . " — " . $data['location'];
        $html = $this->wrapHtmlTemplate($subject, $content);
        $this->send($smtpUser, $subject, $html, $data['email']);
    }

    public function sendPreorderNotification(array $data): void {
        $smtpUser = $this->config['smtp_user'];
        $name = htmlspecialchars($data['name']);
        $email = htmlspecialchars($data['email']);
        $phone = !empty($data['phone']) ? htmlspecialchars($data['phone']) : 'N/A';
        $note = !empty($data['note']) ? nl2br(htmlspecialchars($data['note'])) : null;

        $noteHtml = $note ? <<<HTML
<div style="background-color: #0f172a; padding: 15px 20px; border-radius: 8px; border-left: 4px solid #d97706; margin-bottom: 25px;">
    <strong style="color: #f59e0b; display: block; margin-bottom: 8px;">Note:</strong>
    <div style="color: #e2e8f0;">{$note}</div>
</div>
HTML : '';

        $content = <<<HTML
<h2 style="color: #f59e0b; margin-top: 0; font-size: 20px; font-weight: 600;">New FERRG Book Pre-order</h2>
<p style="margin-bottom: 25px;">A new pre-order reservation was received on <strong>templeobike.com</strong>.</p>

<table border="0" cellpadding="8" cellspacing="0" width="100%" style="background-color: #0f172a; border-radius: 8px; margin-bottom: 25px; border: 1px solid #1e293b;">
    <tr><td width="30%" style="color: #94a3b8; font-weight: 600;">Name:</td><td style="color: #f8fafc;">{$name}</td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Email:</td><td style="color: #f8fafc;"><a href="mailto:{$email}" style="color: #d97706;">{$email}</a></td></tr>
    <tr><td style="color: #94a3b8; font-weight: 600;">Phone:</td><td style="color: #f8fafc;">{$phone}</td></tr>
</table>

{$noteHtml}

<p style="text-align: center; margin-top: 30px;">
    <a href="https://templeobike.com/admin" style="background-color: #d97706; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View in Admin Dashboard</a>
</p>
HTML;

        $subject = "Book Pre-order: " . $data['name'];
        $html = $this->wrapHtmlTemplate($subject, $content);
        $this->send($smtpUser, $subject, $html, $data['email']);
    }

    public function sendAutoResponse(string $toName, string $toEmail, string $subject, string $bodyTemplate, string $locationPart = ''): void {
        $body = str_replace('{name}', htmlspecialchars($toName), $bodyTemplate);
        $body = str_replace('{location_part}', htmlspecialchars($locationPart), $body);
        $bodyHtml = nl2br($body);

        $content = <<<HTML
<div style="font-size: 16px; line-height: 1.8; color: #e2e8f0;">
    {$bodyHtml}
</div>
HTML;

        $finalSubject = str_replace('{name}', $toName, $subject);
        $html = $this->wrapHtmlTemplate($finalSubject, $content);
        $this->send($toEmail, $finalSubject, $html);
    }
}
