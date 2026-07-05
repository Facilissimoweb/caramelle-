export interface TranslationSet {
  // Navigation
  navInizio: string;
  navChiSono: string;
  navProposte: string;
  navContatti: string;
  navChat: string;

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
      navInizio: "Inizio",
      navChiSono: "Chi Sono",
      navProposte: "Proposte",
      navContatti: "Contatti",
      navChat: "Chat AI",
      facilitatedOn: "Attiva Modalità Facilitata",
      facilitatedOff: "Disattiva Modalità Facilitata",
      facilitatedBadge: "Modalità Semplificata Attiva",
      languageLabel: "Lingua: Italiano",
      listenToPage: "Ascolta questa pagina",
      stopListening: "Interrompi lettura",

      heroPreTitle: "[ M. TERESA ROGANI — STUDIO ]",
      heroTitleRegular: "Siti Web Evoluti con",
      heroTitleItalic: "l'Intelligenza Artificiale",
      heroDesc: "Progetto e sviluppo esperienze digitali moderne, performanti e su misura per far crescere il tuo brand velocemente, eliminando i costi di agenzia e ottimizzando la SEO semantica.",
      heroBtnPrimary: "Lavoriamo insieme",
      heroBtnSecondary: "Scopri le proposte",
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
      portfolioViewAll: "Vedi i miei servizi",
      portfolioVisitSite: "Visita il Sito Web →",
      portfolioCaseStudy: "Dettagli Case Study →",

      testimonialQuote: `"Lavorare con Teresa Rogani è stato fantastico. Essendo l'unico interlocutore, le decisioni vengono prese all'istante, la sua consulenza sulla SEO IA ha fatto decollare le nostre vendite e il sito è stato consegnato in sole due settimane."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "CEO, Innova Solutions",

      ctaPre: "[ INIZIA ORA ]",
      ctaTitle: "Il tuo business merita di dominare.",
      ctaDesc: "Trasformiamo la tua visione in realtà digitale oggi, con un design d'impatto e testi scritti per convertire i tuoi contatti. Parla direttamente con me.",
      ctaBtnPrimary: "Parliamo del tuo progetto",
      ctaBtnSecondary: "Chatta con l'AI Assistant",
    },
    facilitated: {
      navInizio: "Home",
      navChiSono: "Chi Sono",
      navProposte: "Prezzi",
      navContatti: "Contatti",
      navChat: "Parla con AI",
      facilitatedOn: "Semplifica Lettura",
      facilitatedOff: "Torna alla Grafica Standard",
      facilitatedBadge: "Modalità Facile Attiva (Testo più grande, colori ad alto contrasto)",
      languageLabel: "Lingua: Italiano",
      listenToPage: "Ascolta la spiegazione a voce",
      stopListening: "Smetti di leggere",

      heroPreTitle: "M. TERESA ROGANI — CREATRICE DI SITI WEB",
      heroTitleRegular: "Siti Web Semplici e",
      heroTitleItalic: "Veloci per il tuo Lavoro",
      heroDesc: "Creo siti internet facili da usare, eleganti e moderni. Lavori direttamente con me, senza intermediari o complicazioni tecniche. Il tuo sito sarà pronto in due settimane.",
      heroBtnPrimary: "Scrivimi ora",
      heroBtnSecondary: "Guarda i prezzi",
      proofDirect: "PARLI SOLO CON ME",
      proofDelivery: "PRONTO IN 14 GIORNI",
      proofPrices: "PREZZO CHIARO E FISSO",

      approachPre: "COME LAVORO",
      approachTitle: "Semplice, Veloce e Moderno",
      approachDesc: "Creo siti belli da vedere, facili da navigare e pronti per essere trovati su Google.",
      feat1Title: "Super Veloci",
      feat1Desc: "I siti si aprono all'istante su qualsiasi smartphone o computer, così non perdi nessun cliente.",
      feat2Title: "Assistenti AI",
      feat2Desc: "Posso aggiungere una chat intelligente sul tuo sito che risponde ai tuoi clienti 24 ore su 24.",
      feat3Title: "Design Unico",
      feat3Desc: "Il sito è fatto apposta per te e per la tua attività. Niente fotocopie, solo il tuo stile.",

      portfolioPre: "I MIEI LAVORI",
      portfolioTitle: "Siti Web Realizzati",
      portfolioDesc: "Ecco una selezione di siti web moderni creati per attività reali e di successo.",
      portfolioViewAll: "Guarda le offerte di prezzo",
      portfolioVisitSite: "Apri il sito internet →",
      portfolioCaseStudy: "Leggi i dettagli →",

      testimonialQuote: `"Teresa ha fatto un lavoro eccezionale! Risponde subito a ogni richiesta, ha capito al volo cosa volevo e ha consegnato un sito velocissimo in 14 giorni esatti."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "Imprenditore, Innova Solutions",

      ctaPre: "COMINCIAMO",
      ctaTitle: "Vuoi un sito web che funziona davvero?",
      ctaDesc: "Parla direttamente con me. Decidiamo insieme la grafica, scriviamo testi chiari e iniziamo subito a creare il tuo sito.",
      ctaBtnPrimary: "Invia un messaggio diretto",
      ctaBtnSecondary: "Chiedi informazioni all'AI",
    },
  },
  en: {
    normal: {
      navInizio: "Start",
      navChiSono: "About",
      navProposte: "Offers",
      navContatti: "Contact",
      navChat: "AI Chat",
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
      heroBtnSecondary: "Explore plans",
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
      portfolioViewAll: "See my services",
      portfolioVisitSite: "Visit Website →",
      portfolioCaseStudy: "Case Study Details →",

      testimonialQuote: `"Working with Teresa Rogani was fantastic. Being the sole point of contact, decisions are made instantly, her AI SEO consulting boosted our sales, and the site was delivered in just two weeks."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "CEO, Innova Solutions",

      ctaPre: "[ START NOW ]",
      ctaTitle: "Your business deserves to dominate.",
      ctaDesc: "Let's turn your digital vision into reality today with high-impact design and copy written to convert leads. Talk directly to me.",
      ctaBtnPrimary: "Let's talk about your project",
      ctaBtnSecondary: "Chat with the AI Assistant",
    },
    facilitated: {
      navInizio: "Home",
      navChiSono: "About",
      navProposte: "Prices",
      navContatti: "Contact",
      navChat: "Talk with AI",
      facilitatedOn: "Simplify Reading",
      facilitatedOff: "Back to Standard Design",
      facilitatedBadge: "Easy Mode Active (Larger text, high-contrast colors)",
      languageLabel: "Language: English",
      listenToPage: "Listen to voice explanation",
      stopListening: "Stop reading",

      heroPreTitle: "M. TERESA ROGANI — WEBSITE CREATOR",
      heroTitleRegular: "Simple and Fast",
      heroTitleItalic: "Websites for Your Work",
      heroDesc: "I create easy-to-use, elegant, and modern websites. You work directly with me, without middle-men or technical confusion. Your site will be ready in two weeks.",
      heroBtnPrimary: "Write to me now",
      heroBtnSecondary: "See prices",
      proofDirect: "TALK DIRECTLY TO ME",
      proofDelivery: "READY IN 14 DAYS",
      proofPrices: "CLEAR & FIXED PRICE",

      approachPre: "HOW I WORK",
      approachTitle: "Simple, Fast and Modern",
      approachDesc: "I build beautiful websites that are easy to browse and ready to be found on Google.",
      feat1Title: "Super Fast",
      feat1Desc: "Your website opens instantly on any phone or computer, so you don't lose any customers.",
      feat2Title: "AI Assistants",
      feat2Desc: "I can add an intelligent chat helper on your site that answers customer questions 24/7.",
      feat3Title: "Unique Design",
      feat3Desc: "The website is made especially for you and your business. No copies, only your own style.",

      portfolioPre: "MY WORK",
      portfolioTitle: "Websites I Built",
      portfolioDesc: "Here is a selection of modern websites created for real, successful businesses.",
      portfolioViewAll: "Check price options",
      portfolioVisitSite: "Open website →",
      portfolioCaseStudy: "Read details →",

      testimonialQuote: `"Teresa did an amazing job! She replies immediately to every request, got exactly what I wanted, and delivered a super-fast website in exactly 14 days."`,
      testimonialAuthor: "Alessandro Bianchi",
      testimonialRole: "Business Owner, Innova Solutions",

      ctaPre: "LET'S START",
      ctaTitle: "Want a website that actually works?",
      ctaDesc: "Talk directly with me. We decide the design together, write clear texts, and start building your site right away.",
      ctaBtnPrimary: "Send a direct message",
      ctaBtnSecondary: "Ask information to our AI",
    },
  },
};
