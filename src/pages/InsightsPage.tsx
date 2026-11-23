import {useMemo, useState} from 'react';
import {ArrowLeft, ArrowUpRight, Search, X} from 'lucide-react';
import {CtaBand} from '../components/CtaBand';
import {Layout} from '../components/Layout';
import {MediaFrame} from '../components/MediaFrame';
import {PageHero} from '../components/PageHero';
import {
  INSIGHT_CATEGORIES,
  type InsightArticle,
  type InsightCategory,
  INSIGHTS_ARTICLES,
  STUDIO_INFO,
} from '../data/agencyData';

export function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState<InsightCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = useMemo(
    () => INSIGHTS_ARTICLES.find(a => a.id === selectedArticleId) || null,
    [selectedArticleId]
  );

  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return [];
    const sameCategory = INSIGHTS_ARTICLES.filter(
      article =>
        article.id !== selectedArticle.id &&
        article.category === selectedArticle.category
    );
    const others = INSIGHTS_ARTICLES.filter(
      article =>
        article.id !== selectedArticle.id &&
        article.category !== selectedArticle.category
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [selectedArticle]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return INSIGHTS_ARTICLES.filter(article => {
      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory;
      const matchesQuery =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    if (activeCategory !== 'All' || searchQuery.trim() !== '') return null;
    return filteredArticles.find(a => a.featured) || filteredArticles[0] || null;
  }, [activeCategory, searchQuery, filteredArticles]);

  const gridArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    return filteredArticles.filter(a => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  const openArticle = (article: InsightArticle) => {
    setSelectedArticleId(article.id);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <Layout activePage="insights">
      {!selectedArticle ? (
        <>
          <PageHero
            sectionLabel="Insights & Perspectives"
            headline="Ideas to help your"
            accentHeadline="brand move forward."
            description="Practical thinking on digital marketing, social storytelling, branding, advertising, visual production, web engineering, and AI automation."
          />

          <section className="bg-[#F7F6F2] text-[#111114]">
            <div className="mx-auto w-full max-w-[1320px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              {/* Demonstration Content Notice */}
              <div className="mb-4 rounded-[8px] border border-black/12 bg-[#FFFFFF] p-3.5 sm:mb-6 sm:p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-xs font-semibold tracking-wide text-[#6D48C5]">
                    Editorial Preview Notice
                  </p>
                  <span className="text-[11px] font-medium text-[#52525B] md:hidden">
                    Swipe articles →
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#52525B] sm:line-clamp-none">
                  The articles below are demonstration editorial samples structured across all seven agency disciplines. Full studio essays and client research notes will replace these samples as publications go live.
                </p>
              </div>

              {/* Search & Category Controls */}
              <div className="flex flex-col gap-3 border-b border-black/12 pb-3.5 sm:gap-4 sm:pb-4">
                <div className="relative max-w-md">
                  <label htmlFor="insights-search" className="sr-only">
                    Search insights articles
                  </label>
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#52525B]"
                    aria-hidden="true"
                  />
                  <input
                    id="insights-search"
                    type="search"
                    value={searchQuery}
                    onChange={event => setSearchQuery(event.target.value)}
                    placeholder="Search articles by topic or keyword..."
                    className="min-h-[42px] w-full rounded-[8px] border border-black/15 bg-[#FFFFFF] pl-10 pr-10 text-base text-[#111114] placeholder:text-[#52525B]/75 focus:border-[#6D48C5] focus:outline-none sm:rounded-[6px] sm:text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search query"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#52525B] hover:text-[#111114]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <div
                  role="group"
                  aria-label="Filter insights by category"
                  className="no-scrollbar -mx-5 flex items-center gap-1.5 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:gap-2 sm:px-0"
                >
                  {INSIGHT_CATEGORIES.map(category => {
                    const isSelected = activeCategory === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        aria-pressed={isSelected}
                        className={`min-h-[38px] shrink-0 whitespace-nowrap rounded-[8px] px-3 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                          isSelected
                            ? 'bg-[#101010] text-[#F7F6F2]'
                            : 'border border-black/12 bg-[#FFFFFF] text-[#52525B] hover:border-[#6D48C5] hover:text-[#111114]'
                        }`}
                      >
                        {category}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Unified Swipe-Snap Article Deck (< md) */}
              {filteredArticles.length > 0 && (
                <div className="no-scrollbar -mx-5 mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:hidden">
                  {filteredArticles.map((article, idx) => (
                    <article
                      key={article.id}
                      className="group flex w-[80vw] max-w-[305px] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] border border-black/10 bg-[#FFFFFF]"
                    >
                      <button
                        type="button"
                        onClick={() => openArticle(article)}
                        className="flex h-full flex-col text-left"
                      >
                        <MediaFrame
                          src={article.image}
                          alt={article.imageAlt}
                          aspectClassName="aspect-[16/10]"
                          fallbackTitle={article.title}
                        />
                        <div className="flex flex-1 flex-col justify-between p-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#52525B]">
                              <span className="font-semibold text-[#6D48C5]">
                                {idx === 0 && activeCategory === 'All' ? 'Featured' : article.category}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums">{article.readingTime}</span>
                            </div>
                            <h3 className="font-display mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-[#111114]">
                              {article.title}
                            </h3>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#52525B]">
                              {article.excerpt}
                            </p>
                          </div>
                          <span className="mt-3 inline-flex min-h-[32px] items-center gap-1.5 text-xs font-semibold text-[#111114]">
                            Read article
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#6D48C5]" aria-hidden="true" />
                          </span>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              )}

              {/* Featured Article (Desktop / Tablet) */}
              {featuredArticle && (
                <article className="group mt-6 hidden overflow-hidden rounded-[10px] border border-black/10 bg-[#FFFFFF] md:block">
                  <button
                    type="button"
                    onClick={() => openArticle(featuredArticle)}
                    className="grid w-full grid-cols-1 text-left lg:grid-cols-12 lg:items-stretch"
                  >
                    <div className="lg:col-span-5">
                      <MediaFrame
                        src={featuredArticle.image}
                        alt={featuredArticle.imageAlt}
                        aspectClassName="aspect-[16/10] lg:h-full"
                        imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        fallbackTitle={featuredArticle.title}
                      />
                    </div>
                    <div className="flex flex-col justify-between p-5 sm:p-6 lg:col-span-7">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#52525B]">
                          <span className="font-semibold text-[#6D48C5]">
                            Featured
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{featuredArticle.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {featuredArticle.readingTime}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{featuredArticle.publishedLabel}</span>
                        </div>
                        <h2 className="display-sub mt-2.5 text-[#111114] transition-colors group-hover:text-[#6D48C5]">
                          {featuredArticle.title}
                        </h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#52525B]">
                          {featuredArticle.excerpt}
                        </p>
                      </div>
                      <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#111114]">
                        Read sample article
                        <ArrowUpRight className="h-4 w-4 text-[#6D48C5]" aria-hidden="true" />
                      </span>
                    </div>
                  </button>
                </article>
              )}

              {/* Article Cards Grid (Desktop / Tablet) */}
              {gridArticles.length > 0 ? (
                <div className="mt-6 hidden grid-cols-1 gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
                  {gridArticles.map(article => (
                    <article
                      key={article.id}
                      className="group flex flex-col overflow-hidden rounded-[10px] border border-black/10 bg-[#FFFFFF] transition-colors hover:border-[#6D48C5]/50"
                    >
                      <button
                        type="button"
                        onClick={() => openArticle(article)}
                        className="flex h-full flex-col text-left"
                      >
                        <MediaFrame
                          src={article.image}
                          alt={article.imageAlt}
                          aspectClassName="aspect-[16/10]"
                          imgClassName="transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                          fallbackTitle={article.title}
                        />
                        <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                          <div>
                            <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#52525B]">
                              <span className="font-semibold text-[#6D48C5]">
                                {article.category}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums">
                                {article.readingTime}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{article.publishedLabel}</span>
                            </div>
                            <h3 className="font-display mt-2 line-clamp-2 text-base font-semibold leading-snug text-[#111114] transition-colors group-hover:text-[#6D48C5]">
                              {article.title}
                            </h3>
                            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#52525B]">
                              {article.excerpt}
                            </p>
                          </div>
                          <span className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111114]">
                            Read article
                            <ArrowUpRight className="h-3.5 w-3.5 text-[#6D48C5]" aria-hidden="true" />
                          </span>
                        </div>
                      </button>
                    </article>
                  ))}
                </div>
              ) : (
                !featuredArticle && (
                  <div className="mt-12 rounded-[10px] border border-black/10 bg-[#FFFFFF] p-10 text-center">
                    <p className="font-display text-lg font-semibold text-[#111114]">
                      No matching articles found
                    </p>
                    <p className="mt-2 text-sm text-[#52525B]">
                      Try clearing your search keyword or selecting another category.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory('All');
                        setSearchQuery('');
                      }}
                      className="mt-5 inline-flex min-h-[42px] items-center justify-center rounded-[6px] bg-[#0B0B0E] px-5 py-2.5 text-xs font-semibold text-[#F7F6F2]"
                    >
                      Reset filters
                    </button>
                  </div>
                )
              )}
            </div>
          </section>
        </>
      ) : (
        /* Article Detail View */
        <article className="bg-[#F7F6F2] text-[#111114]">
          <div className="border-b border-white/12 bg-[#0B0B0E] text-[#F7F6F2]">
            <div className="mx-auto max-w-[960px] px-5 py-7 sm:px-8 sm:py-10 lg:py-12">
              <button
                type="button"
                onClick={() => setSelectedArticleId(null)}
                className="inline-flex min-h-[38px] items-center gap-2 text-xs font-semibold text-[#B69AFF] transition-colors hover:text-[#C8B2FF]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to all insights
              </button>

              <div className="mt-4 flex flex-wrap items-center gap-2.5 text-xs text-[#B4B4BC]">
                <span className="font-semibold text-[#B69AFF]">
                  {selectedArticle.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{selectedArticle.readingTime}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.publishedLabel}</span>
              </div>

              <h1 className="display-section mt-3 text-[#F7F6F2]">
                {selectedArticle.title}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-[#B4B4BC] sm:text-base">
                {selectedArticle.excerpt}
              </p>

              <p className="mt-4 text-xs text-[#B4B4BC]">
                By {STUDIO_INFO.founder} · {STUDIO_INFO.name}
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-[960px] px-5 py-7 sm:px-8 sm:py-10">
            <MediaFrame
              src={selectedArticle.image}
              alt={selectedArticle.imageAlt}
              aspectClassName="aspect-[16/9]"
              className="rounded-[10px] border border-black/10"
              fallbackTitle={selectedArticle.title}
            />

            <div className="mt-6 space-y-6 border-b border-black/12 pb-8">
              {selectedArticle.sections.map(section => (
                <section key={section.heading}>
                  <h2 className="display-sub text-[#111114]">
                    {section.heading}
                  </h2>
                  <div className="mt-2.5 space-y-3 text-sm leading-relaxed text-[#52525B] sm:text-base">
                    {section.paragraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}

              <p className="rounded-[8px] border border-black/10 bg-[#FFFFFF] p-3.5 text-xs text-[#52525B]">
                Demonstration Editorial Note: This article is sample studio content illustrating the Insights reader structure until live articles are published.
              </p>
            </div>

            {/* Related Articles */}
            <div className="mt-8">
              <h2 className="font-display text-lg font-semibold text-[#111114]">
                Related Insights
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {relatedArticles.map(rel => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => openArticle(rel)}
                    className="group flex flex-col overflow-hidden rounded-[8px] border border-black/10 bg-[#FFFFFF] p-4 text-left transition-colors hover:border-[#6D48C5]"
                  >
                    <div className="flex items-center gap-2 text-xs text-[#52525B]">
                      <span className="font-semibold text-[#6D48C5]">
                        {rel.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{rel.readingTime}</span>
                    </div>
                    <h3 className="font-display mt-2 text-sm font-semibold leading-snug text-[#111114] group-hover:text-[#6D48C5]">
                      {rel.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </article>
      )}

      <CtaBand
        kicker="Have a Question?"
        headline="Let's talk about"
        accentWord="what's next."
        description="Whether you want to audit an existing campaign or launch a new digital presence, we are ready to help."
        buttonLabel="Get in Touch"
        href="/contact.html"
      />
    </Layout>
  );
}
