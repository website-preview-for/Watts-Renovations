import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X, ArrowDown } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/wattsData';
import { ResilientImage } from './ResilientImage';

export function ProjectsGallery() {
  const [visibleCount, setVisibleCount] = useState(9);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleImages = GALLERY_IMAGES.slice(0, visibleCount);
  const hasMore = visibleCount < GALLERY_IMAGES.length;

  // Warm browser cache for remaining project photos (10-13) after mount so Load More and Lightbox feel instant
  useEffect(() => {
    const timer = window.setTimeout(() => {
      GALLERY_IMAGES.slice(9).forEach((item) => {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.decoding = 'async';
        img.src = item.url;
      });
    }, 300);
    return () => window.clearTimeout(timer);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(GALLERY_IMAGES.length, prev + 3));
  };

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const showPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1;
    });
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === null) return null;
      return prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1;
    });
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeIndex, closeLightbox, showPrev, showNext]);

  return (
    <section id="projects" className="py-20 sm:py-24 bg-[#F8F8F6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold text-[#B45309] tracking-wide">
            Portfolio · Northamptonshire
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 text-balance">
            Our Recent Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed">
            Take a look at some of our recent work and see the quality, care and attention we bring to every project.
          </p>
        </motion.div>

        {/* Responsive 3x3 -> 13 image grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleImages.map((image, idx) => (
            <motion.button
              key={image.id}
              type="button"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.45,
                delay: (idx % 3) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -4 }}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View larger photograph: ${image.alt}`}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-200 border border-neutral-200/80 text-left shadow-xs hover:shadow-md transition-shadow duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
            >
              <ResilientImage
                src={image.url}
                alt={image.alt}
                loading="eager"
                decoding="async"
                fetchPriority={idx < 3 ? 'high' : 'auto'}
                className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/30 transition-colors duration-200 flex items-end justify-end p-3.5"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-neutral-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Expand className="w-4 h-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Centred Load More OR Request a Quote replacement */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex justify-center"
        >
          {hasMore ? (
            <button
              type="button"
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold text-neutral-900 bg-white border border-neutral-300 hover:border-neutral-900 hover:bg-neutral-50 rounded-md transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
            >
              <span>Load More</span>
              <ArrowDown className="w-4 h-4 text-[#B45309]" aria-hidden="true" />
            </button>
          ) : (
            <a
              href="#quote"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white bg-[#B45309] hover:bg-[#92400E] rounded-md transition-colors duration-200 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
            >
              Request a Quote
            </a>
          )}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Project photograph lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-neutral-950/92 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col items-center"
            >
              {/* Top Bar inside Lightbox */}
              <div className="w-full flex items-center justify-between text-neutral-200 mb-3">
                <span className="text-sm font-medium tabular-nums">
                  {activeIndex + 1} / {GALLERY_IMAGES.length}
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  aria-label="Close lightbox"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-neutral-800/80 hover:bg-neutral-700 text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Photo Frame */}
              <div className="relative w-full flex items-center justify-center">
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous project image"
                  className="absolute left-2 sm:-left-14 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-neutral-900/85 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="max-h-[78vh] w-full overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                  <ResilientImage
                    src={GALLERY_IMAGES[activeIndex].url}
                    alt={GALLERY_IMAGES[activeIndex].alt}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="max-h-[78vh] w-auto max-w-full object-contain"
                  />
                </div>

                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next project image"
                  className="absolute right-2 sm:-right-14 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full bg-neutral-900/85 hover:bg-neutral-800 text-white border border-neutral-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
