import {type ReactNode, useEffect, useState} from 'react';
import {motion, MotionConfig} from 'motion/react';
import type {PageId} from '../data/agencyData';
import {Footer} from './Footer';
import {Header} from './Header';
import {MobileThumbDock} from './MobileThumbDock';
import {EDITORIAL_EASE, ScrollProgressLine} from './MotionPrimitives';

interface LayoutProps {
  activePage: PageId;
  children: ReactNode;
}

export function Layout({activePage, children}: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = canonicalUrl;
    }
    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.content = canonicalUrl;
    }
  }, [activePage]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#F7F6F2] pb-[58px] text-[#111114] md:pb-0">
        <ScrollProgressLine />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[6px] focus:bg-[#B69AFF] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#101010]"
        >
          Skip to main content
        </a>
        <Header
          activePage={activePage}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen(prev => !prev)}
          onCloseMenu={() => setMenuOpen(false)}
        />
        <motion.main
          id="main-content"
          initial={{opacity: 0, y: 6}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.36, ease: EDITORIAL_EASE}}
          className="flex-1"
        >
          {children}
        </motion.main>
        <Footer />
        <MobileThumbDock
          activePage={activePage}
          onOpenMenu={() => setMenuOpen(true)}
        />
      </div>
    </MotionConfig>
  );
}
