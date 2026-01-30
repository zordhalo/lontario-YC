import { Resend } from "resend";
import {
  getInterviewScheduledTemplate,
  getInterviewReminderTemplate,
  getInterviewCompletedTemplate,
  getInterviewRescheduledTemplate,
  getInterviewCancelledTemplate,
  type EmailTemplateData,
} from "./templates";

// Lazy initialization to avoid build-time errors
let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

// Default sender - should be verified in Resend dashboard
const DEFAULT_FROM = process.env.EMAIL_FROM || "AI Hiring Platform <noreply@example.com>";

export type EmailType =
  | "interview_scheduled"
  | "interview_reminder_24h"
  | "interview_reminder_1h"
  | "interview_completed"
  | "interview_rescheduled"
  | "interview_cancelled";

interface SendEmailOptions {
  to: string;
  type: EmailType;
  data: EmailTemplateData;
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an email using Resend
 */
export async function sendEmail({
  to,
  type,
  data,
}: SendEmailOptions): Promise<SendEmailResult> {
  try {
    const resend = getResendClient();

    const { subject, html, text } = getEmailContent(type, data);

    const result = await resend.emails.send({
      from: DEFAULT_FROM,
      to,
      subject,
      html,
      text,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      messageId: result.data?.id,
    };
  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send interview scheduled email
 */
export async function sendInterviewScheduledEmail(
  to: string,
  data: EmailTemplateData
): Promise<SendEmailResult> {
  return sendEmail({ to, type: "interview_scheduled", data });
}

/**
 * Send interview reminder email
 */
export async function sendInterviewReminderEmail(
  to: string,
  data: EmailTemplateData,
  hoursUntil: 24 | 1
): Promise<SendEmailResult> {
  const type = hoursUntil === 24 ? "interview_reminder_24h" : "interview_reminder_1h";
  return sendEmail({ to, type, data });
}

/**
 * Send interview completed email
 */
export async function sendInterviewCompletedEmail(
  to: string,
  data: EmailTemplateData
): Promise<SendEmailResult> {
  return sendEmail({ to, type: "interview_completed", data });
}

/**
 * Send interview rescheduled email
 */
export async function sendInterviewRescheduledEmail(
  to: string,
  data: EmailTemplateData
): Promise<SendEmailResult> {
  return sendEmail({ to, type: "interview_rescheduled", data });
}

/**
 * Send interview cancelled email
 */
export async function sendInterviewCancelledEmail(
  to: string,
  data: EmailTemplateData
): Promise<SendEmailResult> {
  return sendEmail({ to, type: "interview_cancelled", data });
}

/**
 * Get email content (subject, html, text) based on type
 */
function getEmailContent(
  type: EmailType,
  data: EmailTemplateData
): { subject: string; html: string; text: string } {
  switch (type) {
    case "interview_scheduled":
      return getInterviewScheduledTemplate(data);
    case "interview_reminder_24h":
      return getInterviewReminderTemplate(data, 24);
    case "interview_reminder_1h":
      return getInterviewReminderTemplate(data, 1);
    case "interview_completed":
      return getInterviewCompletedTemplate(data);
    case "interview_rescheduled":
      return getInterviewRescheduledTemplate(data);
    case "interview_cancelled":
      return getInterviewCancelledTemplate(data);
    default:
      throw new Error(`Unknown email type: ${type}`);
  }
}

/**
 * Batch send emails (for reminders cron)
 */
export async function sendBatchEmails(
  emails: Array<{ to: string; type: EmailType; data: EmailTemplateData }>
): Promise<{ sent: number; failed: number; errors: string[] }> {
  const results = await Promise.allSettled(
    emails.map(({ to, type, data }) => sendEmail({ to, type, data }))
  );

  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  results.forEach((result, index) => {
    if (result.status === "fulfilled" && result.value.success) {
      sent++;
    } else {
      failed++;
      const error =
        result.status === "rejected"
          ? result.reason?.message
          : result.value.error;
      errors.push(`Email to ${emails[index].to}: ${error}`);
    }
  });

  return { sent, failed, errors };
}
