import { X, Volume2, VolumeX, ShieldAlert, FileText, Sparkles, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { safeStorage } from "../lib/safeStorage";

interface InfoModalProps {
  isOpen: boolean;
  type: "privacy" | "terms" | "ethics" | "sitemap" | null;
  onClose: () => void;
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function InfoModal({ isOpen, type, onClose, lang, isFacilitated }: InfoModalProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      setSynth(window.speechSynthesis);
    }
  }, []);

  // Stop any reading when modal closes or type changes
  useEffect(() => {
    return () => {
      if (synth) {
        synth.cancel();
        setIsPlaying(false);
      }
    };
  }, [isOpen, type, synth]);

  if (!isOpen || !type) return null;

  const contentMap = {
    it: {
      privacy: {
        title: "Informativa sulla Privacy",
        facilitatedTitle: "La tua Privacy in parole semplici",
        icon: <ShieldAlert className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p><strong>1. Titolare del Trattamento:</strong> Il titolare del trattamento dei dati è Facilissimo Web Studio di M. Teresa Rogani, con recapiti indicati nel footer di questo sito.</p>
            <p><strong>2. Tipologia di dati raccolti:</strong> Raccolgo esclusivamente i dati inseriti volontariamente dall'utente attraverso il modulo di contatto (Nome, Email, Azienda, Tipologia di progetto, Budget stimato e Messaggio privato). Non utilizzo cookie di profilazione di terze parti né vendo dati a soggetti esterni.</p>
            <p><strong>3. Finalità del trattamento:</strong> I dati raccolti sono trattati al solo scopo di formulare preventivi, rispondere a richieste di informazioni e gestire i rapporti pre-contrattuali o contrattuali di collaborazione professionale freelancing.</p>
            <p><strong>4. Base giuridica e Conservazione:</strong> Il trattamento si basa sul consenso dell'interessato o sull'esecuzione di misure pre-contrattuali. I dati saranno conservati per il tempo strettamente necessario all'evasione della richiesta o per gli adempimenti previsti dalla legge (massimo 10 anni in caso di instaurazione del rapporto contrattuale).</p>
            <p><strong>5. Diritti dell'utente:</strong> Ai sensi del Regolamento GDPR, l'utente ha il diritto in qualsiasi momento di accedere, rettificare, revocare o richiedere la cancellazione totale dei propri dati personali scrivendo direttamente a: <em>facilissimoweb.mc@gmail.com</em>.</p>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>Promessa principale:</strong> I tuoi dati sono al sicuro. Non li do a nessuno e li uso solo per risponderti.
            </p>
            <p><strong>Chi ha i tuoi dati:</strong> Facilissimo Web. Se compili il modulo contatti, ricevo una mail con il tuo nome e la tua email.</p>
            <p><strong>Perché servono:</strong> Solo per risponderti, capire che tipo di sito web desideri e farti un preventivo preciso.</p>
            <p><strong>Cancellazione veloce:</strong> Se vuoi che cancelli la tua email o i tuoi messaggi, ti basta inviarmi un messaggio e rimuoverò tutto all'istante.</p>
          </div>
        ),
        speechText: "Informativa sulla Privacy. I tuoi dati personali sono al sicuro. Raccolgo solo nome e mail quando mi contatti per rispondere alle tue richieste. Non vendo i tuoi dati a nessuno. Puoi chiederne la cancellazione in ogni momento.",
      },
      terms: {
        title: "Termini di Servizio",
        facilitatedTitle: "Regole del Servizio in parole semplici",
        icon: <FileText className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p><strong>1. Oggetto del Servizio:</strong> Facilissimo Web offre consulenza, progettazione grafica, branding e sviluppo di siti web moderni, con integrazione di sistemi di Intelligenza Artificiale, ottimizzazione SEO e opzioni di gestione continua in abbonamento (WaaS/SaaS).</p>
            <p><strong>2. Modalità di Pagamento:</strong> I servizi prevedono un piano chiaro con quota iniziale di setup ed eventuale canone di gestione mensile o annuale senza costi nascosti o sorprese improvvise.</p>
            <p><strong>3. Diritti sui Contenuti e Servizio Gestito:</strong> Il cliente mantiene la piena titolarità di tutti i marchi, loghi, testi e materiali forniti. La piattaforma e l'infrastruttura tecnica vengono erogate e mantenute attive da Facilissimo Web con hosting e sicurezza continuativi.</p>
            <p><strong>4. Manutenzione e Gestione Continua:</strong> Ogni progetto in abbonamento include gestione server, aggiornamenti tecnici, backup periodici e supporto diretto per modifiche e contenuti.</p>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>Regole chiare:</strong> Svolgo la mia attività in modo onesto, trasparente e senza sorprese sui prezzi.
            </p>
            <p><strong>Come paghi:</strong> Paghi la quota iniziale per lo sviluppo e l'abbonamento mensile/annuale per mantenere il sito sempre attivo e curato.</p>
            <p><strong>Servizio sempre curato:</strong> I tuoi testi e loghi restano tuoi. La gestione tecnica e la sicurezza sono sempre a cura di Facilissimo Web (M. Teresa Rogani).</p>
            <p><strong>Assistenza inclusa:</strong> Per qualsiasi modifica o aggiornamento ai contenuti, il supporto è sempre incluso nel tuo abbonamento.</p>
          </div>
        ),
        speechText: "Termini di Servizio. I contenuti e i marchi appartengono al cliente. Il sito web e la gestione tecnica vengono curati continuamente con il servizio in abbonamento di Facilissimo Web per garantirti massima sicurezza e aggiornamenti trasparenti.",
      },
      ethics: {
        title: "AI Ethics & Trasparenza",
        facilitatedTitle: "Come viene usata l'Intelligenza Artificiale",
        icon: <Sparkles className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p><strong>Il Manifesto Etico di Facilissimo Web sull'Intelligenza Artificiale:</strong> In Facilissimo Web l'Intelligenza Artificiale è uno strumento straordinario per potenziare il talento umano, e non per rimpiazzarlo o generare contenuti di bassa qualità.</p>
            <div className="bg-white/10 border border-white/30 p-4 text-[#F8F7F4] font-sans my-4">
              <strong>Dichiarazione di Co-creazione:</strong> Dichiaro espressamente che tutti gli articoli, le immagini e i contenuti presenti su questo sito web sono stati creati ed elaborati con l'ausilio di sistemi di Intelligenza Artificiale (AI), successivamente supervisionati, riscritti e rifiniti a mano per garantire la massima qualità e cura artigianale.
            </div>
            <p><strong>1. Trasparenza Radicale:</strong> Utilizzo algoritmi generativi avanzati e LLM (come i modelli Gemini di Google) esclusivamente per velocizzare la scrittura del codice ripetitivo, analizzare dati di mercato complessi e strutturare la SEO semantica iniziale.</p>
            <p><strong>2. Controllo e Supervisione Umana (Human-in-the-Loop):</strong> Nessun sito web viene mai generato interamente da una macchina. Ogni singola riga di codice, struttura di database, layout visivo e micro-animazione è interamente revisionata, rifinita e validata manualmente per garantire la massima eccellenza artigianale.</p>
            <p><strong>3. Rispetto del Diritto d'Autore:</strong> Non utilizzo strumenti di generazione di immagini o testi che violino il copyright. Fornisco solo contenuti testuali unici e veritieri, rifiutando la creazione di spam o "slop" generati in massa.</p>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>L'impegno di Facilissimo Web:</strong> Uso la tecnologia per lavorare meglio, ma l'attenzione ai dettagli è sempre al 100% umana.
            </p>
            <p><strong>Come viene usata l'Intelligenza Artificiale:</strong> Mi aiuta a scrivere codice di base più velocemente e a studiare le parole chiave per Google. Questo riduce i tempi e i costi per te.</p>
            <p><strong>Lavorazione Artigianale:</strong> Controllo, scrivo e progetto ogni pixel a mano. Nessun sito è fatto in modo automatico o freddo.</p>
            <p><strong>Contenuti veri:</strong> Scrivo testi reali, interessanti e corretti per farti trovare dai clienti su internet. Niente fuffa o testi noiosi scritti a caso dai robot.</p>
          </div>
        ),
        speechText: "Manifesto sull'Intelligenza Artificiale. Uso l'intelligenza artificiale per eliminare i compiti ripetitivi e abbassare i costi per te. Ogni dettaglio visivo e riga di codice viene però controllato e rifinito a mano per garantire la massima qualità e cura.",
      },
      sitemap: {
        title: "Mappa del Sito (Sitemap)",
        facilitatedTitle: "Le Pagine del Sito in modo semplice",
        icon: <Compass className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p>Questa mappa mostra l'architettura logica e la gerarchia dei contenuti presenti su <strong>Facilissimo Web</strong>, facilitando l'indicizzazione da parte dei motori di ricerca e la navigazione per tutti gli utenti:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#111113]/50 p-4 border border-[rgba(248,247,244,0.08)]">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">1. Navigazione Principale</h4>
                <ul className="space-y-1.5 pl-3 border-l border-[rgba(248,247,244,0.15)] text-[11px] font-mono">
                  <li>• <strong>Inizio (Home):</strong> Vetrina, Filosofia, SEO Predittiva e FAQ</li>
                  <li>• <strong>Chi Sono:</strong> Presentazione dello studio e metodo di lavoro</li>
                  <li>• <strong>Contatti:</strong> Modulo di preventivo rapido e contatti diretti</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">2. Moduli ed Utility</h4>
                <ul className="space-y-1.5 pl-3 border-l border-[rgba(248,247,244,0.15)] text-[11px] font-mono">
                  <li>• <strong>SEO Predittiva:</strong> Sezione informativa sui trend di ricerca latenti</li>
                  <li>• <strong>Widget Accessibilità:</strong> Regolazione caratteri, contrasto e semplificazione</li>
                  <li>• <strong>Gestione Cookie:</strong> Pannello GDPR per controllare liberamente i tracciamenti</li>
                  <li>• <strong>Informativa Legale:</strong> Privacy Policy, Termini e AI Ethics Manifesto</li>
                </ul>
              </div>
            </div>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>Mappa del Sito:</strong> Qui trovi l'elenco semplice di tutto quello che c'è su questo sito web.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white">Pagine principali che puoi visitare:</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm">
                  <li><strong>Home Page:</strong> Presentazione del mio studio, cos'è la SEO Predittiva e risposte alle domande comuni.</li>
                  <li><strong>Chi Sono:</strong> Conosci meglio me, Teresa, e come lavoro.</li>
                  <li><strong>Contatti:</strong> Mandami un messaggio o chiamami per iniziare il tuo progetto.</li>
                  <li><strong>Assistente AI:</strong> Parla con il mio assistente virtuale per un preventivo guidato.</li>
                </ul>
              </div>
            </div>
          </div>
        ),
        speechText: "Mappa del sito. Elenco delle sezioni disponibili: Home Page con presentazione e domande frequenti; Chi Sono con il mio profilo professionale; Contatti per richiedere preventivi; Assistente virtuale per preventivo guidato.",
      },
    },
    en: {
      privacy: {
        title: "Privacy Policy",
        facilitatedTitle: "Your Privacy in simple terms",
        icon: <ShieldAlert className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p><strong>1. Data Controller:</strong> The data controller is Facilissimo Web Studio di M. Teresa Rogani, with contact info specified in the footer of this website.</p>
            <p><strong>2. Types of Data Collected:</strong> We exclusively collect data voluntarily submitted via the contact form (Name, Email, Company, Project Type, Estimated Budget, and Private Message). We do not use third-party profiling cookies or sell data to third parties.</p>
            <p><strong>3. Purpose of Processing:</strong> Collected data is processed solely for preparing estimates, answering information requests, and managing pre-contractual and contractual relations.</p>
            <p><strong>4. Retention Period:</strong> Data is kept only as long as necessary to process your request or satisfy legal obligations (maximum 10 years if a contract is signed).</p>
            <p><strong>5. Your Rights:</strong> Under GDPR regulations, you have the right to access, edit, withdraw consent, or request deletion of your personal data at any time by emailing: <em>facilissimoweb.mc@gmail.com</em>.</p>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>Main Promise:</strong> Your data is safe with Facilissimo Web. We never share it, and use it only to answer your messages.
            </p>
            <p><strong>Who receives your data:</strong> Facilissimo Web. When you submit the contact form, we receive a private email with your name and email address.</p>
            <p><strong>Why we need it:</strong> Only to reply, understand your project needs, and send you a custom proposal.</p>
            <p><strong>Fast Deletion:</strong> If you want us to delete your messages or contact info, send a quick request and we will erase everything immediately.</p>
          </div>
        ),
        speechText: "Privacy Policy. Your personal data is safe. Facilissimo Web only collects name and email when you write to us to answer your inquiries. We do not sell your data.",
      },
      terms: {
        title: "Terms of Service",
        facilitatedTitle: "Service Rules in simple terms",
        icon: <FileText className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p><strong>1. Subject:</strong> Facilissimo Web provides custom web design, coding, branding, and smart SEO optimization services, with optional AI feature integration.</p>
            <p><strong>2. Payment Terms:</strong> Unless agreed otherwise in writing, services require a 50% deposit upon proposal acceptance, and the remaining 50% upon final website delivery and publication.</p>
            <p><strong>3. Intellectual Property:</strong> All intellectual property rights regarding design, code, and approved copy transfer fully to the client upon final payment. The client warrants they own the rights to any texts and assets provided.</p>
            <p><strong>4. Support and Warranty:</strong> Every delivered website includes a 30-day technical warranty to fix bugs or coding errors at no extra cost.</p>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>Clear Rules:</strong> We work in an honest, transparent way with zero price surprises.
            </p>
            <p><strong>How you pay:</strong> You pay the first half (50%) at the start to secure your delivery date. You pay the second half only when the website is finished, tested, and ready to go live.</p>
            <p><strong>You own everything:</strong> Upon final payment, the website is 100% yours. We transfer all files, code, and password access directly to you.</p>
            <p><strong>Free Support:</strong> For the first month after launch, if any bug or issue appears on the site, we fix it immediately for free.</p>
          </div>
        ),
        speechText: "Terms of Service. You pay fifty percent at the beginning and fifty percent when the website is done. Once paid, the website is completely yours, and you receive thirty days of free support.",
      },
      ethics: {
        title: "AI Ethics & Transparency",
        facilitatedTitle: "How we use Artificial Intelligence",
        icon: <Sparkles className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p><strong>Facilissimo Web AI Ethics Manifesto:</strong> We believe Artificial Intelligence is an extraordinary tool to empower human talent, not to replace it or generate low-quality content.</p>
            <div className="bg-white/10 border border-white/30 p-4 text-[#F8F7F4] font-sans my-4">
              <strong>Co-creation Disclosure:</strong> We explicitly declare that all articles, images, and content on this website have been created with the assistance of Artificial Intelligence (AI) systems, and subsequently supervised, rewritten, and manually refined by hand to guarantee maximum craftsmanship.
            </div>
            <p><strong>1. Transparency:</strong> We use advanced generative models (like Google Gemini) exclusively to speed up repetitive code, analyze market data, and draft initial SEO structures.</p>
            <p><strong>2. Human Supervision:</strong> No website is ever created entirely by machines. Every line of code, database schema, visual element, and micro-animation is manually reviewed, refined, and tested by hand.</p>
            <p><strong>3. Integrity:</strong> We do not use tools that infringe copyright. We offer unique, high-quality graphics and copy, actively refusing automated spam or poor quality 'slop'.</p>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>Facilissimo Web Commitment:</strong> We use technology to work faster, but attention to detail remains 100% human-crafted.
            </p>
            <p><strong>How we use AI:</strong> It helps us write foundational code faster and find search keywords for Google. This saves time and keeps costs lower for you.</p>
            <p><strong>Artisanal Quality:</strong> We review, write, and design every single pixel and line of code by hand.</p>
            <p><strong>Real Content:</strong> We craft clear, persuasive, original text to help your clients find you. No boring robot text blocks.</p>
          </div>
        ),
        speechText: "AI Ethics. We use artificial intelligence to speed up basic coding and keep prices low. Every visual detail and final script is crafted, tested, and perfected by hand for premium quality.",
      },
      sitemap: {
        title: "Website Sitemap",
        facilitatedTitle: "Simple Website Map",
        icon: <Compass className="w-8 h-8 text-white" />,
        normal: (
          <div className="space-y-6 text-sm text-[#F8F7F4]/85 leading-relaxed font-sans">
            <p>This sitemap illustrates the logical hierarchy and content structure of <strong>Facilissimo Web</strong>, ensuring search engines can index pages and users can browse efficiently:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#111113]/50 p-4 border border-[rgba(248,247,244,0.08)]">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">1. Core Navigation</h4>
                <ul className="space-y-1.5 pl-3 border-l border-[rgba(248,247,244,0.15)] text-[11px] font-mono">
                  <li>• <strong>Home:</strong> Studio intro, Predictive SEO section, FAQ accordion</li>
                  <li>• <strong>About:</strong> Studio profile and design approach</li>
                  <li>• <strong>Proposals:</strong> 3 specific website packages and pricing models</li>
                  <li>• <strong>Contact:</strong> Estimate forms and direct communication info</li>
                  <li>• <strong>AI Assistant Chat:</strong> Interactive guidance and AI-powered quote helper</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">2. Modality &amp; Preferences</h4>
                <ul className="space-y-1.5 pl-3 border-l border-[rgba(248,247,244,0.15)] text-[11px] font-mono">
                  <li>• <strong>Predictive SEO:</strong> Latent intent marketing section</li>
                  <li>• <strong>Accessibility:</strong> Widget for layout zoom and high contrast</li>
                  <li>• <strong>Cookie Preferences:</strong> GDPR compliant tracking toggles</li>
                  <li>• <strong>Legal Documentation:</strong> Privacy Policy, Terms of Service, and AI Ethics</li>
                </ul>
              </div>
            </div>
          </div>
        ),
        facilitated: (
          <div className="space-y-6 text-base text-[#F8F7F4] leading-relaxed font-sans">
            <p className="bg-[#151518] p-4 border-l-4 border-white text-sm">
              <strong>Sitemap:</strong> Here is a simple, easy list of everything available on this website.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-white">Main pages you can explore:</h4>
                <ul className="list-disc pl-5 mt-2 space-y-1.5 text-sm">
                  <li><strong>Home:</strong> My studio introduction, Predictive SEO explanation, and helpful FAQs.</li>
                  <li><strong>About Me:</strong> Read more about me, Teresa, and my working style.</li>
                  <li><strong>Offers &amp; Prices:</strong> Check the 3 plans to create your website with clear pricing.</li>
                  <li><strong>Contact:</strong> Send me a message or call me directly to start.</li>
                  <li><strong>AI Assistant:</strong> Speak with my smart helper to draft a guided proposal.</li>
                </ul>
              </div>
            </div>
          </div>
        ),
        speechText: "Sitemap. Overview of the sections: Home page with presentation and FAQs; About me page; Offers and prices page; Contact page for direct messages; AI assistant for custom quotes.",
      },
    },
  };

  const activeContent = contentMap[lang][type];
  const title = isFacilitated ? activeContent.facilitatedTitle : activeContent.title;
  const body = isFacilitated ? activeContent.facilitated : activeContent.normal;

  const handleSpeak = () => {
    if (!synth) return;

    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      return;
    }

    const currentGoogleLang = safeStorage.getItem("facilissimo-google-lang") || "it";
    
    // Dynamically retrieve text from the DOM so we read the actually translated text!
    const modalBody = document.getElementById("modal-content-body");
    const modalTitle = document.querySelector("#info-modal-" + type + " h2");
    
    const textToRead = (modalTitle ? modalTitle.textContent + ". " : "") + 
                       (modalBody ? modalBody.innerText : activeContent.speechText);

    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    let speechLang = "it-IT";
    if (currentGoogleLang === "en") speechLang = "en-US";
    else if (currentGoogleLang === "fr") speechLang = "fr-FR";
    else if (currentGoogleLang === "de") speechLang = "de-DE";
    else if (currentGoogleLang === "es") speechLang = "es-ES";
    else if (currentGoogleLang === "pt") speechLang = "pt-PT";
    else if (currentGoogleLang === "ru") speechLang = "ru-RU";
    else if (currentGoogleLang === "zh-CN") speechLang = "zh-CN";

    utterance.lang = speechLang;
    utterance.rate = 0.95; // Slightly slower for readability
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setCurrentUtterance(utterance);
    setIsPlaying(true);
    synth.speak(utterance);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#111113]/85 backdrop-blur-md"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.5 }}
          className={`relative w-full max-w-2xl bg-[#151518] border border-[rgba(248,247,244,0.15)] overflow-hidden shadow-2xl flex flex-col ${
            isFacilitated ? "p-8 md:p-10" : "p-6 md:p-8"
          }`}
          id={`info-modal-${type}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-[rgba(248,247,244,0.1)] pb-5 mb-6 shrink-0">
            <div className="flex items-center gap-3">
              {activeContent.icon}
              <h2
                className={`font-display font-bold text-[#F8F7F4] ${
                  isFacilitated ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                }`}
              >
                {title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {/* Text-to-speech option */}
              <button
                onClick={handleSpeak}
                className="p-2 border border-[rgba(248,247,244,0.1)] hover:border-white text-[#F8F7F4]/70 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer text-xs font-mono"
                title={lang === "it" ? "Leggi ad alta voce" : "Read aloud"}
                id="btn-speak-text"
              >
                {isPlaying ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">
                  {isPlaying
                    ? lang === "it"
                      ? "Stop"
                      : "Stop"
                    : lang === "it"
                    ? "Ascolta"
                    : "Listen"}
                </span>
              </button>

              <button
                onClick={onClose}
                className="p-2 text-[#F8F7F4]/50 hover:text-[#F8F7F4] hover:bg-[rgba(248,247,244,0.05)] border border-transparent transition-all cursor-pointer"
                id="btn-close-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content Body */}
          <div
            className={`overflow-y-auto max-h-[60vh] pr-2 space-y-4 text-left custom-scrollbar ${
              isFacilitated ? "text-base sm:text-lg leading-relaxed font-sans" : "text-sm leading-relaxed"
            }`}
            id="modal-content-body"
          >
            {body}
          </div>

          {/* Footer of modal */}
          <div className="border-t border-[rgba(248,247,244,0.1)] pt-4 mt-6 flex justify-end shrink-0">
            <button
              onClick={onClose}
              className={`solid-primary ${
                isFacilitated ? "text-xs px-6 py-3" : ""
              }`}
              id="btn-confirm-modal"
            >
              {lang === "it" ? "Ho capito, chiudi" : "I understand, close"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
