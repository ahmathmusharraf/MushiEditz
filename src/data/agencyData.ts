export type PageId =
  | 'home'
  | 'about'
  | 'services'
  | 'work'
  | 'process'
  | 'insights'
  | 'contact';

export interface NavItem {
  id: PageId;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  {id: 'home', label: 'Home', href: '/index.html'},
  {id: 'about', label: 'About', href: '/about.html'},
  {id: 'services', label: 'Services', href: '/services.html'},
  {id: 'work', label: 'Our Work', href: '/work.html'},
  {id: 'process', label: 'Our Process', href: '/process.html'},
  {id: 'insights', label: 'Insights', href: '/insights.html'},
  {id: 'contact', label: 'Contact', href: '/contact.html'},
];

export const STUDIO_IMAGES = {
  heroStudio: '/src/assets/images/hero_agency_studio_1795080235063.jpg',
  founderPortrait: '/assets/aistudio/Mushi_new_19352f3f.png',
  editorialStudioPortrait: '/src/assets/images/founder_studio_portrait_1795080235601.jpg',
  brandIdentity: '/src/assets/images/work_brand_identity_1795080236136.jpg',
  productionFilm: '/src/assets/images/work_production_film_1795080235963.jpg',
  digitalExperience: '/src/assets/images/work_digital_experience_1795080235445.jpg',
} as const;

export const STUDIO_ASSETS = {
  iconDark: '/assets/aistudio/mushi-icon_34c5153a.svg',
  iconLavender: '/assets/aistudio/mushi-icon-lavender_2a480fe4.svg',
  logoDarkBg: '/assets/aistudio/mushi-primary-logo_fcc5d8a4.svg',
  logoLightBg: '/assets/aistudio/mushi-primary-logo-light_673d0885.svg',
} as const;

export const STUDIO_INFO = {
  name: 'Mushi Digital Growth Studio',
  shortMark: 'MUSHI.',
  founder: 'Ahmath Musharraf',
  founderRole: 'Founder & Creative Director',
  locations: 'Sri Lanka | UAE | Worldwide',
  tagline: 'We Build Brands. We Drive Growth.',
  positioning:
    'Mushi Digital Growth Studio partners with ambitious businesses to build stronger brands, create meaningful digital experiences and support measurable growth through integrated marketing, creative production and technology.',
  mission:
    'To bring strategy, creativity, technology and performance together through effective digital solutions that help businesses compete and grow.',
  vision:
    'To become an internationally recognised digital growth partner for ambitious businesses.',
  brandPromise:
    'Integrated creative and digital solutions that help businesses build stronger brands and make progress toward measurable goals.',
  email: 'mushieditz@gmail.com',
  phone: '+94 76 776 5080',
  phoneRaw: '+94767765080',
  whatsappUrl: 'https://wa.me/94767765080',
  contactEmailNote: 'mushieditz@gmail.com',
  whatsappNote: '+94 76 776 5080',
  socialHandles: [
    {
      label: 'Instagram',
      handle: '@mushieditz',
      href: 'https://www.instagram.com/mushieditz/',
    },
    {
      label: 'Facebook',
      handle: 'fb.com/mushieditz',
      href: 'https://www.facebook.com/mushieditz',
    },
  ],
};

