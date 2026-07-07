import { useState, useEffect, ReactNode } from "react";
import { Calendar, Clock, User, Share2, Tag, ArrowLeft, Linkedin, Twitter, Facebook, Copy, Check, ChevronRight, Bookmark, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

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
}

export default function BlogView({ lang, isFacilitated, setCurrentTab }: BlogViewProps) {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // Scroll to top when article is opened or closed
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedArticle]);

  const handleCopyLink = () => {
    const url = window.location.href + "?article=" + (selectedArticle || "seo-predittiva");
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const triggerShare = (platform: "linkedin" | "twitter" | "facebook") => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(
      lang === "it"
        ? "Leggi questo fantastico articolo su Facilissimo Web!"
        : "Check out this amazing article on Facilissimo Web!"
    );
    let shareUrl = "";

    switch (platform) {
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
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

  const articles: Article[] = [
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
          <div className="space-y-6 text-[#F8F7F4]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#F8F7F4]">
              La SEO tradizionale è ormai un esercizio del passato. Guardare cosa le persone hanno già cercato significa inseguire costantemente la concorrenza. La SEO Predittiva stravolge questo paradigma.
            </p>

            <div className="my-8 p-6 bg-[#151518] border-l-4 border-[#E35930] space-y-3">
              <span className="font-mono text-xs text-[#E35930] tracking-widest block uppercase">// IL CUORE DELLA STRATEGIA PREDITTIVA</span>
              <p className="text-xs sm:text-sm text-[#F8F7F4]/70">
                La SEO Predittiva, potenziata dall'Intelligenza Artificiale, analizza il comportamento in tempo reale degli utenti e l'evoluzione degli algoritmi per prevedere le tendenze di ricerca con mesi di anticipo. Questo ci permette di posizionare il tuo brand prima di chiunque altro.
              </p>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">I Quattro Pilastri Fondamentali</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">01. Analisi dei Trend Latenti</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  Interroghiamo modelli linguistici avanzati di intelligenza artificiale per analizzare i comportamenti d'acquisto emergenti, anticipando le parole chiave specifiche che diventeranno popolari nei prossimi mesi prima dei concorrenti.
                </p>
              </div>
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">02. Mappatura Intenti di Ricerca</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  Raggruppiamo i bisogni espressi dagli utenti in "cluster semantici" ancor prima che i motori di ricerca tradizionali li classifichino, strutturando le risposte ottimali per gli utenti del tuo territorio.
                </p>
              </div>
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">03. Codice Leggero e Predittivo</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  Sviluppiamo l'architettura dei dati del sito in modo ultra-pulito usando i markup ufficiali (schema.org) affinché gli assistenti AI e gli algoritmi di Google e Bing leggano e riconoscano istantaneamente l'autorità del brand.
                </p>
              </div>
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">04. Adattamento Dinamico</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  Attraverso controlli e algoritmi continui, perfezioniamo i contenuti e i meta-tag del tuo sito per mantenerli allineati in tempo reale con i mutamenti delle ricerche locali e nazionali.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">Cosa cambia per le Microimprese locali delle Marche?</h3>
            <p>
              Immagina di gestire uno studio professionale, una cantina biologica o un'attività artigianale a Macerata o Civitanova Marche. Spesso non hai il budget per competere con le grandi agenzie nazionali su parole chiave generiche e costosissime. 
            </p>
            <p>
              La SEO Predittiva livella il campo di gioco. Invece di inseguire parole chiave sature, ti permette di posizionare le risposte a domande che i tuoi futuri clienti si faranno tra qualche settimana. È l'equivalente digitale di aprire un negozio esattamente lungo la strada in cui si sposterà il mercato cittadino domani mattina.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">L'impatto degli AI Search Engines (Perplexity, ChatGPT, Gemini)</h3>
            <p>
              Sempre più persone cercano risposte direttamente all'interno delle chat AI come ChatGPT, Perplexity o Google Gemini, anziché scorrere una lista di link blu. I siti web tradizionali realizzati su WordPress, pesanti e privi di tag semantici strutturati, sono invisibili a queste IA. 
            </p>
            <p>
              I nostri siti web "predittivi" sono scritti in codice leggerissimo, con dati strutturati puliti e risposte ottimizzate per essere citate come fonti autorevoli dalle risposte generate da questi motori del futuro.
            </p>
          </div>
        ),
        en: (
          <div className="space-y-6 text-[#F8F7F4]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#F8F7F4]">
              Traditional SEO is becoming a retro-active practice. Watching what people have already searched for means constantly chasing after your competitors. Predictive SEO completely flips this model.
            </p>

            <div className="my-8 p-6 bg-[#151518] border-l-4 border-[#E35930] space-y-3">
              <span className="font-mono text-xs text-[#E35930] tracking-widest block uppercase">// THE HEART OF PREDICTIVE STRATEGY</span>
              <p className="text-xs sm:text-sm text-[#F8F7F4]/70">
                Predictive SEO, powered by Artificial Intelligence, analyzes real-time user behavior trends and search engine algorithm evolutions to predict search queries months in advance. This lets us position your brand before anyone else.
              </p>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">The Four Key Pillars</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">01. Latent Trend Analysis</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  We query advanced generative language models to monitor emerging buying habits and capture highly specific search trends that will blow up in the upcoming weeks.
                </p>
              </div>
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">02. Search Intent Clustering</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  We categorize prospective client inquiries into "semantic clusters" long before generic search databases index them, optimizing the perfect answers in advance.
                </p>
              </div>
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">03. Pre-emptive Code Markup</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  We construct ultra-clean HTML data schemas using official microformats (schema.org) so that Google, Bing, and AI crawlers immediately trust and credit your brand authority.
                </p>
              </div>
              <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60">
                <span className="font-mono text-xs font-bold text-[#E35930] block mb-2">04. Continuous Optimization</span>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                  Through dynamic check-ins and automated audits, we constantly adjust meta-tags and semantic layouts to match active local and global trend updates.
                </p>
              </div>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">Why is this a Game-Changer for Local Micro-businesses?</h3>
            <p>
              If you operate a freelance service, an artisan workshop, or a small organic winery in Macerata or Civitanova Marche, you often don't have the marketing budget to compete with huge corporations bidding on highly saturated general keywords.
            </p>
            <p>
              Predictive SEO levels the playing field. Instead of trying to rank for expensive, overcrowded categories, it lets you answer specific, high-intent questions your future clients will be asking weeks from now. It is the digital equivalent of opening a beautiful store exactly where tomorrow's high-traffic street is being built.
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">Adapting to AI Search Engines (Perplexity, ChatGPT, Gemini)</h3>
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
          <div className="space-y-6 text-[#F8F7F4]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#F8F7F4]">
              Nel web moderno, l'attenzione dell'utente medio si misura in frazioni di secondo. Se il tuo sito web impiega più di due secondi per caricarsi sui telefoni dei tuoi clienti, oltre la metà di loro tornerà indietro e sceglierà un tuo concorrente.
            </p>
            <p>
              Molte web agency propongono ancora pacchetti basati su WordPress e template pronti, appesantiti da decine di estensioni e plugin. Questo si traduce in siti lenti, vulnerabili agli attacchi informatici e difficili da posizionare su Google.
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">I Vantaggi delle Tecnologie Statiche su Misura</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Caricamento Immediato:</strong> Nessun database da interrogare a ogni clic. Le pagine web pre-compilate appaiono all'istante sui telefoni.</li>
              <li><strong>Sicurezza Assoluta:</strong> Senza un database visibile e senza i pannelli amministrativi vulnerabili di WordPress, gli hacker non hanno punti d'accesso per infettare il tuo sito.</li>
              <li><strong>Costi di Hosting Azzerati:</strong> I siti statici sono ospitati su reti CDN ultra-rapide e ad altissima affidabilità a un costo infinitesimale rispetto ai server necessari per WordPress.</li>
              <li><strong>SEO Naturale:</strong> Google premia attivamente i siti web veloci e leggeri. Un sito su misura raggiunge facilmente il punteggio massimo di 100/100 nei test di velocità di Google PageSpeed.</li>
            </ul>
          </div>
        ),
        en: (
          <div className="space-y-6 text-[#F8F7F4]/85 text-sm sm:text-base font-sans leading-relaxed">
            <p className="font-medium text-lg text-[#F8F7F4]">
              In the modern web, user attention is measured in fractions of a second. If your website takes more than two seconds to load on mobile devices, over half of your visitors will back out and select a competitor.
            </p>
            <p>
              Many web agencies still offer bloated WordPress solutions and cookie-cutter themes weighed down by dozens of unnecessary active plugins. This results in slow websites that are vulnerable to hacks and difficult to rank on Google.
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] pt-4">The Benefits of Bespoke Static Technology</h3>
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
    <div className="w-full bg-[#111113] py-12 text-[#F8F7F4] min-h-[80vh]">
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#E35930] text-[#111113] font-mono text-xs font-bold px-4 py-3 shadow-[0_0_20px_rgba(227,89,48,0.3)] uppercase tracking-wider animate-bounce">
          {shareToast}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {!currentArticle ? (
          // BLOG INDEX VIEW
          <div className="space-y-12">
            <div className="space-y-4 text-center max-w-2xl mx-auto">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
                {lang === "it" ? "[ TRASPARENZA E CONOSCENZA ]" : "[ INSIGHTS & UPDATES ]"}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F7F4]">
                {lang === "it" ? "Il Nostro Blog & News" : "Our Blog & News"}
              </h1>
              <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm">
                {lang === "it"
                  ? "Rimani aggiornato su SEO predittiva, intelligenza artificiale per il business locale e tendenze di web design."
                  : "Stay ahead of the curve with predictive SEO, business artificial intelligence, and cutting-edge web design trends."}
              </p>
            </div>

            {/* Featured Article Card */}
            <div className="border border-[rgba(248,247,244,0.1)] bg-[#151518]/60 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden hover:border-[#E35930]/35 transition-all duration-300">
              <div className="lg:col-span-7 h-64 lg:h-auto relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[rgba(248,247,244,0.1)]">
                <img
                  src={articles[0].coverImage}
                  alt={articles[0].title[lang]}
                  className="w-full h-full object-cover grayscale contrast-125 hover:scale-101 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#E35930] text-[#111113] px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                  {articles[0].category[lang]}
                </div>
              </div>
              
              <div className="lg:col-span-5 p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-mono text-[#F8F7F4]/40">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#E35930]" /> {articles[0].publishDate}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#E35930]" /> {articles[0].readTime[lang]}</span>
                  </div>
                  
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#F8F7F4] hover:text-[#E35930] transition-colors leading-snug cursor-pointer" onClick={() => setSelectedArticle(articles[0].slug)}>
                    {articles[0].title[lang]}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-[#F8F7F4]/60 font-sans leading-relaxed">
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

                <div className="pt-4 border-t border-[rgba(248,247,244,0.06)] flex justify-between items-center">
                  <button onClick={() => setSelectedArticle(articles[0].slug)} className="text-[#E35930] hover:text-[#F8F7F4] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 transition-colors">
                    {lang === "it" ? "LEGGI ARTICOLO COMPLETO" : "READ FULL ARTICLE"}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Rest of Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              {articles.slice(1).map((article) => (
                <div key={article.slug} className="border border-[rgba(248,247,244,0.1)] bg-[#151518]/40 overflow-hidden hover:border-[#E35930]/35 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="h-48 relative overflow-hidden border-b border-[rgba(248,247,244,0.1)]">
                      <img
                        src={article.coverImage}
                        alt={article.title[lang]}
                        className="w-full h-full object-cover grayscale contrast-125"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 bg-[#111113]/90 border border-[rgba(248,247,244,0.1)] text-[#E35930] px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                        {article.category[lang]}
                      </div>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <div className="flex items-center gap-4 text-[10px] font-mono text-[#F8F7F4]/40">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#E35930]" /> {article.publishDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[#E35930]" /> {article.readTime[lang]}</span>
                      </div>
                      
                      <h3 className="font-display text-lg font-bold text-[#F8F7F4] hover:text-[#E35930] transition-colors cursor-pointer" onClick={() => setSelectedArticle(article.slug)}>
                        {article.title[lang]}
                      </h3>
                      
                      <p className="text-xs text-[#F8F7F4]/60 font-sans leading-relaxed">
                        {article.description[lang]}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 space-y-4">
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="text-[8px] font-mono font-bold tracking-widest text-[#F8F7F4]/40 border border-[rgba(248,247,244,0.08)] px-1.5 py-0.5 uppercase">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-[rgba(248,247,244,0.06)]">
                      <button onClick={() => setSelectedArticle(article.slug)} className="text-[#E35930] hover:text-[#F8F7F4] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors">
                        {lang === "it" ? "LEGGI ARTICOLO" : "READ ARTICLE"}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // SINGLE ARTICLE VIEW
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Back Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              className="group py-2.5 px-4 border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] transition-all flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>{lang === "it" ? "Torna al Blog" : "Back to Blog"}</span>
            </button>

            {/* Meta and Category tags */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#F8F7F4]/50">
                <span className="text-[#E35930] font-bold tracking-widest uppercase">// {currentArticle.category[lang]}</span>
                <span className="w-1.5 h-1.5 bg-[rgba(248,247,244,0.2)] rounded-full"></span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#E35930]" /> {currentArticle.publishDate}</span>
                <span className="w-1.5 h-1.5 bg-[rgba(248,247,244,0.2)] rounded-full"></span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#E35930]" /> {currentArticle.readTime[lang]}</span>
                <span className="w-1.5 h-1.5 bg-[rgba(248,247,244,0.2)] rounded-full"></span>
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#E35930]" /> {currentArticle.author}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F7F4] leading-tight">
                {currentArticle.title[lang]}
              </h1>
            </div>

            {/* Cover Image */}
            <div className="w-full aspect-[21/9] bg-[#151518] border border-[rgba(248,247,244,0.12)] overflow-hidden relative">
              <img
                src={currentArticle.coverImage}
                alt={currentArticle.title[lang]}
                className="w-full h-full object-cover grayscale contrast-115"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Layout with Content and Sticky Share Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pt-4">
              {/* Sticky Left Sidebar for metadata/tags/shares */}
              <div className="lg:col-span-3 space-y-8 lg:sticky lg:top-24">
                
                {/* Meta details */}
                <div className="p-5 border border-[rgba(248,247,244,0.1)] bg-[#151518]/60 space-y-4">
                  <h4 className="font-mono text-xs font-bold text-[#E35930] tracking-wider uppercase">// META DETAILS</h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <span className="text-[#F8F7F4]/40 block font-mono">Title Meta-Tag:</span>
                      <p className="font-sans text-[#F8F7F4]/70 mt-0.5 leading-snug">{currentArticle.metaTitle[lang]}</p>
                    </div>
                    <div>
                      <span className="text-[#F8F7F4]/40 block font-mono">Description Meta-Tag:</span>
                      <p className="font-sans text-[#F8F7F4]/70 mt-0.5 leading-snug">{currentArticle.metaDescription[lang]}</p>
                    </div>
                    <div>
                      <span className="text-[#F8F7F4]/40 block font-mono">Keywords:</span>
                      <p className="font-sans text-[#F8F7F4]/70 mt-0.5 leading-snug">{currentArticle.tags.join(", ").toLowerCase()}</p>
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
                      <span key={tag} className="text-[10px] font-mono bg-[#151518] border border-[rgba(248,247,244,0.1)] text-[#F8F7F4]/80 px-2.5 py-1 uppercase font-semibold">
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
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#151518] hover:bg-[#E35930]/10 border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Linkedin className="w-4 h-4 text-[#E35930]" />
                      <span>LinkedIn</span>
                    </button>
                    <button
                      onClick={() => triggerShare("twitter")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#151518] hover:bg-[#E35930]/10 border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Twitter className="w-4 h-4 text-[#E35930]" />
                      <span>Twitter / X</span>
                    </button>
                    <button
                      onClick={() => triggerShare("facebook")}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#151518] hover:bg-[#E35930]/10 border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      <Facebook className="w-4 h-4 text-[#E35930]" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2.5 px-4 py-2.5 bg-[#151518] hover:bg-[#E35930]/10 border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex-1 lg:flex-initial text-left"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400 animate-pulse" /> : <Copy className="w-4 h-4 text-[#E35930]" />}
                      <span>{copied ? (lang === "it" ? "COPIATO!" : "COPIED!") : (lang === "it" ? "COPIA LINK" : "COPY LINK")}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Central Content */}
              <div className="lg:col-span-9 space-y-8">
                <article className="prose prose-invert max-w-none">
                  {currentArticle.content[lang]}
                </article>

                {/* Footer of the article with CTA */}
                <div className="mt-12 p-8 border border-[rgba(248,247,244,0.1)] bg-[#151518] flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="font-display font-bold text-lg text-[#F8F7F4]">
                      {lang === "it" ? "Vuoi applicare la SEO Predittiva al tuo sito?" : "Want to apply Predictive SEO to your site?"}
                    </h3>
                    <p className="text-xs text-[#F8F7F4]/60 font-sans">
                      {lang === "it" 
                        ? "Progettiamo strategie semantiche su misura per darti un vantaggio duraturo sulla concorrenza." 
                        : "We design custom semantic strategies to grant your business a long-lasting advantage."}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentTab("contatti")}
                    className="px-6 py-3 bg-[#E35930] text-[#111113] hover:bg-transparent hover:text-[#E35930] border border-[#E35930] font-mono text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {lang === "it" ? "PARLIAMONE" : "LET'S TALK"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
