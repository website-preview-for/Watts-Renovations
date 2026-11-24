import { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronsLeftRight } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import type { TransformationItem } from '../data/wattsData';

interface BeforeAfterSliderProps {
  item: TransformationItem;
  index?: number;
}

export function BeforeAfterSlider({ item, index = 0 }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPercent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(100, Math.max(0, rawPercent));
    setPosition(clamped);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePositionFromClientX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((prev) => Math.max(0, prev - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((prev) => Math.min(100, prev + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setPosition(100);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
        role="slider"
        tabIndex={0}
        aria-label={`Compare before and after images for ${item.title}. Use left and right arrow keys or drag to adjust split.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        style={{ touchAction: 'pan-y' }}
        className="relative w-full aspect-[4/3] select-none overflow-hidden cursor-ew-resize bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B45309]"
      >
        {/* Base Layer: AFTER image (full container) */}
        <ResilientImage
          src={item.afterUrl}
          alt={item.afterAlt}
          loading="eager"
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />

        {/* Overlay Layer: BEFORE image clipped cleanly without resizing */}
        <div
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          className="absolute inset-0 pointer-events-none select-none"
        >
          <ResilientImage
            src={item.beforeUrl}
            alt={item.beforeAlt}
            loading="eager"
            decoding="async"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          />
        </div>

        {/* BEFORE & AFTER Labels */}
        <span
          aria-hidden="true"
          className="absolute top-3.5 left-3.5 z-10 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-neutral-950/80 text-white rounded-sm backdrop-blur-xs pointer-events-none"
        >
          Before
        </span>
        <span
          aria-hidden="true"
          className="absolute top-3.5 right-3.5 z-10 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase bg-[#B45309]/95 text-white rounded-sm backdrop-blur-xs pointer-events-none"
        >
          After
        </span>

        {/* Vertical Divider Line & Draggable Handle */}
        <div
          aria-hidden="true"
          style={{ left: `${position}%` }}
          className="absolute inset-y-0 -translate-x-1/2 z-20 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="w-[2px] h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.45)]" />
          <div
            className={`absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-neutral-900 border-2 border-[#B45309] shadow-lg flex items-center justify-center transition-transform duration-150 ${
              isDragging ? 'scale-110' : 'scale-100'
            }`}
          >
            <ChevronsLeftRight className="w-5 h-5 text-[#B45309]" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
