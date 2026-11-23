import {ArrowUpRight} from 'lucide-react';
import {EditorialReveal} from './MotionPrimitives';

interface CtaBandProps {
  kicker?: string;
  headline: string;
  accentWord?: string;
  description?: string;
  buttonLabel?: string;
  href?: string;
}

export function CtaBand({
  kicker = 'Ready to Move Forward',
  headline,
  accentWord,
  description = 'Share your objectives and timeline. We will help define a practical, creative path forward.',
  buttonLabel = 'Start a Project',
  href = '/contact.html',
}: CtaBandProps) {
  return (
    <section className="border-t border-white/12 bg-[#0B0B0E] text-[#F7F6F2]">
      <EditorialReveal className="mx-auto flex w-full max-w-[1320px] flex-col items-start justify-between gap-5 px-5 py-7 sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:gap-8 lg:px-10 lg:py-12">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wide text-[#B69AFF]">
            {kicker}
          </p>
          <h2 className="display-sub mt-2 text-[#F7F6F2] sm:text-3xl">
            {headline}{' '}
            {accentWord && <span className="text-[#B69AFF]">{accentWord}</span>}
          </h2>
          {description && (
            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[#B4B4BC] sm:text-base">
              {description}
            </p>
          )}
        </div>
        <a
          href={href}
          className="group inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[8px] bg-[#B69AFF] px-6 py-3 text-sm font-semibold text-[#0B0B0E] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C8B2FF] hover:shadow-[0_10px_28px_rgba(182,154,255,0.28)] active:scale-[0.98] sm:w-auto sm:rounded-[6px]"
        >
          {buttonLabel}
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </a>
      </EditorialReveal>
    </section>
  );
}