export interface ServiceCategory {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  summary: string;
  description: string;
  capabilities: string[];
  benefits: string[];
  ctaLabel: string;
  image: string;
  imageAlt: string;
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'digital-marketing-growth',
    number: '01',
    title: 'Full-Stack Marketing, SEO & AIO',
    shortTitle: 'SEO, AIO & Marketing',
    summary: 'Rank on Google, earn citations in AI answers, and turn full-funnel demand into pipeline.',
    description:
      'We connect Technical & Local SEO, AIO (AI Engine Optimization for ChatGPT, Perplexity & AI Overviews), and multi-channel paid acquisition into one measurable growth engine.',
    capabilities: [
      'Technical & Local SEO',
      'AIO (AI Search & GEO)',
      'Google, Meta & LinkedIn Ads',
      'Social media & content strategy',
      'Full-funnel growth strategy',
      'Conversion rate optimization',
      'Lead generation systems',
      'Analytics & attribution',
    ],
    benefits: [
      'Higher search visibility on Google alongside AI citation readiness (llms.txt & Schema)',
      'Full-funnel alignment across organic search, paid ads, and landing conversion',
      'Transparent reporting tied directly to qualified pipeline and ROI',
    ],
    ctaLabel: 'Plan SEO, AIO & Marketing',
    image: STUDIO_IMAGES.heroStudio,
    imageAlt: 'Mushi Digital Growth Studio SEO, AIO, and full-funnel marketing strategy table',
  },
  {
    id: 'branding-creative-design',
    number: '02',
    title: 'Branding & Creative Design',
    shortTitle: 'Branding & Creative',
    summary: 'Create a distinctive identity people recognise, trust, and remember.',
    description:
      'From foundational positioning to tactile visual systems and campaign direction, we craft coherent brand worlds built to hold attention across every touchpoint.',
    capabilities: [
      'Brand identity',
      'Logo design',
      'Graphic design',
      'Marketing creatives',
      'Brand strategy',
      'Creative direction',
    ],
    benefits: [
      'Clear differentiation in crowded regional and global markets',
      'Reusable visual guidelines for internal teams and partners',
      'Elevated campaign assets that strengthen brand recall',
    ],
    ctaLabel: 'Start a Branding Brief',
    image: STUDIO_IMAGES.brandIdentity,
    imageAlt: 'Minimalist obsidian and lavender embossed brand stationery suite on stone',
  },
  {
    id: 'photography-video-production',
    number: '03',
    title: 'Photography & Video Production',
    shortTitle: 'Photo & Video',
    summary: 'Tell your story through thoughtful commercial visuals made to convert.',
    description:
      'We direct, shoot, and edit intentional photography and motion assets tailored for campaigns, websites, and high-retention social channels.',
    capabilities: [
      'Commercial photography',
      'Product photography',
      'Corporate photography',
      'Videography',
      'Promotional videos',
      'Social media reels',
      'Video editing',
    ],
    benefits: [
      'Bespoke brand imagery that replaces generic stock visuals',
      'Multi-format exports sized for web, paid ads, and reels',
      'Consistent lighting, pacing, and colour direction across shoots',
    ],
    ctaLabel: 'Plan a Production Shoot',
    image: STUDIO_IMAGES.productionFilm,
    imageAlt: 'Commercial film camera and lighting setup shooting a luxury product on stone',
  },
  {
    id: 'web-development-digital-experiences',
    number: '04',
    title: 'Web Development & Digital Experiences',
    shortTitle: 'Web & UX',
    summary: 'Turn your digital presence into a clear, fast, conversion-focused experience.',
    description:
      'We design and build responsive websites and landing systems engineered for speed, editorial clarity, accessibility, and effortless enquiry capture.',
    capabilities: [
      'Business websites',
      'Landing pages',
      'WordPress development',
      'UI/UX design',
      'Website optimisation',
      'Conversion-focused web experiences',
    ],
    benefits: [
      'Intentional mobile, tablet, and desktop UX architecture',
      'Clean technical SEO foundations and fast asset loading',
      'Conversion pathways engineered around real user intent',
    ],
    ctaLabel: 'Scope a Web Experience',
    image: STUDIO_IMAGES.digitalExperience,
    imageAlt: 'Minimalist laptop displaying an editorial grid web interface on basalt desk',
  },
  {
    id: 'ai-automation-digital-solutions',
    number: '05',
    title: 'AI, Automation & Digital Solutions',
    shortTitle: 'AI & Automation',
    summary: 'Streamline repetitive operations and connect your marketing and CRM tools.',
    description:
      'We implement practical workflow automation, CRM integrations, and AI-assisted systems that reduce manual friction and help lean teams respond faster.',
    capabilities: [
      'AI-powered workflows',
      'Marketing automation',
      'Business process automation',
      'CRM integration',
      'Digital transformation',
    ],
    benefits: [
      'Faster lead routing from web forms and WhatsApp to CRM',
      'Reduced repetitive manual tasks across sales and marketing',
      'Practical automation built around existing team workflows',
    ],
    ctaLabel: 'Explore Automation Solutions',
    image: STUDIO_IMAGES.heroStudio,
    imageAlt: 'Modern digital studio space designed for connected workflows',
  },
];

export type WorkCategory =
  | 'All'
  | 'E-Commerce & Retail'
  | 'Advertising & Creative Studios'
  | 'Photography & Video'
  | 'Personal Portfolios'
  | 'AI & Web Applications'
  | 'Travel & Hospitality'
  | 'Corporate & Education'
  | 'FinTech & Trading'
  | 'Interactive Events';

export const WORK_CATEGORIES: WorkCategory[] = [
  'All',
  'E-Commerce & Retail',
  'Advertising & Creative Studios',
  'Photography & Video',
  'Personal Portfolios',
  'AI & Web Applications',
  'Travel & Hospitality',
  'Corporate & Education',
  'FinTech & Trading',
  'Interactive Events',
];

export interface ProjectConcept {
  id: string;
  title: string;
  category: Exclude<WorkCategory, 'All'>;
  sector: string;
  summary: string;
  challenge: string;
  direction: string;
  execution: string;
  deliverables: string[];
  image: string;
  imageAlt: string;
  liveUrl?: string;
  domainLabel?: string;
  featured?: boolean;
  isSampleConcept?: boolean;
}

