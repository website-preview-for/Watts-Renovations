import type { ServiceId } from '../data/wattsData';

export interface QuoteFormPayload {
  name: string;
  phone: string;
  email: string;
  service: ServiceId;
  location: string;
  details: string;
}

export interface QuoteSubmissionResult {
  delivered: boolean;
  requiresIntegration: boolean;
  message: string;
}

const QUOTE_ENDPOINT = import.meta.env.VITE_QUOTE_ENDPOINT as string | undefined;

export async function submitQuoteRequest(
  payload: QuoteFormPayload,
): Promise<QuoteSubmissionResult> {
  if (!QUOTE_ENDPOINT) {
    return {
      delivered: false,
      requiresIntegration: true,
      message:
        'Your quote details have been validated. This enquiry form requires a configured backend or email service endpoint (VITE_QUOTE_ENDPOINT) before it can send enquiries automatically. In the meantime, please call +44 7359 184307 or email watts.renovations@outlook.com directly.',
    };
  }

  const response = await fetch(QUOTE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Unable to send enquiry at the moment. Please call or email us directly.');
  }

  return {
    delivered: true,
    requiresIntegration: false,
    message: 'Thank you for your enquiry. Our team will review your project details and get back to you.',
  };
}
