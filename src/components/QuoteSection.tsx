import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, AlertCircle, CheckCircle2, Info, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, type ServiceId } from '../data/wattsData';
import { submitQuoteRequest, type QuoteFormPayload } from '../services/quoteService';

interface QuoteSectionProps {
  selectedService: ServiceId;
}

type FormErrors = Partial<Record<keyof QuoteFormPayload, string>>;

const SERVICE_OPTIONS: ServiceId[] = [
  'Groundworks',
  'Drainage',
  'Driveways',
  'Patios',
  'Water Supplies',
  'Fencing',
  'Other',
];

export function QuoteSection({ selectedService }: QuoteSectionProps) {
  const [form, setForm] = useState<QuoteFormPayload>({
    name: '',
    phone: '',
    email: '',
    service: selectedService,
    location: '',
    details: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<{
    type: 'success' | 'integration' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    setForm((prev) => ({ ...prev, service: selectedService }));
  }, [selectedService]);

  const validate = (data: QuoteFormPayload): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!data.name.trim() || data.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }

    const cleanedPhone = data.phone.replace(/[\s()-]/g, '');
    if (!cleanedPhone || !/^\+?[0-9]{9,15}$/.test(cleanedPhone)) {
      nextErrors.phone = 'Please enter a valid phone number.';
    }

    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!data.details.trim() || data.details.trim().length < 10) {
      nextErrors.details = 'Please tell us a little about your project requirements.';
    }

    return nextErrors;
  };

  const handleChange = <K extends keyof QuoteFormPayload>(
    field: K,
    value: QuoteFormPayload[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitState) {
      setSubmitState(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitState({
        type: 'error',
        message: 'Please review the highlighted fields before submitting.',
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitState(null);

    try {
      const result = await submitQuoteRequest(form);
      if (result.delivered) {
        setSubmitState({ type: 'success', message: result.message });
        setForm({
          name: '',
          phone: '',
          email: '',
          service: selectedService,
          location: '',
          details: '',
        });
      } else {
        setSubmitState({ type: 'integration', message: result.message });
      }
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Unable to submit your request right now. Please contact us by phone or email.';
      setSubmitState({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`Quote Request: ${form.service} — ${form.name || 'New Enquiry'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService Required: ${form.service}\nLocation / Postcode: ${form.location || 'Not provided'}\n\nProject Details:\n${form.details}`,
    );
    return `${COMPANY_INFO.emailHref}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="quote" className="py-20 sm:py-24 bg-[#141619] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Contact Details Side */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-sm font-semibold text-[#F59E0B] tracking-wide">
              Request a Quote · {COMPANY_INFO.region}
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
              Let&apos;s Talk About Your Project
            </h2>
            <p className="mt-4 text-base text-neutral-300 leading-relaxed">
              Whether you&apos;re planning new groundworks, improving your driveway or transforming your outdoor space, we&apos;d love to hear about your plans. Get in touch with Watts Renovations to discuss your requirements.
            </p>

            <div className="mt-10 border-t border-neutral-800 pt-8 space-y-6">
              <div>
                <span className="block text-xs font-medium text-neutral-400">
                  Phone
                </span>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="mt-1.5 inline-flex items-center gap-2.5 text-lg font-semibold text-white hover:text-[#F59E0B] transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </a>
              </div>

              <div>
                <span className="block text-xs font-medium text-neutral-400">
                  Email
                </span>
                <a
                  href={COMPANY_INFO.emailHref}
                  className="mt-1.5 inline-flex items-center gap-2.5 text-lg font-semibold text-white hover:text-[#F59E0B] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </div>

              <div>
                <span className="block text-xs font-medium text-neutral-400">
                  Facebook
                </span>
                <a
                  href={COMPANY_INFO.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-2 text-base font-medium text-neutral-200 hover:text-[#F59E0B] transition-colors"
                >
                  <span>Watts Renovations on Facebook</span>
                  <ExternalLink className="w-4 h-4 text-neutral-400" aria-hidden="true" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Enquiry Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white text-neutral-900 rounded-lg p-6 sm:p-8 lg:p-10 border border-neutral-200 shadow-lg"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Your Name */}
                <div>
                  <label
                    htmlFor="quote-name"
                    className="block text-sm font-semibold text-neutral-800 mb-2"
                  >
                    Your Name <span className="text-[#B45309]">*</span>
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'quote-name-error' : undefined}
                    placeholder="e.g. John Smith"
                    className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#B45309]/25 focus:border-[#B45309] transition-colors ${
                      errors.name ? 'border-red-600' : 'border-neutral-300'
                    }`}
                  />
                  {errors.name && (
                    <p id="quote-name-error" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="quote-phone"
                    className="block text-sm font-semibold text-neutral-800 mb-2"
                  >
                    Phone Number <span className="text-[#B45309]">*</span>
                  </label>
                  <input
                    id="quote-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? 'quote-phone-error' : undefined}
                    placeholder="e.g. 07359 184307"
                    className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#B45309]/25 focus:border-[#B45309] transition-colors ${
                      errors.phone ? 'border-red-600' : 'border-neutral-300'
                    }`}
                  />
                  {errors.phone && (
                    <p id="quote-phone-error" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="quote-email"
                    className="block text-sm font-semibold text-neutral-800 mb-2"
                  >
                    Email Address <span className="text-[#B45309]">*</span>
                  </label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'quote-email-error' : undefined}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#B45309]/25 focus:border-[#B45309] transition-colors ${
                      errors.email ? 'border-red-600' : 'border-neutral-300'
                    }`}
                  />
                  {errors.email && (
                    <p id="quote-email-error" className="mt-1.5 text-xs font-medium text-red-700">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service Required */}
                <div>
                  <label
                    htmlFor="quote-service"
                    className="block text-sm font-semibold text-neutral-800 mb-2"
                  >
                    Service Required
                  </label>
                  <select
                    id="quote-service"
                    name="service"
                    value={form.service}
                    onChange={(e) => handleChange('service', e.target.value as ServiceId)}
                    className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-300 rounded-md text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#B45309]/25 focus:border-[#B45309] transition-colors"
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Project Location / Postcode */}
              <div>
                <label
                  htmlFor="quote-location"
                  className="block text-sm font-semibold text-neutral-800 mb-2"
                >
                  Project Location / Postcode
                </label>
                <input
                  id="quote-location"
                  name="location"
                  type="text"
                  autoComplete="postal-code"
                  value={form.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="e.g. Northampton, Kettering, NN1"
                  className="w-full px-4 py-3 text-sm bg-neutral-50 border border-neutral-300 rounded-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#B45309]/25 focus:border-[#B45309] transition-colors"
                />
              </div>

              {/* Full-width Project Details */}
              <div>
                <label
                  htmlFor="quote-details"
                  className="block text-sm font-semibold text-neutral-800 mb-2"
                >
                  Project Details <span className="text-[#B45309]">*</span>
                </label>
                <textarea
                  id="quote-details"
                  name="details"
                  rows={4}
                  required
                  value={form.details}
                  onChange={(e) => handleChange('details', e.target.value)}
                  aria-invalid={Boolean(errors.details)}
                  aria-describedby={errors.details ? 'quote-details-error' : undefined}
                  placeholder="Describe the work you are planning, approximate dimensions or areas, and any preferred timescales."
                  className={`w-full px-4 py-3 text-sm bg-neutral-50 border rounded-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#B45309]/25 focus:border-[#B45309] transition-colors ${
                    errors.details ? 'border-red-600' : 'border-neutral-300'
                  }`}
                />
                {errors.details && (
                  <p id="quote-details-error" className="mt-1.5 text-xs font-medium text-red-700">
                    {errors.details}
                  </p>
                )}
              </div>

              {/* Form Submission Status Messages */}
              {submitState && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`p-4 rounded-md border text-sm flex items-start gap-3 ${
                    submitState.type === 'success'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : submitState.type === 'integration'
                        ? 'bg-amber-50 border-amber-200 text-amber-950'
                        : 'bg-red-50 border-red-200 text-red-900'
                  }`}
                >
                  {submitState.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : submitState.type === 'integration' ? (
                    <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div className="space-y-2">
                    <p className="leading-relaxed">{submitState.message}</p>
                    {submitState.type === 'integration' && (
                      <div className="flex flex-wrap gap-3 pt-1">
                        <a
                          href={buildMailtoHref()}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#92400E] underline underline-offset-2 hover:text-neutral-900"
                        >
                          Open pre-filled email in your mail app
                        </a>
                        <a
                          href={COMPANY_INFO.phoneHref}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#92400E] underline underline-offset-2 hover:text-neutral-900"
                        >
                          Call {COMPANY_INFO.phoneDisplay}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#92400E] disabled:opacity-60 rounded-md transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
                >
                  {isSubmitting ? 'Validating...' : 'Submit Quote Request'}
                </button>
                <p className="text-xs text-neutral-500">
                  Fields marked with * are required.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
