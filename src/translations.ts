export interface TranslationSet {
  // Navigation
  navInizio: string;
  navWebApp: string;
  navSitiWeb: string;
  navChiSono: string;
  navProposte: string;
  navContatti: string;
  navChat: string;
  navBlog: string;

  // Header / Accessibility Bar
  facilitatedOn: string;
  facilitatedOff: string;
  facilitatedBadge: string;
  languageLabel: string;
  listenToPage: string;
  stopListening: string;

  // Hero Section
  heroPreTitle: string;
  heroTitleRegular: string;
  heroTitleItalic: string;
  heroDesc: string;
  heroBtnPrimary: string;
  heroBtnSecondary: string;
  proofDirect: string;
  proofDelivery: string;
  proofPrices: string;

  // Approach / Philosophy Section
  approachPre: string;
  approachTitle: string;
  approachDesc: string;
  feat1Title: string;
  feat1Desc: string;
  feat2Title: string;
  feat2Desc: string;
  feat3Title: string;
  feat3Desc: string;

  // Portfolio Section
  portfolioPre: string;
  portfolioTitle: string;
  portfolioDesc: string;
  portfolioViewAll: string;
  portfolioVisitSite: string;
  portfolioCaseStudy: string;

  // Testimonial
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;

  // Call to Action
  ctaPre: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtnPrimary: string;
  ctaBtnSecondary: string;
}

