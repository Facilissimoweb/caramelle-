import React from "react";
import { 
  Zap, 
  Cpu, 
  Brain, 
  TrendingUp, 
  Heart, 
  CheckCircle2, 
  Sparkles, 
  BarChart3, 
  ArrowUpRight 
} from "lucide-react";

export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  tags: string[];
  highlightMetrics: string[];
}

export interface StatBar {
  label: string;
  value: string;
  percentage: number;
  isPrimary: boolean;
}

export interface MetricDetail {
  name: string;
  standard: string;
  mine: string;
  description: string;
}

export interface StatItem {
  title: string;
  subtitle: string;
  metricValue: string;
  metricLabel: string;
  badgeText: string;
  description: string;
  comparisonTitle: string;
  bars: StatBar[];
  metricsList: MetricDetail[];
}

export interface ProjectItem {
  title: string;
  category: string;
  desc: string;
  image: string;
  link?: string;
}

export function getFeatures(lang: "it" | "en", t: any): FeatureItem[] {
  return [
    {
      icon: <Zap className="w-5 h-5 text-[#a3e635]" />,
      title: t.feat1Title,
      description: t.feat1Desc,
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["VELOCITÀ", "SEO-DATO"] : ["SPEED", "SEO-DRIVEN"],
      highlightMetrics: lang === "it"
        ? ["Tempo di Caricamento: 0.4s", "PageSpeed Score: 99/100", "Rimbalzo Mobile: < 2%"]
        : ["Interactive Time: 0.4s", "PageSpeed Score: 99/100", "Bounce Rate: < 2%"]
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#a3e635]" />,
      title: t.feat2Title,
      description: t.feat2Desc,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["INTEGRAZIONE IA", "AUTOMAZIONE"] : ["AI INTEGRATION", "AUTOMATION"],
      highlightMetrics: lang === "it"
        ? ["Integrazione Gemini API", "Efficienza Operativa: +85%", "Automazione Form: 24/7"]
        : ["Gemini API Pipelines", "Operational Gain: +85%", "Form Automation: 24/7"]
    },
    {
      icon: <Brain className="w-5 h-5 text-[#a3e635]" />,
      title: t.feat3Title,
      description: t.feat3Desc,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["DESIGN PIXEL-PERFECT", "SU MISURA"] : ["PIXEL-PERFECT", "CUSTOM DESIGN"],
      highlightMetrics: lang === "it"
        ? ["100% Codice Artigianale", "Memorabilità Brand: 95%", "UX Mobile Ottimizzata"]
        : ["100% Handcrafted Code", "Brand Recall: 95%", "Optimized Mobile UX"]
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-[#a3e635]" />,
      title: lang === "it" ? "SEO Semantica d'Avanguardia" : "State-of-the-Art Semantic SEO",
      description: lang === "it" ? "Ottimizzazione avanzata per scalare Google usando schemi semantici e risposte dirette strutturate." : "Advanced search engine dominance using structural semantic markup and query answering layouts.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["GOOGLE SEO", "VISIBILITÀ"] : ["GOOGLE SEO", "VISIBILITY"],
      highlightMetrics: lang === "it"
        ? ["Parole Chiave Top 3: +120%", "Traffico Organico: 3x", "Schema Rich Snippets: 100%"]
        : ["Keywords Top 3: +120%", "Organic Traffic: 3x", "Rich Snippets Schema: 100%"]
    },
    {
      icon: <Heart className="w-5 h-5 text-[#a3e635]" />,
      title: lang === "it" ? "Accessibilità Inclusiva" : "Inclusive Accessibility",
      description: lang === "it" ? "Pieno rispetto dei requisiti di accessibilità con modalità di lettura facilitata, audio-guida e contrasto ottimizzato." : "Full compliance with WCAG accessibility standards, easy-reading mode, text-to-speech, and custom high contrast.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["ACCESSIBILITÀ", "WCAG AA"] : ["ACCESSIBILITY", "WCAG AA"],
      highlightMetrics: lang === "it"
        ? ["Lettura Vocale Integrata", "Contrasto WCAG: Superato", "Usabilità Mobile: 100/100"]
        : ["Built-in Voice Reader", "WCAG Contrast: Passed", "Mobile Usability: 100/100"]
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-[#a3e635]" />,
      title: lang === "it" ? "Sicurezza Totale & Zero Hosting" : "Bulletproof Static Security",
      description: lang === "it" ? "Siti web inattaccabili senza database vulnerabili, pronti a sopportare picchi di traffico mondiali." : "Unattackable websites with no databases to hack, built to withstand massive worldwide traffic spikes with ease.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["SICUREZZA", "SSL ATTIVO"] : ["SECURITY", "SSL ACTIVE"],
      highlightMetrics: lang === "it"
        ? ["Uptime Garantito: 99.99%", "Vulnerabilità SQL: Zero", "CDN Globale: Integrata"]
        : ["Guaranteed Uptime: 99.99%", "SQL Vulnerability: Zero", "Global CDN: Included"]
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#a3e635]" />,
      title: lang === "it" ? "Scrittura Orientata alla Conversione" : "Conversion-Focused Copywriting",
      description: lang === "it" ? "Testi chiari ed eleganti formulati per guidare l'utente verso il form di contatto o l'acquisto." : "Elegant, crystal-clear copywriting formulated to guide the visitor smoothly toward inquiry or purchase.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["COPYWRITING", "CONVERSIONE"] : ["COPYWRITING", "CONVERSION"],
      highlightMetrics: lang === "it"
        ? ["Click su Form: +42%", "Leggibilità Flesch: Ottima", "Testi Multi-lingua: Sì"]
        : ["Form Clicks: +42%", "Flesch Readability: High", "Multi-language Copy: Yes"]
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-[#a3e635]" />,
      title: lang === "it" ? "Metriche di Privacy-First" : "Privacy-First Analytics",
      description: lang === "it" ? "Tracciamento preciso degli utenti rispettando la privacy (GDPR compliant) senza cookie invasivi." : "Precise visitor insight tracking fully in compliance with GDPR standards, without annoying cookie banners.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["ANALYTICS", "RISERVATO"] : ["ANALYTICS", "PRIVACY"],
      highlightMetrics: lang === "it"
        ? ["GDPR Compliant: 100%", "Nessun Cookie Terzo", "Report Settimanali: Inclusi"]
        : ["GDPR Compliant: 100%", "No Third-party Cookies", "Weekly Reports: Included"]
    },
    {
      icon: <ArrowUpRight className="w-5 h-5 text-[#a3e635]" />,
      title: lang === "it" ? "Sostegno e Crescita Continua" : "Continuous Support & Growth",
      description: lang === "it" ? "Nessun ticket anonimo. Parli e pianifichi direttamente con me ogni aggiornamento ed evoluzione futura." : "No anonymous support queues. Call and discuss updates directly with me as your project grows.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["SUPPORTO", "FLESSIBILE"] : ["SUPPORT", "FLEXIBLE"],
      highlightMetrics: lang === "it"
        ? ["Tempo di Risposta: < 2h", "Contatto Diretto Tel/Chat", "Manutenzione Attiva: Sì"]
        : ["Response Time: < 2h", "Direct Phone/Chat Line", "Active Maintenance: Yes"]
    }
  ];
}

export function getStatsData(lang: "it" | "en"): StatItem[] {
  return [
    {
      title: lang === "it" ? "Criterio 1: Velocità di Caricamento" : "Criterion 1: Load Speed Efficiency",
      subtitle: lang === "it" ? "Performance reale mobile e desktop" : "Real-world mobile & desktop performance",
      metricValue: "0.4s",
      metricLabel: lang === "it" ? "Tempo di Caricamento" : "Time to Interactive",
      badgeText: lang === "it" ? "Punteggio 99/100 PageSpeed" : "99/100 PageSpeed Score",
      description: lang === "it" 
        ? "La velocità non è solo un dettaglio tecnico: è il fattore primario per non perdere clienti. Un caricamento lento riduce le conversioni del 20% per ogni secondo aggiuntivo. L'architettura statica di Facilissimo Web carica all'istante, garantendo un'esperienza utente impeccabile e un posizionamento Google prioritario."
        : "Speed is not just a technical detail: it's the primary factor for customer retention. A slow website reduces conversions by 20% for every additional second. Facilissimo Web's static lightweight architecture loads instantly, ensuring a flawless user experience and higher rankings.",
      comparisonTitle: lang === "it" ? "Velocità di Caricamento (Secondi — Meno è meglio)" : "Load Time Comparison (Seconds — Lower is better)",
      bars: [
        { label: lang === "it" ? "Criterio Facilissimo Web" : "Facilissimo Web Build Criteria", value: "0.4s", percentage: 12, isPrimary: true },
        { label: lang === "it" ? "Sito Standard / Template WordPress" : "Standard Site / WordPress Template", value: "3.2s", percentage: 100, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Tasso di Rimbalzo (Bounce)", standard: "45% - 65%", mine: "< 2%", description: "La percentuale di utenti che abbandonano subito la pagina." },
        { name: "Ottimizzazione Mobile", standard: "60 / 100", mine: "100 / 100", description: "Punteggio ufficiale Google PageSpeed per dispositivi mobili." },
        { name: "Tasso di Conversione", standard: "1.2%", mine: "4.8%", description: "Percentuale di visitatori che si convertono in contatti caldi." },
      ] : [
        { name: "Bounce Rate", standard: "45% - 65%", mine: "< 2%", description: "Percentage of users who leave the page immediately." },
        { name: "Mobile Optimization", standard: "60 / 100", mine: "100 / 100", description: "Google PageSpeed's official performance score for mobile." },
        { name: "Conversion Rate", standard: "1.2%", mine: "4.8%", description: "Percentage of visitors who turn into hot leads." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 2: Intelligenza Artificiale Integrata" : "Criterion 2: Integrated AI Automations",
      subtitle: lang === "it" ? "Automazione e posizionamento semantico" : "Automation & semantic positioning",
      metricValue: "85%",
      metricLabel: lang === "it" ? "Efficienza Operativa" : "Operational Efficiency",
      badgeText: lang === "it" ? "SEO Semantica & Assistenza 24/7" : "Semantic SEO & 24/7 Support",
      description: lang === "it"
        ? "L'integrazione di motori intelligenti (es. Gemini API) e calcolatori dinamici permette di qualificare i clienti e automatizzare il 100% delle risposte ripetitive, eliminando i colli di bottiglia e convertendo gli utenti anche di notte. Inoltre, i modelli linguistici avanzati ottimizzano la SEO predittiva per intercettare i futuri trend dei motori di ricerca."
        : "Integrating smart models (like Gemini API) and custom dynamic calculators lets you qualify leads and automate 100% of repetitive customer inquiries. This keeps your business active 24/7. Additionally, semantic AI keyword mapping helps intercept search trend shifts weeks before competitors.",
      comparisonTitle: lang === "it" ? "Tasso di Risposta & Risoluzione Richieste (%)" : "Lead Response & Resolution Rate (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (AI Integrata & Automazioni)" : "My Build Criteria (AI & Automation)", value: "85%", percentage: 85, isPrimary: true },
        { label: lang === "it" ? "Sito Comune (Solo Form di Contatto Statico)" : "Standard Site (Static Contact Form Only)", value: "5%", percentage: 5, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Tempo di Risposta al Cliente", standard: "4-12 ore", mine: "Immediato (< 2s)", description: "Velocità nel fornire preventivi o risposte a domande comuni." },
        { name: "Keyword SEO Indicizzate", standard: "Bassa densità", mine: "+150% espansione", description: "Parole chiave semantiche uniche indicizzate grazie alla SEO predittiva." },
        { name: "Fidelizzazione e Interazione", standard: "Molto bassa", mine: "Fino a 3x più alta", description: "Gli utenti giocano con i preventivatori interattivi e gli avatar restando sul sito." },
      ] : [
        { name: "Lead Response Time", standard: "4-12 hours", mine: "Instant (< 2s)", description: "Time required to reply to some queries or calculate estimations." },
        { name: "Indexed SEO Keywords", standard: "Low density", mine: "+150% expansion", description: "Unique semantic keywords mapped and ranking on search engines." },
        { name: "User Retention", standard: "Very low", mine: "Up to 3x higher", description: "Users engage with calculators and interactive elements longer." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 3: Design Su Misura Pixel-Perfect" : "Criterion 3: Bespoke Pixel-Perfect Design",
      subtitle: lang === "it" ? "Estetica distintiva e psicologia della conversione" : "Distinctive aesthetics & conversion psychology",
      metricValue: "95%",
      metricLabel: lang === "it" ? "Memorabilità del Brand" : "Brand Memorability Score",
      badgeText: lang === "it" ? "Nessun Template Preconfezionato" : "Zero Boilerplates/Templates",
      description: lang === "it"
        ? "I template pronti e i boilerplate generici standardizzano la tua comunicazione, rendendoti indistinguibile dai concorrenti. Un design su misura, curato pixel per pixel, comunica prestigio, cura del dettaglio e autorevolezza. Questo impatto visivo consolida l'affidabilità del tuo brand e spinge l'utente all'azione."
        : "Pre-made layouts and cookie-cutter templates make your business blend in and look generic. A tailored custom layout built pixel-by-pixel conveys authority, precision, and luxury. High-quality visual hierarchy builds immediate consumer trust and triggers direct actions.",
      comparisonTitle: lang === "it" ? "Affidabilità e Percezione del Brand (%)" : "Perceived Brand Quality & Trust Score (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (Codice & Design Artigianale)" : "My Build Criteria (Handcrafted Code & UI)", value: "95%", percentage: 95, isPrimary: true },
        { label: lang === "it" ? "Sito Standard (Template di Massa)" : "Standard Site (Cheap Mass-Market Template)", value: "20%", percentage: 20, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Autorevolezza Percepita", standard: "Standard / Bassa", mine: "Premium / Eccellente", description: "L'impatto visivo iniziale che determina se l'utente si fida del brand." },
        { name: "Esperienza Mobile (UX)", standard: "Elementi disallineati", mine: "Ottimizzazione Fluida", description: "Adattabilità alle gesture e alla dimensione di ogni smartphone." },
        { name: "Tasso di Memorabilità", standard: "Dimenticato in 10s", mine: "Fisso nella mente", description: "Percentuale di utenti che ricordano il nome del brand dopo la visita." },
      ] : [
        { name: "Perceived Authority", standard: "Standard / Low", mine: "Premium / Outstanding", description: "The initial visual impact that decides if the user trusts you." },
        { name: "Mobile UX Fluidity", standard: "Broken alignment", mine: "Fluid Layouts", description: "Adherence to touch targets and smooth phone viewport resizing." },
        { name: "Brand Recall Rate", standard: "Forgotten in 10s", mine: "Highly Memorable", description: "Percentage of visitors who recall the brand name after leaving." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 4: Ottimizzazione SEO Semantica d'Avanguardia" : "Criterion 4: State-of-the-Art Semantic SEO",
      subtitle: lang === "it" ? "SEO strutturata e intenzioni di ricerca" : "Structured SEO & search queries mapping",
      metricValue: "120%",
      metricLabel: lang === "it" ? "Crescita Parole Chiave in Top 3" : "Top 3 Keywords Growth",
      badgeText: lang === "it" ? "Struttura Semantica Avanzata" : "Advanced Semantic Structures",
      description: lang === "it"
        ? "La SEO moderna non si basa su parole inserite a caso, ma sulla comprensione semantica delle intenzioni dell'utente. Utilizzo modelli linguistici di IA per mappare accuratamente i bisogni di ricerca e strutturare il codice con metadati e schemi semantici complessi. Questo garantisce una visibilità organica che si moltiplica nel tempo."
        : "Modern SEO is not about keyword stuffing: it's about semantic intent mapping. I leverage AI language models to discover latent search patterns and construct the site's markup with precise schema structures. This establishes high organic authority that multiplies traffic over time.",
      comparisonTitle: lang === "it" ? "Aumento Visibilità Motori di Ricerca (%)" : "Search Engine Visibility Increase (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (SEO Semantica Strutturata)" : "My Build Criteria (Structured Semantic SEO)", value: "120%", percentage: 100, isPrimary: true },
        { label: lang === "it" ? "Sito Comune (Meta tag base)" : "Standard Site (Basic meta tags only)", value: "15%", percentage: 15, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Parole Chiave Top 3 Google", standard: "Poche o Nessuna", mine: "+120% Incremento", description: "La crescita delle parole chiave posizionate nei primissimi posti su Google." },
        { name: "Traffico Organico Mensile", standard: "Stazionario / Basso", mine: "Fino a 3x di crescita", description: "La crescita di utenti unici qualificati che trovano il sito senza pubblicità." },
        { name: "Presenza Rich Snippet", standard: "Nessuna", mine: "Attiva al 100%", description: "Presenza di stelline, FAQ o dettagli direttamente nei risultati Google." },
      ] : [
        { name: "Top 3 Google Keywords", standard: "Few to none", mine: "+120% Increase", description: "Growth of targeted search queries positioned in Google's absolute top spots." },
        { name: "Monthly Organic Traffic", standard: "Stagnant", mine: "Up to 3x growth", description: "Growth of high-quality organic visitors arriving without paying for ads." },
        { name: "Rich Snippet Presence", standard: "None", mine: "100% Active", description: "Stars, FAQs, or snippets displayed directly inside Google search results." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 5: Accessibilità Inclusiva WCAG AA" : "Criterion 5: Inclusive Accessibility WCAG AA",
      subtitle: lang === "it" ? "Inclusione reale e facilitazione di lettura" : "Genuine inclusion & easier reading modes",
      metricValue: "100%",
      metricLabel: lang === "it" ? "Punteggio di Usabilità Totale" : "Total Usability Score",
      badgeText: lang === "it" ? "Modalità Facilitata Integrata" : "Integrated Accessibility Options",
      description: lang === "it"
        ? "Un sito web accessibile non è solo un obbligo etico, ma aumenta esponenzialmente la platea di utenti potenziali. Integrare pulsanti di lettura vocale, modalità ad alto contrasto visivo e strutture semplificate riduce le barriere cognitive e fisiche, permettendo a chiunque di esplorare la tua offerta senza frustrazioni."
        : "An accessible website is not just an ethical duty: it vastly expands your actual potential audience. Integrating text-to-speech engine, optional high contrast, and simplified user modes breaks down physical and cognitive barriers, ensuring anyone can enjoy your brand effortlessly.",
      comparisonTitle: lang === "it" ? "Tasso di Usabilità per Tutti gli Utenti (%)" : "Usability Score for All Target Audiences (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (Accessibilità WCAG & Voce)" : "My Build Criteria (WCAG & Voice-over)", value: "100%", percentage: 100, isPrimary: true },
        { label: lang === "it" ? "Sito Standard (Scarsa leggibilità)" : "Standard Site (Poor contrast & text size)", value: "40%", percentage: 40, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Leggibilità Vocale Integrata", standard: "Non supportata", mine: "Attiva a 1 clic", description: "Sintesi vocale integrata direttamente nel browser senza plugin." },
        { name: "Rapporto di Contrasto Colore", standard: "Spesso insufficiente", mine: "Superato WCAG AA", description: "Rapporto ottimale tra colore del testo e sfondo per non affaticare la vista." },
        { name: "Navigazione da Tastiera", standard: "Incompleta / Rotta", mine: "Supporto Completo", description: "Possibilità di scorrere tutto il sito usando solo tasti per chi non usa il mouse." },
      ] : [
        { name: "Built-in Voice Reader", standard: "Not supported", mine: "Active on 1-click", description: "Direct text-to-speech player operating right in the page without plugins." },
        { name: "Color Contrast Ratio", standard: "Fails standards", mine: "WCAG AA Approved", description: "Optimal contrast between typography and backgrounds for easy viewing." },
        { name: "Keyboard Navigation", standard: "Broken / Incomplete", mine: "Full Support", description: "Ability to navigate the entire application via keyboard tab keys." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 6: Sicurezza Totale e Architettura Statica" : "Criterion 6: Bulletproof Static Security",
      subtitle: lang === "it" ? "Siti inattaccabili senza vulnerabilità di database" : "Hack-proof static layout with no database flaws",
      metricValue: "99.99%",
      metricLabel: lang === "it" ? "Uptime Medio Annuo" : "Average Annual Uptime",
      badgeText: lang === "it" ? "Prevenzione Attacchi Integrata" : "Built-in Hack Protection",
      description: lang === "it"
        ? "I tradizionali sistemi basati su CMS o database dinamici sono costantemente sotto attacco hacker e richiedono continui aggiornamenti di sicurezza. Sviluppando siti web ad architettura statica, eliminiamo alla radice il database esposto. Il tuo sito diventa letteralmente inattaccabile, velocissimo e ospitato in modo ridondante su CDN globali."
        : "Traditional systems based on heavy databases are constantly targeted by hacks and require non-stop security patches. By developing static-engine applications, we remove the database attack vector entirely. Your site is secure, fast, and redundant on global networks.",
      comparisonTitle: lang === "it" ? "Grado di Vulnerabilità agli Attacchi Hacker (%)" : "Vulnerability to Malicious Attacks (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (Architettura Statica)" : "My Build Criteria (Static Architecture)", value: "0%", percentage: 1, isPrimary: true },
        { label: lang === "it" ? "Sito Comune (WordPress/CMS)" : "Standard Site (WordPress / Mass CMS)", value: "75%", percentage: 75, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Uptime Annuo del Sito", standard: "98.5% (interruzioni)", mine: "99.99% Garantito", description: "La percentuale di tempo in cui il sito è perfettamente online." },
        { name: "SQL Injection & Malware", standard: "Rischio frequente", mine: "Rischio Zero", description: "Vulnerabilità del codice a iniezioni di codice nocivo esterno." },
        { name: "Velocità di Replica CDN", standard: "Nessuna o lenta", mine: "Replica Globale", description: "Sito copiato su centinaia di server nel mondo per caricarsi all'istante ovunque." },
      ] : [
        { name: "Annual Uptime Rate", standard: "98.5% (Frequent downtime)", mine: "99.99% Guaranteed", description: "Percentage of time the server stays fully active and online." },
        { name: "SQL Injection Risk", standard: "Frequent threat", mine: "Zero Risk", description: "Vulnerability of the database structure to external code execution." },
        { name: "CDN Global Replication", standard: "None or slow", mine: "Instant Sync", description: "Site files cached on hundreds of servers globally for local loading speeds." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 7: Scrittura Orientata alla Conversione" : "Criterion 7: Conversion-Focused Copywriting",
      subtitle: lang === "it" ? "Copywriting persuasivo e chiarezza dei messaggi" : "Persuasive copywriting and layout clarity",
      metricValue: "+42%",
      metricLabel: lang === "it" ? "Aumento Click su Form" : "Increase in Form Clicks",
      badgeText: lang === "it" ? "Testi Ottimizzati per Convertire" : "Copywritten to Convert Leads",
      description: lang === "it"
        ? "La grafica attira l'attenzione, ma sono le parole a vendere. Scrivo testi su misura che parlano direttamente ai bisogni profondi dei tuoi clienti, eliminando il gergo tecnico inutile e presentando la tua offerta in modo chiaro ed irresistibile. Ogni chiamata all'azione è posizionata per guidare l'utente alla conversione."
        : "Design captures attention, but words make the sale. I craft copy that addresses your clients' core problems directly, stripping away generic jargon. Every headline and call-to-action is engineered to maximize conversion rates and bring in hot inquiries.",
      comparisonTitle: lang === "it" ? "Aumento Conversione Landing Page (%)" : "Landing Page Conversion Increase (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (Testi Ottimizzati & CTA)" : "My Build Criteria (Copywriting & Smart CTA)", value: "+42%", percentage: 95, isPrimary: true },
        { label: lang === "it" ? "Sito Standard (Testi copiati o noiosi)" : "Standard Site (Generic placeholder text)", value: "0%", percentage: 10, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Conversione su Form di Contatto", standard: "1.5%", mine: "Fino a 4.2%", description: "La percentuale di visitatori che decide di scriverti un messaggio." },
        { name: "Indice di Leggibilità Flesch", standard: "Basso / Complesso", mine: "Eccellente / Fluido", description: "Indice ufficiale che misura la facilità di comprensione del testo." },
        { name: "Chiarezza del Messaggio", standard: "Spesso confuso", mine: "Immediato in 3s", description: "Il tempo impiegato dal visitatore per capire esattamente cosa offri." },
      ] : [
        { name: "Contact Form Conversion", standard: "1.5%", mine: "Up to 4.2%", description: "Percentage of page visitors who decide to fill out the form." },
        { name: "Flesch Readability Index", standard: "Hard to read", mine: "Excellent / Smooth", description: "Standard scoring system measuring how easily readable the text is." },
        { name: "Message Clarity Speed", standard: "Confusing", mine: "Under 3 seconds", description: "Time required for a fresh visitor to understand your exact service." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 8: Metriche di Privacy-First GDPR" : "Criterion 8: Privacy-First GDPR Metrics",
      subtitle: lang === "it" ? "Analisi statistiche precise senza cookie fastidiosi" : "Precise user tracking without annoying cookie barriers",
      metricValue: "100%",
      metricLabel: lang === "it" ? "Grado di Rispetto Privacy" : "Privacy Compliance Rate",
      badgeText: lang === "it" ? "GDPR Compliant senza Cookie Terzi" : "GDPR Ready with Zero Cookie Noise",
      description: lang === "it"
        ? "I fastidiosi banner dei cookie spaventano i clienti e riducono l'usabilità del sito. Implemento tracciamenti statistici moderni e leggeri che rispettano al 100% la privacy degli utenti senza salvare dati personali o utilizzare cookie traccianti di terze parti. Ricevi statistiche perfette e pulite senza infastidire nessuno."
        : "Intrusive cookie banners reduce visual appeal and bounce visitors. I install lightweight analytics that are 100% privacy-compliant by design, with no third-party tracking. You get precise, actionable insights on user visits without cluttering the page with banners.",
      comparisonTitle: lang === "it" ? "Rispetto della Privacy & Usabilità (%)" : "Privacy Respect & Usability Rating (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (Privacy-First No-Banner)" : "My Build Criteria (No-Banner Privacy)", value: "100%", percentage: 100, isPrimary: true },
        { label: lang === "it" ? "Sito Comune (Banner cookie invasivi)" : "Standard Site (Intrusive third-party trackers)", value: "30%", percentage: 30, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "GDPR Compliance di Base", standard: "Spesso parziale", mine: "100% Sicuro", description: "Completa conformità con le leggi europee sulla tutela dei dati." },
        { name: "Nessun Cookie di Terze Parti", standard: "Molti cookie attivi", mine: "Zero Cookie Attivi", description: "Nessun salvataggio di dati sensibili venduti ad agenzie pubblicitarie." },
        { name: "Pulizia Interfaccia Utente", standard: "Bloccata da popup", mine: "Fluida all'istante", description: "Sito visibile immediatamente senza dover cliccare su fastidiosi pop-up." },
      ] : [
        { name: "GDPR Compliance Rate", standard: "Often partial", mine: "100% Approved", description: "Absolute compliance with European regulations for user protection." },
        { name: "No Third-party Cookies", standard: "Multiple trackers", mine: "Zero Tracking Cookies", description: "No logging of sensitive data sold to third-party ad corporations." },
        { name: "UI Seamless Entry", standard: "Blocked by popup", mine: "Instant Access", description: "The page is readable immediately without closing overlay popups." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 9: Supporto & Sviluppo Diretto" : "Criterion 9: Direct Support & Growth",
      subtitle: lang === "it" ? "Consulenza e manutenzione senza intermediari" : "Bespoke maintenance & care with zero middlemen",
      metricValue: "< 2h",
      metricLabel: lang === "it" ? "Tempo di Risposta Medio" : "Average Response Time",
      badgeText: lang === "it" ? "Unico Interlocutore Diretto" : "Direct Support Line",
      description: lang === "it"
        ? "Niente centralini, niente risposte automatiche e niente ticket persi nel vuoto. Quando hai bisogno di una modifica, di un consiglio o di aggiornare il sito, parli direttamente con me. Questo garantisce tempi di esecuzione immediati e decisioni strategiche rapide per fare evolvere il tuo sito di pari passo col tuo business."
        : "No automated queues, call centers, or forgotten support tickets. When you need a fast update, custom feature, or technical consult, you call and message me directly. This ensures immediate turnaround times and agile decision making as your project scales up.",
      comparisonTitle: lang === "it" ? "Tempo medio di risoluzione richieste (Ore)" : "Average Ticket Resolution Time (Hours)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (Contatto Diretto con Teresa)" : "My Build Criteria (Direct Line with Teresa)", value: "Entro 2 ore", percentage: 10, isPrimary: true },
        { label: lang === "it" ? "Agenzia Web Classica (Code d'attesa)" : "Traditional Web Agency (Support Queues)", value: "24-48 ore", percentage: 100, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Tempo di Risposta", standard: "24 - 48 ore", mine: "Meno di 2 ore", description: "Il tempo richiesto per ricevere una risposta qualificata alla richiesta." },
        { name: "Linee di Comunicazione", standard: "Ticket / Centralino", mine: "Telefono e WhatsApp", description: "Il canale preferenziale per coordinare le modifiche del sito." },
        { name: "Evoluzione Continua", standard: "Molto costosa", mine: "Flessibile e Agile", description: "Facilità e velocità nel lanciare nuove pagine o funzionalità aggiuntive." },
      ] : [
        { name: "Lead Response Speed", standard: "24 - 48 hours", mine: "Under 2 hours", description: "Time requested to obtain a highly professional support reply." },
        { name: "Communication Channel", standard: "Ticket Queues", mine: "Direct Phone & Chat", description: "The direct, personal path to execute edits or request reviews." },
        { name: "Continuous Growth", standard: "Slow & Expensive", mine: "Agile & Flexible", description: "Ability to launch new product views or subpages smoothly as you grow." },
      ]
    }
  ];
}

export function getProjects(lang: "it" | "en"): ProjectItem[] {
  return [
    {
      title: "Nexa AI Hub",
      category: lang === "it" ? "Brand Identity & Platform Design" : "Brand Identity & Platform Design",
      desc: lang === "it"
        ? "Interfaccia di controllo bento-grid per l'analisi dati e la gestione dei flussi cloud di Nexa. Palette modernissima e grafica interamente vettoriale."
        : "An analytics control center dashboard with dynamic metrics, data visualization tools, and clean vector graphics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
  ];
}
