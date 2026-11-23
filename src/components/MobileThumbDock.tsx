import {Briefcase, Compass, Home, Menu, Sparkles} from 'lucide-react';
import type {PageId} from '../data/agencyData';

interface MobileThumbDockProps {
  activePage: PageId;
  onOpenMenu: () => void;
}

export function MobileThumbDock({activePage, onOpenMenu}: MobileThumbDockProps) {
  return (
    <nav
      aria-label="Mobile quick navigation"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-white/15 bg-[#101010]/95 backdrop-blur-md md:hidden"
    >
      <div className="grid h-[58px] grid-cols-5 items-center px-1">
        <a
          href="/index.html"
          aria-current={activePage === 'home' ? 'page' : undefined}
          className={`flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors active:scale-95 ${
            activePage === 'home' ? 'text-[#B69AFF]' : 'text-[#B4B4BC]'
          }`}
        >
          <Home className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="whitespace-nowrap">Home</span>
        </a>

        <a
          href="/services.html"
          aria-current={activePage === 'services' ? 'page' : undefined}
          className={`flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors active:scale-95 ${
            activePage === 'services' ? 'text-[#B69AFF]' : 'text-[#B4B4BC]'
          }`}
        >
          <Compass className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="whitespace-nowrap">Services</span>
        </a>

        <a
          href="/work.html"
          aria-current={activePage === 'work' ? 'page' : undefined}
          className={`flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors active:scale-95 ${
            activePage === 'work' ? 'text-[#B69AFF]' : 'text-[#B4B4BC]'
          }`}
        >
          <Briefcase className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="whitespace-nowrap">Work</span>
        </a>

        <a
          href="/contact.html"
          aria-current={activePage === 'contact' ? 'page' : undefined}
          className="flex h-full items-center justify-center px-1"
        >
          <span
            className={`flex h-[40px] w-full flex-col items-center justify-center gap-0.5 rounded-[8px] text-[10px] font-semibold transition-transform active:scale-95 ${
              activePage === 'contact'
                ? 'bg-[#FFFFFF] text-[#101010]'
                : 'bg-[#B69AFF] text-[#101010]'
            }`}
          >
            <Sparkles className="h-[16px] w-[16px]" aria-hidden="true" />
            <span className="whitespace-nowrap">Start</span>
          </span>
        </a>

        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open full studio menu"
          className={`flex h-full flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors active:scale-95 ${
            activePage === 'about' ||
            activePage === 'process' ||
            activePage === 'insights'
              ? 'text-[#B69AFF]'
              : 'text-[#B4B4BC]'
          }`}
        >
          <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
          <span className="whitespace-nowrap">Menu</span>
        </button>
      </div>
    </nav>
  );
}