export const WORK_CONCEPTS: ProjectConcept[] = [
  {
    id: 'dress-line-ecommerce',
    title: 'Dress Line — Women’s Fashion Storefront',
    category: 'E-Commerce & Retail',
    sector: 'Fashion Apparel & Online Retail',
    domainLabel: 'dressline.vercel.app',
    liveUrl: 'https://dressline.vercel.app/',
    summary:
      'Modern women’s apparel storefront featuring curated new arrivals, quick-view product galleries, size selection, wishlists, and direct WhatsApp & social commerce sharing.',
    challenge:
      'Deliver an editorial fashion browsing experience that moves shoppers effortlessly from outfit discovery to size selection and social checkout.',
    direction:
      'Pair clean visual merchandising and spacious typography with tactile quick-view drawers and instant WhatsApp enquiry hooks.',
    execution:
      'Built a responsive fashion commerce interface with multi-image product inspection, persistent wishlist state, and mobile-ready collection navigation.',
    deliverables: ['Fashion UI/UX', 'E-Commerce Storefront', 'Quick-View Gallery', 'Social & WhatsApp Sharing'],
    image: '/src/assets/images/thumb_dress_line_1795414506360.jpg',
    imageAlt: 'Dress Line minimalist luxury women fashion e-commerce storefront mockup',
    featured: true,
  },
  {
    id: 'hive-image-uk',
    title: 'Hive Image — UK Custom Merchandise Store',
    category: 'E-Commerce & Retail',
    sector: 'UK Custom Merchandise & Branding Fulfillment',
    domainLabel: 'hiveimage.co.uk',
    liveUrl: 'https://hiveimage.co.uk/',
    summary:
      'UK-based e-commerce platform offering custom branded merchandise, corporate apparel solutions, and integrated online store order fulfillment.',
    challenge:
      'Position bespoke merchandise and print fulfillment clearly for UK business buyers seeking dependable turnaround and brand consistency.',
    direction:
      'Organise customisable product catalogues around clear commercial ordering workflows and UK retail trust signals.',
    execution:
      'Structured an e-commerce store architecture covering merchandise discovery, brand customisation scopes, and end-to-end fulfillment.',
    deliverables: ['E-Commerce Architecture', 'Custom Merch Catalogue', 'UK Retail Storefront', 'Brand Fulfillment Flow'],
    image: '/src/assets/images/thumb_hive_image_1795414504731.jpg',
    imageAlt: 'Hive Image UK custom branded hoodies, organic tote bags, and online store preview',
  },
  {
    id: 'fixdeal-marketplace',
    title: 'Fixdeal — Sri Lanka Marketplace & Services',
    category: 'E-Commerce & Retail',
    sector: 'Digital Marketplace & Multi-Category Deals (Sri Lanka)',
    domainLabel: 'fixdeal.vercel.app',
    liveUrl: 'https://fixdeal.vercel.app/',
    summary:
      'Sri Lankan marketplace platform focused on quality, transparent pricing, curated product deals, professional services, and instant WhatsApp support.',
    challenge:
      'Connect Colombo and island-wide shoppers with trustworthy deals and service listings without cluttered checkout friction.',
    direction:
      'Use a high-contrast dark theme (`#09090b`), clear service categories, and direct WhatsApp buyer assistance.',
    execution:
      'Engineered an app-ready marketplace platform featuring Firebase-backed data architecture, mobile web-app polish, and transparent deal presentation.',
    deliverables: ['Marketplace Platform', 'Firebase Integration', 'WhatsApp Commerce Flow', 'Mobile-First UI'],
    image: '/src/assets/images/thumb_fixdeal_lk_1795414505603.jpg',
    imageAlt: 'Fixdeal dark-mode Sri Lankan marketplace and mobile services web UI showcase',
  },
  {
    id: 'mushi-editz-agency',
    title: 'Mushi Editz — Creative Digital Agency Hub',
    category: 'Advertising & Creative Studios',
    sector: 'Full-Service Digital Agency & Creative Production',
    domainLabel: 'mushieditz.vercel.app',
    liveUrl: 'https://mushieditz.vercel.app/',
    summary:
      'Creative digital agency platform showcasing business websites, brand guidelines, packaging design, mobile development, and web app interfaces.',
    challenge:
      'Communicate multidisciplinary creative and technical capability cleanly while guiding prospects directly into quote requests.',
    direction:
      'Lead with bold digital innovation positioning, scannable capability showcases, and integrated case study pathways.',
    execution:
      'Built an interactive multi-section agency web application highlighting design, development, packaging, and portfolio case studies.',
    deliverables: ['Agency Web Design', 'Brand & Packaging Showcase', 'Interactive Portfolio', 'Quote Capture System'],
    image: '/src/assets/images/thumb_mushi_editz_1795414505513.jpg',
    imageAlt: 'Mushi Editz creative digital agency website beside lavender brand guidelines and packaging',
    featured: true,
  },
  {
    id: 'pixels-advertisement-ajman',
    title: 'Pixels Advertisement — LED Screens & Signage UAE',
    category: 'Advertising & Creative Studios',
    sector: 'Signage Manufacturing, LED Video Walls & Printing (Ajman, UAE)',
    domainLabel: 'pixelsadvertisement1.vercel.app',
    liveUrl: 'https://pixelsadvertisement1.vercel.app/',
    summary:
      'Ajman-based LED video wall specialist and full-service signage manufacturer showcasing outdoor/indoor LED screens (P2.5, P6, P10), 3D illuminated signage, vehicle wraps, and large-format printing.',
    challenge:
      'Present broad commercial fabrication capabilities—from live animated storefronts to vehicle branding and paper printing—with crisp visual authority.',
    direction:
      'Structure interactive showcase galleries around core signage categories (`Outdoor & Indoor`, `3D Signage`, `Vehicle Branding`, `Large Format Printing`).',
    execution:
      'Built a production-focused UAE advertising and fabrication showcase tailored for retail storefronts and commercial inquiries.',
    deliverables: ['Advertising & Signage Web UI', 'Service Showcase Architecture', 'UAE Local SEO Metadata', 'Enquiry Pathways'],
    image: '/src/assets/images/thumb_pixels_adv_1795414626941.jpg',
    imageAlt: 'Pixels Advertisement UAE illuminated 3D signage, P2.5 LED video wall, and fleet branding showcase',
  },
  {
    id: 'ink-spire-kky',
    title: 'Ink Spire — Creative Printing & Branding',
    category: 'Advertising & Creative Studios',
    sector: 'Creative Printing, Branding & Design (Sri Lanka)',
    domainLabel: 'inkspirekky.vercel.app',
    liveUrl: 'https://inkspirekky.vercel.app/',
    summary:
      'Regional creative printing and branding studio based in Batticaloa, uniting brand identity craft, commercial print products, and agency storytelling.',
    challenge:
      'Translate tactile print and local branding expertise in Sri Lanka’s Eastern Province into a modern international-standard digital presence.',
    direction:
      'Structure services, print products, process steps, team credibility, and FAQs around effortless local and regional discovery.',
    execution:
      'Designed and built a comprehensive agency and print catalogue portal featuring interactive project showcases and direct channel links.',
    deliverables: ['Brand Agency Portal', 'Print Product Showcase', 'Interactive FAQ & Process', 'Regional Brand UX'],
    image: '/src/assets/images/thumb_ink_spire_1795414626712.jpg',
    imageAlt: 'Ink Spire commercial printing studio table with Pantone swatch fans, packaging, and web layout',
  },
  {
    id: 'logic-edge-agency',
    title: 'LogicEdge — Boutique Engineering Agency',
    category: 'Advertising & Creative Studios',
    sector: 'Digital Product Engineering & Design Studio',
    domainLabel: 'logicedge.vercel.app',
    liveUrl: 'https://logicedge.vercel.app/',
    summary:
      'High-end boutique agency website pairing precision-engineered digital products with visually arresting UI/UX craft and free consultancy booking.',
    challenge:
      'Differentiate a technical product studio in a crowded web agency landscape through restraint, authority, and tactile motion.',
    direction:
      'Anchor messaging around merging technical logic with creative edge and frictionless consultancy scheduling.',
    execution:
      'Crafted an editorial dark-mode agency experience featuring structured service pillars, refined motion transitions, and direct booking CTAs.',
    deliverables: ['Boutique Agency UI', 'Motion Choreography', 'Consultancy Conversion Flow', 'Responsive Web Build'],
    image: '/src/assets/images/thumb_logic_edge_1795414505357.jpg',
    imageAlt: 'LogicEdge boutique dark-mode digital engineering agency website showcase',
  },
  {
    id: 'studio-routes-visuals',
    title: 'Studio Routes — Photography & 4K Aerial Film',
    category: 'Photography & Video',
    sector: 'Wedding Photography, Portrait & Drone Cinematography',
    domainLabel: 'studioroutes.vercel.app',
    liveUrl: 'https://studioroutes.vercel.app/',
    summary:
      'Visual storytelling studio capturing intimate elopements, wedding celebrations, editorial portraits, and cinematic 4K aerial drone narratives.',
    challenge:
      'Frame emotional wedding photography and dynamic aerial video side by side without sacrificing page speed or visual calm.',
    direction:
      'Use generous breathing room, curated service highlights, and direct Instagram and booking inquiry pathways.',
    execution:
      'Designed a visual-first photography and videography showcase structured around Weddings, Portraits, Aerial Footage, and Creative Direction.',
    deliverables: ['Photography Showcase', 'Service Highlights UI', 'Booking Inquiry Validation', 'Visual Narrative Grid'],
    image: '/src/assets/images/thumb_studio_routes_1795414505245.jpg',
    imageAlt: 'Studio Routes wedding photography gallery laptop, aerial drone, cinema lens, and fine-art prints',
    featured: true,
  },
  {
    id: 'yaya-mounde-videography',
    title: 'Yaya Moundé — Automotive & Real Estate Film',
    category: 'Photography & Video',
    sector: 'Dubai Automotive & Real Estate Videography Portfolio',
    domainLabel: 'mound.vercel.app',
    liveUrl: 'https://mound.vercel.app/',
    summary:
      'Dubai-based cinematographer and visual creator portfolio focused on G2 automotive videography, luxury car photography, and real estate film production.',
    challenge:
      'Showcase high-octane automotive reels and architectural real estate shoots in a sharp, uncluttered creator portfolio.',
    direction:
      'Prioritise clean reel categorization, visual contrast, and direct client booking across Dubai’s luxury automotive and property sectors.',
    execution:
      'Built a fast, mobile-ready media portfolio tailored for automotive videography, real estate production, and commercial storytelling.',
    deliverables: ['Cinematography Portfolio', 'Automotive & Property Reels', 'Minimal Dark UI', 'Client Contact Flow'],
    image: '/src/assets/images/thumb_yaya_mounde_1795414507412.jpg',
    imageAlt: 'Yaya Mounde Dubai automotive coupe and real estate colour grading workstation showcase',
  },
  {
    id: 'ahmath-musharraf-portfolio',
    title: 'Ahmath Musharraf — Creative Director Portfolio',
    category: 'Personal Portfolios',
    sector: 'Senior Digital Marketing & Multimedia Leadership (Dubai, UAE)',
    domainLabel: 'ahmathmusharraf.vercel.app',
    liveUrl: 'https://ahmathmusharraf.vercel.app/',
    summary:
      'Executive personal website for Dubai-based Digital Marketing Manager & Multimedia Specialist Ahmath Musharraf, detailing 6+ years of GCC growth and creative mastery.',
    challenge:
      'Unify paid growth leadership, cinematography, branding, and front-end web engineering inside one cohesive executive narrative.',
    direction:
      'Feature a filterable expertise matrix, career impact timeline, multimedia discipline filters, and live production-tested project links.',
    execution:
      'Developed an interactive executive portfolio spanning marketing strategy, SEO leadership, creative direction, and technical repositories.',
    deliverables: ['Executive Positioning', 'Expertise Matrix UI', 'Multimedia & Tech Case Hub', 'SEO & Metadata Architecture'],
    image: '/src/assets/images/thumb_ahmath_portfolio_1795414505475.jpg',
    imageAlt: 'Ahmath Musharraf executive creative director and digital growth strategist website mockup',
  },
  {
    id: 'nushath-nisardeen-portfolio',
    title: 'Nushath Nisardeen — Tech & Strategy Portfolio',
    category: 'Personal Portfolios',
    sector: 'Software Engineering, CEO & Global Business Strategy',
    domainLabel: 'nushath-portfolio.vercel.app',
    liveUrl: 'https://nushath-portfolio.vercel.app/',
    summary:
      'Multidisciplinary executive portfolio bridging enterprise software architecture, technology consultancy leadership, and international commercial strategy.',
    challenge:
      'Present both deep software engineering credentials and executive business-building milestones with equal polish.',
    direction:
      'Pair leadership metrics, strategic planning capabilities, and ventures overview inside a clean corporate-modern aesthetic.',
    execution:
      'Built an authoritative personal brand platform structuring engineering depth, commercial ventures, and global executive networking.',
    deliverables: ['Personal Brand UI/UX', 'Executive Bio Architecture', 'Competency Breakdown', 'Responsive Portfolio'],
    image: '/src/assets/images/thumb_nushath_portfolio_1795414504876.jpg',
    imageAlt: 'Nushath Nisardeen executive software architect and business strategist portfolio showcase',
  },
  {
    id: 'jubits-gpt-assistant',
    title: 'JubitsGPT — AI Coding & Chat Assistant',
    category: 'AI & Web Applications',
    sector: 'Generative AI Productivity & Developer Assistant App',
    domainLabel: 'jubitsgpt.vercel.app',
    liveUrl: 'https://jubitsgpt.vercel.app/',
    summary:
      'Interactive generative AI chat and software engineering assistant web application featuring multi-model switching, Markdown code formatting, and persistent conversation context.',
    challenge:
      'Build a responsive conversational workspace that switches smoothly between general assistant and senior engineering modes without losing chat history.',
    direction:
      'Pair minimalist chat ergonomics and clean syntax-highlighted Markdown code rendering with configurable Gemini model presets.',
    execution:
      'Engineered a modern React AI assistant interface integrating `@google/genai` chat sessions, system instruction modes, and client API configuration.',
    deliverables: ['AI Chat Web Application', 'Multi-Model Switching', 'Markdown Code Formatting', 'Session Context Preservation'],
    image: '/src/assets/images/thumb_jubits_gpt_1795414506481.jpg',
    imageAlt: 'JubitsGPT dark-mode AI chat and TypeScript engineering assistant interface',
  },
  {
    id: 'sl-signature-tours',
    title: 'SL Signature Tours — Sri Lanka Travel Portal',
    category: 'Travel & Hospitality',
    sector: 'Inbound Tourism & Bespoke Holiday Packages (Sri Lanka)',
    domainLabel: 'slsignaturetours.vercel.app',
    liveUrl: 'https://slsignaturetours.vercel.app/',
    summary:
      'Bespoke Sri Lanka travel experience platform highlighting wildlife safaris, honeymoon packages, adventure itineraries, multi-currency pricing, and direct WhatsApp booking.',
    challenge:
      'Inspire international travellers exploring Sri Lanka while converting curated itinerary interest rapidly into custom tour inquiries.',
    direction:
      'Organise tour themes cleanly (`Wildlife Safari`, `Honeymoon`, `Adventure`, `Holiday Packages`) alongside local currency switching and WhatsApp concierge triggers.',
    execution:
      'Built a hospitality-focused tour booking platform combining traveller testimonials, destination storytelling, and instant inquiry capture.',
    deliverables: ['Tourism Booking Web UX', 'Tour Category Filtering', 'Multi-Currency Selector', 'WhatsApp Tour Concierge'],
    image: '/src/assets/images/thumb_sl_tours_1795414505421.jpg',
    imageAlt: 'SL Signature Tours Sri Lanka tea highlands, wildlife prints, and inbound travel website',
  },
  {
    id: 'bcas-international-placement',
    title: 'BCAS International — Study Abroad & IELTS Portal',
    category: 'Corporate & Education',
    sector: 'Higher Education Admissions & Visa Placement (Sri Lanka & Global)',
    domainLabel: 'bcasinternationalplacement.vercel.app',
    liveUrl: 'https://bcasinternationalplacement.vercel.app/',
    summary:
      'Official international placement portal guiding Sri Lankan students toward UK, Australia, Canada, Europe, and UAE universities, certified IELTS prep, and Canadian OSSD.',
    challenge:
      'Simplify complex international admissions pathways, IELTS tracks, and visa guidance into trustworthy student conversion flows.',
    direction:
      'Use institutional blue (`#00239C`), clear programme cards, and automated Google Sheets admission inquiry capture.',
    execution:
      'Engineered an admissions-focused portal covering destination countries, OSSD & IELTS preparation, and reliable student lead routing.',
    deliverables: ['Education Admissions Portal', 'Programme & Country Architecture', 'Google Sheets Lead Sync', 'Technical SEO'],
    image: '/src/assets/images/thumb_bcas_portal_1795414627593.jpg',
    imageAlt: 'BCAS International cobalt-blue study abroad and IELTS university admissions web portal',
  },
  {
    id: 'xau-vip-trading',
    title: 'XAU VIP+ — Gold Trading Signals Platform',
    category: 'FinTech & Trading',
    sector: 'FinTech Market Analysis & Trading Community (XAU/USD)',
    domainLabel: 'xauvip.com',
    liveUrl: 'https://www.xauvip.com/',
    summary:
      'Dedicated Gold (XAU/USD) trading insights and VIP community platform presenting daily scalp briefings, transparent signal workflows, and account growth challenges.',
    challenge:
      'Project institutional credibility and clear signal mechanics in the fast-moving forex and commodities education space.',
    direction:
      'Pair high-contrast dark surfaces with bold gold-market clarity, daily trade structure explanations, and community onboarding.',
    execution:
      'Delivered a conversion-oriented web platform structured around XAU/USD signal clarity, challenge tracks, and VIP membership access.',
    deliverables: ['FinTech Web Design', 'Conversion Landing Flow', 'Market Analysis Presentation', 'SEO Optimization'],
    image: '/src/assets/images/thumb_xau_vip_1795414506132.jpg',
    imageAlt: 'XAU VIP+ precision dark gold trading XAU/USD technical market structure workstation',
  },
  {
    id: 'farveen-faththah-wedding',
    title: 'Farveen & Faththah — Interactive Wedding Invite',
    category: 'Interactive Events',
    sector: 'Bespoke Digital Event & Hospitality Experience (Dubai, UAE)',
    domainLabel: 'farveen-faththah-weddinginvitation.vercel.app',
    liveUrl: 'https://farveen-faththah-weddinginvitation.vercel.app/',
    summary:
      'Custom interactive luxury digital wedding invitation hosted for Al Khoory Sky Garden Hotel, Dubai—complete with Hijri date integration, `.ics` calendar export, and RSVP blessings.',
    challenge:
      'Turn a formal family wedding invitation in Dubai into a warm, effortless mobile-first guest experience shared via WhatsApp.',
    direction:
      'Combine ceremonial elegance with practical utility: 1-tap Apple/Google `.ics` calendar saving, 24-hour reminders, venue guidance, and chime ambience.',
    execution:
      'Crafted an interactive event web app with Hijri calendar calculation, native `.ics` download generation, audio ambience, and guest blessing submissions.',
    deliverables: ['Bespoke Event Web App', 'Hijri Date & ICS Calendar Sync', 'Mobile Invitation UX', 'Interactive Blessing Wall'],
    image: '/src/assets/images/thumb_farveen_wedding_1795414627902.jpg',
    imageAlt: 'Farveen and Faththah luxury cream-and-gold interactive wedding invitation flat-lay',
  },
];

