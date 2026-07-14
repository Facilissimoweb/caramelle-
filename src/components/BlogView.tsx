import { useState, useEffect, ReactNode } from "react";
import { Calendar, Clock, User, Share2, Tag, ArrowLeft, Linkedin, Twitter, Facebook, Copy, Check, ChevronRight, Bookmark, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
const logoImage = "/images/f (5).webp";

interface Article {
  slug: string;
  title: Record<"it" | "en", string>;
  description: Record<"it" | "en", string>;
  category: Record<"it" | "en", string>;
  tags: string[];
  publishDate: string;
  readTime: Record<"it" | "en", string>;
  author: string;
  coverImage: string;
  content: Record<"it" | "en", ReactNode>;
  metaTitle: Record<"it" | "en", string>;
  metaDescription: Record<"it" | "en", string>;
}

interface BlogViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
  setCurrentTab: (tab: string) => void;
  selectedArticle: string | null;
  setSelectedArticle: (slug: string | null) => void;
}

export default function BlogView({
  lang,
  isFacilitated,
  setCurrentTab,
  selectedArticle,
  setSelectedArticle,
}: BlogViewProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const bgImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Scroll to top when article is opened or closed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedArticle]);

  const handleCopyLink = () => {
    const articleSlug = selectedArticle || "ai-act-regolamento-europeo";
    const url = window.location.origin + "/blog/" + articleSlug;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const openSocialShare = (platform: "linkedin" | "twitter" | "facebook", directUrl: string, title: string, text: string) => {
    const url = encodeURIComponent(directUrl);
    const shareText = encodeURIComponent(`${title} - ${text}`);
    let shareUrl = "";

    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${shareText}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShareToast(
      lang === "it"
        ? `Condivisione su ${platform.toUpperCase()} avviata!`
        : `Sharing on ${platform.toUpperCase()} initiated!`
    );
    setTimeout(() => setShareToast(null), 3000);
  };

  const triggerShare = (platform: "linkedin" | "twitter" | "facebook") => {
    const articleSlug = selectedArticle || "ai-act-regolamento-europeo";
    const article = articles.find((a) => a.slug === articleSlug);
    const directUrl = window.location.origin + "/blog/" + articleSlug;
    
    const titleText = article ? article.title[lang] : "Facilissimo Web Blog";
    const descText = article ? article.description[lang] : "";
    // Grab first 20 words
    const first20Words = descText ? descText.split(/\s+/).slice(0, 20).join(" ") + "..." : "";

    if (navigator.share) {
      navigator.share({
        title: titleText,
        text: `${first20Words}\n\n`,
        url: directUrl
      }).then(() => {
        setShareToast(
          lang === "it"
            ? "Articolo condiviso con successo!"
            : "Article shared successfully!"
        );
        setTimeout(() => setShareToast(null), 3000);
      }).catch((err) => {
        console.log("Native share failed or dismissed", err);
        openSocialShare(platform, directUrl, titleText, first20Words);
      });
    } else {
      openSocialShare(platform, directUrl, titleText, first20Words);
    }
  };

  const articles: Article[] = [
    {
      slug: "ai-act-regolamento-europeo",
      title: {
        it: "L’AI Act è legge: l’Europa ridisegna il futuro dell’Intelligenza Artificiale con il sistema dei quattro rischi",
        en: "The AI Act is Law: Europe Redesigns the Future of Artificial Intelligence with the Four Risks System"
      },
      description: {
        it: "L'Unione Europea traccia una linea netta con l'approvazione dell'AI Act, la prima legge organica al mondo che regolamenta l'Intelligenza Artificiale con l'approccio dei quattro rischi.",
        en: "The European Union draws a clear line with the final approval of the AI Act, the world's first comprehensive law regulating Artificial Intelligence through a four-risk model."
      },
      category: {
        it: "Normative & IA",
        en: "Regulations & AI"
      },
      tags: ["AI Act", "Unione Europea", "Normative", "Copyright", "Intelligenza Artificiale"],
      publishDate: "07 Luglio 2026",
      readTime: {
        it: "6 min di lettura",
        en: "6 min read"
      },
      author: "M. Teresa Rogani",
      coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200",
      metaTitle: {
        it: "L'AI Act è Legge: Come Funzionano i 4 Livelli di Rischio",
        en: "The EU AI Act is Law: Understanding the 4 Risk Categories"
      },
      metaDescription: {
        it: "Scopri come la prima legge europea sull'Intelligenza Artificiale regola i sistemi di IA generica, copyright e le quattro categorie di rischio.",
        en: "Learn how the first European law on Artificial Intelligence regulates general-purpose AI, copyright, and the four risk tiers."
      },
      content: {
        it: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed font-normal">
            <p className="font-medium text-lg text-[#111113]">
              L'Unione Europea ha tracciato una linea netta nel panorama tecnologico mondiale con l'approvazione definitiva dell'AI Act, la prima legge organica al mondo che regolamenta l'Intelligenza Artificiale. L'obiettivo della normativa non è frenare l'innovazione, ma garantire che lo sviluppo tecnologico avvenga nel pieno rispetto dei diritti fondamentali, della sicurezza e della privacy dei cittadini. La legge adotta un approccio pragmatico e proporzionale basato interamente sul livello di rischio che i diversi sistemi possono generare per la società.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">Una piramide basata sul rischio</h3>
            <p>
              Il cuore pulsante dell'AI Act è la suddivisione delle tecnologie in quattro precise categorie di rischio, a ciascuna delle quali corrispondono obblighi e divieti ben definiti:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-red-500/20 bg-red-500/5">
                <span className="font-mono text-xs font-bold text-red-600 block mb-2">01. RISCHIO INACCETTABILE (SISTEMI VIETATI)</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  L'Europa bandisce categoricamente tutte le applicazioni che minacciano la libertà e la dignità umana. Tra queste figurano i sistemi di punteggio sociale (social scoring), la manipolazione del comportamento umano per eludere il libero arbitrio e i sistemi di identificazione biometrica remota in tempo reale negli spazi pubblici (salvo limitatissime eccezioni legate alla sicurezza nazionale o alla prevenzione di gravi reati).
                </p>
              </div>
              <div className="p-5 border border-amber-500/20 bg-amber-500/5">
                <span className="font-mono text-xs font-bold text-amber-600 block mb-2">02. RISCHIO ALTO (SISTEMI VIGILATI)</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  In questa fascia rientrano le tecnologie utilizzate in settori critici come la sanità, le infrastrutture strategiche, l'istruzione, la gestione del personale (software di selezione dei candidati) e l'amministrazione della giustizia. Questi sistemi non sono vietati, ma per essere immessi sul mercato devono superare severi controlli di qualità dei dati, garantire una documentazione tecnica trasparente, implementare rigorose misure di cybersecurity e assicurare una costante supervisione umana.
                </p>
              </div>
              <div className="p-5 border border-blue-500/20 bg-blue-500/5">
                <span className="font-mono text-xs font-bold text-blue-600 block mb-2">03. RISCHIO LIMITATO (OBBLIGO DI TRASPARENZA)</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Riguarda le tecnologie con cui gli utenti interagiscono quotidianamente, come i chatbot di assistenza clienti o i generatori di immagini e video. La regola d'oro qui è la trasparenza: i cittadini devono essere esplicitamente informati quando stanno parlando con una macchina o quando un contenuto visivo o testuale è un "deepfake" generato dall'IA.
                </p>
              </div>
              <div className="p-5 border border-emerald-500/20 bg-emerald-500/5">
                <span className="font-mono text-xs font-bold text-emerald-600 block mb-2">04. RISCHIO MINIMO O NULLO</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  È la categoria che comprende la stragrande maggioranza delle applicazioni attuali, come i filtri antispam delle email o i sistemi di intelligenza artificiale integrati nei videogiochi. Per queste tecnologie non è previsto alcun vincolo legale o burocratico aggiuntivo.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">Il nodo dell'IA Generativa e del Copyright</h3>
            <p>
              Un capitolo cruciale della normativa è dedicato ai modelli di IA generica (General Purpose AI), come i grandi modelli linguistici dietro i moderni assistenti virtuali. L'AI Act impone ai colossi tecnologici massima trasparenza sui processi di addestramento degli algoritmi. Gli sviluppatori sono obbligati a rispettare la normativa europea sul diritto d'autore e a pubblicare sintesi dettagliate dei dati e delle opere protette da copyright utilizzate per istruire i propri modelli, tutelando così il lavoro di creatori, editori e artisti.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">Le sanzioni e la tabella di marcia</h3>
            <p>
              Per garantire il rispetto delle regole, l'Unione Europea ha previsto un sistema sanzionatorio estremamente severo, con multe che possono raggiungere i 35 milioni di euro o fino al 7% del fatturato globale annuo delle aziende inadempienti. L'applicazione del regolamento è strutturata in modo progressivo, concedendo a imprese e sviluppatori il tempo necessario per adeguarsi ai nuovi standard e garantire una transizione fluida verso un'interazione con l'IA che sia, prima di tutto, sicura e antropocentrica.
            </p>
            
            <div className="mt-8 pt-6 border-t border-[#111113]/10 bg-[#FAF9F6] p-6 space-y-3">
              <h4 className="font-display font-bold text-base text-[#111113]">Approfondisci l'argomento con me</h4>
              <p className="text-xs text-[#111113]/75">
                Se vuoi approfondire l'argomento, possiamo concentrarci su un aspetto specifico. Ad esempio, preferisci analizzare l'impatto della legge sul copyright per gli artisti, capire quali sono le sanzioni per le aziende o approfondire i sistemi ad alto rischio? Parliamone direttamente via chat o contatti!
              </p>
            </div>
          </div>
        ),
        en: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed font-normal">
            <p className="font-medium text-lg text-[#111113]">
              The European Union has drawn a clear line across the global technological landscape with the definitive approval of the AI Act, the world's first comprehensive legislation regulating Artificial Intelligence. The purpose of this law is not to halt innovation, but to ensure technological development fully respects fundamental rights, security, and citizen privacy. The law adopts a pragmatic, risk-proportionate approach based entirely on the level of potential harm a system can bring to society.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">The Risk Pyramid</h3>
            <p>
              At the heart of the AI Act lies the categorization of technologies into four distinct risk tiers, each governed by specific rules, obligations, and prohibitions:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-red-500/20 bg-red-500/5">
                <span className="font-mono text-xs font-bold text-red-600 block mb-2">01. UNACCEPTABLE RISK (PROHIBITED SYSTEMS)</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Europe strictly bans all systems posing threats to human freedom and dignity. This includes social scoring, cognitive behavioral manipulation, and real-time remote biometric identification in public spaces (except for very limited exceptions regarding national security or prevention of severe crimes).
                </p>
              </div>
              <div className="p-5 border border-amber-500/20 bg-amber-500/5">
                <span className="font-mono text-xs font-bold text-amber-600 block mb-2">02. HIGH RISK (REGULATED SYSTEMS)</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  This tier comprises critical sectors like healthcare, critical infrastructure, education, employment management (e.g. CV screening tools), and law enforcement. These must pass rigorous data quality controls, provide transparent technical documentation, implement strict cybersecurity, and maintain continuous human oversight.
                </p>
              </div>
              <div className="p-5 border border-blue-500/20 bg-blue-500/5">
                <span className="font-mono text-xs font-bold text-blue-600 block mb-2">03. LIMITED RISK (TRANSPARENCY MANDATES)</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  This relates to technologies users interact with daily, like customer support chatbots or image/video generators. The golden rule here is transparency: citizens must be clearly informed when they are interacting with AI or when content is a synthetic deepfake.
                </p>
              </div>
              <div className="p-5 border border-emerald-500/20 bg-emerald-500/5">
                <span className="font-mono text-xs font-bold text-emerald-600 block mb-2">04. MINIMAL OR NO RISK</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  This covers the majority of current systems, such as spam filters or AI within video games. These tools are subject to no extra legal or bureaucratic burdens.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">The Generative AI and Copyright Crux</h3>
            <p>
              A major chapter of the regulation is dedicated to General Purpose AI, such as the large language models (LLMs) driving today's smart assistants. The AI Act demands absolute transparency on algorithmic training datasets. Developers must comply with EU copyright laws and publish transparent summaries of copyrighted material used for training, thereby protecting creative artists, publishers, and authors.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">Penalties and Roadmap</h3>
            <p>
              To ensure compliance, the EU has established massive fines—up to 35 million Euros or up to 7% of global annual turnover for non-compliant companies. The rollout is progressive, allowing developers and organizations sufficient time to adjust to the high standards and achieve a human-centric relationship with AI.
            </p>
            
            <div className="mt-8 pt-6 border-t border-[#111113]/10 bg-[#FAF9F6] p-6 space-y-3">
              <h4 className="font-display font-bold text-base text-[#111113]">Delve deeper into this with me</h4>
              <p className="text-xs text-[#111113]/75">
                If you want to delve deeper into this topic, we can focus on a specific aspect. For instance, would you prefer to analyze the impact of the copyright law for artists, understand corporate fines, or explore high-risk systems? Let's discuss it directly via chat or contacts!
              </p>
            </div>
          </div>
        )
      }
    },
    {
      slug: "seo-predittiva",
      title: {
        it: "La Rivoluzione della SEO Predittiva: Come l'IA anticipa i motori di ricerca",
        en: "The Predictive SEO Revolution: How AI Anticipates Search Engines"
      },
      description: {
        it: "La SEO tradizionale analizza il passato. La SEO Predittiva, potenziata dall'Intelligenza Artificiale, analizza il presente per prevedere il futuro del posizionamento online.",
        en: "Traditional SEO analyzes the past. Predictive SEO, powered by Artificial Intelligence, analyzes the present to predict the future of online rankings."
      },
      category: {
        it: "SEO & Algoritmi",
        en: "SEO & Algorithms"
      },
      tags: ["SEO", "Intelligenza Artificiale", "Marche", "Web Design"],
      publishDate: "07 Luglio 2026",
      readTime: {
        it: "5 min di lettura",
        en: "5 min read"
      },
      author: "M. Teresa Rogani",
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
      metaTitle: {
        it: "La SEO Predittiva e la Rivoluzione dell'IA - Facilissimo Web",
        en: "Predictive SEO and the AI Revolution - Facilissimo Web"
      },
      metaDescription: {
        it: "Scopri come la SEO predittiva cambia il modo di posizionare i siti web a Macerata e nelle Marche grazie all'intelligenza artificiale.",
        en: "Discover how predictive SEO changes website rankings in Macerata and Marche through artificial intelligence."
      },
      content: {
        it: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#111113]">
              La SEO tradizionale è ormai un esercizio del passato. Guardare cosa le persone hanno già cercato significa inseguire costantemente la concorrenza. La SEO Predittiva stravolge questo paradigma.
            </p>

            <div className="my-8 p-6 bg-[#FAF9F6] border-l-4 border-[#E35930] space-y-3">
              <span className="font-mono text-xs text-[#E35930] tracking-widest block uppercase">// IL CUORE DELLA STRATEGIA PREDITTIVA</span>
              <p className="text-xs sm:text-sm text-[#111113]/70">
                La SEO Predittiva, potenziata dall'Intelligenza Artificiale, analizza il comportamento in tempo reale degli utenti e l'evoluzione degli algoritmi per prevedere le tendenze di ricerca con mesi di anticipo. Questo permette a Facilissimo Web di posizionare il tuo brand prima di chiunque altro.
              </p>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">I Quattro Pilastri Fondamentali</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">01. Analisi dei Trend Latenti</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Interrogo modelli linguistici avanzati di intelligenza artificiale per analizzare i comportamenti d'acquisto emergenti, anticipando le parole chiave specifiche che diventeranno popolari nei prossimi mesi prima dei concorrenti.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">02. Mappatura Intenti di Ricerca</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Raggruppo i bisogni espressi dagli utenti in "cluster semantici" ancor prima che i motori di ricerca tradizionali li classifichino, strutturando le risposte ottimali per gli utenti del tuo territorio.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">03. Codice Leggero e Predittivo</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Sviluppo l'architettura dei dati del sito in modo ultra-pulito usando i markup ufficiali (schema.org) affinché gli assistenti AI e gli algoritmi di Google e Bing leggano e riconoscano istantaneamente l'autorità del brand.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">04. Adattamento Dinamico</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Attraverso controlli e algoritmi continui, perfeziono i contenuti e i meta-tag del tuo sito per mantenerli allineati in tempo reale con i mutamenti delle ricerche locali e nazionali.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">Cosa cambia per le Microimprese locali delle Marche?</h3>
            <p>
              Immagina di gestire uno studio professionale, una cantina biologica o un'attività artigianale a Macerata o Civitanova Marche. Spesso non hai il budget per competere con le grandi agenzie nazionali su parole chiave generiche e costosissime. 
            </p>
            <p>
              La SEO Predittiva livella il campo di gioco. Invece di inseguire parole chiave sature, ti permette di posizionare le risposte a domande che i tuoi futuri clienti si faranno tra qualche settimana. È l'equivalente digitale di aprire un negozio esattamente lungo la strada in cui si sposterà il mercato cittadino domani mattina.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">L'impatto degli AI Search Engines (Perplexity, ChatGPT, Gemini)</h3>
            <p>
              Sempre più persone cercano risposte direttamente all'interno delle chat AI come ChatGPT, Perplexity o Google Gemini, anziché scorrere una lista di link blu. I siti web tradizionali realizzati su WordPress, pesanti e privi di tag semantici strutturati, sono invisibili a queste IA. 
            </p>
            <p>
              I siti web "predittivi" di Facilissimo Web sono scritti in codice leggerissimo, con dati strutturati puliti e risposte ottimizzate per essere citate come fonti autorevoli dalle risposte generate da questi motori del futuro.
            </p>
          </div>
        ),
        en: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#111113]">
              Traditional SEO is becoming a retro-active practice. Watching what people have already searched for means constantly chasing after your competitors. Predictive SEO completely flips this model.
            </p>

            <div className="my-8 p-6 bg-[#FAF9F6] border-l-4 border-[#E35930] space-y-3">
              <span className="font-mono text-xs text-[#E35930] tracking-widest block uppercase">// THE HEART OF PREDICTIVE STRATEGY</span>
              <p className="text-xs sm:text-sm text-[#111113]/70">
                Predictive SEO, powered by Artificial Intelligence, analyzes real-time user behavior trends and search engine algorithm evolutions to predict search queries months in advance. This lets Facilissimo Web position your brand before anyone else.
              </p>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">The Four Key Pillars</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">01. Latent Trend Analysis</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  We query advanced generative language models to monitor emerging buying habits and capture highly specific search trends that will blow up in the upcoming weeks.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">02. Search Intent Clustering</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  We categorize prospective client inquiries into "semantic clusters" long before generic search databases index them, optimizing the perfect answers in advance.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">03. Pre-emptive Code Markup</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  We construct ultra-clean HTML data schemas using official microformats (schema.org) so that Google, Bing, and AI crawlers immediately trust and credit your brand authority.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">04. Continuous Optimization</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Through dynamic check-ins and automated audits, we constantly adjust meta-tags and semantic layouts to match active local and global trend updates.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">Why is this a Game-Changer for Local Micro-businesses?</h3>
            <p>
              If you operate a freelance service, an artisan workshop, or a small organic winery in Macerata or Civitanova Marche, you often don't have the marketing budget to compete with huge corporations bidding on highly saturated general keywords.
            </p>
            <p>
              Predictive SEO levels the playing field. Instead of trying to rank for expensive, overcrowded categories, it lets you answer specific, high-intent questions your future clients will be asking weeks from now. It is the digital equivalent of opening a beautiful store exactly where tomorrow's high-traffic street is being built.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">Adapting to AI Search Engines (Perplexity, ChatGPT, Gemini)</h3>
            <p>
              An ever-growing share of users search directly within AI conversational interfaces like ChatGPT, Perplexity, or Google Gemini instead of clicking standard blue links. Traditional websites running heavy, bloated templates on WordPress are completely invisible to these AI assistants.
            </p>
            <p>
              Our lightweight, pre-optimized "predictive" websites are crafted with structural precision, structured microdata, and concise answer blocks designed specifically to be retrieved and referenced by generative search models.
            </p>
          </div>
        )
      }
    },
    {
      slug: "sito-statico-vs-wordpress",
      title: {
        it: "Sito Statico vs WordPress: Perché la velocità di caricamento è la vera SEO",
        en: "Static Sites vs WordPress: Why Loading Speed is the Real SEO"
      },
      description: {
        it: "Un sito web che impiega più di 2 secondi a caricare perde il 50% dei visitatori. Scopri perché i siti in codice leggero battono WordPress in ogni metrica.",
        en: "A website taking more than 2 seconds to load loses 50% of visitors. Discover why custom static code beats WordPress in every metric."
      },
      category: {
        it: "Performance Web",
        en: "Web Performance"
      },
      tags: ["Performance", "Web Design", "WordPress", "Velocità"],
      publishDate: "28 Giugno 2026",
      readTime: {
        it: "4 min di lettura",
        en: "4 min read"
      },
      author: "M. Teresa Rogani",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
      metaTitle: {
        it: "Sito Statico vs WordPress nel 2026 - Facilissimo Web",
        en: "Static Website vs WordPress in 2026 - Facilissimo Web"
      },
      metaDescription: {
        it: "Analisi tecnica comparativa tra un sito statico su misura e un sito WordPress. Scopri perché la velocità è il fattore SEO decisivo.",
        en: "Comparative technical analysis between bespoke static sites and WordPress. Discover why loading speed is the decisive SEO factor."
      },
      content: {
        it: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#111113]">
              Nel web moderno, l'attenzione dell'utente medio si misura in frazioni di secondo. Se il tuo sito web impiega più di due secondi per caricarsi sui telefoni dei tuoi clienti, oltre la metà di loro tornerà indietro e sceglierà un tuo concorrente.
            </p>
            <p>
              Molte web agency propongono ancora pacchetti basati su WordPress e template pronti, appesantiti da decine di estensioni e plugin. Questo si traduce in siti lenti, vulnerabili agli attacchi informatici e difficili da posizionare su Google.
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">I Vantaggi delle Tecnologie Statiche su Misura</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Caricamento Immediato:</strong> Nessun database da interrogare a ogni clic. Le pagine web pre-compilate appaiono all'istante sui telefoni.</li>
              <li><strong>Sicurezza Assoluta:</strong> Senza un database visibile e senza i pannelli amministrativi vulnerabili di WordPress, gli hacker non hanno punti d'accesso per infettare il tuo sito.</li>
              <li><strong>Costi di Hosting Azzerati:</strong> I siti statici sono ospitati su reti CDN ultra-rapide e ad altissima affidabilità a un costo infinitesimale rispetto ai server necessari per WordPress.</li>
              <li><strong>SEO Naturale:</strong> Google premia attivamente i siti web veloci e leggeri. Un sito su misura raggiunge facilmente il punteggio massimo di 100/100 nei test di velocità di Google PageSpeed.</li>
            </ul>
          </div>
        ),
        en: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#111113]">
              In the modern web, user attention is measured in fractions of a second. If your website takes more than two seconds to load on mobile devices, over half of your visitors will back out and select a competitor.
            </p>
            <p>
              Many web agencies still offer bloated WordPress solutions and cookie-cutter themes weighed down by dozens of unnecessary active plugins. This results in slow websites that are vulnerable to hacks and difficult to rank on Google.
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">The Benefits of Bespoke Static Technology</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Instantaneous Loading:</strong> No databases to query on every user click. Pre-rendered web pages display instantly.</li>
              <li><strong>Complete Security:</strong> Without a dynamic database connection or vulnerable admin entry points, hackers have zero vectors to target your page.</li>
              <li><strong>Zero High Hosting Fees:</strong> Light static files are hosted on blazing-fast global CDNs for pennies compared to expensive WordPress server setups.</li>
              <li><strong>Native SEO Dominance:</strong> Google actively elevates faster pages. Custom-coded sites naturally reach 100/100 performance scores on official Google PageSpeed indices.</li>
            </ul>
          </div>
        )
      }
    }
  ];

  const currentArticle = selectedArticle ? articles.find((a) => a.slug === selectedArticle) : null;

  return (
    <div className="w-full bg-[#F8F7F4] pb-12 text-[#111113] min-h-[80vh]">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E35930] text-[#FAF9F6] font-mono text-xs font-bold px-4 py-3 shadow-[0_0_20px_rgba(227,89,48,0.3)] uppercase tracking-wider animate-bounce">
          {shareToast}
        </div>
      )}

      {!currentArticle ? (
        <>
          {/* Header Banner */}
          <section className="py-24 text-center relative border-b border-[#111113]/10 overflow-hidden mb-12">
            {/* Ambient Background Slideshow */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {bgImages.map((imgUrl, idx) => (
                <div
                  key={imgUrl}
                  className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ${
                    idx === currentBgIndex ? "opacity-20 scale-100" : "opacity-0 scale-105"
                  }`}
                  style={{
                    backgroundImage: `url(${imgUrl})`,
                  }}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F4]/95 via-[#F8F7F4]/80 to-[#F8F7F4]/95" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F4]/30 via-transparent to-[#F8F7F4]" />
            </div>

            <div className="max-w-2xl mx-auto px-6 space-y-4 relative z-10">
              <div className="flex justify-center mb-4">
                <img
                  src={logoImage}
                  alt="Facilissimo Web Logo"
                  className="w-[150px] h-[150px] object-contain"
                />
              </div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
                {lang === "it" ? "[ TRASPARENZA E CONOSCENZA ]" : "[ INSIGHTS & UPDATES ]"}
              </span>
              <h1 className="font-tan text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111113] break-words">
                {lang === "it" ? "Il Blog & News di Facilissimo Web" : "Facilissimo Web Blog & News"}
              </h1>
              <p className="text-[#111113]/70 font-sans text-xs sm:text-sm">
                {lang === "it"
                  ? "Rimani aggiornato su SEO predittiva, intelligenza artificiale per il business locale e tendenze di web design."
                  : "Stay ahead of the curve with predictive SEO, business artificial intelligence, and cutting-edge web design trends."}
              </p>
            </div>
          </section>

          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="space-y-12">
              {/* Featured Article Card */}
            <div 
              onClick={() => setSelectedArticle(articles[0].slug)}
              className="border border-[#111113]/10 bg-[#FAF9F6] grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden hover:border-[#E35930]/45 hover:shadow-[0_0_30px_rgba(227,89,48,0.03)] transition-all duration-300 cursor-pointer group"
            >
              <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#111113]/10">
                <img
                  src={articles[0].coverImage}
                  alt={articles[0].title[lang]}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#E35930] text-[#FAF9F6] px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                  {articles[0].category[lang]}
                </div>
              </div>
              
              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-[#111113]/40">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#E35930]" /> {articles[0].publishDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#E35930]" /> {articles[0].readTime[lang]}</span>
                  </div>
                  
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-[#111113] group-hover:text-[#E35930] transition-colors leading-snug">
                    {articles[0].title[lang]}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-[#111113]/60 font-sans leading-relaxed">
                    {articles[0].description[lang]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {articles[0].tags.map((tag) => (
                    <span key={tag} className="text-[8px] font-mono font-bold tracking-widest text-[#E35930] border border-[#E35930]/20 bg-transparent px-2 py-0.5 uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#111113]/10 flex justify-between items-center">
                  <span className="text-[#E35930] group-hover:text-[#111113] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-colors">
                    {lang === "it" ? "LEGGI ARTICOLO COMPLETO" : "READ FULL ARTICLE"}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Rest of Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {articles.slice(1).map((article) => (
                <div 
                  key={article.slug} 
                  onClick={() => setSelectedArticle(article.slug)}
                  className="border border-[#111113]/10 bg-[#FAF9F6] overflow-hidden hover:border-[#E35930]/45 hover:shadow-[0_0_30px_rgba(227,89,48,0.03)] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="h-48 relative overflow-hidden border-b border-[#111113]/10">
                      <img
                        src={article.coverImage}
                        alt={article.title[lang]}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-[#FAF9F6]/90 border border-[#111113]/10 text-[#E35930] px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                        {article.category[lang]}
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-mono text-[#111113]/40">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#E35930]" /> {article.publishDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#E35930]" /> {article.readTime[lang]}</span>
                      </div>
                      
                      <h3 className="font-display text-lg font-bold text-[#111113] group-hover:text-[#E35930] transition-colors">
                        {article.title[lang]}
                      </h3>
                      
                      <p className="text-xs text-[#111113]/60 font-sans leading-relaxed">
                        {article.description[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-mono font-bold tracking-widest text-[#111113]/40 border border-[#111113]/10 px-1.5 py-0.5 uppercase">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-[#111113]/10">
                      <span className="text-[#E35930] group-hover:text-[#111113] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors">
                        {lang === "it" ? "LEGGI ARTICOLO" : "READ ARTICLE"}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    ) : (
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
          {/* SINGLE ARTICLE VIEW */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="group py-2.5 px-4 border border-[#111113]/15 hover:border-[#E35930] text-[#111113]/70 hover:text-[#E35930] transition-all flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{lang === "it" ? "Torna al Blog" : "Back to Blog"}</span>
            </button>

            {/* Meta and Category tags */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#111113]/50">
                <span className="text-[#E35930] font-bold tracking-widest uppercase">// {currentArticle.category[lang]}</span>
                <span className="w-1.5 h-1.5 bg-[#111113]/15 rounded-full"></span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#E35930]" /> {currentArticle.publishDate}</span>
                <span className="w-1.5 h-1.5 bg-[#111113]/15 rounded-full"></span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#E35930]" /> {currentArticle.readTime[lang]}</span>
                <span className="w-1.5 h-1.5 bg-[#111113]/15 rounded-full"></span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#E35930]" /> {currentArticle.author}</span>
              </div>

              <h1 className="font-tan text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111113] leading-tight break-words">
                {currentArticle.title[lang]}
              </h1>
            </div>

            {/* Cover Image */}
            <div className="w-full aspect-[21/9] bg-[#FAF9F6] border border-[#111113]/15 overflow-hidden relative">
              <img
                src={currentArticle.coverImage}
                alt={currentArticle.title[lang]}
                className="w-full h-full object-cover grayscale contrast-115"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4] via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Layout with Content and Sticky Share Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
              {/* Sticky Left Sidebar for metadata/tags/shares */}
              <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-24">
                
                {/* Meta details */}
                <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6] space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#E35930] tracking-wider uppercase">// META DETAILS</h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[#111113]/40 block font-mono">Title Meta-Tag:</span>
                      <p className="font-sans text-[#111113]/70 mt-0.5 leading-snug">{currentArticle.metaTitle[lang]}</p>
                    </div>
                    <div>
                      <span className="text-[#111113]/40 block font-mono">Description Meta-Tag:</span>
                      <p className="font-sans text-[#111113]/70 mt-0.5 leading-snug">{currentArticle.metaDescription[lang]}</p>
                    </div>
                    <div>
                      <span className="text-[#111113]/40 block font-mono">Keywords:</span>
                      <p className="font-sans text-[#111113]/70 mt-0.5 leading-snug">{currentArticle.tags.join(", ").toLowerCase()}</p>
                    </div>
                  </div>
                </div>

                {/* Article Tags */}
                <div className="space-y-3">
                  <h4 className="font-mono text-xs font-bold text-[#E35930] tracking-wider uppercase flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>TAGS</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentArticle.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono bg-[#FAF9F6] border border-[#111113]/10 text-[#111113]/80 px-2.5 py-1 uppercase font-semibold">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sharing tools */}
                <div className="space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#E35930] tracking-wider uppercase flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{lang === "it" ? "CONDIVIDI" : "SHARE"}</span>
                  </h4>
                  <div className="flex flex-wrap lg:flex-col gap-2.5">
                    <button
                      onClick={() => triggerShare("linkedin")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#E35930]/5 border border-[#111113]/15 hover:border-[#E35930] text-[#111113]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Linkedin className="w-4 h-4 text-[#E35930]" />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => triggerShare("twitter")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#E35930]/5 border border-[#111113]/15 hover:border-[#E35930] text-[#111113]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Twitter className="w-4 h-4 text-[#E35930]" />
                      <span>Twitter / X</span>
                    </button>
                    <button
                      onClick={() => triggerShare("facebook")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#E35930]/5 border border-[#111113]/15 hover:border-[#E35930] text-[#111113]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Facebook className="w-4 h-4 text-[#E35930]" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-[#E35930]/5 border border-[#111113]/15 hover:border-[#E35930] text-[#111113]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600 animate-pulse" /> : <Copy className="w-4 h-4 text-[#E35930]" />}
                      <span>{copied ? (lang === "it" ? "COPIATO!" : "COPIED!") : (lang === "it" ? "COPIA LINK" : "COPY LINK")}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Central Content */}
              <div className="lg:col-span-9 space-y-8">
                <article className="prose max-w-none text-[#111113]/90">
                  {currentArticle.content[lang]}
                </article>

                {/* Footer of the article with CTA */}
                <div className="mt-12 p-8 border border-[#111113]/10 bg-[#FAF9F6] flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="font-display font-bold text-lg text-[#111113]">
                      {lang === "it" ? "Vuoi applicare la SEO Predittiva al tuo sito?" : "Want to apply Predictive SEO to your site?"}
                    </h3>
                    <p className="text-xs text-[#111113]/60 font-sans">
                      {lang === "it" 
                        ? "Progetto strategie semantiche su misura per darti un vantaggio duraturo sulla concorrenza." 
                        : "Facilissimo Web designs custom semantic strategies to grant your business a long-lasting advantage."}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentTab("contatti")}
                    className="px-6 py-3 bg-[#E35930] text-[#FAF9F6] hover:bg-transparent hover:text-[#E35930] border border-[#E35930] font-mono text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {lang === "it" ? "PARLIAMONE" : "LET'S TALK"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
