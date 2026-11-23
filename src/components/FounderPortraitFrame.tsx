import {useState} from 'react';
import {motion} from 'motion/react';
import {STUDIO_IMAGES, STUDIO_INFO} from '../data/agencyData';
import {MushiGrowthIcon} from './BrandMark';
import {EDITORIAL_EASE} from './MotionPrimitives';

interface FounderPortraitFrameProps {
  variant?: 'editorial' | 'compact';
  className?: string;
}

/**
 * Creative editorial staging for Ahmath Musharraf's studio portrait.
 * Blends the crisp white studio cutout seamlessly into a sculpted Digital Lavender
 * architectural studio backdrop with viewfinder framing marks and coded brand emblem.
 */
export function FounderPortraitFrame({
  variant = 'editorial',
  className = '',
}: FounderPortraitFrameProps) {
  const [hasError, setHasError] = useState(false);

  if (variant === 'compact') {
    return (
      <div className={`group relative inline-block shrink-0 ${className}`}>
        {/* Offset Digital Lavender backplate */}
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-[10px] bg-[#B69AFF] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:translate-y-2"
        />

        {/* Framed studio portrait */}
        <div className="relative aspect-[4/5] w-[88px] overflow-hidden rounded-[10px] border border-[#101010]/20 bg-[radial-gradient(circle_at_50%_60%,#FFFFFF_24%,#EFEAF9_65%,#CFC0FF_100%)] sm:w-[98px]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 125"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <circle
              cx="50"
              cy="48"
              r="34"
              fill="none"
              stroke="rgba(109, 72, 197, 0.22)"
              strokeWidth="0.8"
              strokeDasharray="3 3"
            />
            <line
              x1="10"
              y1="96"
              x2="90"
              y2="24"
              stroke="rgba(16, 16, 16, 0.07)"
              strokeWidth="0.75"
            />
          </svg>

          {!hasError ? (
            <img
              src={STUDIO_IMAGES.founderPortrait}
              alt={`${STUDIO_INFO.founder}, ${STUDIO_INFO.founderRole}`}
              referrerPolicy="no-referrer"
              loading="eager"
              onError={() => setHasError(true)}
              className="relative z-10 h-full w-full object-cover object-top mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
          ) : (
            <div className="relative z-10 flex h-full w-full items-center justify-center bg-[#101010] text-xs font-semibold text-[#B69AFF]">
              AM
            </div>
          )}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-6 bg-gradient-to-t from-[#101010]/55 to-transparent"
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0, y: 14}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.25}}
      transition={{duration: 0.45, ease: EDITORIAL_EASE}}
      className={`group relative mx-auto w-full max-w-[330px] ${className}`}
    >
      {/* Offset Digital Lavender structural backing plate */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[12px] bg-[#B69AFF] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3.5 group-hover:translate-y-3.5 sm:translate-x-3 sm:translate-y-3"
      />

      {/* Primary Studio Portrait Canvas */}
      <div className="relative overflow-hidden rounded-[12px] border border-[#101010] bg-[radial-gradient(circle_at_50%_56%,#FFFFFF_24%,#F1ECFC_62%,#D4C4FF_100%)] shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
        {/* Fine Architectural Grid & Studio Halo Vectors */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(16,16,16,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,16,16,0.045) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <svg
          aria-hidden="true"
          viewBox="0 0 320 400"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {/* Concentric studio aperture rings behind subject */}
          <circle
            cx="160"
            cy="154"
            r="116"
            fill="none"
            stroke="rgba(109, 72, 197, 0.2)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
          <circle
            cx="160"
            cy="154"
            r="84"
            fill="none"
            stroke="rgba(16, 16, 16, 0.08)"
            strokeWidth="1"
          />
          {/* Ascending diagonal creative trajectory hairline */}
          <line
            x1="24"
            y1="300"
            x2="296"
            y2="46"
            stroke="rgba(109, 72, 197, 0.16)"
            strokeWidth="1"
          />
        </svg>

        {/* Quiet Corner Viewfinder Registration Ticks */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 z-20 h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px] border-[#101010]/45 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 z-20 h-3.5 w-3.5 border-r-[1.5px] border-t-[1.5px] border-[#101010]/45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />

        {/* Top Studio Emblem Strip */}
        <div className="relative z-20 flex items-center justify-between px-4 pt-4">
          <span className="text-[10px] font-semibold tracking-wider text-[#101010]/70 uppercase">
            Colombo · Dubai
          </span>
          <MushiGrowthIcon variant="dark" className="h-6 w-6" />
        </div>

        {/* Portrait Layer (white studio cutout melts cleanly via multiply blend) */}
        <div className="relative z-10 -mt-3 aspect-[4/4.35] w-full overflow-hidden">
          {!hasError ? (
            <img
              src={STUDIO_IMAGES.founderPortrait}
              alt="Creative studio portrait of Ahmath Musharraf, Founder and Creative Director of Mushi Digital Growth Studio"
              referrerPolicy="no-referrer"
              loading="eager"
              onError={() => setHasError(true)}
              className="h-full w-full object-cover object-top mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#141418] p-6 text-center">
              <MushiGrowthIcon variant="lavender" className="h-10 w-10" />
              <span className="font-display mt-3 text-sm font-semibold text-[#F7F6F2]">
                {STUDIO_INFO.founder}
              </span>
            </div>
          )}

          {/* Bottom gradient anchor blending tailored suit into dark caption strip */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#101010] via-[#101010]/55 to-transparent"
          />
        </div>

        {/* Architectural Footer Caption Strip */}
        <div className="relative z-20 flex items-center justify-between gap-3 border-t border-white/12 bg-[#101010] px-4 py-3 text-[#F7F6F2]">
          <div>
            <p className="font-display text-sm font-semibold tracking-tight text-[#F7F6F2]">
              {STUDIO_INFO.founder}
            </p>
            <p className="text-[11px] font-medium text-[#B69AFF]">
              {STUDIO_INFO.founderRole}
            </p>
          </div>
          <span className="tabular-nums text-[10px] font-semibold tracking-wider text-[#B4B4BC] uppercase">
            MUSHI.
          </span>
        </div>
      </div>
    </motion.div>
  );
}
