import {motion} from 'motion/react';
import {AmbientAura, EDITORIAL_EASE} from './MotionPrimitives';

interface PageHeroProps {
  sectionLabel: string;
  headline: string;
  accentHeadline?: string;
  description: string;
}

export function PageHero({
  sectionLabel,
  headline,
  accentHeadline,
  description,
}: PageHeroProps) {
  return (
    <section className="studio-grid-bg relative overflow-hidden border-b border-white/12 bg-[#101010] text-[#F7F6F2]">
      <AmbientAura />
      <div className="relative mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <motion.div
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.4, ease: EDITORIAL_EASE}}
          className="flex flex-wrap items-center justify-between gap-3 text-xs font-medium text-[#B4B4BC]"
        >
          <span className="text-[#B69AFF]">{sectionLabel}</span>
          <span>Sri Lanka · UAE · Worldwide</span>
        </motion.div>

        <motion.h1
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.48, delay: 0.06, ease: EDITORIAL_EASE}}
          className="display-hero mt-3 max-w-4xl text-[#F7F6F2] sm:mt-4"
        >
          {headline}
          {accentHeadline && (
            <>
              <br />
              <span className="text-[#B69AFF]">{accentHeadline}</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{opacity: 0, y: 14}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.48, delay: 0.12, ease: EDITORIAL_EASE}}
          className="mt-3 max-w-2xl text-sm leading-relaxed text-[#B4B4BC] sm:mt-4 sm:text-base"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