export interface ProcessStage {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
  outcome: string;
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Understand the business and objectives.',
    description:
      'Every engagement starts by listening carefully. We audit your current brand presence, audience behaviour, competitive landscape, and commercial goals before prescribing any deliverable.',
    activities: ['Stakeholder discovery session', 'Brand & digital audit', 'Audience & market mapping'],
    outcome: 'Shared clarity on priorities, constraints, and measurable objectives.',
  },
  {
    number: '02',
    title: 'Strategise',
    subtitle: 'Develop the right growth strategy.',
    description:
      'We translate research into a focused roadmap—defining positioning, channel selection, messaging angles, creative direction, and technical requirements.',
    activities: ['Channel & funnel planning', 'Creative & messaging architecture', 'Scope & milestone alignment'],
    outcome: 'An actionable plan connecting brand storytelling to business growth.',
  },
  {
    number: '03',
    title: 'Create',
    subtitle: 'Produce creative and digital solutions.',
    description:
      'Strategists, designers, filmmakers, and developers collaborate directly to craft cohesive brand assets, photography, video reels, and web experiences.',
    activities: ['Visual identity & ad creatives', 'Photography & video production', 'UI/UX design & web engineering'],
    outcome: 'Cohesive, brand-consistent assets built for real-world performance.',
  },
  {
    number: '04',
    title: 'Execute',
    subtitle: 'Launch campaigns and deliver projects.',
    description:
      'We deploy websites, configure tracking and automation workflows, and launch targeted campaigns across Meta, Google, LinkedIn, and organic channels.',
    activities: ['Campaign & media deployment', 'Tracking & CRM integration', 'Quality assurance across devices'],
    outcome: 'Smooth, punctual launches with reliable measurement in place.',
  },
  {
    number: '05',
    title: 'Optimise',
    subtitle: 'Monitor, analyse and improve results.',
    description:
      'Launch is only the starting line. We track conversion behaviour, creative fatigue, search rankings, and lead quality to refine performance continuously.',
    activities: ['Performance & funnel diagnostics', 'Creative & landing page iteration', 'Conversion rate refinement'],
    outcome: 'Sharper efficiency and stronger return from every channel.',
  },
  {
    number: '06',
    title: 'Grow',
    subtitle: 'Scale what works.',
    description:
      'Once winning messages, channels, and workflows are validated, we expand budgets deliberately, automate repetitive handoffs, and unlock new market reach.',
    activities: ['Winning campaign scaling', 'Workflow & CRM automation', 'New market expansion support'],
    outcome: 'Compounding brand equity and sustainable, repeatable growth.',
  },
];

