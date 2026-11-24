import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/wattsData';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Transformations', href: '#transformations' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#quote' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="relative z-40 w-full bg-[#141619] border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-4 xl:gap-8">
        {/* Brand Logo Zone */}
        <a
          href="#home"
          className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] rounded-sm"
          aria-label="Watts Renovations — Home"
        >
          {logoFailed ? (
            <span className="font-display font-bold text-xl tracking-tight text-white whitespace-nowrap">
              Watts Renovations
            </span>
          ) : (
            <img
              src={COMPANY_INFO.logoUrl}
              alt="Watts Renovations official logo"
              referrerPolicy="no-referrer"
              fetchPriority="high"
              onError={() => setLogoFailed(true)}
              className="h-14 sm:h-16 w-auto object-contain rounded-sm bg-white p-1"
            />
          )}
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-neutral-300"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 py-1 text-neutral-200 hover:text-white relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-[#F59E0B] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F59E0B] rounded-xs"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Primary Action & Mobile Menu Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#quote"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#92400E] rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
          >
            Request a Quote
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-neutral-200 hover:text-white hover:bg-neutral-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="lg:hidden bg-[#141619] border-t border-neutral-800 px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="block px-3 py-3 text-base font-medium text-neutral-200 hover:text-white hover:bg-neutral-800/70 rounded-md transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-neutral-800">
            <a
              href="#quote"
              onClick={handleLinkClick}
              className="flex w-full items-center justify-center px-5 py-3 text-base font-semibold text-white bg-[#B45309] hover:bg-[#92400E] rounded-md transition-colors"
            >
              Request a Quote
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
