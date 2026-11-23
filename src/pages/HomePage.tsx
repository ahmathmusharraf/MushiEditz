import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowRight, ArrowUpRight} from 'lucide-react';
import {MushiGrowthIcon} from '../components/BrandMark';
import {CtaBand} from '../components/CtaBand';
import {FounderPortraitFrame} from '../components/FounderPortraitFrame';
import {Layout} from '../components/Layout';
import {MediaFrame} from '../components/MediaFrame';
import {
  AmbientAura,
  EDITORIAL_EASE,
  EditorialReveal,
  StaggerCard,
  StaggerGrid,
  StudioMarqueeRibbon,
} from '../components/MotionPrimitives';
import {ProjectDetailModal} from '../components/ProjectDetailModal';
import {
  PROCESS_STAGES,
  type ProjectConcept,
  SERVICES_DATA,
  WORK_CONCEPTS,
} from '../data/agencyData';

const HERO_PILLARS = [
  {
    number: '01',
    title: 'Brand & Strategy',
    detail: 'Positioning, identity systems & market clarity',
    href: '/services.html#branding-creative-design',
  },
  {
    number: '02',
    title: 'SEO, AIO & Full Marketing',
    detail: 'Search rankings, AI citations & Google/Meta Ads',
    href: '/services.html#digital-marketing-growth',
  },
  {
    number: '03',
    title: 'Web & AI Automation',
    detail: 'Conversion web builds & connected CRM workflows',
    href: '/services.html#web-development-digital-experiences',
  },
];

const WHY_CHOOSE_PILLARS = [
  {
    number: '01',
    title: 'Integrated Capabilities',
    description:
      'Strategy, creative design, production, web engineering, and automation operate under one roof—eliminating fragmented handoffs.',
  },
  {
    number: '02',
    title: 'Commercial Clarity',
    description:
      'Creative choices are anchored in business positioning, buyer psychology, and measurable conversion pathways.',
  },
  {
    number: '03',
    title: 'Craft Without Noise',
    description:
      'We favour restrained, enduring design systems and authentic storytelling over fleeting visual clichés.',
  },
  {
    number: '04',
    title: 'Cross-Market Perspective',
    description:
      'Rooted in Sri Lanka and connected to the UAE, we partner seamlessly with ambitious teams operating worldwide.',
  },
];

