import {ArrowUp} from 'lucide-react';
import {NAV_ITEMS, SERVICES_DATA, STUDIO_INFO} from '../data/agencyData';
import {MushiPrimaryLogo} from './BrandMark';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/12 bg-[#101010] text-[#F7F6F2]">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-5 sm:px-8 sm:py-9 lg:px-10 lg:py-12">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center justify-between gap-3 sm:block">
              <a
                href="/index.html"
                aria-label="Mushi Digital Growth Studio home"
                className="group inline-flex items-center"
              >
                <MushiPrimaryLogo variant="dark" size="md" showIcon showTagline />
              </a>
              <p className="text-[11px] font-medium text-[#B69AFF] sm:hidden">
                Sri Lanka · UAE
              </p>
            </div>
            <p className="mt-2.5 hidden max-w-md text-sm leading-relaxed text-[#B4B4BC] sm:mt-4 sm:block">
              {STUDIO_INFO.positioning}
            </p>
            <p className="mt-2 line-clamp-1 text-xs text-[#B4B4BC] sm:hidden">
              {STUDIO_INFO.positioning}
            </p>
            <p className="mt-3 hidden text-xs font-medium text-[#F7F6F2] sm:block">
              {STUDIO_INFO.locations}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] sm:mt-2 sm:text-xs">
              <a
                href={`mailto:${STUDIO_INFO.email}`}
                className="text-[#B69AFF] transition-colors hover:underline"
              >
                {STUDIO_INFO.email}
              </a>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="tabular-nums text-[#F7F6F2]/85 transition-colors hover:text-[#B69AFF]"
              >
                {STUDIO_INFO.phone}
              </a>
              {STUDIO_INFO.socialHandles.map(social => (
                <span key={social.label} className="inline-flex items-center gap-x-3">
                  <span aria-hidden="true" className="text-white/25">
                    ·
                  </span>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#F7F6F2]/85 transition-colors hover:text-[#B69AFF]"
                  >
                    {social.label}
                  </a>
                </span>
              ))}
            </div>
          </div>

          {/* Mobile 2-Column Compact Links / Desktop Split Columns */}
          <div className="grid grid-cols-2 gap-4 lg:col-span-7 lg:grid-cols-7 lg:gap-8">
            {/* Navigation Column */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-[11px] font-semibold tracking-wider text-[#B4B4BC] sm:text-xs">
                Navigation
              </h2>
              <ul className="mt-2 grid grid-cols-1 gap-0.5 sm:mt-3 sm:gap-1.5">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="inline-flex py-1 text-xs text-[#F7F6F2]/85 transition-colors hover:text-[#B69AFF] sm:text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Capabilities Column */}
            <div className="lg:col-span-4">
              <h2 className="font-display text-[11px] font-semibold tracking-wider text-[#B4B4BC] sm:text-xs">
                Capabilities
              </h2>
              <ul className="mt-2 grid grid-cols-1 gap-0.5 sm:mt-3 sm:gap-1.5">
                {SERVICES_DATA.map(service => (
                  <li key={service.id}>
                    <a
                      href={`/services.html#${service.id}`}
                      className="inline-flex py-1 text-xs text-[#F7F6F2]/85 transition-colors hover:text-[#B69AFF] sm:text-sm"
                    >
                      <span className="sm:hidden">{service.shortTitle}</span>
                      <span className="hidden sm:inline">{service.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-row items-center justify-between gap-3 border-t border-white/12 pt-3.5 text-[11px] text-[#B4B4BC] sm:mt-7 sm:pt-5 sm:text-xs">
          <p className="truncate">
            © <span className="tabular-nums">{currentYear}</span> {STUDIO_INFO.name}
            <span className="hidden sm:inline">. All rights reserved.</span>
          </p>
          <a
            href="#top"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap font-medium text-[#F7F6F2] transition-colors hover:text-[#B69AFF]"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
