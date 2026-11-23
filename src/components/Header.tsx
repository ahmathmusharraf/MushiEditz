import {useEffect} from 'react';
import {AnimatePresence, motion} from 'motion/react';
import {ArrowUpRight, Menu, X} from 'lucide-react';
import {NAV_ITEMS, type PageId, STUDIO_INFO} from '../data/agencyData';
import {MushiPrimaryLogo} from './BrandMark';

interface HeaderProps {
  activePage: PageId;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export function Header({
  activePage,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
}: HeaderProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCloseMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const currentNavLabel =
    NAV_ITEMS.find(item => item.id === activePage)?.label || 'Home';

  return (
    <>
      <header className="relative z-50 border-b border-white/12 bg-[#101010]/95 backdrop-blur-md md:sticky md:top-0">
        <div className="mx-auto flex h-[56px] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 md:h-[72px] lg:h-[80px] lg:gap-8 lg:px-10">
          {/* Zone 1: Coded Studio Brand Lockup */}
          <a
            href="/index.html"
            aria-label="Mushi Digital Growth Studio home"
            className="group inline-flex shrink-0 items-center whitespace-nowrap transition-opacity hover:opacity-95"
          >
            <MushiPrimaryLogo
              variant="dark"
              size="sm"
              showIcon
              showTagline
              hideTaglineOnMobile
            />
          </a>

          {/* Mobile Contextual Page Label */}
          <span className="truncate text-xs font-medium text-[#B4B4BC] md:hidden">
            {currentNavLabel}
          </span>

          {/* Zone 2: Desktop Single-Line Navigation */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-4 lg:flex xl:gap-7"
          >
            {NAV_ITEMS.map(item => {
              const isActive = item.id === activePage;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative shrink-0 whitespace-nowrap py-2 text-[13px] font-medium transition-colors duration-150 ${
                    isActive
                      ? 'text-[#F7F6F2]'
                      : 'text-[#B4B4BC] hover:text-[#F7F6F2]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#B69AFF] transition-transform duration-200 ease-out ${
                      isActive
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile/Tablet Menu Trigger */}
          <div className="flex shrink-0 items-center gap-3">
            <a
              href="/contact.html"
              className="group hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-[6px] bg-[#B69AFF] px-4 py-2.5 text-[13px] font-semibold text-[#101010] transition-all duration-150 hover:bg-[#C8B2FF] hover:shadow-[0_6px_20px_rgba(182,154,255,0.22)] active:scale-[0.98] sm:inline-flex"
            >
              Start a Project
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </a>

            <button
              type="button"
              onClick={onToggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation-sheet"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] border border-white/15 text-[#F7F6F2] transition-colors hover:border-[#B69AFF] hover:text-[#B69AFF] active:scale-95 lg:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Animated Bottom Sheet Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[60] flex items-end lg:hidden">
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              transition={{duration: 0.2}}
              onClick={onCloseMenu}
              aria-hidden="true"
              className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            />

            <motion.div
              id="mobile-navigation-sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Studio navigation menu"
              initial={{y: '100%'}}
              animate={{y: 0}}
              exit={{y: '100%'}}
              transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
              className="pb-safe relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border-t border-white/15 bg-[#101010] px-6 pb-8 pt-3 text-[#F7F6F2]"
            >
              {/* Drag Handle & Sheet Header */}
              <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-white/25" />

              <div className="flex items-center justify-between border-b border-white/12 pb-4">
                <div>
                  <MushiPrimaryLogo
                    variant="dark"
                    size="sm"
                    showIcon
                    showTagline={false}
                  />
                  <p className="mt-1.5 text-[11px] text-[#B4B4BC]">
                    {STUDIO_INFO.locations}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCloseMenu}
                  aria-label="Close navigation menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/15 text-[#F7F6F2] active:scale-95"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <nav aria-label="Mobile sheet navigation" className="mt-2 flex flex-col">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = item.id === activePage;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      onClick={onCloseMenu}
                      className={`flex min-h-[54px] items-center justify-between border-b border-white/10 py-3 font-display text-lg font-medium transition-colors active:opacity-80 ${
                        isActive
                          ? 'text-[#B69AFF]'
                          : 'text-[#F7F6F2] hover:text-[#B69AFF]'
                      }`}
                    >
                      <span className="flex items-center gap-4">
                        <span className="tabular-nums text-xs text-[#B4B4BC]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span>{item.label}</span>
                      </span>
                      {isActive ? (
                        <span className="text-xs font-semibold text-[#B69AFF]">
                          Active
                        </span>
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-[#B4B4BC]" aria-hidden="true" />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-6">
                <a
                  href="/contact.html"
                  onClick={onCloseMenu}
                  className="inline-flex min-h-[50px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#B69AFF] px-5 py-3.5 text-sm font-semibold text-[#101010] transition-transform active:scale-[0.98]"
                >
                  Start a Project
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