export function HomePage() {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const [activeProcessIndex, setActiveProcessIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectConcept | null>(null);

  const activeService = SERVICES_DATA[activeServiceIndex];
  const activeStage = PROCESS_STAGES[activeProcessIndex];
  const featuredConcepts = WORK_CONCEPTS.filter(p => p.featured).slice(0, 3);

  return (
    <Layout activePage="home">
      {/* 01. Centered & Creative Typographic Hero Section */}
      <section className="studio-grid-bg relative overflow-hidden border-b border-white/12 bg-[#101010] text-[#F7F6F2]">
        {/* Architectural centered ambient spotlight */}
        <AmbientAura />

        <div className="relative mx-auto flex w-full max-w-[1320px] flex-col justify-between px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            {/* Centered Studio Crest & Coordinates */}
            <motion.div
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.4, ease: EDITORIAL_EASE}}
              className="flex flex-col items-center gap-2.5 sm:gap-3"
            >
              <motion.div
                whileHover={{scale: 1.08, rotate: 4}}
                whileTap={{scale: 0.94}}
                transition={{duration: 0.2, ease: EDITORIAL_EASE}}
              >
                <MushiGrowthIcon
                  variant="lavender"
                  className="h-9 w-9 rounded-[8px] shadow-[0_0_24px_rgba(182,154,255,0.24)] sm:h-10 sm:w-10"
                />
              </motion.div>
              <div className="flex items-center gap-3 text-[11px] font-medium tracking-wide text-[#B69AFF] sm:text-xs">
                <motion.span
                  aria-hidden="true"
                  initial={{scaleX: 0}}
                  animate={{scaleX: 1}}
                  transition={{duration: 0.5, delay: 0.12, ease: EDITORIAL_EASE}}
                  className="hidden h-px w-10 origin-right bg-white/20 sm:block"
                />
                <span>Mushi Digital Growth Studio · Sri Lanka · UAE · Worldwide</span>
                <motion.span
                  aria-hidden="true"
                  initial={{scaleX: 0}}
                  animate={{scaleX: 1}}
                  transition={{duration: 0.5, delay: 0.12, ease: EDITORIAL_EASE}}
                  className="hidden h-px w-10 origin-left bg-white/20 sm:block"
                />
              </div>
            </motion.div>

            {/* Centered Creative Sculptural Display Headline */}
            <motion.h1
              initial={{opacity: 0, y: 16}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.06, ease: EDITORIAL_EASE}}
              className="display-hero mt-4 max-w-4xl text-[#F7F6F2] sm:mt-5 lg:text-[4rem]"
            >
              We Build Brands.
              <br />
              We <span className="outline-lavender">Drive</span>{' '}
              <span className="text-[#B69AFF]">Growth.</span>
            </motion.h1>

            <motion.p
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.12, ease: EDITORIAL_EASE}}
              className="mt-3.5 max-w-2xl text-sm leading-relaxed text-[#B4B4BC] sm:mt-4 sm:text-base"
            >
              Creative thinking, strategic marketing and digital innovation to help ambitious businesses connect with clarity and scale worldwide.
            </motion.p>

            {/* Centered Conversion Actions */}
            <motion.div
              initial={{opacity: 0, y: 12}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.48, delay: 0.18, ease: EDITORIAL_EASE}}
              className="mt-5 grid w-full max-w-md grid-cols-2 gap-3 sm:mt-7 sm:flex sm:w-auto sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
            >
              <a
                href="/contact.html"
                className="group inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] bg-[#B69AFF] px-4 py-2.5 text-xs font-semibold text-[#101010] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#C8B2FF] hover:shadow-[0_12px_30px_rgba(182,154,255,0.28)] active:scale-[0.98] sm:min-h-[46px] sm:gap-2 sm:px-7 sm:py-3 sm:text-sm"
              >
                Start a Project
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
              </a>
              <a
                href="/services.html"
                className="group inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] border border-white/20 bg-[#16161A]/60 px-4 py-2.5 text-xs font-semibold text-[#F7F6F2] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#B69AFF] hover:text-[#B69AFF] active:scale-[0.98] sm:min-h-[46px] sm:gap-2 sm:px-7 sm:py-3 sm:text-sm"
              >
                Explore Services
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-1 sm:h-4 sm:w-4"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>

          {/* Centered Architectural Practice Index */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.24, ease: EDITORIAL_EASE}}
            className="mx-auto mt-7 w-full max-w-[1040px] border-t border-white/12 pt-5 sm:mt-10 sm:pt-6"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-6">
              {HERO_PILLARS.map((pillar, idx) => (
                <motion.a
                  key={pillar.number}
                  href={pillar.href}
                  initial={{opacity: 0, y: 10}}
                  animate={{opacity: 1, y: 0}}
                  transition={{
                    duration: 0.4,
                    delay: 0.26 + idx * 0.06,
                    ease: EDITORIAL_EASE,
                  }}
                  whileHover={{y: -3}}
                  className="group flex items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-[#16161A]/60 px-4 py-3 text-left transition-colors duration-150 hover:border-[#B69AFF]/55 sm:flex-col sm:items-start sm:border-0 sm:bg-transparent sm:p-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="tabular-nums text-[11px] font-semibold text-[#B69AFF] sm:text-xs">
                        {pillar.number}
                      </span>
                      <h2 className="font-display truncate text-xs font-semibold text-[#F7F6F2] transition-colors group-hover:text-[#B69AFF] sm:text-sm">
                        {pillar.title}
                      </h2>
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-[#B4B4BC] sm:mt-1.5 sm:whitespace-normal sm:text-xs sm:leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 shrink-0 text-[#B4B4BC] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#B69AFF] sm:mt-2"
                    aria-hidden="true"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Kinetic Editorial Divider */}
      <StudioMarqueeRibbon variant="dark" />

      {/* 02. Short Agency Introduction */}
      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <EditorialReveal>
            <div className="flex items-center gap-2.5">
              <MushiGrowthIcon variant="dark" className="h-6 w-6 rounded-[6px]" />
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                The Studio
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-5 sm:mt-5 sm:gap-6 lg:grid-cols-12 lg:items-center lg:gap-10">
              <div className="lg:col-span-6">
                <h2 className="display-sub text-[#111114] sm:text-3xl">
                  Good marketing gets attention.{' '}
                  <span className="text-[#52525B]">Great growth builds momentum.</span>
                </h2>

                <div className="mt-4 flex items-center gap-4">
                  <FounderPortraitFrame variant="compact" />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-semibold text-[#111114]">
                      Ahmath Musharraf
                    </p>
                    <p className="text-xs font-medium text-[#6D48C5]">
                      Founder &amp; Creative Director
                    </p>
                    <p className="mt-1 text-xs text-[#52525B]">
                      Colombo · Dubai · Remote Worldwide
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className="text-sm leading-relaxed text-[#52525B] sm:text-base">
                  Mushi Digital Growth Studio is an independent, full-service digital marketing and creative agency founded by Ahmath Musharraf. We unite strategic thinking, distinctive design, visual production, and modern technology so brands connect clearly and grow with purpose.
                </p>
                <a
                  href="/about.html"
                  className="mt-4 inline-flex min-h-[40px] items-center gap-2 border-b border-[#6D48C5] pb-0.5 text-sm font-semibold text-[#111114] transition-colors hover:text-[#6D48C5]"
                >
                  Read our story
                  <ArrowUpRight className="h-4 w-4 text-[#6D48C5]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </EditorialReveal>
        </div>
      </section>

      {/* 03. Compact Interactive Services Lens */}
      <section className="bg-[#101010] text-[#F7F6F2]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <EditorialReveal className="flex flex-col justify-between gap-2 lg:flex-row lg:items-end lg:gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-medium tracking-wide text-[#B69AFF]">
                Capabilities
              </p>
              <h2 className="display-sub mt-1.5 text-[#F7F6F2] sm:text-3xl">
                Five disciplines. One connected growth partner.
              </h2>
            </div>
            <a
              href="/services.html"
              className="group inline-flex min-h-[36px] shrink-0 items-center gap-2 whitespace-nowrap text-xs font-semibold text-[#B69AFF] transition-colors hover:text-[#C8B2FF] sm:text-sm"
            >
              Explore all services
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </EditorialReveal>

          {/* Compact Mobile Interactive Service Deck (< lg) */}
          <div className="mt-4 lg:hidden">
            <div
              role="tablist"
              aria-label="Agency service capabilities"
              className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-1.5 overflow-x-auto px-5 pb-1"
            >
              {SERVICES_DATA.map((service, idx) => {
                const isActive = idx === activeServiceIndex;
                return (
                  <button
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveServiceIndex(idx)}
                    className={`flex min-h-[38px] shrink-0 snap-start items-center gap-1.5 whitespace-nowrap rounded-[7px] border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                      isActive
                        ? 'border-[#B69AFF] bg-[#B69AFF] text-[#101010]'
                        : 'border-white/15 bg-[#16161A] text-[#F7F6F2]'
                    }`}
                  >
                    <span className="tabular-nums opacity-80">{service.number}</span>
                    <span>{service.shortTitle}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 overflow-hidden rounded-[10px] border border-white/12 bg-[#16161A]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{opacity: 0, y: 6}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0}}
                  transition={{duration: 0.2, ease: EDITORIAL_EASE}}
                  className="grid grid-cols-1 sm:grid-cols-12"
                >
                  <div className="sm:col-span-5">
                    <MediaFrame
                      src={activeService.image}
                      alt={activeService.imageAlt}
                      aspectClassName="aspect-[16/9] max-h-[155px] sm:max-h-none sm:h-full"
                    />
                  </div>
                  <div className="p-4 sm:col-span-7">
                    <p className="tabular-nums text-[11px] font-semibold text-[#B69AFF]">
                      Capability {activeService.number} · 0{activeServiceIndex + 1} / 0{SERVICES_DATA.length}
                    </p>
                    <h3 className="font-display mt-1 text-base font-semibold text-[#F7F6F2]">
                      {activeService.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#B4B4BC]">
                      {activeService.summary}
                    </p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <a
                        href={`/contact.html?service=${encodeURIComponent(activeService.title)}`}
                        className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-[7px] bg-[#B69AFF] px-3 py-1.5 text-xs font-semibold text-[#101010] active:scale-95"
                      >
                        Enquire
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <a
                        href={`/services.html#${activeService.id}`}
                        className="inline-flex min-h-[38px] items-center justify-center rounded-[7px] border border-white/15 px-3 py-1.5 text-xs font-semibold text-[#F7F6F2] active:scale-95"
                      >
                        Full scope →
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 hidden gap-8 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
            {/* Compact Numbered Index (Desktop) */}
            <div className="border-t border-white/12 lg:col-span-7">
              {SERVICES_DATA.map((service, idx) => {
                const isActive = idx === activeServiceIndex;
                return (
                  <div
                    key={service.id}
                    onMouseEnter={() => setActiveServiceIndex(idx)}
                    className={`border-b transition-colors duration-150 ${
                      isActive ? 'border-[#B69AFF]' : 'border-white/12'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveServiceIndex(idx)}
                      aria-expanded={isActive}
                      className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className={`tabular-nums text-xs font-semibold transition-colors ${
                            isActive ? 'text-[#B69AFF]' : 'text-[#B4B4BC]'
                          }`}
                        >
                          {service.number}
                        </span>
                        <div>
                          <h3
                            className={`font-display text-base font-semibold tracking-tight transition-colors ${
                              isActive ? 'text-[#B69AFF]' : 'text-[#F7F6F2]'
                            }`}
                          >
                            {service.title}
                          </h3>
                          <p className="mt-0.5 line-clamp-1 text-xs text-[#B4B4BC]">
                            {service.summary}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`h-4 w-4 shrink-0 transition-transform duration-150 ${
                          isActive
                            ? 'translate-x-0.5 -translate-y-0.5 text-[#B69AFF]'
                            : 'text-[#B4B4BC]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Compact Desktop Preview Card */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-[10px] border border-white/12 bg-[#16161A]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.id}
                    initial={{opacity: 0, y: 6}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.22, ease: EDITORIAL_EASE}}
                  >
                    <MediaFrame
                      src={activeService.image}
                      alt={activeService.imageAlt}
                      aspectClassName="aspect-[16/9]"
                    />
                    <div className="p-5">
                      <p className="tabular-nums text-[11px] font-semibold text-[#B69AFF]">
                        Capability {activeService.number}
                      </p>
                      <h3 className="font-display mt-1 text-base font-semibold text-[#F7F6F2]">
                        {activeService.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#B4B4BC]">
                        {activeService.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-3">
                        <a
                          href={`/contact.html?service=${encodeURIComponent(activeService.title)}`}
                          className="group inline-flex min-h-[38px] items-center gap-1.5 rounded-[6px] bg-[#B69AFF] px-3.5 py-1.5 text-xs font-semibold text-[#101010] transition-colors hover:bg-[#C8B2FF]"
                        >
                          {activeService.ctaLabel}
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </a>
                        <a
                          href={`/services.html#${activeService.id}`}
                          className="text-xs font-semibold text-[#F7F6F2] hover:text-[#B69AFF]"
                        >
                          Full scope →
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. Compact Selected Work Showcase */}
      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <EditorialReveal className="flex flex-col justify-between gap-2 lg:flex-row lg:items-end lg:gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Selected Work
              </p>
              <h2 className="display-sub mt-1.5 text-[#111114] sm:text-3xl">
                Make the work speak with clarity.
              </h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href="/work.html"
                className="group inline-flex min-h-[36px] shrink-0 items-center gap-2 whitespace-nowrap text-xs font-semibold text-[#111114] transition-colors hover:text-[#6D48C5] sm:text-sm"
              >
                Explore all {WORK_CONCEPTS.length} live projects
                <ArrowUpRight
                  className="h-4 w-4 text-[#6D48C5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
              <span className="text-xs font-medium text-[#52525B] md:hidden">
                Swipe →
              </span>
            </div>
          </EditorialReveal>

          <StaggerGrid className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mt-6 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0">
            {featuredConcepts.map(project => (
              <StaggerCard
                key={project.id}
                className="group flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] border border-black/10 bg-[#FFFFFF] transition-all duration-200 hover:-translate-y-1 hover:border-[#6D48C5]/60 hover:shadow-[0_14px_32px_rgba(17,17,20,0.08)] active:scale-[0.99] md:w-auto md:max-w-none md:shrink"
              >
                <article className="flex h-full flex-col">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="flex h-full flex-col text-left"
                  >
                    <MediaFrame
                      src={project.image}
                      alt={project.imageAlt}
                      aspectClassName="aspect-[16/10]"
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      fallbackTitle={project.title}
                    />
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#52525B]">
                          <span className="font-semibold text-[#6D48C5]">
                            {project.category}
                          </span>
                          {project.domainLabel && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="truncate">{project.domainLabel}</span>
                            </>
                          )}
                        </div>
                        <h3 className="font-display mt-1.5 line-clamp-1 text-sm font-semibold tracking-tight text-[#111114] transition-colors group-hover:text-[#6D48C5] sm:text-base">
                          {project.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#52525B]">
                          {project.summary}
                        </p>
                      </div>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111114]">
                        Inspect brief
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-[#6D48C5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </button>
                </article>
              </StaggerCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 05. Compact Why Choose Mushi Digital Growth Studio Strip */}
      <section className="border-y border-black/10 bg-[#FFFFFF] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <EditorialReveal className="flex items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Why Mushi Digital Growth Studio
              </p>
              <h2 className="display-sub mt-1.5 text-[#111114] sm:text-3xl">
                Built for cohesion, accountability, and durable growth.
              </h2>
            </div>
            <span className="shrink-0 text-xs font-medium text-[#52525B] md:hidden">
              Swipe 01–04 →
            </span>
          </EditorialReveal>

          <StaggerGrid className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mt-6 md:mx-0 md:grid md:grid-cols-2 md:gap-px md:overflow-hidden md:rounded-[10px] md:border md:border-black/10 md:bg-black/10 md:px-0 md:pb-0 lg:grid-cols-4">
            {WHY_CHOOSE_PILLARS.map(pillar => (
              <StaggerCard
                key={pillar.number}
                className="flex w-[74vw] max-w-[270px] shrink-0 snap-start flex-col justify-between rounded-[10px] border border-black/12 bg-[#F7F6F2] p-4 transition-colors duration-200 hover:bg-[#FAF9F6] md:w-auto md:max-w-none md:shrink md:rounded-none md:border-0 md:bg-[#FFFFFF] md:p-5"
              >
                <div>
                  <span className="tabular-nums text-[11px] font-semibold text-[#6D48C5]">
                    {pillar.number} / 04
                  </span>
                  <h3 className="font-display mt-2 text-base font-semibold text-[#111114]">
                    {pillar.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#52525B]">
                    {pillar.description}
                  </p>
                </div>
              </StaggerCard>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* 06. Interactive Process Explorer */}
      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <EditorialReveal className="flex flex-col justify-between gap-2 lg:flex-row lg:items-end lg:gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Our Process
              </p>
              <h2 className="display-sub mt-1.5 text-[#111114] sm:text-3xl">
                Six structured stages from clarity to scale.
              </h2>
            </div>
            <a
              href="/process.html"
              className="group inline-flex min-h-[36px] shrink-0 items-center gap-2 whitespace-nowrap text-xs font-semibold text-[#111114] transition-colors hover:text-[#6D48C5] sm:text-sm"
            >
              Explore full methodology
              <ArrowUpRight
                className="h-4 w-4 text-[#6D48C5] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </EditorialReveal>

          {/* Interactive Stage Switcher */}
          <div
            role="tablist"
            aria-label="Process stage selector"
            className="no-scrollbar -mx-5 mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 sm:mx-0 sm:mt-6 sm:grid sm:grid-cols-3 sm:gap-2.5 sm:overflow-visible sm:px-0 lg:grid-cols-6"
          >
            {PROCESS_STAGES.map((stage, index) => {
              const isSelected = index === activeProcessIndex;
              return (
                <button
                  key={stage.number}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveProcessIndex(index)}
                  className={`relative flex min-h-[54px] w-[118px] shrink-0 snap-start flex-col items-start overflow-hidden rounded-[8px] border p-2.5 text-left transition-colors duration-150 active:scale-[0.97] sm:min-h-[60px] sm:w-auto sm:shrink sm:p-3 ${
                    isSelected
                      ? 'border-[#101010] text-[#F7F6F2]'
                      : 'border-black/12 bg-[#FFFFFF] text-[#111114] hover:border-[#6D48C5]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="homeActiveProcessStage"
                      transition={{type: 'spring', stiffness: 360, damping: 30}}
                      aria-hidden="true"
                      className="absolute inset-0 bg-[#101010]"
                    />
                  )}
                  <span
                    className={`relative z-10 tabular-nums text-[11px] font-semibold ${
                      isSelected ? 'text-[#B69AFF]' : 'text-[#6D48C5]'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <span className="font-display relative z-10 mt-0.5 text-xs font-semibold sm:mt-1 sm:text-sm">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage.number}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -6}}
              transition={{duration: 0.22, ease: EDITORIAL_EASE}}
              className="mt-3.5 grid grid-cols-1 gap-4 rounded-[10px] border border-black/12 bg-[#FFFFFF] p-4 sm:mt-5 sm:gap-6 sm:p-6 lg:grid-cols-12 lg:items-center"
            >
              <div className="lg:col-span-7">
                <p className="tabular-nums text-xs font-semibold text-[#6D48C5]">
                  Stage {activeStage.number} · {activeStage.title}
                </p>
                <h3 className="display-sub mt-1 text-[#111114]">
                  {activeStage.subtitle}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#52525B] sm:mt-2 sm:text-sm">
                  {activeStage.description}
                </p>
              </div>
              <div className="border-t border-black/10 pt-3 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                  Key Focus
                </p>
                <ul className="mt-2 grid grid-cols-1 gap-1.5 text-xs text-[#111114] sm:text-sm">
                  {activeStage.activities.map(activity => (
                    <li key={activity} className="flex items-center gap-2">
                      <span aria-hidden="true" className="text-xs text-[#6D48C5]">
                        /
                      </span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-black/10 pt-2.5 text-xs text-[#52525B]">
                  Outcome: {activeStage.outcome}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 07. Compact Creative Brand Statement */}
      <section className="bg-[#B69AFF] text-[#101010]">
        <EditorialReveal className="mx-auto w-full max-w-[1320px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-wide text-[#101010]/80">
              Our Point of View
            </p>
            <motion.div
              whileInView={{rotate: [0, 8, 0]}}
              viewport={{once: true, amount: 0.4}}
              transition={{duration: 0.7, ease: EDITORIAL_EASE}}
            >
              <MushiGrowthIcon variant="dark" className="h-6 w-6 rounded-[6px]" />
            </motion.div>
          </div>
          <blockquote className="font-display mt-2.5 max-w-3xl text-lg font-semibold tracking-tight leading-snug text-[#101010] sm:text-2xl">
            Growth is not one isolated campaign. It is the right ideas, craft, and systems working together.
          </blockquote>
          <p className="mt-3 text-[11px] font-semibold tracking-wide text-[#101010]/75 sm:text-xs">
            Mushi Digital Growth Studio · Strategy · Creative · Technology
          </p>
        </EditorialReveal>
      </section>

      {/* 08. Client Enquiry CTA */}
      <CtaBand
        kicker="Start a Conversation"
        headline="Have a brand or growth goal"
        accentWord="in mind?"
        description="Tell us what you are building across Sri Lanka, the UAE, or global markets. We will propose a clear, practical next step."
        buttonLabel="Let's Talk Growth"
        href="/contact.html"
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Layout>
  );
}
