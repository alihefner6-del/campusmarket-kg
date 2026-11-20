import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt, className = '' }) => {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EEF0FF] to-[#E2E6F5] text-[#4B3CE8] p-3 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Package className="w-6 h-6 mb-1 opacity-70" />
        <span className="text-[11px] font-medium leading-tight line-clamp-2 opacity-80">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setErrored(true)}
      className={className}
    />
  );
};
