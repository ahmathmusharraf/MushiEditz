import {ArrowUpRight} from 'lucide-react';
import {CtaBand} from '../components/CtaBand';
import {FounderPortraitFrame} from '../components/FounderPortraitFrame';
import {Layout} from '../components/Layout';
import {PageHero} from '../components/PageHero';
import {SERVICES_DATA, STUDIO_INFO} from '../data/agencyData';

const CORE_VALUES = [
  {
    number: '01',
    title: 'Creativity',
    description: 'Original thinking and purposeful execution.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Every activity starts with an objective.',
  },
  {
    number: '03',
    title: 'Innovation',
    description: 'Practical use of modern tools and technology.',
  },
  {
    number: '04',
    title: 'Transparency',
    description: 'Clear communication and honest reporting.',
  },
  {
    number: '05',
    title: 'Performance',
    description: 'Measure, learn and improve.',
  },
  {
    number: '06',
    title: 'Partnership',
    description: 'Build lasting client relationships.',
  },
];

const DIFFERENCES = [
  {
    title: 'One Connected Team',
    detail:
      'Instead of coordinating separate branding freelancers, production crews, media buyers, and web developers, our multidisciplinary workflow keeps every discipline aligned under one master brand.',
  },
  {
    title: 'Built Around Outcomes',
    detail:
      'A campaign cannot outperform a weak landing experience, and a website cannot convert without clear positioning. We solve the full chain.',
  },
  {
    title: 'Direct Founder Involvement',
    detail:
      'Clients work directly with strategic and creative leadership rather than getting handed off to disconnected account layers.',
  },
];

const MARKETS = [
  {
    number: '01',
    region: 'Sri Lanka',
    role: 'Home Foundation & Studio Operations',
    description:
      'Deep understanding of local commercial landscapes, emerging consumer brands, and regional growth opportunities.',
  },
  {
    number: '02',
    region: 'United Arab Emirates',
    role: 'Regional Expansion & High-Growth Markets',
    description:
      'Supporting ambitious businesses across Dubai and the wider UAE with elevated brand positioning, content production, and demand generation.',
  },
  {
    number: '03',
    region: 'Worldwide',
    role: 'Borderless Remote Partnerships',
    description:
      'Collaborating smoothly across time zones with international founders, B2B teams, and digital-first brands.',
  },
];

