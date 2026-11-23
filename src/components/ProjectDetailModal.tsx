import {useEffect} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowUpRight, X} from 'lucide-react';
import type {ProjectConcept} from '../data/agencyData';
import {MediaFrame} from './MediaFrame';

interface ProjectDetailModalProps {
  project: ProjectConcept | null;
  onClose: () => void;
}

export function ProjectDetailModal({project, onClose}: ProjectDetailModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{y: 40, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            exit={{y: 40, opacity: 0}}
            transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
            onClick={event => event.stopPropagation()}
            className="relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-[#101010] text-[#F7F6F2] shadow-2xl sm:max-h-[90vh] sm:rounded-[12px]"
          >
            {/* Mobile Sheet Handle */}
            <div className="flex justify-center pt-2.5 sm:hidden">
              <div className="h-1.5 w-10 rounded-full bg-white/25" />
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-white/12 bg-[#101010] px-5 py-3.5 sm:px-6 sm:py-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#B4B4BC]">
                <span className="font-medium text-[#B69AFF]">{project.category}</span>
                <span aria-hidden="true">·</span>
                <span>{project.domainLabel || 'Live Project'}</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close project detail"
                className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 text-[#F7F6F2] transition-colors hover:border-[#B69AFF] hover:text-[#B69AFF] active:scale-95"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 sm:p-8 lg:p-10">
              <MediaFrame
                src={project.image}
                alt={project.imageAlt}
                aspectClassName="aspect-[16/9]"
                className="rounded-[10px]"
                fallbackTitle={project.title}
              />

              <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <p className="text-xs font-medium text-[#B4B4BC]">{project.sector}</p>
                  <h2
                    id="project-modal-title"
                    className="display-sub mt-2 text-[#F7F6F2]"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[#B4B4BC]">
                    {project.summary}
                  </p>

                  <div className="mt-7 space-y-5 border-t border-white/12 pt-6">
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[#F7F6F2]">
                        The Brief &amp; Challenge
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#B4B4BC]">
                        {project.challenge}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[#F7F6F2]">
                        Strategic Direction
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#B4B4BC]">
                        {project.direction}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[#F7F6F2]">
                        Creative Execution
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#B4B4BC]">
                        {project.execution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between border-t border-white/12 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <div>
                    <h3 className="font-display text-xs font-semibold tracking-wide text-[#B4B4BC]">
                      Scope &amp; Deliverables
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-[#F7F6F2]">
                      {project.deliverables.map(item => (
                        <li
                          key={item}
                          className="border-b border-white/10 pb-2 text-sm text-[#F7F6F2]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 text-xs leading-relaxed text-[#B4B4BC]">
                      Live digital project analyzed and categorized under <span className="text-[#F7F6F2]">{project.category}</span>.
                    </p>
                  </div>

                  <div className="mt-8 hidden space-y-3 lg:block">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-[8px] bg-[#B69AFF] px-5 py-3 text-sm font-semibold text-[#101010] transition-colors hover:bg-[#C8B2FF]"
                      >
                        Visit Live Website
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    <a
                      href={`/contact.html?service=${encodeURIComponent(project.category)}`}
                      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-[8px] border border-white/15 px-5 py-3 text-sm font-semibold text-[#F7F6F2] transition-colors hover:border-[#B69AFF] hover:text-[#B69AFF]"
                    >
                      Start a Similar Project
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sticky Sheet Footer Action */}
            <div className="pb-safe grid grid-cols-2 gap-2.5 border-t border-white/12 bg-[#101010] p-4 lg:hidden">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] bg-[#B69AFF] px-4 py-3 text-xs font-semibold text-[#101010] transition-transform active:scale-[0.98]"
                >
                  Visit Live Site
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              <a
                href={`/contact.html?service=${encodeURIComponent(project.category)}`}
                className={`inline-flex min-h-[48px] items-center justify-center gap-1.5 whitespace-nowrap rounded-[8px] border border-white/20 px-4 py-3 text-xs font-semibold text-[#F7F6F2] transition-transform active:scale-[0.98] ${
                  project.liveUrl ? '' : 'col-span-2 bg-[#B69AFF] text-[#101010]'
                }`}
              >
                Similar Project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
