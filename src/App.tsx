import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Hammer,
  Ruler,
  MessageSquare,
  SlidersHorizontal,
  ShieldCheck,
  Smile,
  Check,
  Quote,
} from 'lucide-react';
import {
  ABOUT_IMAGE,
  COMPANY_INFO,
  HERO_IMAGE,
  SERVICES,
  TESTIMONIALS,
  TRANSFORMATIONS,
  WHY_CHOOSE_US,
  type ServiceId,
  type WhyChooseUsItem,
} from './data/wattsData';
import { Navbar } from './components/Navbar';
import { ResilientImage } from './components/ResilientImage';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ProjectsGallery } from './components/ProjectsGallery';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';

const ABOUT_COMMITMENTS = [
  'Quality workmanship across every stage',
  'Careful attention to detail from start to finish',
  'Reliable, clear and friendly service',
  'Understanding each customer’s requirements',
  'Practical and attractive outdoor results',
  'Clean, swept and organised working areas',
];

function BenefitIcon({ name }: { name: WhyChooseUsItem['iconName'] }) {
  const iconProps = {
    className:
      'w-5 h-5 text-[#F59E0B] transition-transform duration-300 group-hover:scale-110',
    'aria-hidden': true as const,
  };
  switch (name) {
    case 'hammer':
      return <Hammer {...iconProps} />;
    case 'ruler':
      return <Ruler {...iconProps} />;
    case 'message':
      return <MessageSquare {...iconProps} />;
    case 'sliders':
      return <SlidersHorizontal {...iconProps} />;
    case 'shield':
      return <ShieldCheck {...iconProps} />;
    case 'smile':
      return <Smile {...iconProps} />;
  }
}

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>('Groundworks');

  const handleEnquireService = (serviceId: ServiceId) => {
    setSelectedService(serviceId);
    const quoteEl = document.getElementById('quote');
    if (quoteEl) {
      quoteEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F6] text-[#17191C]">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden bg-[#141619] text-white min-h-[560px] lg:min-h-[640px] flex items-center"
        >
          {/* Background Photography with subtle cinematic entrance */}
          <motion.div
            initial={{ scale: 1.07, opacity: 0.75 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <ResilientImage
              src={HERO_IMAGE}
              alt="Newly completed charcoal block-paved driveway and stone pathway outside a Northamptonshire home"
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Dark Measured Scrim for WCAG AA Contrast */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#0E1012]/92 via-[#0E1012]/78 to-[#0E1012]/45"
          />

          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-28">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs sm:text-sm font-semibold tracking-wider text-[#F59E0B] uppercase"
              >
                Your local renovation &amp; groundwork specialists · {COMPANY_INFO.region}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 text-[clamp(2.25rem,4.4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-white text-balance"
              >
                Quality Groundworks &amp; Renovations, Built to Last.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-base sm:text-lg text-neutral-200 leading-relaxed max-w-xl"
              >
                From professional groundworks and drainage to beautifully finished driveways, patios and fencing, Watts Renovations delivers reliable workmanship and quality results for every project.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#quote"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#B45309] hover:bg-[#92400E] rounded-md transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#projects"
                  className="inline-flex items-center justify-center px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-xs rounded-md transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                >
                  Explore Our Work
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. About Us Section */}
        <section id="about" className="py-20 sm:py-24 bg-white border-b border-neutral-200 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
              {/* Project Photograph Column */}
              <motion.div
                initial={{ opacity: 0, x: -28, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6"
              >
                <div className="h-full min-h-[320px] sm:min-h-[420px] overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100">
                  <ResilientImage
                    src={ABOUT_IMAGE}
                    alt="Precision kerbstone edging, taut string lines and compacted aggregate sub-base on a Watts Renovations groundwork site"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
              </motion.div>

              {/* Copy Column */}
              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-6 flex flex-col justify-center"
              >
                <p className="text-sm font-semibold text-[#B45309] tracking-wide">
                  About Us · {COMPANY_INFO.region}
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
                  About Watts Renovations
                </h2>
                <p className="mt-3 text-lg font-semibold text-neutral-700">
                  Quality Workmanship. Reliable Service. Results That Last.
                </p>

                <div className="mt-5 space-y-4 text-base text-neutral-600 leading-relaxed">
                  <p>
                    Watts Renovations is a dedicated renovation and groundwork contractor serving homeowners and properties across Northamptonshire and surrounding areas. Whether preparing the ground for a new outdoor space or completing the final paving and boundary work, we focus on doing every stage properly.
                  </p>
                  <p>
                    We take the time to understand what each customer wants from their property, offering straightforward advice and practical solutions tailored to the site. From careful excavation and sub-base preparation through to sweeping down and tidying up at the end of the job, our team works cleanly, methodically and with respect for your home.
                  </p>
                </div>

                <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-6 border-t border-neutral-200">
                  {ABOUT_COMMITMENTS.map((item, idx) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.12 + idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-start gap-2.5 text-sm text-neutral-700"
                    >
                      <Check
                        className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-8">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="#quote"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#17191C] hover:bg-neutral-800 rounded-md transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Our Services Section */}
        <section id="services" className="py-20 sm:py-24 bg-[#F8F8F6] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold text-[#B45309] tracking-wide">
                What We Do
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
                Our Services
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
                From essential groundwork to the finishing touches, we provide a range of outdoor renovation and property improvement services tailored to your requirements.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {SERVICES.map((service, idx) => (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: (idx % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -5 }}
                  className="group bg-white border border-neutral-200 rounded-lg overflow-hidden flex flex-col shadow-xs hover:shadow-md hover:border-neutral-300 transition-shadow duration-200"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-100 border-b border-neutral-200">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.05]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-xs font-semibold text-[#B45309] tabular-nums">
                        {service.number}.
                      </span>
                      <h3 className="text-xl font-bold text-neutral-900">
                        {service.title}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm sm:text-[15px] text-neutral-600 leading-relaxed">
                      {service.description}
                    </p>

                    <ul className="mt-4 pt-4 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                      {service.highlights.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="w-1 h-1 rounded-full bg-[#B45309] shrink-0"
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-2">
                      <button
                        type="button"
                        onClick={() => handleEnquireService(service.id)}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#B45309] hover:text-[#92400E] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B45309] rounded-xs"
                      >
                        <span>Enquire about {service.title}</span>
                        <ArrowRight
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Before & After Transformation Section */}
        <section
          id="transformations"
          className="py-20 sm:py-24 bg-white border-y border-neutral-200 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6"
            >
              <div className="max-w-2xl">
                <p className="text-sm font-semibold text-[#B45309] tracking-wide">
                  Before &amp; After Comparisons
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
                  The Transformation Speaks for Itself
                </h2>
                <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
                  See the difference quality workmanship and careful attention to detail can make. Explore some of our before-and-after project transformations.
                </p>
              </div>
              <p className="text-sm font-medium text-neutral-500">
                Drag any slider left or right to compare before and after photographs.
              </p>
            </motion.div>

            {/* 2 Columns x 2 Rows on Desktop */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {TRANSFORMATIONS.map((item, idx) => (
                <BeforeAfterSlider key={item.id} item={item} index={idx} />
              ))}
            </div>
          </div>
        </section>

        {/* 5. Why Choose Us Section */}
        <section className="py-20 sm:py-24 bg-[#1B1E23] text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold text-[#F59E0B] tracking-wide">
                Our Standards
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                Why Choose Watts Renovations?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-300 leading-relaxed">
                Choosing the right contractor makes all the difference. We focus on delivering quality results through careful planning, practical solutions and attention to every detail.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {WHY_CHOOSE_US.map((benefit, idx) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: (idx % 3) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -4 }}
                  className="group bg-[#23272E] border border-neutral-700/70 rounded-lg p-6 sm:p-7 transition-colors duration-200 hover:border-[#F59E0B]/50"
                >
                  <div className="w-11 h-11 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                    <BenefitIcon name={benefit.iconName} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-[15px] text-neutral-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Recent Projects / Image Gallery */}
        <ProjectsGallery />

        {/* 7. Customer Testimonials Section */}
        <section
          id="testimonials"
          className="py-20 sm:py-24 bg-white border-t border-neutral-200 overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl"
            >
              <p className="text-sm font-semibold text-[#B45309] tracking-wide">
                Customer Feedback
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
                We value the feedback we receive from customers. Here&apos;s what people have said about their experience with Watts Renovations.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              {TESTIMONIALS.map((item, idx) => (
                <motion.figure
                  key={item.author}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -3 }}
                  className="bg-[#F8F8F6] border border-neutral-200 rounded-lg p-7 sm:p-9 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow duration-200"
                >
                  <div>
                    <Quote
                      className="w-8 h-8 text-[#B45309]/40 mb-4"
                      aria-hidden="true"
                    />
                    <blockquote className="text-base sm:text-lg text-neutral-800 leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>
                  <figcaption className="mt-6 pt-5 border-t border-neutral-200 text-base font-bold text-neutral-900">
                    {item.author}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Request a Quote Section */}
        <QuoteSection selectedService={selectedService} />
      </main>

      <Footer />
    </div>
  );
}
