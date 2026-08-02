import { useState, useEffect, ReactNode } from "react";
import { Calendar, Clock, User, Share2, Tag, ArrowLeft, Linkedin, Twitter, Facebook, Copy, Check, ChevronRight, Bookmark, ArrowUpRight, ShieldAlert, Sparkles, Zap, ArrowRight, Rocket, MessageSquare, Scale, Brain } from "lucide-react";
import { motion } from "motion/react";
const logoImage = "/f (1600 x 500 px).webp";

interface ArticleCTA {
  badge: Record<"it" | "en", string>;
  title: Record<"it" | "en", string>;
  titleHighlight: Record<"it" | "en", string>;
  description: Record<"it" | "en", string>;
  buttonText: Record<"it" | "en", string>;
  targetTab: string;
  themeStyle: "warning" | "cyber" | "speed";
}

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
  cta: ArticleCTA;
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
      slug: "illusione-ai-operating-system-limiti-agenti",
      title: {
        it: "L’illusione dell’AI Operating System: perché l’azienda che “gira da sola” fa acqua da tutte le parti",
        en: "The AI Operating System Illusion: Why the 'Self-Running Company' Falls Apart"
      },
      description: {
        it: "Tra claim patinati e promesse di fatturati senza sforzo, analizziamo perché l'azienda a guida autonoma tramite AIOS è una pericolosa illusione commerciale.",
        en: "Beyond glossy pitch decks and promises of hands-free revenue, we analyze why the autonomous AIOS company model is a dangerous commercial illusion."
      },
      category: {
        it: "Analisi & Strategia IA",
        en: "AI Strategy & Analysis"
      },
      tags: ["AI Operating System", "AIOS", "Agenti AI", "Automazione", "LLM", "RAG", "Strategia Business"],
      publishDate: "29 Luglio 2026",
      readTime: {
        it: "7 min di lettura",
        en: "7 min read"
      },
      author: "M. Teresa Rogani",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
      metaTitle: {
        it: "L'illusione dell'AI Operating System: I rischi e i costi nascosti degli Agenti Autonomi",
        en: "The AI Operating System Illusion: Hidden Risks of Autonomous AI Agents"
      },
      metaDescription: {
        it: "Scopri perché gli AI Operating System (AIOS) e gli agenti autonomi presentano falle strutturali per le PMI. Analisi tecnica su allucinazioni, costi e dipendenze.",
        en: "Discover why AI Operating Systems (AIOS) and autonomous agents have structural flaws for SMEs. Technical analysis on hallucinations, costs, and dependencies."
      },
      content: {
        it: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed font-normal">
            <p className="font-medium text-lg text-[#111113]">
              Tra claim patinati, terminologia da Silicon Valley e promesse di fatturati incrementali senza alcuno sforzo, il mercato delle agenzie e delle boutique d’innovazione si è riempito di una nuova figura: <strong>i venditori di "AIOS" (AI Operating System)</strong>.
            </p>

            <p>
              La narrazione è seducente: installi un “cervello autonomo”, connetti una manciata di agenti artificiali coordinati, e l’azienda comincia a funzionare da sola. Niente ferie, niente malattia, zero costi di personale, lead gestiti 24/7 e una memoria di ferro.
            </p>

            <p>
              Ma quanto c’è di vero quando si scava sotto la superficie del codice e del marketing dell’esclusività?
            </p>

            <p>
              La realtà è che, una volta messi alla prova nei processi reali delle imprese, questi sistemi mostrano crepe strutturali enormi. Analizziamo punto per punto perché la promessa dell'azienda a guida autonoma è, allo stato attuale, una pericolosa illusione commerciale.
            </p>

            {/* SEZIONE 1 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              1. La fallacia del "Cervello Autonomo": Allucinazioni, deragliamenti e memoria a breve termine
            </h3>
            
            <p>
              Vendere un LLM (Large Language Model) come una "seconda mente" in grado di gestire un’azienda in autonomia significa ignorare consapevolmente la natura stessa della tecnologia con cui si sta lavorando.
            </p>

            <div className="space-y-4 my-4 pl-4 border-l-2 border-amber-500">
              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • Allucinazioni e cicli infiniti:
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  Senza una supervisione umana continua e stringente (<em>human-in-the-loop</em>), gli agenti autonomi tendono a deragliare. Di fronte a casi limite, un’AI lasciata libera di prendere decisioni può inventare dati finanziari, confermare condizioni contrattuali inesistenti o bloccarsi nei classici <em>infinite loops</em> di esecuzione, prosciugando token e crediti nel giro di poche ore.
                </p>
              </div>

              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • L’equivoco della "Memoria Permanente":
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  Nel marketing dell'AI, per "memoria che non si azzera mai" si intende semplicemente l’archiviazione di documenti e chat all’interno di database vettoriali via RAG (<em>Retrieval-Augmented Generation</em>). Ma la memoria umana è critica, gerarchica e contestuale. Quella vettoriale, man mano che la mole di dati cresce, tende a recuperare informazioni superate, contraddittorie o completamente fuori contesto, generando risposte imprecise e spesso dannose.
                </p>
              </div>
            </div>

            <div className="my-6 p-5 bg-[#111113] text-white space-y-2 border-l-4 border-amber-400">
              <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-bold block">
                // IL FATTO INCONTROVERTIBILE
              </span>
              <p className="text-xs sm:text-sm font-medium italic leading-relaxed">
                "Un’AI non ha un’intenzione, non comprende le priorità strategiche e non ha buon senso. Non è un 'cervello', è un generatore probabilistico di testo."
              </p>
            </div>

            {/* SEZIONE 2 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              2. Il mito del "Zero Key-Man Risk" e la dipendenza totale dalle API
            </h3>

            <p>
              Uno dei claim più spinti è l'eliminazione del <em>key-man risk</em>: <em>"Se ti fermi tu, l'azienda continua"</em>. In realtà, il rischio legato alle persone non viene affatto eliminato; si sposta semplicemente sui fornitori di infrastruttura SaaS e sugli sviluppatori che la manutengono.
            </p>

            {/* DIAGRAMMA ARCHITETTURALE */}
            <div className="my-6 p-5 bg-[#FAF9F6] border border-[#111113]/15 font-mono text-xs text-[#111113] overflow-x-auto">
              <span className="text-[10px] font-bold text-amber-600 block mb-3 uppercase tracking-widest">
                [ SCHELETRO DI DIPENDENZA CRITICA ]
              </span>
              <pre className="text-[11px] leading-snug">
{`[La tua Azienda] ──> [Agente AI] ──> [API OpenAI/Anthropic] ──> [Supabase / Vercel]
                                             │
                                   (Se questo nodo varia:
                                   Aumento prezzi, downtime,
                                   deprezzamento modelli)
                                             │
                                             ▼
                                  [BLOCCO TOTALE PROCESSI]`}
              </pre>
            </div>

            <div className="space-y-4 my-4 pl-4 border-l-2 border-red-500">
              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • Infrastrutture fragili e inaffidabili:
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  Tutto l'AIOS si regge su un castello di carte fatto di API terze (OpenAI, Anthropic, Supabase, Vercel, Make). Se un fornitore modifica le policy, raddoppia i costi dei token, o deprezza da un giorno all'altro il modello su cui avevi calibrato i prompt, l'azienda si ferma all'istante.
                </p>
              </div>

              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • L'effetto "Manutentore":
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  Gli agenti si rompono con una frequenza disarmante. Basta un aggiornamento di uno schema API o una variazione impercettibile nell'output del modello per far fallire una pipeline automatizzata. L'azienda non ha ridotto le risorse umane: ha solo sostituito un operativo con uno sviluppatore che deve continuamente riattaccare i fili di un'automazione instabile.
                </p>
              </div>
            </div>

            {/* SEZIONE 3 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              3. L'illusione dell' "AI Setter": Quando la Lead Generation perde la faccia
            </h3>

            <p>
              I chatbot progettati per gestire le trattative commerciali e fissare appuntamenti in agenda ("AI Setter") funzionano benissimo nelle demo registrate, ma impattano duramente contro la psicologia del cliente reale.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 border border-[#111113]/10 bg-[#FAF9F6] space-y-2">
                <span className="font-mono text-xs font-bold text-red-600 block">Frizione e Mancanza di Empatia</span>
                <p className="text-xs text-[#111113]/75 leading-relaxed">
                  L'utente medio riconosce un'interazione generata dall'AI in un paio di battute. Quando la trattativa richiede flessibilità, reale ascolto delle esigenze o gestione di un'obiezione complessa, il tono robotico genera frustrazione. Il tasso di conversione crolla rispetto a quello di un commerciale umano preparato.
                </p>
              </div>

              <div className="p-4 border border-[#111113]/10 bg-[#FAF9F6] space-y-2">
                <span className="font-mono text-xs font-bold text-red-600 block">Rischio Reputazionale ed Economico</span>
                <p className="text-xs text-[#111113]/75 leading-relaxed">
                  Un agente AI lasciato a trattare via chat o email rappresenta un rischio d'immagine enorme. Se l'agente promette uno sconto fuori listino, interpreta male le disponibilità di agenda o risponde in modo inappropriato a un cliente irritato, il danno per la <em>brand reputation</em> è immediato e diretto.
                </p>
              </div>
            </div>

            {/* SEZIONE 4 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              4. Sovraingegnerizzazione: Vendere navicelle spaziali a chi ha bisogno di una bicicletta
            </h3>

            <p>
              La stragrande maggioranza delle PMI non ha alcun bisogno di un sistema agentico orchestrato. La loro vendita è spesso un caso da manuale di <strong>overselling sistemico</strong>.
            </p>

            <div className="overflow-x-auto my-6 border border-[#111113]/15">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#111113] text-white font-mono text-xs uppercase tracking-wider">
                    <th className="p-3 border border-[#111113] text-amber-400 w-1/2">Ciò che ti viene venduto</th>
                    <th className="p-3 border border-[#111113] text-emerald-400 w-1/2">Ciò di cui la tua azienda ha realmente bisogno</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111113]/10 font-sans">
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">AI Operating System multi-agente</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">Processi interni ben documentati</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">Database vettoriali e RAG complessi</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">Un CRM semplice ma usato correttamente (es. HubSpot)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">Architetture custom su misura</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">2 o 3 automazioni lineari (Zapier o Make)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">Prompt engineering continuativo</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">Moduli di contatto puliti e chiari sul sito web</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Spendere cifre importanti per un'infrastruttura personalizzata — che richiede costi continui per i token di calcolo e manutenzione codice — quando il problema originario era semplicemente un processo interno mal organizzato, è un errore strategico che pesa sulle casse dell'azienda.
            </p>

            {/* SEZIONE 5 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              5. Cosa c'è davvero dietro la patina tecnologica?
            </h3>

            <p>
              Se grattiamo via i paroloni d'ordinanza — <em>white-label, micro-SaaS, SLA, agenti coordinati, AIOS</em> — scopriamo che il modello di business sottostante è estremamente tradizionale e gioca su leve vecchie come il mondo:
            </p>

            <ol className="list-decimal pl-6 space-y-3 font-sans text-xs sm:text-sm">
              <li>
                <strong>Vendita di consulenza standard a prezzi elevati:</strong> Sessioni di audit da 60 minuti vendute a centinaia di euro con il solo scopo di qualificare il cliente e fare un <em>upsell</em> sui pacchetti successivi.
              </li>
              <li>
                <strong>Boilerplate riutilizzati ed ex-novo sbandierato:</strong> Il software "completamente su misura" altro non è che un pacchetto di codice precostruito (React, Vite, Supabase, infrastrutture agentiche standard) replicato da un cliente all'altro con poche modifiche di configurazione.
              </li>
              <li>
                <strong>Marketing della FOMO (<em>Fear Of Missing Out</em>):</strong> Tutta la comunicazione è progettata per instillare nel piccolo imprenditore la paura di rimanere tagliato fuori dalla "rivoluzione tecnologica", spingendolo ad acquistare strumenti sproporzionati rispetto alle sue reali esigenze operative.
              </li>
            </ol>

            {/* CONCLUSIONE */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              Conclusione
            </h3>

            <p>
              L'intelligenza artificiale e l'automazione sono strumenti straordinari se utilizzati per quello che sono: <strong>amplificatori del lavoro umano</strong>, capaci di velocizzare compiti specifici, ripetitivi e ben delimitati.
            </p>

            <p>
              Trasformare un'AI in un "cervello autonomo" e delegarle la gestione strategica o commerciale di un'impresa significa confondere la fantascienza con la realtà dei processi aziendali. Prima di investire in un "AIOS", la domanda da porsi non è <em>"quanto è avanzata questa AI?"</em>, ma <em>"i miei processi sono davvero così chiari da poter essere automatizzati senza distruggere il valore della mia azienda?"</em>. Nella quasi totalità dei casi, la risposta richiede molto più lavoro umano di quanto certo marketing vorrebbe far credere.
            </p>

            <div className="mt-8 p-6 border-l-4 border-amber-500 bg-amber-500/10 space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-600" />
                <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
                  // VERIFICA DI AUTOMAZIONE PRAGMATICA PER LA TUA AZIENDA
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Vuoi capire dove l'IA o le automazioni possono realmente farti risparmiare tempo e denaro senza rischiare la reputazione della tua azienda? Esamino la tua operatività per proporti solo interventi mirati e davvero utili.
              </p>
            </div>
          </div>
        ),
        en: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed font-normal">
            <p className="font-medium text-lg text-[#111113]">
              Amid glossy pitch decks, Silicon Valley jargon, and promises of effortless incremental revenue, the agency market and innovation boutiques have spawned a new phenomenon: <strong>vendors selling "AIOS" (AI Operating System)</strong>.
            </p>

            <p>
              The pitch is alluring: install an "autonomous brain", connect a handful of coordinated AI agents, and your business starts running on autopilot. No vacations, no sick days, zero payroll costs, 24/7 lead handling, and an ironclad memory.
            </p>

            <p>
              But how much truth remains once you dig beneath the surface of the code and exclusive marketing claims?
            </p>

            <p>
              The reality is that when tested against real business processes, these systems expose massive structural flaws. Let's analyze point by point why the promise of an autonomous company is, at present, a dangerous commercial illusion.
            </p>

            {/* SECTION 1 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              1. The "Autonomous Brain" Fallacy: Hallucinations, Derailments, and Short-Term Memory
            </h3>
            
            <p>
              Selling a Large Language Model (LLM) as a "second mind" capable of independently running a company means consciously ignoring the fundamental nature of the underlying technology.
            </p>

            <div className="space-y-4 my-4 pl-4 border-l-2 border-amber-500">
              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • Hallucinations and infinite loops:
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  Without continuous and strict <em>human-in-the-loop</em> oversight, autonomous agents tend to derail. When encountering edge cases, an unsupervised AI can fabricate financial data, confirm non-existent contractual terms, or get stuck in execution loops, burning tokens and compute credits within hours.
                </p>
              </div>

              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • The "Permanent Memory" Misconception:
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  In AI marketing, "memory that never resets" simply refers to storing documents and chat logs in vector databases via RAG (<em>Retrieval-Augmented Generation</em>). But human memory is critical, hierarchical, and contextual. Vector retrieval, as data scales, frequently pulls outdated, contradictory, or out-of-context information, generating inaccurate and potentially damaging responses.
                </p>
              </div>
            </div>

            <div className="my-6 p-5 bg-[#111113] text-white space-y-2 border-l-4 border-amber-400">
              <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest font-bold block">
                // THE INCONTROVERTIBLE FACT
              </span>
              <p className="text-xs sm:text-sm font-medium italic leading-relaxed">
                "An AI has no intention, does not understand strategic priorities, and possesses no common sense. It is not a 'brain'; it is a probabilistic text generator."
              </p>
            </div>

            {/* SECTION 2 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              2. The "Zero Key-Man Risk" Myth and Total Dependency on APIs
            </h3>

            <p>
              One of the most heavily pushed claims is eliminating <em>key-man risk</em>: <em>"If you stop, the company keeps going"</em>. In reality, key-person risk isn't eliminated; it simply shifts to third-party SaaS infrastructure providers and the developers maintaining it.
            </p>

            {/* ARCHITECTURE DIAGRAM */}
            <div className="my-6 p-5 bg-[#FAF9F6] border border-[#111113]/15 font-mono text-xs text-[#111113] overflow-x-auto">
              <span className="text-[10px] font-bold text-amber-600 block mb-3 uppercase tracking-widest">
                [ CRITICAL DEPENDENCY FLOW ]
              </span>
              <pre className="text-[11px] leading-snug">
{`[Your Company] ──> [AI Agent] ──> [OpenAI/Anthropic API] ──> [Supabase / Vercel]
                                             │
                                   (If this node shifts:
                                   Price hikes, downtime,
                                   model deprecation)
                                             │
                                             ▼
                                  [TOTAL PROCESS SHUTDOWN]`}
              </pre>
            </div>

            <div className="space-y-4 my-4 pl-4 border-l-2 border-red-500">
              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • Fragile and Unreliable Infrastructure:
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  The entire AIOS rests on a house of cards built from third-party APIs (OpenAI, Anthropic, Supabase, Vercel, Make). If a provider alters its policies, doubles token pricing, or deprecates a model overnight, your operational pipeline freezes instantly.
                </p>
              </div>

              <div>
                <strong className="text-[#111113] block font-mono text-xs uppercase tracking-wider mb-1">
                  • The "Maintainer" Paradox:
                </strong>
                <p className="text-xs sm:text-sm text-[#111113]/80">
                  AI agents break with alarming frequency. A minor API schema update or a subtle drift in model output is enough to crash an automated pipeline. The company hasn't reduced headcounts; it has merely swapped an operational employee for a developer who must constantly repair broken automation logic.
                </p>
              </div>
            </div>

            {/* SECTION 3 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              3. The "AI Setter" Illusion: When Lead Generation Loses Its Edge
            </h3>

            <p>
              Chatbots designed to handle sales negotiations and book calendar appointments ("AI Setters") perform flawlessly in recorded demos, but crash hard against real human buyer psychology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 border border-[#111113]/10 bg-[#FAF9F6] space-y-2">
                <span className="font-mono text-xs font-bold text-red-600 block">Friction and Lack of Empathy</span>
                <p className="text-xs text-[#111113]/75 leading-relaxed">
                  The average user spots AI-generated interactions within a couple of exchanges. When negotiations demand flexibility, genuine listening, or handling complex objections, the robotic tone breeds frustration. Conversion rates plummet compared to trained human sales reps.
                </p>
              </div>

              <div className="p-4 border border-[#111113]/10 bg-[#FAF9F6] space-y-2">
                <span className="font-mono text-xs font-bold text-red-600 block">Reputational and Financial Risk</span>
                <p className="text-xs text-[#111113]/75 leading-relaxed">
                  An AI agent negotiating via chat or email poses huge brand exposure. If the agent promises off-book discounts, misreads calendar availability, or responds inappropriately to an annoyed client, reputational damage is instant.
                </p>
              </div>
            </div>

            {/* SECTION 4 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              4. Over-Engineering: Selling Spacecraft to Those Who Need a Bicycle
            </h3>

            <p>
              The vast majority of SMEs have no need for an orchestrated multi-agent system. Selling them one is a textbook case of <strong>systemic overselling</strong>.
            </p>

            <div className="overflow-x-auto my-6 border border-[#111113]/15">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#111113] text-white font-mono text-xs uppercase tracking-wider">
                    <th className="p-3 border border-[#111113] text-amber-400 w-1/2">What you are sold</th>
                    <th className="p-3 border border-[#111113] text-emerald-400 w-1/2">What your business actually needs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#111113]/10 font-sans">
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">Multi-agent AI Operating System</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">Well-documented internal processes</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">Vector databases & complex RAG</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">A simple CRM properly used (e.g. HubSpot)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">Custom bespoke architectures</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">2 or 3 linear automations (Zapier or Make)</td>
                  </tr>
                  <tr className="hover:bg-[#FAF9F6]">
                    <td className="p-3 border border-[#111113]/15 font-mono">Ongoing prompt engineering</td>
                    <td className="p-3 border border-[#111113]/15 font-medium text-emerald-800 bg-emerald-50/40">Clean, clear contact forms on your site</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              Spending heavy capital on custom infrastructure—which incurs ongoing compute token fees and code maintenance—when the root issue was merely a poorly organized internal process is a costly strategic error.
            </p>

            {/* SECTION 5 */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              5. What Lies Beneath the Tech Veneer?
            </h3>

            <p>
              Stripping away buzzwords—<em>white-label, micro-SaaS, SLA, coordinated agents, AIOS</em>—reveals an extremely traditional business model playing on age-old levers:
            </p>

            <ol className="list-decimal pl-6 space-y-3 font-sans text-xs sm:text-sm">
              <li>
                <strong>High-ticket generic consulting:</strong> 60-minute audit sessions sold for hundreds of euros solely to qualify clients and upsell expensive packages.
              </li>
              <li>
                <strong>Reused boilerplates marketed as custom code:</strong> Supposedly "bespoke software" is often a pre-built code package (React, Vite, Supabase, basic agent templates) cloned across clients with minor config tweaks.
              </li>
              <li>
                <strong>FOMO Marketing (<em>Fear Of Missing Out</em>):</strong> All messaging is designed to instill panic in small business owners about being left behind, coercing them into buying over-scoped tools.
              </li>
            </ol>

            {/* CONCLUSION */}
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-6 border-t border-[#111113]/10">
              Conclusion
            </h3>

            <p>
              Artificial intelligence and automation are extraordinary tools when used for what they are: <strong>human work amplifiers</strong> capable of speeding up specific, repetitive, well-defined tasks.
            </p>

            <p>
              Turning AI into an "autonomous brain" and delegating strategic or sales management to it confuses science fiction with operational reality. Before investing in an "AIOS", the question to ask isn't <em>"how advanced is this AI?"</em>, but <em>"are my processes clear enough to be automated without destroying value?"</em> In almost all cases, the answer requires far more human craft than marketing claims suggest.
            </p>

            <div className="mt-8 p-6 border-l-4 border-amber-500 bg-amber-500/10 space-y-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-amber-600" />
                <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
                  // PRAGMATIC AUTOMATION AUDIT FOR YOUR BUSINESS
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Want to identify where AI or automation can genuinely save time and capital without risking your company's reputation? I analyze your operations to recommend only focused, high-ROI solutions.
              </p>
            </div>
          </div>
        )
      },
      cta: {
        badge: {
          it: "[ AUTOMAZIONE PRAGMATICA & PROCESSI REALI ]",
          en: "[ PRAGMATIC AUTOMATION & REAL PROCESSES ]"
        },
        title: {
          it: "Vuoi automazioni reali che funzionano davvero senza promesse fasulle?",
          en: "Want real automations that actually work without false promises?"
        },
        titleHighlight: {
          it: "Ottimizza i tuoi processi con soluzioni solide, sicure e su misura per la tua attività.",
          en: "Optimize your business processes with solid, secure, custom-built solutions."
        },
        description: {
          it: "Evita la trappola della sovraingegnerizzazione e dei costi nascosti. Analizziamo insieme quali automazioni lineari o strumenti di intelligenza artificiale servono concretamente al tuo business.",
          en: "Avoid the trap of over-engineering and hidden API costs. Let's analyze together which linear automations or practical AI tools genuinely add value to your business."
        },
        buttonText: {
          it: "RICHIEDI UNA CONSULENZA STRATEGICA",
          en: "REQUEST STRATEGIC CONSULTATION"
        },
        targetTab: "contatti",
        themeStyle: "warning"
      }
    },
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
            
            <div className="mt-8 p-6 border-l-4 border-amber-500 bg-amber-500/10 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
                  // NOTA DI CONFORMITÀ LEGALE PER LA TUA ATTIVITÀ
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Hai dubbi su come l'AI Act si applichi al tuo sito web, ai tuoi form di contatto o agli assistenti virtuali? Analizzo direttamente le tue tecnologie per darti la certezza di operare nel pieno rispetto delle normative europee.
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
            
            <div className="mt-8 p-6 border-l-4 border-amber-500 bg-amber-500/10 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-wider">
                  // COMPLIANCE NOTE FOR YOUR BUSINESS
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Unsure if your website, forms, or AI tools meet the new requirements? Let me review your digital setup to ensure full compliance with European AI Act mandates.
              </p>
            </div>
          </div>
        )
      },
      cta: {
        badge: {
          it: "[ CHECK CONFORMITÀ AI ACT & NORMATIVA UE ]",
          en: "[ EU AI ACT & LEGALITY CHECK ]"
        },
        title: {
          it: "Il tuo sito o il tuo chatbot rispetta le regole dell'AI Act Europeo?",
          en: "Does your website or AI chatbot comply with the European AI Act?"
        },
        titleHighlight: {
          it: "Metti al sicuro la tua attività da sanzioni fino al 7% del fatturato.",
          en: "Protect your business from penalties up to 7% of annual revenue."
        },
        description: {
          it: "Valutiamo insieme la categoria di rischio delle tecnologie sul tuo sito (trasparenza, copyright, privacy e assistenti virtuali). Integriamo le soluzioni tecniche e la documentazione a norma con la massima trasparenza.",
          en: "Let's assess your website's AI risk category (transparency, copyright, privacy & virtual assistants). We integrate necessary technical solutions and disclosures seamlessly."
        },
        buttonText: {
          it: "RICHIEDI AUDIT DI CONFORMITÀ GRATUITO",
          en: "REQUEST FREE COMPLIANCE AUDIT"
        },
        targetTab: "contatti",
        themeStyle: "warning"
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

            <div className="my-8 p-6 bg-[#FAF9F6] border-l-4 border-black space-y-3">
              <span className="font-mono text-xs text-black tracking-widest block uppercase">// IL CUORE DELLA STRATEGIA PREDITTIVA</span>
              <p className="text-xs sm:text-sm text-[#111113]/70">
                La SEO Predittiva, potenziata dall'Intelligenza Artificiale, analizza il comportamento in tempo reale degli utenti e l'evoluzione degli algoritmi per prevedere le tendenze di ricerca con mesi di anticipo. Questo permette a Facilissimo Web di posizionare il tuo brand prima di chiunque altro.
              </p>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">I Quattro Pilastri Fondamentali</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">01. Analisi dei Trend Latenti</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Interrogo modelli linguistici avanzati di intelligenza artificiale per analizzare i comportamenti d'acquisto emergenti, anticipando le parole chiave specifiche che diventeranno popolari nei prossimi mesi prima dei concorrenti.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">02. Mappatura Intenti di Ricerca</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Raggruppo i bisogni espressi dagli utenti in "cluster semantici" ancor prima che i motori di ricerca tradizionali li classifichino, strutturando le risposte ottimali per gli utenti del tuo territorio.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">03. Codice Leggero e Predittivo</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  Sviluppo l'architettura dei dati del sito in modo ultra-pulito usando i markup ufficiali (schema.org) affinché gli assistenti AI e gli algoritmi di Google e Bing leggano e riconoscano istantaneamente l'autorità del brand.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">04. Adattamento Dinamico</span>
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

            <div className="mt-8 p-6 border-l-4 border-indigo-600 bg-indigo-50/60 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="font-mono text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  // OPPORTUNITÀ PREDITTIVA PER IL TUO BRAND LOCALE
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Vuoi capire quali domande latenti faranno i tuoi clienti di Macerata, delle Marche o in Italia nelle prossime settimane? Analizzo le tendenze del tuo settore per posizionarti come punto di riferimento prima che lo facciano i tuoi concorrenti.
              </p>
            </div>
          </div>
        ),
        en: (
          <div className="space-y-6 text-[#111113]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#111113]">
              Traditional SEO is becoming a retro-active practice. Watching what people have already searched for means constantly chasing after your competitors. Predictive SEO completely flips this model.
            </p>

            <div className="my-8 p-6 bg-[#FAF9F6] border-l-4 border-black space-y-3">
              <span className="font-mono text-xs text-black tracking-widest block uppercase">// THE HEART OF PREDICTIVE STRATEGY</span>
              <p className="text-xs sm:text-sm text-[#111113]/70">
                Predictive SEO, powered by Artificial Intelligence, analyzes real-time user behavior trends and search engine algorithm evolutions to predict search queries months in advance. This lets Facilissimo Web position your brand before anyone else.
              </p>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#111113] pt-4">The Four Key Pillars</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">01. Latent Trend Analysis</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  We query advanced generative language models to monitor emerging buying habits and capture highly specific search trends that will blow up in the upcoming weeks.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">02. Search Intent Clustering</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  We categorize prospective client inquiries into "semantic clusters" long before generic search databases index them, optimizing the perfect answers in advance.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">03. Pre-emptive Code Markup</span>
                <p className="text-xs text-[#111113]/70 leading-relaxed">
                  We construct ultra-clean HTML data schemas using official microformats (schema.org) so that Google, Bing, and AI crawlers immediately trust and credit your brand authority.
                </p>
              </div>
              <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6]">
                <span className="font-mono text-xs font-bold text-black block mb-2">04. Continuous Optimization</span>
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

            <div className="mt-8 p-6 border-l-4 border-indigo-600 bg-indigo-50/60 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="font-mono text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  // PREDICTIVE OPPORTUNITY FOR YOUR BRAND
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Want to identify latent queries your clients will search next month? Let me build a customized semantic strategy for your niche to capture leads before competitors do.
              </p>
            </div>
          </div>
        )
      },
      cta: {
        badge: {
          it: "[ POSIZIONAMENTO NEI MOTORI AI & LOCALE ]",
          en: "[ AI ENGINES & LOCAL RANKING ]"
        },
        title: {
          it: "Fatti consigliare da Perplexity, ChatGPT e Gemini prima dei tuoi concorrenti",
          en: "Get recommended by Perplexity, ChatGPT and Gemini before your rivals"
        },
        titleHighlight: {
          it: "Domina la ricerca del futuro a Macerata, nelle Marche e in tutta Italia.",
          en: "Dominate future search queries locally and across Italy."
        },
        description: {
          it: "I motori di ricerca tradizionali cedono il passo alle risposte generate dall'IA. Con l'architettura semantica e la SEO Predittiva di Facilissimo Web, strutturiamo il tuo codice affinché le intelligenze artificiali riconoscano e citino il tuo brand come prima scelta.",
          en: "Traditional search is evolving into generative AI responses. With Facilissimo Web's semantic architecture and Predictive SEO, we format your code so AI models cite your business as top authority."
        },
        buttonText: {
          it: "SBLOCCA LA TUA STRATEGIA PREDITTIVA",
          en: "UNLOCK YOUR PREDICTIVE STRATEGY"
        },
        targetTab: "contatti",
        themeStyle: "cyber"
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

            <div className="mt-8 p-6 border-l-4 border-emerald-600 bg-emerald-50/60 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  // BENCHMARK VELOCITÀ SITO GRATUITO
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Vuoi sapere quanto stia davvero penalizzando le tue conversioni la lentezza del tuo attuale sito? Scrivimi l'URL della tua pagina e calcolerò il potenziale di velocizzazione in codice puro o tramite la nostra soluzione Chiavi in Mano.
              </p>
            </div>
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

            <div className="mt-8 p-6 border-l-4 border-emerald-600 bg-emerald-50/60 space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span className="font-mono text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  // FREE SPEED BENCHMARK
                </span>
              </div>
              <p className="text-xs text-[#111113]/85 leading-relaxed font-medium">
                Want to know how much site slowness is hurting your conversions? Share your current URL and I'll calculate the speed boost attainable with custom static code or our Turnkey package.
              </p>
            </div>
          </div>
        )
      },
      cta: {
        badge: {
          it: "[ PERFORMANCE 100/100 & VELOCITÀ ASSOLUTA ]",
          en: "[ 100/100 PERFORMANCE & ABSOLUTE SPEED ]"
        },
        title: {
          it: "Stanco di perdere il 50% dei clienti a causa di un sito lento o di plugin WordPress rotti?",
          en: "Tired of losing 50% of clients due to a slow site or broken WordPress plugins?"
        },
        titleHighlight: {
          it: "Sito in codice puro a caricamento istantaneo o Soluzione Chiavi in Mano su Cloud.",
          en: "Instant custom static site or Turnkey Cloud solution."
        },
        description: {
          it: "Fai fare un salto di qualità alla tua presenza online: scopri i nostri siti in codice ultra-leggero con punteggio 100/100 su Google PageSpeed oppure la nostra formula 'Sito Chiavi in Mano' gestita su Hostinger. Velocità record, zero costi inutili e sicurezza totale.",
          en: "Upgrade your online presence: discover our custom lightweight code sites scoring 100/100 on Google PageSpeed or our Turnkey package. Record speed, zero bloated costs, total safety."
        },
        buttonText: {
          it: "SCOPRI LE SOLUZIONI AD ALTE PRESTAZIONI",
          en: "EXPLORE HIGH PERFORMANCE SOLUTIONS"
        },
        targetTab: "turnkey-wordpress",
        themeStyle: "speed"
      }
    }
  ];

  const currentArticle = selectedArticle ? articles.find((a) => a.slug === selectedArticle) : null;

  const relatedArticles = currentArticle
    ? articles
        .filter((a) => a.slug !== currentArticle.slug)
        .map((a) => {
          const currentTagSet = new Set(currentArticle.tags.map((t) => t.toLowerCase().trim()));
          const matchingTags = a.tags.filter((t) => currentTagSet.has(t.toLowerCase().trim()));
          let score = matchingTags.length * 2;
          if (a.category.it === currentArticle.category.it) {
            score += 1;
          }
          return { article: a, score, matchingTags };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
    : [];

  return (
    <div className="w-full bg-[#F8F7F4] pb-12 text-[#111113] min-h-[80vh]">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white font-mono text-xs font-bold px-4 py-3 shadow-xl uppercase tracking-wider animate-bounce">
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
              <span className="inline-block bg-black py-[12px] px-6 text-[13px] font-mono tracking-[0em] text-white font-bold uppercase" style={{ letterSpacing: '0px' }}>
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
              className="border border-[#111113]/10 bg-[#FAF9F6] grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden hover:border-black hover:shadow-md transition-all duration-300 cursor-pointer group"
            >
              <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#111113]/10">
                <img
                  src={articles[0].coverImage}
                  alt={articles[0].title[lang]}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                  {articles[0].category[lang]}
                </div>
              </div>
              
              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-[#111113]/40">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-black" /> {articles[0].publishDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-black" /> {articles[0].readTime[lang]}</span>
                  </div>
                  
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-wide text-[#111113] group-hover:text-black transition-colors leading-snug">
                    {articles[0].title[lang]}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-[#111113]/60 font-sans leading-relaxed">
                    {articles[0].description[lang]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {articles[0].tags.map((tag) => (
                    <span key={tag} className="text-[8px] font-mono font-bold tracking-widest text-black border border-black/20 bg-transparent px-2 py-0.5 uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#111113]/10 flex justify-between items-center">
                  <span className="text-black font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-colors">
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
                  className="border border-[#111113]/10 bg-[#FAF9F6] overflow-hidden hover:border-black hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <div className="h-48 relative overflow-hidden border-b border-[#111113]/10">
                      <img
                        src={article.coverImage}
                        alt={article.title[lang]}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-102 group-hover:grayscale-0 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-[#FAF9F6]/90 border border-[#111113]/10 text-black px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                        {article.category[lang]}
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-mono text-[#111113]/40">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-black" /> {article.publishDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-black" /> {article.readTime[lang]}</span>
                      </div>
                      
                      <h3 className="font-display text-lg font-bold text-[#111113] group-hover:text-black transition-colors">
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
                      <span className="text-black font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors">
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
              className="group py-2.5 px-4 border border-[#111113]/15 hover:border-black text-[#111113]/70 hover:text-black transition-all flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{lang === "it" ? "Torna al Blog" : "Back to Blog"}</span>
            </button>

            {/* Meta and Category tags */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#111113]/50">
                <span className="text-black font-bold tracking-widest uppercase">// {currentArticle.category[lang]}</span>
                <span className="w-1.5 h-1.5 bg-[#111113]/15 rounded-full"></span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-black" /> {currentArticle.publishDate}</span>
                <span className="w-1.5 h-1.5 bg-[#111113]/15 rounded-full"></span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-black" /> {currentArticle.readTime[lang]}</span>
                <span className="w-1.5 h-1.5 bg-[#111113]/15 rounded-full"></span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-black" /> {currentArticle.author}</span>
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
                  <h4 className="font-mono text-xs font-bold text-black tracking-wider uppercase">// META DETAILS</h4>
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
                  <h4 className="font-mono text-xs font-bold text-black tracking-wider uppercase flex items-center gap-1.5">
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
                  <h4 className="font-mono text-xs font-bold text-black tracking-wider uppercase flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{lang === "it" ? "CONDIVIDI" : "SHARE"}</span>
                  </h4>
                  <div className="flex flex-wrap lg:flex-col gap-2.5">
                    <button
                      onClick={() => triggerShare("linkedin")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-black/5 border border-[#111113]/15 hover:border-black text-[#111113]/70 hover:text-black text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Linkedin className="w-4 h-4 text-black" />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => triggerShare("twitter")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-black/5 border border-[#111113]/15 hover:border-black text-[#111113]/70 hover:text-black text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Twitter className="w-4 h-4 text-black" />
                      <span>Twitter / X</span>
                    </button>
                    <button
                      onClick={() => triggerShare("facebook")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-black/5 border border-[#111113]/15 hover:border-black text-[#111113]/70 hover:text-black text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Facebook className="w-4 h-4 text-black" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FAF9F6] hover:bg-black/5 border border-[#111113]/15 hover:border-black text-[#111113]/70 hover:text-black text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      {copied ? <Check className="w-4 h-4 text-black animate-pulse" /> : <Copy className="w-4 h-4 text-black" />}
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

                {/* Footer of the article with Dynamic CTA */}
                <div className={`mt-12 p-8 md:p-10 border transition-all shadow-xl relative overflow-hidden ${
                  currentArticle.cta.themeStyle === "warning"
                    ? "bg-gradient-to-br from-[#181512] via-[#111113] to-[#1C160C] border-amber-500/40 text-white"
                    : currentArticle.cta.themeStyle === "cyber"
                    ? "bg-gradient-to-br from-[#0F0E17] via-[#111113] to-[#1A182E] border-indigo-500/40 text-white"
                    : "bg-gradient-to-br from-[#0B1510] via-[#111113] to-[#0D1F17] border-emerald-500/40 text-white"
                }`}>
                  {/* Glow Accents */}
                  <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
                    currentArticle.cta.themeStyle === "warning"
                      ? "bg-amber-500"
                      : currentArticle.cta.themeStyle === "cyber"
                      ? "bg-indigo-500"
                      : "bg-emerald-500"
                  }`}></div>

                  <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-2">
                        {currentArticle.cta.themeStyle === "warning" && <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />}
                        {currentArticle.cta.themeStyle === "cyber" && <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />}
                        {currentArticle.cta.themeStyle === "speed" && <Zap className="w-4 h-4 text-emerald-400 shrink-0" />}
                        <span className={`font-mono text-[10px] tracking-widest uppercase font-bold px-2.5 py-0.5 border ${
                          currentArticle.cta.themeStyle === "warning"
                            ? "border-amber-500/30 text-amber-300 bg-amber-500/10"
                            : currentArticle.cta.themeStyle === "cyber"
                            ? "border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
                            : "border-emerald-500/30 text-emerald-300 bg-emerald-500/10"
                        }`}>
                          {currentArticle.cta.badge[lang]}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white leading-tight">
                        {currentArticle.cta.title[lang]}
                      </h3>

                      <p className={`font-sans text-xs sm:text-sm font-semibold ${
                        currentArticle.cta.themeStyle === "warning"
                          ? "text-amber-200/90"
                          : currentArticle.cta.themeStyle === "cyber"
                          ? "text-indigo-200/90"
                          : "text-emerald-200/90"
                      }`}>
                        {currentArticle.cta.titleHighlight[lang]}
                      </p>

                      <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                        {currentArticle.cta.description[lang]}
                      </p>
                    </div>

                    <div className="shrink-0 w-full lg:w-auto pt-2 lg:pt-0">
                      <button
                        onClick={() => setCurrentTab(currentArticle.cta.targetTab)}
                        className={`w-full lg:w-auto px-6 py-4 font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:scale-102 ${
                          currentArticle.cta.themeStyle === "warning"
                            ? "bg-amber-400 text-black hover:bg-amber-300 border border-amber-300"
                            : currentArticle.cta.themeStyle === "cyber"
                            ? "bg-white text-black hover:bg-indigo-50 border border-white"
                            : "bg-emerald-400 text-black hover:bg-emerald-300 border border-emerald-300"
                        }`}
                      >
                        <span>{currentArticle.cta.buttonText[lang]}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Related Articles Section */}
            {relatedArticles.length > 0 && (
              <div className="mt-16 pt-12 border-t-2 border-[#111113]/10 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold text-black uppercase tracking-widest">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>// {lang === "it" ? "NAVIGAZIONE ED APPROFONDIMENTI" : "RECOMMENDED READINGS"}</span>
                    </div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#111113]">
                      {lang === "it" ? "Articoli Correlati" : "Related Articles"}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#111113]/60 font-sans">
                      {lang === "it"
                        ? "Continua la lettura con approfondimenti selezionati per affinità di argomenti e tag:"
                        : "Continue reading with selected insights based on topic and tag affinity:"}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="self-start sm:self-auto px-4 py-2 border border-[#111113]/20 hover:border-black text-[#111113]/70 hover:text-black font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shrink-0"
                  >
                    <span>{lang === "it" ? "Tutti gli articoli" : "All articles"}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map(({ article, matchingTags }) => (
                    <div
                      key={article.slug}
                      onClick={() => setSelectedArticle(article.slug)}
                      className="border border-[#111113]/10 bg-[#FAF9F6] overflow-hidden hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="h-40 relative overflow-hidden border-b border-[#111113]/10">
                          <img
                            src={article.coverImage}
                            alt={article.title[lang]}
                            className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 bg-[#FAF9F6]/90 border border-[#111113]/10 text-black px-2.5 py-0.5 text-[9px] font-mono tracking-widest uppercase font-bold">
                            {article.category[lang]}
                          </div>
                        </div>

                        <div className="p-5 space-y-3">
                          <div className="flex items-center gap-3 text-[10px] font-mono text-[#111113]/40">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-black" /> {article.publishDate}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-black" /> {article.readTime[lang]}</span>
                          </div>

                          <h4 className="font-display text-base font-bold text-[#111113] group-hover:text-black transition-colors leading-snug line-clamp-2">
                            {article.title[lang]}
                          </h4>

                          <p className="text-xs text-[#111113]/60 font-sans leading-relaxed line-clamp-2">
                            {article.description[lang]}
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 space-y-3">
                        <div className="flex flex-wrap gap-1 pt-1">
                          {article.tags.slice(0, 3).map((tag) => {
                            const isMatch = matchingTags.includes(tag);
                            return (
                              <span
                                key={tag}
                                className={`text-[8px] font-mono font-bold tracking-widest px-1.5 py-0.5 uppercase border ${
                                  isMatch
                                    ? "bg-amber-400/20 border-amber-500/50 text-amber-900"
                                    : "text-[#111113]/40 border-[#111113]/10"
                                }`}
                              >
                                #{tag}
                              </span>
                            );
                          })}
                          {article.tags.length > 3 && (
                            <span className="text-[8px] font-mono text-[#111113]/40 px-1 py-0.5">
                              +{article.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="pt-3 border-t border-[#111113]/10 flex items-center justify-between text-black font-mono text-[10px] font-bold tracking-widest uppercase group-hover:translate-x-0.5 transition-transform">
                          <span>{lang === "it" ? "LEGGI ORA" : "READ NOW"}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-black" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
