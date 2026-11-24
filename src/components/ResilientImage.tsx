import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  fallbackLabel?: string;
  draggable?: boolean;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  fallbackLabel,
  draggable = true,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-850 to-neutral-900 text-neutral-300 p-4 text-center ${className}`}
      >
        <ImageOff className="w-6 h-6 text-[#D97706] mb-2 shrink-0" aria-hidden="true" />
        <span className="text-xs font-medium text-neutral-300 line-clamp-2">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding={decoding}
      fetchPriority={fetchPriority}
      referrerPolicy="no-referrer"
      draggable={draggable}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      }`}
    />
  );
}
