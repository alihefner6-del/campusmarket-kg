import React from 'react';
import { GraduationCap } from 'lucide-react';

export const BrandMark: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'sm' }) => {
  const dim = size === 'sm' ? 'w-7 h-7 rounded-lg' : 'w-9 h-9 rounded-xl';
  const iconDim = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div
      className={`${dim} bg-gradient-to-br from-[#4B3CE8] via-[#6C5CE7] to-[#FF5A36] flex items-center justify-center text-white shadow-sm shrink-0`}
      aria-hidden="true"
    >
      <GraduationCap className={iconDim} strokeWidth={2.2} />
    </div>
  );
};
