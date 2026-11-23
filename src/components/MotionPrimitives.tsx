import type {ReactNode} from 'react';
import {motion, useScroll, useSpring} from 'motion/react';

export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

interface EditorialRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function EditorialReveal({
  children,
  className = '',
  delay = 0,
}: EditorialRevealProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20, scale: 0.99}}
      whileInView={{opacity: 1, y: 0, scale: 1}}
      viewport={{once: true, amount: 0.12}}
      transition={{
        duration: 0.52,
        delay,
        ease: EDITORIAL_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
}

export function StaggerGrid({children, className = ''}: StaggerGridProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{once: true, amount: 0.08}}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.07,
            delayChildren: 0.04,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerCardProps {
  children: ReactNode;
  className?: string;
}

export function StaggerCard({children, className = ''}: StaggerCardProps) {
  return (
    <motion.div
      variants={{
        hidden: {opacity: 0, y: 18, scale: 0.985},
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {duration: 0.48, ease: EDITORIAL_EASE},
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollProgressLine() {
  const {scrollYProgress} = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{scaleX}}
      className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-[#B69AFF]"
    />
  );
}

export function AmbientAura({className = ''}: {className?: string}) {
  return (
    <motion.div
      aria-hidden="true"
      animate={{
        opacity: [0.55, 0.95, 0.55],
        scale: [1, 1.06, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(182,154,255,0.18),transparent_72%)] ${className}`}
    />
  );
}

interface StudioMarqueeRibbonProps {
  items?: string[];
  variant?: 'dark' | 'lavender';
}

const DEFAULT_RIBBON_ITEMS = [
  'SEO & Search Authority',
  'AIO (AI Engine Optimization)',
  'Full-Stack Marketing',
  'Brand Identity',
  'Commercial Film & Photography',
  'Web Experiences',
  'AI & CRM Automation',
  'Sri Lanka · UAE · Worldwide',
];

export function StudioMarqueeRibbon({
  items = DEFAULT_RIBBON_ITEMS,
  variant = 'dark',
}: StudioMarqueeRibbonProps) {
  const isLavender = variant === 'lavender';

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y py-2.5 select-none ${
        isLavender
          ? 'border-[#101010]/15 bg-[#B69AFF] text-[#101010]'
          : 'border-white/12 bg-[#16161A] text-[#F7F6F2]'
      }`}
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {[0, 1].map(loopIndex => (
          <div key={loopIndex} className="flex items-center gap-8">
            {items.map((item, idx) => (
              <span
                key={`${loopIndex}-${idx}`}
                className="flex items-center gap-8 font-display text-xs font-semibold tracking-[0.14em] uppercase"
              >
                <span>{item}</span>
                <span
                  className={isLavender ? 'text-[#101010]/55' : 'text-[#B69AFF]'}
                >
                  /
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
