import {useState} from 'react';
import {ArrowUpRight, Check, ChevronDown} from 'lucide-react';
import {CtaBand} from '../components/CtaBand';
import {Layout} from '../components/Layout';
import {MediaFrame} from '../components/MediaFrame';
import {PageHero} from '../components/PageHero';
import {AGENCY_FAQS, SERVICES_DATA} from '../data/agencyData';

export function ServicesPage() {
  const [mobileTabs, setMobileTabs] = useState<Record<string, 'included' | 'benefits'>>({});
  const [openFaqId, setOpenFaqId] = useState<string>(AGENCY_FAQS[0].id);

  return (
    <Layout activePage="services">
      <PageHero
        sectionLabel="Services & Capabilities"
        headline="Connected capabilities"
        accentHeadline="engineered for growth."
        description="Engage Mushi Digital Growth Studio for a focused discipline or combine all five categories into a single integrated growth partnership."
      />

      {/* Quick Anchor Jump Bar */}
      <nav
        aria-label="Service category jump links"
        className="border-b border-black/10 bg-[#FFFFFF]"
      >
        <div className="no-scrollbar mx-auto flex max-w-[1320px] items-center gap-2 overflow-x-auto px-5 py-2.5 sm:px-8 lg:px-10">
          {SERVICES_DATA.map(service => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="inline-flex min-h-[38px] shrink-0 items-center gap-2 whitespace-nowrap rounded-[8px] border border-black/10 bg-[#F7F6F2] px-3 py-1.5 text-xs font-semibold text-[#111114] transition-all hover:border-[#6D48C5] hover:text-[#6D48C5] active:scale-[0.98]"
            >
              <span className="tabular-nums text-[#6D48C5]">{service.number}</span>
              <span>{service.shortTitle}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Five Detailed Service Sections */}
      <div className="bg-[#F7F6F2] text-[#111114]">
        {SERVICES_DATA.map((service, index) => {
          const isDarkBand = index % 2 === 1;
          const activeMobileTab = mobileTabs[service.id] ?? 'included';
          return (
            <section
              key={service.id}
              id={service.id}
              className={`scroll-mt-24 border-b ${
                isDarkBand
                  ? 'border-white/12 bg-[#0B0B0E] text-[#F7F6F2]'
                  : 'border-black/10 bg-[#F7F6F2] text-[#111114]'
              }`}
            >
              <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
                <div className="grid grid-cols-1 items-center gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-10">
                  {/* Text & Capabilities */}
                  <div
                    className={`lg:col-span-7 ${
                      index % 2 === 1 ? 'lg:order-2' : ''
                    }`}
                  >
                    <p
                      className={`tabular-nums text-xs font-semibold tracking-wide ${
                        isDarkBand ? 'text-[#B69AFF]' : 'text-[#6D48C5]'
                      }`}
                    >
                      Service {service.number} / 0{SERVICES_DATA.length}
                    </p>

                    <h2 className="display-sub mt-1.5 sm:text-3xl">
                      {service.title}
                    </h2>

                    <p
                      className={`mt-2 text-sm leading-relaxed sm:mt-2.5 sm:text-base ${
                        isDarkBand ? 'text-[#B4B4BC]' : 'text-[#52525B]'
                      }`}
                    >
                      {service.description}
                    </p>

                    {/* Mobile Segmented Switcher */}
                    <div className="mt-3.5 flex gap-2 sm:hidden" role="tablist" aria-label={`${service.title} details`}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeMobileTab === 'included'}
                        onClick={() =>
                          setMobileTabs(prev => ({...prev, [service.id]: 'included'}))
                        }
                        className={`min-h-[38px] flex-1 rounded-[8px] px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                          activeMobileTab === 'included'
                            ? isDarkBand
                              ? 'bg-[#B69AFF] text-[#0B0B0E]'
                              : 'bg-[#0B0B0E] text-[#F7F6F2]'
                            : isDarkBand
                            ? 'border border-white/15 text-[#B4B4BC]'
                            : 'border border-black/15 text-[#52525B]'
                        }`}
                      >
                        What is Included
                      </button>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={activeMobileTab === 'benefits'}
                        onClick={() =>
                          setMobileTabs(prev => ({...prev, [service.id]: 'benefits'}))
                        }
                        className={`min-h-[38px] flex-1 rounded-[8px] px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                          activeMobileTab === 'benefits'
                            ? isDarkBand
                              ? 'bg-[#B69AFF] text-[#0B0B0E]'
                              : 'bg-[#0B0B0E] text-[#F7F6F2]'
                            : isDarkBand
                            ? 'border border-white/15 text-[#B4B4BC]'
                            : 'border border-black/15 text-[#52525B]'
                        }`}
                      >
                        Client Benefits
                      </button>
                    </div>

                    {/* Included Services List */}
                    <div
                      className={`mt-3.5 border-t pt-3.5 sm:mt-5 sm:block sm:pt-4 ${
                        activeMobileTab === 'included' ? 'block' : 'hidden'
                      } ${isDarkBand ? 'border-white/12' : 'border-black/12'}`}
                    >
                      <h3 className="hidden font-display text-xs font-semibold tracking-wider uppercase opacity-75 sm:block">
                        What is Included
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:mt-2.5 sm:gap-x-5 sm:gap-y-2">
                        {service.capabilities.map(item => (
                          <div
                            key={item}
                            className={`flex items-center gap-2 border-b pb-1.5 text-xs font-medium sm:text-sm ${
                              isDarkBand
                                ? 'border-white/10 text-[#F7F6F2]'
                                : 'border-black/8 text-[#111114]'
                            }`}
                          >
                            <span
                              aria-hidden="true"
                              className={`text-xs ${
                                isDarkBand ? 'text-[#B69AFF]' : 'text-[#6D48C5]'
                              }`}
                            >
                              /
                            </span>
                            <span className="truncate sm:whitespace-normal">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Client Benefits */}
                    <div
                      className={`mt-3.5 sm:mt-5 sm:block ${
                        activeMobileTab === 'benefits' ? 'block' : 'hidden'
                      }`}
                    >
                      <h3 className="hidden font-display text-xs font-semibold tracking-wider uppercase opacity-75 sm:block">
                        Client Benefits
                      </h3>
                      <ul className="space-y-1.5 sm:mt-2">
                        {service.benefits.map(benefit => (
                          <li
                            key={benefit}
                            className={`flex items-start gap-2 text-xs sm:text-sm ${
                              isDarkBand ? 'text-[#B4B4BC]' : 'text-[#52525B]'
                            }`}
                          >
                            <Check
                              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                                isDarkBand ? 'text-[#B69AFF]' : 'text-[#6D48C5]'
                              }`}
                              aria-hidden="true"
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 sm:mt-5">
                      <a
                        href={`/contact.html?service=${encodeURIComponent(service.title)}`}
                        className={`inline-flex min-h-[42px] w-full items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-5 py-2.5 text-xs font-semibold transition-all active:scale-[0.98] sm:w-auto sm:rounded-[6px] sm:text-sm ${
                          isDarkBand
                            ? 'bg-[#B69AFF] text-[#0B0B0E] hover:bg-[#C8B2FF]'
                            : 'bg-[#0B0B0E] text-[#F7F6F2] hover:bg-[#23232B]'
                        }`}
                      >
                        {service.ctaLabel}
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Visual Column */}
                  <div
                    className={`order-first lg:order-none lg:col-span-5 ${
                      index % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                  >
                    <MediaFrame
                      src={service.image}
                      alt={service.imageAlt}
                      aspectClassName="aspect-[16/10]"
                      className={`rounded-[10px] border ${
                        isDarkBand ? 'border-white/12' : 'border-black/10'
                      }`}
                      fallbackTitle={service.title}
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Compact SEO & AIO FAQ Answer Hub */}
      <section className="border-t border-black/10 bg-[#FFFFFF] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                SEO, AIO &amp; Full Marketing FAQ
              </p>
              <h2 className="display-sub mt-1.5 text-[#111114]">
                Clear answers for search &amp; growth teams.
              </h2>
            </div>

            <div className="divide-y divide-black/10 border-y border-black/10 lg:col-span-8">
              {AGENCY_FAQS.map(faq => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 py-3.5 text-left"
                    >
                      <span className="font-display text-sm font-semibold text-[#111114] sm:text-base">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 text-[#6D48C5] transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <p className="pb-3.5 text-xs leading-relaxed text-[#52525B] sm:text-sm">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        kicker="Tailored Scope"
        headline="Not sure which combination"
        accentWord="fits best?"
        description="Share your current priorities and we will help structure a focused roadmap around your budget and timeline."
        buttonLabel="Discuss Your Project"
        href="/contact.html"
      />
    </Layout>
  );
}
