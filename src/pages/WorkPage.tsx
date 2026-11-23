import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowUpRight} from 'lucide-react';
import {CtaBand} from '../components/CtaBand';
import {Layout} from '../components/Layout';
import {MediaFrame} from '../components/MediaFrame';
import {EDITORIAL_EASE, StudioMarqueeRibbon} from '../components/MotionPrimitives';
import {PageHero} from '../components/PageHero';
import {ProjectDetailModal} from '../components/ProjectDetailModal';
import {
  type ProjectConcept,
  WORK_CATEGORIES,
  WORK_CONCEPTS,
  type WorkCategory,
} from '../data/agencyData';

export function WorkPage() {
  const [activeCategory, setActiveCategory] = useState<WorkCategory>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectConcept | null>(null);

  const filteredProjects =
    activeCategory === 'All'
      ? WORK_CONCEPTS
      : WORK_CONCEPTS.filter(project => project.category === activeCategory);

  return (
    <Layout activePage="work">
      <PageHero
        sectionLabel="Our Work"
        headline="Live platforms."
        accentHeadline="Categorised by craft."
        description="Explore 16 live websites, e-commerce storefronts, signage & agency hubs, AI web apps, travel portals, and media portfolios—analysed and grouped by industry."
      />

      <StudioMarqueeRibbon
        variant="lavender"
        items={[
          'E-Commerce & Retail',
          'Advertising & Creative Studios',
          'Photography & Video',
          'Personal Portfolios',
          'AI & Web Applications',
          'Travel & Hospitality',
          'Corporate & Education',
          'FinTech & Trading',
          'Interactive Events',
        ]}
      />

      {/* Dark Gallery Exhibition Canvas */}
      <section className="bg-[#101010] text-[#F7F6F2]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          {/* Curated Portfolio Header */}
          <div className="mb-4 rounded-[8px] border border-white/12 bg-[#16161A] p-3.5 sm:mb-6 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-xs font-semibold tracking-wide text-[#B69AFF]">
                Analysed Digital Portfolio · {WORK_CONCEPTS.length} Live Websites
              </p>
              <span className="text-[11px] font-medium text-[#B4B4BC] md:hidden">
                Swipe cards →
              </span>
            </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#B4B4BC] sm:line-clamp-none">
              Filter across 9 categories covering E-Commerce, Advertising &amp; Creative Studios, Photography &amp; Film, Executive Portfolios, AI Web Apps, Travel &amp; Hospitality, Education Portals, FinTech Trading, and Interactive Events.
            </p>
          </div>

          {/* Interactive Category Filter Bar (sliding layoutId highlight) */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-5 flex items-center gap-1.5 overflow-x-auto border-b border-white/12 px-5 pb-3 sm:mx-0 sm:flex-wrap sm:gap-2 sm:px-0 sm:pb-4"
          >
            {WORK_CATEGORIES.map(category => {
              const isSelected = activeCategory === category;
              const count =
                category === 'All'
                  ? WORK_CONCEPTS.length
                  : WORK_CONCEPTS.filter(p => p.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isSelected}
                  className={`relative min-h-[38px] shrink-0 overflow-hidden whitespace-nowrap rounded-[8px] px-3.5 py-1.5 text-xs font-semibold transition-colors duration-150 active:scale-95 ${
                    isSelected
                      ? 'text-[#101010]'
                      : 'border border-white/15 bg-transparent text-[#B4B4BC] hover:border-[#B69AFF] hover:text-[#F7F6F2]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="workCategoryFilterActive"
                      transition={{type: 'spring', stiffness: 380, damping: 32}}
                      aria-hidden="true"
                      className="absolute inset-0 bg-[#B69AFF]"
                    />
                  )}
                  <span className="relative z-10">
                    {category}{' '}
                    <span className="tabular-nums opacity-75">({count})</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Horizontal Snap Exhibition on Mobile / Compact 3-Column Grid on lg+ */}
          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mt-6 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{opacity: 0, y: 14, scale: 0.985}}
                  animate={{opacity: 1, y: 0, scale: 1}}
                  exit={{opacity: 0, scale: 0.97}}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.03, 0.2),
                    ease: EDITORIAL_EASE,
                  }}
                  className="group flex w-[80vw] max-w-[310px] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] border border-white/12 bg-[#16161A] transition-all duration-200 hover:-translate-y-1 hover:border-[#B69AFF]/65 hover:shadow-[0_14px_36px_rgba(0,0,0,0.45)] md:w-auto md:max-w-none md:shrink"
                >
                  <div className="flex h-full flex-col">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="text-left"
                    >
                      <MediaFrame
                        src={project.image}
                        alt={project.imageAlt}
                        aspectClassName="aspect-[16/10]"
                        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                        fallbackTitle={project.title}
                      />
                    </button>

                    <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-left"
                      >
                        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#B4B4BC]">
                          <span className="font-semibold text-[#B69AFF]">
                            {project.category}
                          </span>
                          {project.domainLabel && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="truncate">{project.domainLabel}</span>
                            </>
                          )}
                        </div>

                        <h2 className="font-display mt-1.5 line-clamp-1 text-base font-semibold tracking-tight text-[#F7F6F2] transition-colors group-hover:text-[#B69AFF]">
                          {project.title}
                        </h2>

                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#B4B4BC]">
                          {project.summary}
                        </p>
                      </button>

                      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex min-h-[34px] items-center gap-1.5 text-xs font-semibold text-[#F7F6F2] transition-colors hover:text-[#B69AFF]"
                        >
                          Project details
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-[#B69AFF] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </button>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[34px] items-center gap-1.5 text-xs font-semibold text-[#B69AFF] transition-colors hover:text-[#C8B2FF]"
                          >
                            Visit live
                            <ArrowUpRight
                              className="h-3.5 w-3.5 transition-transform duration-150 hover:translate-x-0.5 hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Have a Brief in Mind?"
        headline="Your next project"
        accentWord="could start here."
        description="Tell us what you are looking to launch, refine, or scale, and we will prepare a focused proposal."
        buttonLabel="Start a Project"
        href="/contact.html"
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Layout>
  );
}
