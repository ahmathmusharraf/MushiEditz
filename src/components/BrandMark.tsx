interface MushiGrowthIconProps {
  variant?: 'dark' | 'lavender' | 'light';
  className?: string;
}

/**
 * Hand-coded geometric brand icon for Mushi Digital Growth Studio.
 * Combines an architectural "M" monogram with an ascending growth spire and peak node.
 */
export function MushiGrowthIcon({
  variant = 'dark',
  className = 'h-10 w-10',
}: MushiGrowthIconProps) {
  const frameFill =
    variant === 'lavender'
      ? '#B69AFF'
      : variant === 'light'
      ? '#FFFFFF'
      : '#16161B';

  const frameStroke =
    variant === 'lavender'
      ? 'rgba(16, 16, 16, 0.12)'
      : variant === 'light'
      ? 'rgba(16, 16, 16, 0.14)'
      : 'rgba(255, 255, 255, 0.16)';

  const primaryInk = variant === 'dark' ? '#F7F6F2' : '#101010';
  const accentInk =
    variant === 'lavender'
      ? '#FFFFFF'
      : variant === 'light'
      ? '#6D48C5'
      : '#B69AFF';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Mushi Digital Growth Studio mark"
      className={className}
    >
      {/* Architectural rounded frame */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="9"
        fill={frameFill}
        stroke={frameStroke}
        strokeWidth="1.25"
      />

      {/* Left structural pillar & center valley of the "M" */}
      <path
        d="M9.5 29.5V12H13.6L20 21.6V27L13.1 16.9V29.5H9.5Z"
        fill={primaryInk}
      />

      {/* Right ascending growth spire of the "M" */}
      <path
        d="M20 21.6L26.4 12H30.5V29.5H26.9V16.9L20 27V21.6Z"
        fill={accentInk}
      />

      {/* Precision peak dot above the growth spire */}
      <circle cx="28.7" cy="9" r="1.8" fill={accentInk} />
    </svg>
  );
}

interface MushiPrimaryLogoProps {
  variant?: 'dark' | 'light';
  iconVariant?: 'dark' | 'lavender' | 'light';
  showIcon?: boolean;
  showTagline?: boolean;
  hideTaglineOnMobile?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Pure-code horizontal brand lockup for Mushi Digital Growth Studio.
 * Editable directly via React/Tailwind tokens without external SVG files or traced paths.
 */
export function MushiPrimaryLogo({
  variant = 'dark',
  iconVariant,
  showIcon = true,
  showTagline = true,
  hideTaglineOnMobile = false,
  size = 'md',
  className = '',
}: MushiPrimaryLogoProps) {
  const wordColor = variant === 'dark' ? 'text-[#F7F6F2]' : 'text-[#101010]';
  const dotColor = variant === 'dark' ? 'text-[#B69AFF]' : 'text-[#6D48C5]';
  const barColor = variant === 'dark' ? 'bg-[#B69AFF]' : 'bg-[#6D48C5]';
  const subColor = variant === 'dark' ? 'text-[#B4B4BC]' : 'text-[#52525B]';

  const resolvedIconVariant = iconVariant ?? (variant === 'dark' ? 'dark' : 'light');

  const sizeConfig = {
    sm: {
      gap: 'gap-2.5',
      icon: 'h-8 w-8 lg:h-9 lg:w-9',
      word: 'text-[19px] lg:text-[21px]',
      bar: 'h-[2px] w-4',
      sub: 'text-[8.5px] tracking-[0.16em]',
    },
    md: {
      gap: 'gap-3',
      icon: 'h-9 w-9 sm:h-10 sm:w-10',
      word: 'text-[22px] sm:text-[25px]',
      bar: 'h-[2px] w-5',
      sub: 'text-[9px] tracking-[0.18em]',
    },
    lg: {
      gap: 'gap-3.5',
      icon: 'h-11 w-11 sm:h-12 sm:w-12',
      word: 'text-[27px] sm:text-[32px]',
      bar: 'h-[2.5px] w-6',
      sub: 'text-[10px] tracking-[0.2em]',
    },
  }[size];

  return (
    <span
      className={`inline-flex items-center ${sizeConfig.gap} select-none ${className}`}
    >
      {showIcon && (
        <MushiGrowthIcon
          variant={resolvedIconVariant}
          className={`${sizeConfig.icon} shrink-0 transition-transform duration-200 group-hover:scale-105`}
        />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-bold tracking-[-0.045em] ${sizeConfig.word} ${wordColor}`}
        >
          MUSHI<span className={dotColor}>.</span>
        </span>
        {showTagline && (
          <span
            className={`mt-1 items-center gap-1.5 ${
              hideTaglineOnMobile ? 'hidden sm:inline-flex' : 'inline-flex'
            }`}
          >
            <span aria-hidden="true" className={`rounded-full ${sizeConfig.bar} ${barColor}`} />
            <span className={`font-semibold uppercase ${sizeConfig.sub} ${subColor}`}>
              Digital Growth Studio
            </span>
          </span>
        )}
      </span>
    </span>
  );
}
