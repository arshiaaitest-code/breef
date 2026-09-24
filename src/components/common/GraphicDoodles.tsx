import React from 'react';

/**
 * Hand-drawn, pop-editorial & halftone graphic accents inspired by contemporary
 * cultural publications and dynamic art direction (e.g., The Art 24 / Pop Art spirit).
 */

export const DoodleArrow: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-16 h-12',
  color = '#FF4A3D',
}) => (
  <svg
    viewBox="0 0 120 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M10 45 C 35 15, 75 10, 105 32"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M85 24 L 107 33 L 95 48"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const DoodleCircleHighlight: React.FC<{ className?: string; color?: string }> = ({
  className = 'absolute -inset-2',
  color = '#FF4A3D',
}) => (
  <svg
    viewBox="0 0 200 70"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none ${className}`}
    preserveAspectRatio="none"
  >
    <path
      d="M 12,35 C 10,12 80,6 160,8 C 190,9 198,25 192,44 C 185,60 120,68 45,66 C 16,65 4,50 8,30"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const DoodleSquiggle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-24 h-4',
  color = '#FFC72C',
}) => (
  <svg
    viewBox="0 0 100 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M2 10 Q 14 2, 26 10 T 50 10 T 74 10 T 98 10"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

export const DoodleStar: React.FC<{ className?: string; color?: string; fill?: string }> = ({
  className = 'w-6 h-6',
  color = '#141416',
  fill = '#FFC72C',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block ${className}`}
  >
    <path
      d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
      fill={fill}
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Halftone Ben-Day Dot Pattern (Roy Lichtenstein / Warhol style screenprint)
 */
export const HalftoneDotMatrix: React.FC<{
  className?: string;
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
  fade?: 'none' | 'right' | 'left' | 'bottom';
}> = ({
  className = 'w-32 h-20',
  dotColor = '#141416',
  dotSize = 2,
  spacing = 8,
  fade = 'none',
}) => {
  const patternId = React.useId();
  const maskId = React.useId();

  return (
    <svg className={`pointer-events-none ${className}`} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={spacing / 2} cy={spacing / 2} r={dotSize} fill={dotColor} />
        </pattern>
        {fade !== 'none' && (
          <linearGradient
            id={maskId}
            x1={fade === 'right' ? '0' : fade === 'left' ? '1' : '0'}
            y1={fade === 'bottom' ? '0' : '0'}
            x2={fade === 'right' ? '1' : fade === 'left' ? '0' : '0'}
            y2={fade === 'bottom' ? '1' : '0'}
          >
            <stop offset="0%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        )}
      </defs>
      <rect
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
        mask={fade !== 'none' ? `url(#${maskId})` : undefined}
      />
    </svg>
  );
};

/**
 * Pop Art Halftone Stamp / Starburst Badge
 */
export const HalftoneBadge: React.FC<{
  text: string;
  subtext?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}> = ({
  text,
  subtext,
  bgColor = '#FFC72C',
  textColor = '#141416',
  className = '',
}) => (
  <div
    className={`relative inline-flex flex-col items-center justify-center p-3 rounded-2xl border-3 border-[#141416] shadow-[4px_4px_0px_#141416] overflow-hidden select-none ${className}`}
    style={{ backgroundColor: bgColor, color: textColor }}
  >
    {/* Subtle Halftone Ben-Day dot layer in background */}
    <div className="absolute inset-0 halftone-screen-md opacity-25 pointer-events-none" />
    <span className="relative z-10 font-black text-xs uppercase tracking-wider font-display">
      {text}
    </span>
    {subtext && (
      <span className="relative z-10 text-[9px] font-mono font-bold tracking-tight opacity-80 mt-0.5">
        {subtext}
      </span>
    )}
  </div>
);

export const EditorialBarcode: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex flex-col items-center select-none ${className}`}>
    <div className="flex items-center gap-[2px] h-7">
      <span className="w-[3px] h-full bg-[#141416]" />
      <span className="w-[1.5px] h-full bg-[#141416]" />
      <span className="w-[4px] h-full bg-[#141416]" />
      <span className="w-[1px] h-full bg-[#141416]" />
      <span className="w-[2.5px] h-full bg-[#141416]" />
      <span className="w-[1px] h-full bg-[#141416]" />
      <span className="w-[3.5px] h-full bg-[#141416]" />
      <span className="w-[2px] h-full bg-[#141416]" />
      <span className="w-[1px] h-full bg-[#141416]" />
      <span className="w-[4.5px] h-full bg-[#141416]" />
      <span className="w-[2px] h-full bg-[#141416]" />
      <span className="w-[1px] h-full bg-[#141416]" />
      <span className="w-[3px] h-full bg-[#141416]" />
      <span className="w-[1.5px] h-full bg-[#141416]" />
      <span className="w-[2.5px] h-full bg-[#141416]" />
    </div>
    <span className="text-[8px] font-mono tracking-widest text-[#141416]/75 font-bold mt-0.5">
      SPEC 2026-ATELIER
    </span>
  </div>
);