export type InsightCategory =
  | 'All'
  | 'Digital Marketing'
  | 'Social Media'
  | 'Branding'
  | 'Advertising'
  | 'Photography & Video'
  | 'Website & Technology'
  | 'AI & Automation';

export const INSIGHT_CATEGORIES: InsightCategory[] = [
  'All',
  'Digital Marketing',
  'Social Media',
  'Branding',
  'Advertising',
  'Photography & Video',
  'Website & Technology',
  'AI & Automation',
];

export interface InsightArticle {
  id: string;
  title: string;
  category: Exclude<InsightCategory, 'All'>;
  readingTime: string;
  publishedLabel: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  isSampleArticle: true;
  sections: {
    heading: string;
    paragraphs: string[];
  }[];
}

export const INSIGHTS_ARTICLES: InsightArticle[] = [
  {
    id: 'seo-aio-full-funnel-growth-guide',
    title: 'SEO + AIO (AI Engine Optimization): Getting Recommended by Google and AI Search',
    category: 'Digital Marketing',
    readingTime: '5 min read',
    publishedLabel: 'Studio Playbook',
    excerpt:
      'Modern discovery happens across both Google SERPs and AI answer engines like ChatGPT, Perplexity, and AI Overviews. Here is how Schema entity graphs, llms.txt, and full-funnel marketing work together.',
    image: STUDIO_IMAGES.heroStudio,
    imageAlt: 'Mushi Digital Growth Studio desk displaying SEO and AI search visibility strategy',
    featured: true,
    isSampleArticle: true,
    sections: [
      {
        heading: 'Why classical SEO alone is no longer complete',
        paragraphs: [
          'Buyers increasingly ask AI assistants which agency, software vendor, or retail brand to trust before ever clicking ten blue links. If your website lacks machine-readable Schema.org entities, clean factual summaries, and AI crawler accessibility, generative engines skip your brand.',
          'Combining Technical SEO (Core Web Vitals, clean canonicals, semantic HTML, sitemaps) with AIO / GEO (llms.txt indices, FAQPage & Service graphs, and clear topical authority) captures demand across both search engines and AI answers.',
        ],
      },
      {
        heading: 'Closing the loop with full-funnel paid & CRM systems',
        paragraphs: [
          'Search and AI visibility attract high-intent buyers—then retargeting across Google and Meta, fast landing page UX, and automated WhatsApp/CRM follow-up convert that visibility into booked revenue.',
        ],
      },
    ],
  },
  {
    id: 'connected-brand-growth-systems',
    title: 'Why Disconnected Campaigns Stall—and How Connected Growth Systems Win',
    category: 'Digital Marketing',
    readingTime: '5 min read',
    publishedLabel: 'Sample Editorial',
    excerpt:
      'When brand identity, paid media, landing pages, and follow-up automation operate in silos, businesses pay twice for attention. Here is how integrated studios align the full journey.',
    image: STUDIO_IMAGES.heroStudio,
    imageAlt: 'Creative studio meeting room representing connected marketing strategy',
    isSampleArticle: true,
    sections: [
      {
        heading: 'The hidden cost of fragmented execution',
        paragraphs: [
          'Many growing businesses hire one vendor for social visuals, another for paid ads, and a separate freelancer for their website. While each team may deliver competent individual assets, the customer experiences a disjointed journey—an ad promises clarity, a landing page feels generic, and enquiries sit unacknowledged in an inbox.',
          'When messaging, visual craft, and conversion architecture are planned together from day one, every click carries stronger intent and higher trust.',
        ],
      },
      {
        heading: 'Designing around commercial momentum',
        paragraphs: [
          'Start by aligning three layers before increasing media spend: positioning clarity (why a buyer should choose you), proof and visual craft (making the brand unmistakable), and frictionless capture (responsive web design paired with prompt CRM routing).',
        ],
      },
    ],
  },
  {
    id: 'minimalist-brand-systems-that-scale',
    title: 'Building a Minimalist Brand Identity That Holds Up Across Digital Channels',
    category: 'Branding',
    readingTime: '4 min read',
    publishedLabel: 'Sample Editorial',
    excerpt:
      'Restraint is not emptiness. Strong minimalist branding relies on disciplined typography, contrast ratios, and repeatable layout grammar across every screen size.',
    image: STUDIO_IMAGES.brandIdentity,
    imageAlt: 'Minimalist obsidian and lavender stationery suite on stone',
    isSampleArticle: true,
    sections: [
      {
        heading: 'Hierarchy before ornamentation',
        paragraphs: [
          'Minimalist identities fail when they strip away personality without replacing it with precision. Typographic scale, intentional grid proportions, and tactile colour discipline communicate authority faster than decorative graphics.',
        ],
      },
      {
        heading: 'Designing for mobile feeds and physical touchpoints alike',
        paragraphs: [
          'A resilient brand system works equally well embossed on packaging, compressed inside a 320px mobile header, and framed in a 16:9 presentation deck.',
        ],
      },
    ],
  },
  {
    id: 'creative-testing-paid-social',
    title: 'Structuring Paid Advertising Creatives for Clarity Over Noise',
    category: 'Advertising',
    readingTime: '4 min read',
    publishedLabel: 'Sample Editorial',
    excerpt:
      'On Meta and LinkedIn, creative quality is the primary targeting lever. Learn how structured visual hooks and clear value statements outperform over-engineered media hacks.',
    image: STUDIO_IMAGES.productionFilm,
    imageAlt: 'Commercial studio lighting setup for advertising creative production',
    isSampleArticle: true,
    sections: [
      {
        heading: 'Three seconds to earn genuine attention',
        paragraphs: [
          'Modern audiences scroll past generic templates instantly. High-performing ad creatives pair honest product or founder visuals with a crisp, scannable problem statement.',
        ],
      },
      {
        heading: 'Message match at the landing page',
        paragraphs: [
          'Never send paid traffic to a generic homepage when a focused service or campaign page can continue the exact conversation the ad started.',
        ],
      },
    ],
  },
  {
    id: 'short-form-reels-with-brand-equity',
    title: 'Short-Form Video Reels Without Compromising Brand Credibility',
    category: 'Social Media',
    readingTime: '4 min read',
    publishedLabel: 'Sample Editorial',
    excerpt:
      'How service and lifestyle brands can embrace vertical reels and consistent social publishing while maintaining an elevated, editorial visual tone.',
    image: STUDIO_IMAGES.productionFilm,
    imageAlt: 'Cinema camera rig inside studio capturing brand reel footage',
    isSampleArticle: true,
    sections: [
      {
        heading: 'Pacing and lighting define perception',
        paragraphs: [
          'Short-form video does not require chaotic editing or trending gimmicks. Thoughtful framing, crisp audio, and purposeful narrative pacing build authority across Instagram, LinkedIn, and YouTube Shorts.',
        ],
      },
    ],
  },
  {
    id: 'commercial-photography-roi',
    title: 'Why Bespoke Commercial Photography Outperforms Stock Imagery',
    category: 'Photography & Video',
    readingTime: '3 min read',
    publishedLabel: 'Sample Editorial',
    excerpt:
      'Buyers recognise generic stock photos within milliseconds. Original photography anchored in your real product, space, and team immediately elevates trust.',
    image: STUDIO_IMAGES.editorialStudioPortrait,
    imageAlt: 'Editorial portrait of creative director in sunlit architectural studio',
    isSampleArticle: true,
    sections: [
      {
        heading: 'Visual consistency across web and campaigns',
        paragraphs: [
          'A single well-planned studio and lifestyle shoot can supply hero banners, service cards, founder portraits, and months of cohesive social storytelling.',
        ],
      },
    ],
  },
  {
    id: 'conversion-focused-web-architecture',
    title: 'Designing Websites Around Mobile Decisions, Not Desktop Shrinkage',
    category: 'Website & Technology',
    readingTime: '5 min read',
    publishedLabel: 'Sample Editorial',
    excerpt:
      'Over half of first-time agency and service visits happen on phones. Designing independent mobile, tablet, and desktop experiences protects conversion rates.',
    image: STUDIO_IMAGES.digitalExperience,
    imageAlt: 'Modern laptop displaying clean structured web architecture',
    isSampleArticle: true,
    sections: [
      {
        heading: 'Speed, clarity, and touch ergonomics',
        paragraphs: [
          'Simply stacking desktop columns onto a 375px screen creates bloated pages and awkward scroll lengths. Tailoring typography scales, navigation drawers, and concise form flows per device class respects user attention.',
        ],
      },
    ],
  },
  {
    id: 'practical-ai-crm-workflows',
    title: 'Practical AI & CRM Automation for Lean Marketing Teams',
    category: 'AI & Automation',
    readingTime: '4 min read',
    publishedLabel: 'Sample Editorial',
    excerpt:
      'Automation works best when it removes repetitive admin—routing qualified enquiries, summarising briefs, and keeping sales follow-up timely.',
    image: STUDIO_IMAGES.heroStudio,
    imageAlt: 'Modern agency studio table for digital workflow planning',
    isSampleArticle: true,
    sections: [
      {
        heading: 'Automate the handoff, humanise the relationship',
        paragraphs: [
          'The best automation stays invisible to the client while giving your team structured data, instant notifications, and clean CRM records so human conversations happen faster.',
        ],
      },
    ],
  },
];