export function AboutPage() {
  return (
    <Layout activePage="about">
      {/* 1. About the Agency */}
      <PageHero
        sectionLabel="About the Studio"
        headline="Built on ideas."
        accentHeadline="Driven by measurable growth."
        description={STUDIO_INFO.positioning}
      />

      {/* 2. Our Story */}
      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
            Our Story
          </p>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:mt-4 sm:gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <h2 className="display-section text-[#111114]">
                Creative thinking paired with commercial purpose.
              </h2>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-[#52525B] sm:text-base lg:col-span-6">
              <p>
                {STUDIO_INFO.brandPromise}
              </p>
              <p>
                Mushi Digital Growth Studio was established to bridge a persistent gap in the agency landscape: creative studios often overlook commercial conversion, while performance agencies neglect brand identity and visual craft.
              </p>
              <p className="hidden sm:block">
                We built an integrated studio model where brand positioning, photography, video production, paid acquisition, web experiences, and workflow automation reinforce one another—giving ambitious businesses one digital growth partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision and Mission */}
      <section className="border-y border-black/10 bg-[#FFFFFF] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="mb-3 flex items-center justify-between md:hidden">
            <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
              Direction
            </p>
            <span className="text-xs font-medium text-[#52525B]">Swipe →</span>
          </div>
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:px-0 lg:gap-12">
            <div className="w-[84vw] max-w-[330px] shrink-0 snap-start rounded-[10px] border border-black/10 bg-[#F7F6F2] p-4 sm:p-5 md:w-auto md:max-w-none md:shrink md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-black/15 md:bg-transparent md:px-0 md:pb-0 md:pt-5">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Our Vision
              </p>
              <h2 className="display-sub mt-2 text-[#111114] sm:mt-3">
                {STUDIO_INFO.vision}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#52525B] sm:mt-3 sm:text-sm">
                We envision businesses across Sri Lanka, the UAE, and global markets competing with world-class creative standards and disciplined digital infrastructure.
              </p>
            </div>

            <div className="w-[84vw] max-w-[330px] shrink-0 snap-start rounded-[10px] border border-black/10 bg-[#F7F6F2] p-4 sm:p-5 md:w-auto md:max-w-none md:shrink md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-black/15 md:bg-transparent md:px-0 md:pb-0 md:pt-5">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Our Mission
              </p>
              <h2 className="display-sub mt-2 text-[#111114] sm:mt-3">
                {STUDIO_INFO.mission}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#52525B] sm:mt-3 sm:text-sm">
                Every brief is approached with thorough discovery, intentional creative direction, and continuous optimisation so client investments translate into real momentum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Our Core Values (6 Brand Values) */}
      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                What We Stand For
              </p>
              <h2 className="display-section mt-1.5 text-[#111114] sm:mt-2">
                Six core values behind every brief.
              </h2>
            </div>
            <span className="shrink-0 text-xs font-medium text-[#52525B] sm:hidden">
              Swipe 01–06 →
            </span>
          </div>

          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 sm:mx-0 sm:mt-7 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            {CORE_VALUES.map(value => (
              <div
                key={value.number}
                className="w-[72vw] max-w-[270px] shrink-0 snap-start rounded-[10px] border border-black/12 bg-[#FFFFFF] p-4 sm:w-auto sm:max-w-none sm:shrink sm:rounded-none sm:border-x-0 sm:border-b-0 sm:border-t sm:border-black/15 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-4"
              >
                <span className="tabular-nums text-[11px] font-semibold text-[#6D48C5]">
                  {value.number} / 06
                </span>
                <h3 className="font-display mt-1.5 text-base font-semibold text-[#111114]">
                  {value.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-[#52525B] sm:text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. What Makes Us Different */}
      <section className="bg-[#B69AFF] text-[#101010]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#101010]/80">
                What Makes Us Different
              </p>
              <h2 className="display-section mt-1.5 max-w-3xl text-[#101010] sm:mt-2">
                One partner. Multiple possibilities.
              </h2>
            </div>
            <span className="shrink-0 text-xs font-medium text-[#101010]/80 md:hidden">
              Swipe →
            </span>
          </div>

          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-7 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {DIFFERENCES.map(item => (
              <div
                key={item.title}
                className="w-[80vw] max-w-[300px] shrink-0 snap-start rounded-[10px] border border-[#101010]/20 bg-[#FFFFFF]/25 p-4 md:w-auto md:max-w-none md:shrink md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-[#101010]/25 md:bg-transparent md:px-0 md:pb-0 md:pt-4"
              >
                <h3 className="font-display text-base font-semibold text-[#101010] sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#101010]/85 sm:text-sm">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Founder Profile — Ahmath Musharraf */}
      <section className="bg-[#101010] text-[#F7F6F2]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <FounderPortraitFrame variant="editorial" />
            </div>

            <div className="lg:col-span-8">
              <p className="text-xs font-medium tracking-wide text-[#B69AFF]">
                Founder &amp; Creative Director
              </p>
              <h2 className="display-section mt-1.5 text-[#F7F6F2] sm:mt-2">
                {STUDIO_INFO.founder}
              </h2>
              <div className="mt-3 space-y-2.5 text-xs leading-relaxed text-[#B4B4BC] sm:mt-4 sm:space-y-3 sm:text-sm">
                <p>
                  Ahmath Musharraf leads Mushi Digital Growth Studio with a multidisciplinary background spanning digital marketing strategy, creative direction, brand identity, photography, video production, and modern digital experiences.
                </p>
                <p className="hidden sm:block">
                  Having worked across both brand storytelling and performance execution, Ahmath founded the studio around a clear conviction: businesses achieve sustainable momentum when strategic clarity and creative excellence operate as one unified system rather than isolated departments.
                </p>
                <p>
                  His leadership centres on listening deeply to founders and commercial teams, identifying high-leverage growth opportunities, and turning thoughtful strategy into work people immediately trust.
                </p>
              </div>

              <div className="mt-4 border-t border-white/12 pt-3 sm:mt-5 sm:pt-4">
                <p className="font-display text-sm font-semibold text-[#F7F6F2]">
                  {STUDIO_INFO.founder}
                </p>
                <p className="mt-0.5 text-xs text-[#B4B4BC]">
                  {STUDIO_INFO.founderRole} · {STUDIO_INFO.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Our Experience & Expertise */}
      <section className="bg-[#FFFFFF] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-end lg:gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Service Architecture
              </p>
              <h2 className="display-section mt-1.5 text-[#111114] sm:mt-2">
                Five capabilities, one master brand.
              </h2>
            </div>
            <div className="flex items-center justify-between gap-4">
              <a
                href="/services.html"
                className="inline-flex min-h-[36px] shrink-0 items-center gap-2 whitespace-nowrap text-xs font-semibold text-[#111114] transition-colors hover:text-[#6D48C5] sm:text-sm"
              >
                Explore detailed services
                <ArrowUpRight className="h-4 w-4 text-[#6D48C5]" aria-hidden="true" />
              </a>
              <span className="text-xs font-medium text-[#52525B] md:hidden">
                Swipe →
              </span>
            </div>
          </div>

          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-6 md:block md:overflow-visible md:border-t md:border-black/10 md:px-0 md:pb-0">
            {SERVICES_DATA.map(service => (
              <div
                key={service.id}
                className="flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col justify-between rounded-[10px] border border-black/12 bg-[#F7F6F2] p-4 md:grid md:w-auto md:max-w-none md:shrink md:grid-cols-12 md:items-baseline md:gap-6 md:rounded-none md:border-x-0 md:border-b md:border-t-0 md:border-black/10 md:bg-transparent md:px-0 md:py-4"
              >
                <span className="tabular-nums text-xs font-semibold text-[#6D48C5] md:col-span-1">
                  {service.number}
                </span>
                <h3 className="font-display mt-1.5 text-base font-semibold text-[#111114] md:col-span-4 md:mt-0">
                  {service.title}
                </h3>
                <p className="mt-1.5 text-xs text-[#52525B] sm:text-sm md:col-span-7 md:mt-0">
                  {service.capabilities.join(' · ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Global Presence */}
      <section className="bg-[#F7F6F2] text-[#111114]">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="flex items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#6D48C5]">
                Global Presence
              </p>
              <h2 className="display-section mt-1.5 text-[#111114] sm:mt-2">
                Local insight. International perspective.
              </h2>
            </div>
            <span className="shrink-0 text-xs font-medium text-[#52525B] md:hidden">
              Swipe →
            </span>
          </div>

          <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1 md:mx-0 md:mt-6 md:block md:overflow-visible md:border-t md:border-black/15 md:px-0 md:pb-0">
            {MARKETS.map(market => (
              <div
                key={market.number}
                className="flex w-[80vw] max-w-[300px] shrink-0 snap-start flex-col rounded-[10px] border border-black/12 bg-[#FFFFFF] p-4 md:grid md:w-auto md:max-w-none md:shrink md:grid-cols-12 md:items-center md:gap-6 md:rounded-none md:border-x-0 md:border-b md:border-t-0 md:border-black/15 md:bg-transparent md:px-0 md:py-4"
              >
                <span className="tabular-nums text-xs font-semibold text-[#6D48C5] md:col-span-1">
                  {market.number}
                </span>
                <div className="mt-1.5 md:col-span-4 md:mt-0">
                  <h3 className="font-display text-base font-semibold text-[#111114] sm:text-lg">
                    {market.region}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-[#52525B]">
                    {market.role}
                  </p>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#52525B] sm:text-sm md:col-span-7 md:mt-0">
                  {market.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact CTA */}
      <CtaBand
        kicker="Work With Us"
        headline="Let's build something"
        accentWord="worth remembering."
        description="Ready to discuss branding, digital campaigns, content production, or web development? Start a direct conversation with our studio."
        buttonLabel="Let's Talk Growth"
        href="/contact.html"
      />
    </Layout>
  );
}