export const translations: Record<"it" | "en", { normal: TranslationSet; facilitated: TranslationSet }> = {
  it: {
    normal: {
      navInizio: "Home",
      navWebApp: "Web App",
      navSitiWeb: "Siti Web",
      navChiSono: "Chi Sono",
      navProposte: "Proposte",
      navContatti: "Contatti",
      navChat: "Chat AI",
      navBlog: "Blog & News",
      facilitatedOn: "Attiva Modalità Facilitata",
      facilitatedOff: "Disattiva Modalità Facilitata",
      facilitatedBadge: "Modalità Semplificata Attiva",
      languageLabel: "Lingua: Italiano",
      listenToPage: "Ascolta questa pagina",
      stopListening: "Interrompi lettura",

      heroPreTitle: "[ M. TERESA ROGANI — STUDIO ]",
      heroTitleRegular: "Siti Web Evoluti con",
      heroTitleItalic: "l'Intelligenza Artificiale",
      heroDesc: "Progetto e sviluppo esperienze digitali moderne, performanti e su misura per far crescere il tuo brand velocemente.",
      heroBtnPrimary: "Lavora con me",
      heroBtnSecondary: "Scopri le proposte di Facilissimo Web",
      proofDirect: "100% DIRETTO",
      proofDelivery: "CONSEGNA IN 14 GIORNI",
      proofPrices: "PREZZI TRASPARENTI",

      approachPre: "[ APPROCCIO E FILOSOFIA ]",
      approachTitle: "Innovazione e Performance",
      approachDesc: "Soluzioni digitali d'avanguardia che uniscono estetica moderna, usabilità e algoritmi intelligenti per scalare la tua attività.",
      feat1Title: "Velocità Straordinaria",
      feat1Desc: "Siti web statici ultra-rapidi ottimizzati per massimizzare il posizionamento sui motori di ricerca e garantire caricamenti immediati su smartphone.",
      feat2Title: "AI Integrata",
      feat2Desc: "Integrazione intelligente di modelli generativi per automatizzare compiti complessi, assistere i clienti in tempo reale o ottimizzare i contenuti.",
      feat3Title: "Design Su Misura",
      feat3Desc: "Nessun template pre-confezionato. Ogni interfaccia è disegnata pixel per pixel per rispecchiare l'unicità e il prestigio del tuo brand.",

      portfolioPre: "[ FEATURED WORK ]",
      portfolioTitle: "Progetti Evoluti",
      portfolioDesc: "Uno sguardo ad alcuni progetti realizzati combinando cura artigianale del design e flussi di ottimizzazione guidati dall'IA.",
      portfolioViewAll: "Vedi i servizi di Facilissimo Web",
      portfolioVisitSite: "Visita il Sito Web →",
      portfolioCaseStudy: "Dettagli Case Study →",

      testimonialQuote: `"Lavorare con Teresa Rogani è stato fantastico. Essendo l'unico interlocutore, le decisioni vengono prese all'istante, la sua consulenza sulla SEO IA ha fatto decollare le nostre vendite e il sito è stato consegnato in sole due settimane."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "CEO, Innova Solutions",

      ctaPre: "[ INIZIA ORA ]",
      ctaTitle: "Il tuo business merita di dominare.",
      ctaDesc: "Trasformo la tua visione in realtà digitale oggi, con un design d'impatto e testi scritti per convertire i tuoi contatti. Parla direttamente con me.",
      ctaBtnPrimary: "Parliamo del tuo progetto",
      ctaBtnSecondary: "Chatta con l'AI Assistant",
    },
    facilitated: {
      navInizio: "Home",
      navWebApp: "Siti Web App",
      navSitiWeb: "Siti Web",
      navChiSono: "Chi Sono",
      navProposte: "Proposte",
      navContatti: "Contatti",
      navChat: "Chat AI",
      navBlog: "Articoli",
      facilitatedOn: "Semplifica Lettura",
      facilitatedOff: "Torna alla Grafica Standard",
      facilitatedBadge: "Modalità Facile Attiva (Testo più grande, colori ad alto contrasto)",
      languageLabel: "Lingua: Italiano",
      listenToPage: "Ascolta la spiegazione a voce",
      stopListening: "Smetti di leggere",

      heroPreTitle: "[ M. TERESA ROGANI — STUDIO ]",
      heroTitleRegular: "Siti Web Semplici con",
      heroTitleItalic: "l'Aiuto del Computer (IA)",
      heroDesc: "Creo siti internet veloci, belli e facili da usare. Lavoro da sola così parli solo con me, risparmi tempo e ricevi un sito perfetto per farti trovare su Google.",
      heroBtnPrimary: "Lavora con me",
      heroBtnSecondary: "Scopri i prezzi",
      proofDirect: "PARLI SOLO CON ME",
      proofDelivery: "PRONTO IN 14 GIORNI",
      proofPrices: "PREZZI CHIARI E FISSI",

      approachPre: "[ COME LAVORO ]",
      approachTitle: "Unione di Tecnologia e Cura",
      approachDesc: "Creo il tuo sito internet con cura e uso l'intelligenza artificiale per renderlo moderno e molto veloce.",
      feat1Title: "Super Veloce",
      feat1Desc: "Il tuo sito si carica subito sui telefoni e si posiziona bene nelle ricerche su Google.",
      feat2Title: "Intelligenza Artificiale",
      feat2Desc: "Uso strumenti moderni per aiutarti a trovare nuovi clienti e automatizzare il lavoro.",
      feat3Title: "Fatto su Misura per Te",
      feat3Desc: "Non uso grafiche pronte o ripetitive. Creo ogni pagina da zero in base a quello che ti serve davvero.",

      portfolioPre: "[ PROGETTI DI FACILISSIMO WEB ]",
      portfolioTitle: "Siti Internet Creati",
      portfolioDesc: "Ecco alcuni siti internet realizzati da Facilissimo Web con passione e cura.",
      portfolioViewAll: "Vedi cosa offro",
      portfolioVisitSite: "Visita il Sito Web →",
      portfolioCaseStudy: "Leggi i Dettagli →",

      testimonialQuote: `"Lavorare con Teresa Rogani è stato fantastico. Parli direttamente con lei, risponde subito alle chiamate e ha creato il nostro sito in sole due settimane aumentando le vendite."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "Amministratore, Innova Solutions",

      ctaPre: "[ COMINCIAMO ORA ]",
      ctaTitle: "Fai crescere la tua attività.",
      ctaDesc: "Scrivimi per parlarmi della tua idea. Svilupperò per te un sito internet eccezionale e facile da usare.",
      ctaBtnPrimary: "Parliamo del tuo progetto",
      ctaBtnSecondary: "Parla con l'Assistente AI di Facilissimo Web",
    },
  },
  en: {
    normal: {
      navInizio: "Start",
      navWebApp: "Web App",
      navSitiWeb: "Websites",
      navChiSono: "About",
      navProposte: "Offers",
      navContatti: "Contact",
      navChat: "AI Chat",
      navBlog: "Blog & News",
      facilitatedOn: "Activate Easy Mode",
      facilitatedOff: "Deactivate Easy Mode",
      facilitatedBadge: "Simplified Mode Active",
      languageLabel: "Language: English",
      listenToPage: "Listen to this page",
      stopListening: "Stop listening",

      heroPreTitle: "[ M. TERESA ROGANI — STUDIO ]",
      heroTitleRegular: "Advanced Websites with",
      heroTitleItalic: "Artificial Intelligence",
      heroDesc: "I design and develop modern, high-performance, and custom digital experiences to grow your brand fast, eliminating agency overheads and optimizing semantic SEO.",
      heroBtnPrimary: "Work with me",
      heroBtnSecondary: "Explore plans of Facilissimo Web",
      proofDirect: "100% DIRECT",
      proofDelivery: "14-DAY DELIVERY",
      proofPrices: "TRANSPARENT PRICING",

      approachPre: "[ APPROACH & PHILOSOPHY ]",
      approachTitle: "Innovation & Performance",
      approachDesc: "Cutting-edge digital solutions blending modern aesthetics, premium usability, and smart algorithms to scale your business.",
      feat1Title: "Extraordinary Speed",
      feat1Desc: "Ultra-fast static websites optimized to maximize search engine rankings and ensure instant loading on smartphones.",
      feat2Title: "AI Integrated",
      feat2Desc: "Smart integration of generative AI models to automate complex tasks, assist customers in real-time, or optimize copy.",
      feat3Title: "Bespoke Design",
      feat3Desc: "No pre-made templates. Every interface is crafted pixel-by-pixel to reflect the uniqueness and prestige of your brand.",

      portfolioPre: "[ FEATURED WORK ]",
      portfolioTitle: "Advanced Projects",
      portfolioDesc: "A glimpse at selected projects created by blending handcrafted design with AI-driven optimization pipelines.",
      portfolioViewAll: "See Facilissimo Web's services",
      portfolioVisitSite: "Visit Website →",
      portfolioCaseStudy: "Case Study Details →",

      testimonialQuote: `"Working with Teresa Rogani was fantastic. Being the sole point of contact, decisions are made instantly, her AI SEO consulting boosted our sales, and the site was delivered in just two weeks."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "CEO, Innova Solutions",

      ctaPre: "[ START NOW ]",
      ctaTitle: "Your business deserves to dominate.",
      ctaDesc: "I will turn your digital vision into reality today with high-impact design and copy written to convert leads. Talk directly to me.",
      ctaBtnPrimary: "Let's talk about your project",
      ctaBtnSecondary: "Chat with the AI Assistant",
    },
    facilitated: {
      navInizio: "Start",
      navWebApp: "Web Apps",
      navSitiWeb: "Websites",
      navChiSono: "About",
      navProposte: "Offers",
      navContatti: "Contact",
      navChat: "AI Chat",
      navBlog: "Articles",
      facilitatedOn: "Simplify Reading",
      facilitatedOff: "Back to Standard Design",
      facilitatedBadge: "Easy Mode Active (Larger text, high-contrast colors)",
      languageLabel: "Language: English",
      listenToPage: "Listen to voice explanation",
      stopListening: "Stop reading",

      heroPreTitle: "[ M. TERESA ROGANI — STUDIO ]",
      heroTitleRegular: "Simple Websites with",
      heroTitleItalic: "Smart Computer Help (AI)",
      heroDesc: "I build fast, beautiful, and easy-to-use websites. I work alone, so you talk only with me. This saves you money and gets you found on Google.",
      heroBtnPrimary: "Work with me",
      heroBtnSecondary: "See prices",
      proofDirect: "TALK DIRECT TO ME",
      proofDelivery: "READY IN 14 DAYS",
      proofPrices: "CLEAR FIXED PRICES",

      approachPre: "[ HOW I WORK ]",
      approachTitle: "Combining Tech and Care",
      approachDesc: "I design your website with care and use smart AI tools to make it ultra-fast.",
      feat1Title: "Super Fast",
      feat1Desc: "Your website loads instantly on mobile phones and ranks well on Google.",
      feat2Title: "Smart AI Tools",
      feat2Desc: "I use modern AI tools to speed up tasks and help you reach new customers.",
      feat3Title: "Custom Design",
      feat3Desc: "No templates. I build every page from scratch tailored to your business.",

      portfolioPre: "[ FACILISSIMO WEB'S PROJECTS ]",
      portfolioTitle: "Websites I Made",
      portfolioDesc: "Here are some websites created by Facilissimo Web with passion and care.",
      portfolioViewAll: "See what I offer",
      portfolioVisitSite: "Visit Website →",
      portfolioCaseStudy: "Read Details →",

      testimonialQuote: `"Working with Teresa Rogani was fantastic. You talk directly with her, she answers quickly, and created our site in just two weeks."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "Manager, Innova Solutions",

      ctaPre: "[ COMINCIAMO ORA ]",
      ctaTitle: "Let's grow your business.",
      ctaDesc: "Send me a message to talk about your idea. I will design an amazing, easy-to-use website for you.",
      ctaBtnPrimary: "Let's talk about your project",
      ctaBtnSecondary: "Talk with Facilissimo Web's AI Helper",
    },
  },
};
