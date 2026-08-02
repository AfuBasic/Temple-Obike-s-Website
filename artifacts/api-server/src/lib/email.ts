import nodemailer from "nodemailer";

// ─── Transporter ──────────────────────────────────────────────────────────────
// Uses Gmail SMTP with an App Password stored in SMTP_PASS.
// Set SMTP_USER (defaults to templescounsel@gmail.com) and SMTP_PASS in Replit Secrets.

const SMTP_USER = process.env["SMTP_USER"] ?? "templescounsel@gmail.com";
const SMTP_PASS = process.env["SMTP_PASS"];

function createTransporter() {
  if (!SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

// ─── Send a notification to Temple's inbox ────────────────────────────────────

export interface EnquiryNotificationData {
  name: string;
  email: string;
  organization: string;
  eventDate: string;
  audienceSize: string;
  topic: string;
  budget?: string | null;
  message: string;
}

export async function sendEnquiryNotification(data: EnquiryNotificationData): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) {
    // SMTP_PASS not set — skip silently; DB save already captured the enquiry
    return;
  }

  const bodyText = [
    `New speaking enquiry received on templeobike.com`,
    ``,
    `Name:         ${data.name}`,
    `Email:        ${data.email}`,
    `Organization: ${data.organization}`,
    `Event Date:   ${data.eventDate}`,
    `Audience:     ${data.audienceSize}`,
    `Topic:        ${data.topic}`,
    `Budget:       ${data.budget || "Not specified"}`,
    ``,
    `Message:`,
    data.message,
    ``,
    `---`,
    `Reply directly to ${data.email} to follow up.`,
    `View all enquiries: https://templeobike.com/admin`,
  ].join("\n");

  await transporter.sendMail({
    from: `"Temple Obike Site" <${SMTP_USER}>`,
    to: SMTP_USER,                              // notify Temple's inbox
    replyTo: data.email,                        // reply goes straight to enquirer
    subject: `Speaking Inquiry: ${data.organization} — ${data.eventDate}`,
    text: bodyText,
  });
}

// ─── Send a notification for retreat bookings ─────────────────────────────────

export interface RetreatNotificationData {
  name: string;
  partner: string;
  email: string;
  phone: string;
  location: string;
  virtualTier?: string | null;
  note?: string | null;
}

export async function sendRetreatNotification(data: RetreatNotificationData): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const pkg = data.virtualTier ? ` (${data.virtualTier})` : "";
  const bodyText = [
    `New retreat booking received on templeobike.com`,
    ``,
    `Name:     ${data.name}`,
    `Partner:  ${data.partner}`,
    `Email:    ${data.email}`,
    `Phone:    ${data.phone}`,
    `Location: ${data.location}${pkg}`,
    data.note ? `Note:     ${data.note}` : null,
    ``,
    `---`,
    `Reply directly to ${data.email} to follow up.`,
    `View all bookings: https://templeobike.com/admin`,
  ].filter(Boolean).join("\n");

  await transporter.sendMail({
    from: `"Temple Obike Site" <${SMTP_USER}>`,
    to: SMTP_USER,
    replyTo: data.email,
    subject: `Retreat Booking: ${data.name} & ${data.partner} — ${data.location}`,
    text: bodyText,
  });
}

// ─── Send a notification for book pre-orders ──────────────────────────────────

export interface PreorderNotificationData {
  name: string;
  email: string;
  phone?: string | null;
  note?: string | null;
}

export async function sendPreorderNotification(data: PreorderNotificationData): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const bodyText = [
    `New FERRG book pre-order received on templeobike.com`,
    ``,
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.note  ? `Note:  ${data.note}`  : null,
    ``,
    `---`,
    `Reply directly to ${data.email} to follow up.`,
    `View all pre-orders: https://templeobike.com/admin`,
  ].filter(Boolean).join("\n");

  await transporter.sendMail({
    from: `"Temple Obike Site" <${SMTP_USER}>`,
    to: SMTP_USER,
    replyTo: data.email,
    subject: `Book Pre-order: ${data.name}`,
    text: bodyText,
  });
}

// ─── Send an auto-response to the person who submitted ────────────────────────

export interface AutoResponseData {
  toName: string;
  toEmail: string;
  subject: string;
  bodyTemplate: string;        // supports {name} placeholder
  locationPart?: string;       // for retreat emails: " — Accra" etc.
}

export async function sendAutoResponse(data: AutoResponseData): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const body = data.bodyTemplate
    .replace(/\{name\}/g, data.toName)
    .replace(/\{location_part\}/g, data.locationPart ?? "");

  await transporter.sendMail({
    from: `"Temple Obike" <${SMTP_USER}>`,
    to: data.toEmail,
    subject: data.subject.replace(/\{name\}/g, data.toName),
    text: body,
  });
}
