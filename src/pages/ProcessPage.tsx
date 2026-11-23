import {useState} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {CtaBand} from '../components/CtaBand';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {PROCESS_STAGES} from '../data/agencyData';

const PARTNERSHIP_PRINCIPLES = [
  {
    title: 'Transparent Milestones',
    description:
      'Every phase begins with clear deliverables, review points, and realistic schedules—never guesswork.',
  },
  {
    title: 'Collaborative Feedback',
    description:
      'We involve key decision-makers early at strategy and wireframe stages so execution moves quickly.',
  },
  {
    title: 'Measurable Direction',
    description:
      'Creative quality and conversion tracking are planned together so performance informs every next step.',
  },
];

export function ProcessPage() {
  const [selectedStageIndex, setSelectedStageIndex] = useState(0);
  const selectedStage = PROCESS_STAGES[selectedStageIndex];

  return (
    <Layout activePage="process">
      <PageHero
        sectionLabel="Our Process"
        headline="Clear thinking."
        accentHeadline="Thoughtful execution."
        description="A six-stage collaborative framework designed to move ambitious brands from initial discovery to scalable, measurable growth."
      />

      {/* Interactive Stage Spotlight */}
      <section className="border-b border-white/12 bg-[#101010] text-[#F7F6F2]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-semibold tracking-wide text-[#B69AFF]">
              Interactive Stage Walkthrough
            </p>
            <button
              type="button"
              onClick={() =>
                setSelectedStageIndex(prev => (prev + 1) % PROCESS_STAGES.length)
              }
              className="inline-flex min-h-[38px] items-center gap-2 rounded-[8px] border border-white/12 px-3 py-1.5 text-xs font-semibold text-[#F7F6F2] transition-all hover:border-[#B69AFF] hover:text-[#B69AFF] active:scale-[0.97] sm:border-transparent sm:px-0"
            >
              Next stage
              <ArrowRight className="h-3.5 w-3.5 text-[#B69AFF]" aria-hidden="true" />
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Interactive process stages"
            className="no-scrollbar -mx-5 mt-3.5 flex snap-x snap-mandatory gap-2 overflow-x-auto px-5 sm:mx-0 sm:mt-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6"
          >
            {PROCESS_STAGES.map((stage, idx) => {
              const isSelected = idx === selectedStageIndex;
              return (
                <button
                  key={stage.number}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedStageIndex(idx)}
                  className={`flex min-h-[54px] w-[118px] shrink-0 snap-start flex-col items-start rounded-[8px] border p-2.5 text-left transition-all duration-150 active:scale-[0.97] sm:min-h-[60px] sm:w-auto sm:shrink sm:p-3 ${
                    isSelected
                      ? 'border-[#B69AFF] bg-[#B69AFF] text-[#101010]'
                      : 'border-white/15 bg-[#16161A] text-[#F7F6F2] hover:border-[#B69AFF]'
                  }`}
                >
                  <span
                    className={`tabular-nums text-[11px] font-semibold ${
                      isSelected ? 'text-[#101010]' : 'text-[#B69AFF]'
                    }`}
                  >
                    {stage.number}
                  </span>
                  <span className="font-display mt-0.5 text-xs font-semibold sm:mt-1 sm:text-sm">
                    {stage.title}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStage.number}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0}}
              transition={{duration: 0.22, ease: [0.16, 1, 0.3, 1]}}
              className="mt-3.5 grid grid-cols-1 gap-4 rounded-[10px] border border-white/12 bg-[#16161A] p-4 sm:mt-5 sm:gap-6 sm:p-6 lg:grid-cols-12"
            >
              <div className="lg:col-span-7">
                <p className="tabular-nums text-xs font-semibold text-[#B69AFF]">
                  Stage {selectedStage.number} · {selectedStage.title}
                </p>
                <h2 className="display-sub mt-1 text-[#F7F6F2]">
                  {selectedStage.subtitle}
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-[#B4B4BC] sm:mt-2 sm:text-sm">
                  {selectedStage.description}
                </p>
              </div>
              <div className="border-t border-white/12 pt-3 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <p className="text-xs font-semibold tracking-wide text-[#B69AFF]">
                  Core Activities
                </p>
                <ul className="mt-2 space-y-1.5 text-xs text-[#F7F6F2] sm:text-sm">
                  {selectedStage.activities.map(activity => (
                    <li key={activity} className="flex items-center gap-2">
                      <span aria-hidden="true" className="text-xs text-[#B69AFF]">
                        /
                      </span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-white/12 pt-2.5 text-xs leading-relaxed text-[#B4B4BC]">
                  <span className="font-semibold text-[#F7F6F2]">Stage Outcome: </span>
                  {selectedStage.outcome}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Complete 6-Stage Timeline Section */}
      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Full Sequence
              </p>
              <h2 className="display-section mt-1.5 text-[#111114] sm:mt-2">
                Six disciplined stages from first conversation to scale.
              </h2>
            </div>
            <span className="shrink-0 text-xs font-medium text-[#52525B] md:hidden">
              Swipe 01–06 →
            </span>
          </div>

          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-7 md:block md:overflow-visible md:border-t md:border-black/15 md:px-0 md:pb-0">
            {PROCESS_STAGES.map(stage => (
              <article
                key={stage.number}
                className="flex w-[80vw] max-w-[300px] shrink-0 snap-start flex-col justify-between rounded-[10px] border border-black/12 bg-[#FFFFFF] p-4 md:grid md:w-auto md:max-w-none md:shrink md:grid-cols-12 md:gap-6 md:rounded-none md:border-x-0 md:border-b md:border-t-0 md:border-black/15 md:bg-transparent md:px-0 md:py-5"
              >
                <div className="md:col-span-4">
                  <span className="tabular-nums text-xs font-semibold text-[#6D48C5]">
                    Stage {stage.number} / 06
                  </span>
                  <h3 className="font-display mt-1 text-base font-semibold text-[#111114] sm:text-lg">
                    {stage.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-[#52525B] sm:text-sm">
                    {stage.subtitle}
                  </p>
                </div>

                <div className="mt-2.5 md:col-span-5 md:mt-0">
                  <p className="text-xs leading-relaxed text-[#52525B] sm:text-sm">
                    {stage.description}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-[#111114]">
                    {stage.activities.map(activity => (
                      <li key={activity} className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-xs text-[#6D48C5]">
                          /
                        </span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 rounded-[8px] border border-black/10 bg-[#F7F6F2] p-3 md:col-span-3 md:mt-0 md:bg-[#FFFFFF] md:p-4">
                  <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                    Stage Outcome
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#111114]">
                    {stage.outcome}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Principles Band */}
      <section className="bg-[#B69AFF] text-[#101010]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#101010]/80">
                A Better Agency Partnership
              </p>
              <h2 className="display-section mt-1.5 max-w-3xl text-[#101010] sm:mt-2">
                Clarity at every step. Progress you can evaluate.
              </h2>
            </div>
            <span className="shrink-0 text-xs font-medium text-[#101010]/80 md:hidden">
              Swipe →
            </span>
          </div>

          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-7 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {PARTNERSHIP_PRINCIPLES.map(item => (
              <div
                key={item.title}
                className="w-[78vw] max-w-[290px] shrink-0 snap-start rounded-[10px] border border-[#101010]/20 bg-[#FFFFFF]/25 p-4 md:w-auto md:max-w-none md:shrink md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-[#101010]/25 md:bg-transparent md:px-0 md:pb-0 md:pt-4"
              >
                <h3 className="font-display text-base font-semibold text-[#101010] sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#101010]/85 sm:text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Let's Get Started"
        headline="Tell us where"
        accentWord="you want to go."
        description="Begin with Stage 01: a focused discovery conversation about your brand, market, and growth goals."
        buttonLabel="Start a Project"
        href="/contact.html"
      />
    </Layout>
  );
}
