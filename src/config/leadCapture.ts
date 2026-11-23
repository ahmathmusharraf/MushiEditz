/**
 * Google Apps Script Web App Lead Capture Configuration & Client Helpers
 *
 * Replace VITE_GOOGLE_SCRIPT_URL in .env (or paste your deployed /exec URL below)
 * after deploying google-apps-script/Code.gs as a public Web App.
 */
const DEPLOYED_GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbx2VfHcOqBr0WI7w-Y9FTxmgWUIEKyecE6bhAZTdmWF1g398ai3tRx7IF2Pts0Ik3sV/exec';

export const GOOGLE_APPS_SCRIPT_URL: string =
  (import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined)?.trim() ||
  DEPLOYED_GOOGLE_SCRIPT_URL;

export function isGoogleScriptConfigured(url: string = GOOGLE_APPS_SCRIPT_URL): boolean {
  return (
    Boolean(url) &&
    url.startsWith('https://script.google.com/') &&
    !url.includes('YOUR_DEPLOYMENT_ID')
  );
}

export interface LeadSubmissionPayload {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  submittedAt: string;
  website_url: string; // Honeypot field (must remain empty for genuine humans)
}

/**
 * Automatically captures current Page URL, UTM tracking params, and ISO submit timestamp.
 */
export function captureLeadContext(): {
  pageUrl: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  submittedAt: string;
} {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  return {
    pageUrl: window.location.href,
    utmSource: params.get('utm_source')?.trim() || '',
    utmMedium: params.get('utm_medium')?.trim() || '',
    utmCampaign: params.get('utm_campaign')?.trim() || '',
    submittedAt: new Date().toISOString(),
  };
}

const DUPLICATE_STORAGE_KEY = 'mushi_last_lead_fingerprint';
const DUPLICATE_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

function buildLeadFingerprint(email: string, interest: string, message: string): string {
  const normalized = [
    email.trim().toLowerCase(),
    interest.trim().toLowerCase(),
    message.trim().toLowerCase(),
  ].join('|');

  let hash = 0;
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (hash * 31 + normalized.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

export function isDuplicateLeadSubmission(
  email: string,
  interest: string,
  message: string
): boolean {
  try {
    const raw = window.sessionStorage.getItem(DUPLICATE_STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as {fingerprint: string; timestamp: number};
    const currentFingerprint = buildLeadFingerprint(email, interest, message);
    const isFresh = Date.now() - parsed.timestamp < DUPLICATE_COOLDOWN_MS;
    return isFresh && parsed.fingerprint === currentFingerprint;
  } catch {
    return false;
  }
}

export function recordLeadSubmissionFingerprint(
  email: string,
  interest: string,
  message: string
): void {
  try {
    window.sessionStorage.setItem(
      DUPLICATE_STORAGE_KEY,
      JSON.stringify({
        fingerprint: buildLeadFingerprint(email, interest, message),
        timestamp: Date.now(),
      })
    );
  } catch {
    // Ignore storage restriction errors in private browsing
  }
}
