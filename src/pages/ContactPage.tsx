import {type FormEvent, useEffect, useRef, useState} from 'react';
import {AlertCircle, ArrowUpRight, CheckCircle2, Copy, Loader2, Mail} from 'lucide-react';
import {MushiGrowthIcon, MushiPrimaryLogo} from '../components/BrandMark';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {
  captureLeadContext,
  GOOGLE_APPS_SCRIPT_URL,
  isDuplicateLeadSubmission,
  isGoogleScriptConfigured,
  type LeadSubmissionPayload,
  recordLeadSubmissionFingerprint,
} from '../config/leadCapture';
import {SERVICES_DATA, STUDIO_INFO} from '../data/agencyData';

const INTEREST_OPTIONS = [
  ...SERVICES_DATA.map(s => s.title),
  'Digital Marketing & Growth Training / Course',
  'Full-Stack Growth Partner / Retainer',
  'Not Sure Yet — Need Consultation',
];

interface FormValues {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  website_url: string; // Hidden honeypot field
}

interface SubmissionState {
  status: 'idle' | 'submitting' | 'success' | 'config-needed' | 'error';
  message: string;
  submittedAt?: string;
}

export function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
    website_url: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    status: 'idle',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [lastSummary, setLastSummary] = useState('');
  const inFlightRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const interestParam = params.get('interest') || params.get('service');
    if (!interestParam) return;

    const query = interestParam.trim().toLowerCase();
    const aliasMap: Record<string, string> = {
      'e-commerce & retail': 'Web Development & Digital Experiences',
      'advertising & creative studios': 'Branding & Creative Design',
      'personal portfolios': 'Web Development & Digital Experiences',
      'ai & web applications': 'AI, Automation & Digital Solutions',
      'travel & hospitality': 'Web Development & Digital Experiences',
      'corporate & education': 'Web Development & Digital Experiences',
      'fintech & trading': 'Web Development & Digital Experiences',
      'interactive events': 'Web Development & Digital Experiences',
    };

    const aliasTarget = aliasMap[query];
    const matched =
      INTEREST_OPTIONS.find(
        opt =>
          (aliasTarget && opt === aliasTarget) ||
          opt.toLowerCase() === query ||
          opt.toLowerCase().includes(query)
      ) || '';

    if (matched) {
      setValues(prev => ({...prev, interest: matched}));
    }
  }, []);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues(prev => ({...prev, [field]: value}));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const next = {...prev};
        delete next[field];
        return next;
      });
    }
  };

  const validateClient = (): boolean => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (values.name.trim().length < 2) {
      nextErrors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!values.phone.trim() || !/^[+\d\s().-]{7,24}$/.test(values.phone.trim())) {
      nextErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (!values.interest) {
      nextErrors.interest = 'Please select the course or service you are interested in.';
    }

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildSummaryText = (context?: ReturnType<typeof captureLeadContext>) =>
    [
      `Lead Inquiry — ${STUDIO_INFO.name}`,
      `Full Name: ${values.name.trim()}`,
      `Email Address: ${values.email.trim()}`,
      `Phone Number: ${values.phone.trim()}`,
      `Course / Service: ${values.interest}`,
      ...(context?.utmSource ? [`UTM Source: ${context.utmSource}`] : []),
      ...(context?.utmMedium ? [`UTM Medium: ${context.utmMedium}`] : []),
      ...(context?.utmCampaign ? [`UTM Campaign: ${context.utmCampaign}`] : []),
      ...(context?.pageUrl ? [`Page URL: ${context.pageUrl}`] : []),
      '',
      'Message:',
      values.message.trim() || '(No message provided)',
    ].join('\n');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Prevent concurrent double-submissions from rapid clicks or keyboard Enter
    if (inFlightRef.current || submission.status === 'submitting') {
      return;
    }

    // Honeypot anti-spam trap check
    if (values.website_url.trim().length > 0) {
      setSubmission({
        status: 'error',
        message: 'Unable to process this submission.',
      });
      return;
    }

    if (!validateClient()) {
      setSubmission({
        status: 'error',
        message: 'Please review the highlighted fields before submitting.',
      });
      return;
    }

    // Duplicate lead protection (blocks identical repeat payloads within 5 minutes)
    if (isDuplicateLeadSubmission(values.email, values.interest, values.message)) {
      setSubmission({
        status: 'error',
        message:
          'This inquiry was already submitted a moment ago. Please wait a few minutes before sending the same inquiry again.',
      });
      return;
    }

    const context = captureLeadContext();
    const summarySnapshot = buildSummaryText(context);
    setLastSummary(summarySnapshot);

    const payload: LeadSubmissionPayload = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      interest: values.interest,
      message: values.message.trim(),
      pageUrl: context.pageUrl,
      utmSource: context.utmSource,
      utmMedium: context.utmMedium,
      utmCampaign: context.utmCampaign,
      submittedAt: context.submittedAt,
      website_url: values.website_url,
    };

    if (!isGoogleScriptConfigured()) {
      setSubmission({
        status: 'config-needed',
        message:
          'Inquiry validated cleanly. Connect your deployed Google Apps Script Web App URL via VITE_GOOGLE_SCRIPT_URL (or src/config/leadCapture.ts) to save leads directly into Google Sheets.',
      });
      return;
    }

    inFlightRef.current = true;
    setSubmission({status: 'submitting', message: ''});

    try {
      // Send JSON string using text/plain;charset=utf-8 so browser avoids CORS preflight issues with Google Apps Script
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const rawText = await response.text();
      let result: {ok?: boolean; error?: string; message?: string; timestamp?: string} = {};
      try {
        result = JSON.parse(rawText) as {
          ok?: boolean;
          error?: string;
          message?: string;
          timestamp?: string;
        };
      } catch {
        throw new Error('Unexpected response format from Google Apps Script endpoint.');
      }

      if (!response.ok || !result.ok) {
        throw new Error(
          result.error || 'Could not record your inquiry. Please try again shortly.'
        );
      }

      recordLeadSubmissionFingerprint(values.email, values.interest, values.message);
      setFieldErrors({});
      setValues({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: '',
        website_url: '',
      });
      setSubmission({
        status: 'success',
        submittedAt: result.timestamp || context.submittedAt,
        message:
          result.message ||
          'Thank you! Your inquiry has been sent directly to Mushi Digital Growth Studio. We will respond within one business day.',
      });
    } catch (error) {
      setSubmission({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to connect right now. Please try again or copy your inquiry summary below.',
      });
    } finally {
      inFlightRef.current = false;
    }
  };

  const handleCopySummary = async () => {
    const textToCopy = lastSummary || buildSummaryText(captureLeadContext());
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Layout activePage="contact">
      <PageHero
        sectionLabel="Contact Us"
        headline="Let's make your"
        accentHeadline="next move matter."
        description="Tell us about your project, training interest, goals, and timeline. Submit your inquiry below and our team will respond with a practical next step."
      />

      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Project & Course Inquiry Form */}
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Inquiry &amp; Lead Form
              </p>
              <h2 className="display-sub mt-1 text-[#111114]">
                Good partnerships start with a clear brief.
              </h2>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative mt-4 space-y-4 rounded-[10px] border border-black/12 bg-[#FFFFFF] p-4 sm:mt-5 sm:p-6"
              >
                {/* Hidden Honeypot Anti-Spam Trap */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="website_url">Website URL</label>
                  <input
                    id="website_url"
                    name="website_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.website_url}
                    onChange={e => updateField('website_url', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="enquiry-name"
                      className="block text-xs font-semibold text-[#111114]"
                    >
                      Full Name <span className="text-[#6D48C5]">*</span>
                    </label>
                    <input
                      id="enquiry-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={values.name}
                      onChange={e => updateField('name', e.target.value)}
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                      placeholder="Your full name"
                      className={`mt-1.5 min-h-[44px] w-full rounded-[8px] border bg-[#F7F6F2] px-3.5 py-2.5 text-base text-[#111114] placeholder:text-[#52525B]/70 focus:bg-[#FFFFFF] focus:outline-none sm:text-sm ${
                        fieldErrors.name
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-black/15 focus:border-[#6D48C5]'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p id="err-name" className="mt-1 text-xs font-medium text-red-700">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-email"
                      className="block text-xs font-semibold text-[#111114]"
                    >
                      Email Address <span className="text-[#6D48C5]">*</span>
                    </label>
                    <input
                      id="enquiry-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      required
                      autoComplete="email"
                      value={values.email}
                      onChange={e => updateField('email', e.target.value)}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                      placeholder="you@company.com"
                      className={`mt-1.5 min-h-[44px] w-full rounded-[8px] border bg-[#F7F6F2] px-3.5 py-2.5 text-base text-[#111114] placeholder:text-[#52525B]/70 focus:bg-[#FFFFFF] focus:outline-none sm:text-sm ${
                        fieldErrors.email
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-black/15 focus:border-[#6D48C5]'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="err-email" className="mt-1 text-xs font-medium text-red-700">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="enquiry-phone"
                      className="block text-xs font-semibold text-[#111114]"
                    >
                      Phone Number <span className="text-[#6D48C5]">*</span>
                    </label>
                    <input
                      id="enquiry-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      value={values.phone}
                      onChange={e => updateField('phone', e.target.value)}
                      aria-invalid={Boolean(fieldErrors.phone)}
                      aria-describedby={fieldErrors.phone ? 'err-phone' : undefined}
                      placeholder="+94 / +971 / International"
                      className={`mt-1.5 min-h-[44px] w-full rounded-[8px] border bg-[#F7F6F2] px-3.5 py-2.5 text-base text-[#111114] placeholder:text-[#52525B]/70 focus:bg-[#FFFFFF] focus:outline-none sm:text-sm ${
                        fieldErrors.phone
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-black/15 focus:border-[#6D48C5]'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p id="err-phone" className="mt-1 text-xs font-medium text-red-700">
                        {fieldErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="enquiry-interest"
                      className="block text-xs font-semibold text-[#111114]"
                    >
                      Course or Service Interested In <span className="text-[#6D48C5]">*</span>
                    </label>
                    <select
                      id="enquiry-interest"
                      name="interest"
                      required
                      value={values.interest}
                      onChange={e => updateField('interest', e.target.value)}
                      aria-invalid={Boolean(fieldErrors.interest)}
                      aria-describedby={fieldErrors.interest ? 'err-interest' : undefined}
                      className={`mt-1.5 min-h-[44px] w-full rounded-[8px] border bg-[#F7F6F2] px-3.5 py-2.5 text-base text-[#111114] focus:bg-[#FFFFFF] focus:outline-none sm:text-sm ${
                        fieldErrors.interest
                          ? 'border-red-600 focus:border-red-600'
                          : 'border-black/15 focus:border-[#6D48C5]'
                      }`}
                    >
                      <option value="">Select a course or service</option>
                      {INTEREST_OPTIONS.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.interest && (
                      <p id="err-interest" className="mt-1 text-xs font-medium text-red-700">
                        {fieldErrors.interest}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="enquiry-message"
                    className="block text-xs font-semibold text-[#111114]"
                  >
                    Message <span className="font-normal text-[#52525B]">(Optional)</span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    rows={4}
                    value={values.message}
                    onChange={e => updateField('message', e.target.value)}
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'err-message' : undefined}
                    placeholder="Optional — share your objectives, preferred course or service, and timeline."
                    className={`mt-1.5 w-full rounded-[8px] border bg-[#F7F6F2] px-3.5 py-3 text-base text-[#111114] placeholder:text-[#52525B]/70 focus:bg-[#FFFFFF] focus:outline-none sm:text-sm ${
                      fieldErrors.message
                        ? 'border-red-600 focus:border-red-600'
                        : 'border-black/15 focus:border-[#6D48C5]'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p id="err-message" className="mt-1 text-xs font-medium text-red-700">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <button
                    type="submit"
                    disabled={submission.status === 'submitting'}
                    aria-busy={submission.status === 'submitting'}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-[8px] bg-[#101010] px-6 py-3.5 text-sm font-semibold text-[#F7F6F2] transition-all hover:bg-[#23232B] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:rounded-[6px]"
                  >
                    {submission.status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#B69AFF]" aria-hidden="true" />
                        <span>Submitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <ArrowUpRight className="h-4 w-4 text-[#B69AFF]" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </div>

                {/* Accessible Status Feedback */}
                {submission.status !== 'idle' && submission.status !== 'submitting' && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-[8px] border p-4 text-sm ${
                      submission.status === 'error'
                        ? 'border-red-300 bg-red-50 text-red-900'
                        : submission.status === 'success'
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                        : 'border-[#6D48C5]/35 bg-[#F1ECFF] text-[#111114]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {submission.status === 'error' ? (
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" aria-hidden="true" />
                      ) : (
                        <CheckCircle2
                          className={`mt-0.5 h-5 w-5 shrink-0 ${
                            submission.status === 'success' ? 'text-emerald-700' : 'text-[#6D48C5]'
                          }`}
                          aria-hidden="true"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold">
                          {submission.status === 'error'
                            ? 'Action Required'
                            : submission.status === 'success'
                            ? 'Inquiry Received'
                            : 'Google Sheets Endpoint Needed'}
                        </p>
                        <p className="mt-1 leading-relaxed">{submission.message}</p>

                        {(submission.status === 'error' ||
                          submission.status === 'config-needed') && (
                          <div className="mt-3 flex flex-wrap gap-3">
                            <a
                              href={`mailto:${STUDIO_INFO.email}?subject=${encodeURIComponent(
                                `Project / Course Inquiry — ${values.interest || STUDIO_INFO.name}`
                              )}&body=${encodeURIComponent(
                                lastSummary || buildSummaryText(captureLeadContext())
                              )}`}
                              className="inline-flex min-h-[40px] items-center gap-2 rounded-[6px] bg-[#101010] px-4 py-2 text-xs font-semibold text-[#F7F6F2] transition-colors hover:bg-[#23232B]"
                            >
                              <Mail className="h-3.5 w-3.5 text-[#B69AFF]" aria-hidden="true" />
                              Send via Email App
                            </a>
                            <button
                              type="button"
                              onClick={handleCopySummary}
                              className="inline-flex min-h-[40px] items-center gap-2 rounded-[6px] border border-black/15 bg-[#FFFFFF] px-4 py-2 text-xs font-semibold text-[#111114] transition-colors hover:border-[#6D48C5]"
                            >
                              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                              {copied ? 'Copied Summary' : 'Copy Inquiry Summary'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Direct Studio Channels & Presence */}
            <aside className="lg:col-span-5">
              <div className="rounded-[10px] border border-white/12 bg-[#101010] p-5 text-[#F7F6F2] sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <MushiPrimaryLogo
                    variant="dark"
                    size="md"
                    showIcon={false}
                    showTagline
                  />
                  <MushiGrowthIcon
                    variant="lavender"
                    className="h-10 w-10 shrink-0"
                  />
                </div>

                <div className="mt-5 space-y-4 border-t border-white/12 pt-4">
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-[#B4B4BC]">
                      Email Contact
                    </p>
                    <a
                      href={`mailto:${STUDIO_INFO.email}`}
                      className="mt-1 inline-block text-sm font-medium text-[#B69AFF] hover:underline"
                    >
                      {STUDIO_INFO.email}
                    </a>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold tracking-wide text-[#B4B4BC]">
                      Phone / WhatsApp
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <a
                        href={`tel:${STUDIO_INFO.phoneRaw}`}
                        className="tabular-nums text-sm font-medium text-[#F7F6F2] hover:text-[#B69AFF]"
                      >
                        {STUDIO_INFO.phone}
                      </a>
                      <a
                        href={STUDIO_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#B69AFF] hover:underline"
                      >
                        Chat on WhatsApp
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold tracking-wide text-[#B4B4BC]">
                      Social Media Channels
                    </p>
                    <ul className="mt-2 space-y-2 text-sm">
                      {STUDIO_INFO.socialHandles.map(social => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-4 text-[#F7F6F2] transition-colors hover:text-[#B69AFF]"
                          >
                            <span className="font-medium">{social.label}</span>
                            <span className="inline-flex items-center gap-1 text-xs text-[#B69AFF] group-hover:underline">
                              {social.handle}
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold tracking-wide text-[#B4B4BC]">
                      Markets &amp; Reach
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#B69AFF]">
                      {STUDIO_INFO.locations}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#B4B4BC]">
                      Supporting ambitious businesses across Colombo, Dubai, the wider UAE, and international remote time zones.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