export interface AgencyFaq {
  id: string;
  question: string;
  answer: string;
}

export const AGENCY_FAQS: AgencyFaq[] = [
  {
    id: 'what-is-aio',
    question: 'What is AIO (AI Engine Optimization) and why does it matter alongside SEO?',
    answer:
      'SEO earns rankings on traditional search engines like Google and Bing, while AIO (AI Engine Optimization / GEO) structures your brand entities, Schema.org graphs, llms.txt files, and answer-first content so AI assistants such as ChatGPT, Perplexity, Claude, and Google AI Overviews cite and recommend your business.',
  },
  {
    id: 'full-stack-marketing-scope',
    question: 'What is included in your Full-Stack Marketing, SEO & AIO engagements?',
    answer:
      'Every full-funnel engagement unites Technical & Local SEO, AIO entity optimization, paid media management (Google, Meta, LinkedIn), ad creative & video production, high-converting web pages, and automated CRM/WhatsApp lead capture.',
  },
  {
    id: 'timeline-expectations',
    question: 'How quickly do SEO, AIO, and paid marketing deliver measurable pipeline?',
    answer:
      'Paid acquisition campaigns and conversion landing pages typically generate qualified leads within 2 to 4 weeks, while Technical SEO rankings and AI citation authority compound over 60 to 180 days with monthly attribution reporting.',
  },
];

