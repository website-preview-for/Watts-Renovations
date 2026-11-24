import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Phone, Mail, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, SERVICES } from '../data/wattsData';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Recent Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#quote' },
];

export function Footer() {
  const [logoFailed, setLogoFailed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E1012] text-neutral-300 border-t border-neutral-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo, intro & Facebook */}
          <div className="space-y-4">
            <a
              href="#home"
              className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] rounded-sm"
            >
              {logoFailed ? (
                <span className="font-display font-bold text-xl text-white">
                  Watts Renovations
                </span>
              ) : (
                <img
                  src={COMPANY_INFO.logoUrl}
                  alt="Watts Renovations official logo"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoFailed(true)}
                  className="h-14 sm:h-16 w-auto object-contain rounded-sm bg-white p-1"
                />
              )}
            </a>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Quality groundworks, drainage, driveways, patios, water supplies and fencing across {COMPANY_INFO.region}.
            </p>
            <a
              href={COMPANY_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-neutral-200 hover:text-[#F59E0B] transition-colors"
            >
              <span>Follow us on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide mb-4">
              Contact Information
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={COMPANY_INFO.phoneHref}
                  className="inline-flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                  <span>{COMPANY_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={COMPANY_INFO.emailHref}
                  className="inline-flex items-center gap-2.5 text-neutral-300 hover:text-white transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" aria-hidden="true" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
              </li>
              <li className="pt-1 text-neutral-400">
                Serving {COMPANY_INFO.region}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-neutral-800/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 text-center sm:text-left">
            Copyright &copy; 2026 Watts Renovations. All Rights Reserved.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-md transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
          </button>
        </div>
      </motion.div>
    </footer>
  );
}
