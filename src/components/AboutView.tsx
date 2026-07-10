import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Zap, Heart, Sparkles, Code, Pencil } from "lucide-react";

interface AboutViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function AboutView({ setCurrentTab, lang, isFacilitated }: AboutViewProps) {
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
  const values = isFacilitated
    ? [
        {
          icon: <ShieldCheck className="w-5 h-5 text-[#E35930]" />,
          title: lang === "it" ? "Parli solo con me" : "Speak only with me",
          desc: lang === "it"
            ? "Non ci sono intermediari, segretarie o programmatori junior. Parli direttamente con me (Teresa) per ogni cosa."
            : "No managers or helpers. You speak directly with me (Teresa) for everything.",
        },
        {
          icon: <Zap className="w-5 h-5 text-[#E35930]" />,
          title: lang === "it" ? "Modifiche all'istante" : "Changes instantly",
          desc: lang === "it"
            ? "Nelle agenzie ci vogliono giorni per fare modifiche. Con me, parliamo al mattino e la modifica è online al pomeriggio."
            : "Big agencies take days to approve edits. With me, we decide a change in the morning and it is online in the afternoon.",
        },
        {
          icon: <Heart className="w-5 h-5 text-[#E35930]" />,
          title: lang === "it" ? "Grande risparmio" : "Great savings",
          desc: lang === "it"
            ? "Lavoro da sola e non ho uffici fisici o dipendenti da pagare. Per questo i miei prezzi sono molto più bassi delle agenzie."
            : "I work by myself with no office rent. That is why my prices are much lower than big agencies.",
        },
      ]
    : [
        {
          icon: <ShieldCheck className="w-5 h-5 text-[#E35930]" />,
          title: lang === "it" ? "Interlocutore Unico" : "Single Point of Contact",
          desc: lang === "it"
            ? "Niente account manager, niente segretarie o sviluppatori junior che lavorano al tuo sito di nascosto. Parli, discuti e definisci tutto direttamente con me."
            : "No account managers, no secretaries or junior coders working on your site in secret. You talk, discuss, and define everything directly with me.",
        },
        {
          icon: <Zap className="w-5 h-5 text-[#E35930]" />,
          title: lang === "it" ? "Velocità senza Burocrazia" : "No-Bureaucracy Speed",
          desc: lang === "it"
            ? "I processi decisionali in agenzia richiedono giorni. Qui possiamo decidere una modifica al mattino e vederla live nel pomeriggio."
            : "Agency approval pipelines take days. Here, we can discuss a modification in the morning and see it live in the afternoon.",
        },
        {
          icon: <Heart className="w-5 h-5 text-[#E35930]" />,
          title: lang === "it" ? "Massimo Risparmio" : "Maximum Value",
          desc: lang === "it"
            ? "Lavorando da sola come freelance non ho uffici fisici imponenti o personale da stipendiare. Questo si traduce in tariffe fino a 3 volte inferiori."
            : "Working alone as a freelance developer, I don't run hefty physical offices or maintain auxiliary staff. This means rates up to 3 times lower.",
        },
      ];

  const skillCategories = [
    {
      icon: <Code className="w-5 h-5 text-[#E35930]" />,
      title: lang === "it" ? "Sviluppo & Strumenti" : "Development & Tools",
      skills: ["React / Vite", "Tailwind CSS", "HTML5 & CSS3", "Express Node.js Server", "Figma", "Cursor / AI IDEs"],
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#E35930]" />,
      title: lang === "it" ? "Integrazione IA" : "AI Integration & Prompting",
      skills: ["Gemini LLMs API", "OpenAI Advanced API", "Midjourney & Stable Diffusion", "Vector Search / Embeddings", "AI-driven Copywriting"],
    },
    {
      icon: <Pencil className="w-5 h-5 text-[#E35930]" />,
      title: lang === "it" ? "Marketing & Strategia" : "Marketing & Strategy",
      skills: ["SEO Predittiva", "Google Analytics", "Brand Identity Manuals", "CRO (Conversion Optimization)", "Copywriting Persuasivo"],
    },
  ];

  return (
    <div className="w-full bg-[#111113] text-[#F8F7F4]">
      {/* Intro Header */}
      <section className="py-24 relative border-b border-[rgba(248,247,244,0.1)] overflow-hidden">
        {/* Ambient Background Slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {bgImages.map((imgUrl, idx) => (
            <div
              key={imgUrl}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ${
                idx === currentBgIndex ? "opacity-40 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                backgroundImage: `url(${imgUrl})`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111113] via-[#111113]/80 to-[#111113]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111113]/30 via-transparent to-[#111113]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block mb-2">
              {lang === "it" ? "[ CHI C'È DIETRO FACILISSIMO WEB ]" : "[ WHO IS BEHIND FACILISSIMO WEB ]"}
            </span>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F8F7F4] tracking-tighter leading-none">
              M. Teresa Rogani
            </h1>
            <p className="font-mono text-[10px] text-[#E35930] uppercase tracking-widest font-bold">
              {lang === "it" ? "Freelance Web Designer & Sviluppatrice AI-Powered" : "Freelance Web Designer & AI-Powered Developer"}
            </p>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[#F8F7F4]/80 leading-relaxed">
              {isFacilitated ? (
                <>
                  <p>
                    Sono Teresa Rogani e sono l'<strong>unica titolare</strong> di Facilissimo Web. Ho creato questo studio per realizzare siti internet professionali, veloci ed economici usando l'intelligenza artificiale per aiutarmi nel codice.
                  </p>
                  <p>
                    Qui <strong>non c'è nessun team</strong> o intermediario. Lavoro da sola così parli solo con chi fa il lavoro. Questo ti garantisce risposte immediate e un servizio trasparente e affidabile.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Sono la fondatrice e <strong className="text-[#E35930]">unica titolare</strong> di Facilissimo Web. Ho creato questo studio con un'idea ben precisa: abbattere le barriere del web design tradizionale e offrire siti web ultra-professionali, veloci e ottimizzati, sfruttando le tecnologie di Intelligenza Artificiale di ultima generazione.
                  </p>
                  <p>
                    A differenza delle agenzie tradizionali dove il tuo progetto passa di mano in mano, qui <strong className="text-[#E35930]">non c'è nessun team</strong>. Lavoro da sola. Questo è il mio più grande punto di forza: garantisco un canale di comunicazione diretto, trasparente ed estremamente veloce.
                  </p>
                </>
              )}
            </div>

            <div className="flex gap-4 pt-2">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="editorial-button-primary cursor-pointer"
              >
                {lang === "it" ? "Parliamo del tuo sito" : "Let's discuss your site"}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            {/* Visual composition of Teresa / Workspace */}
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-[rgba(248,247,244,0.1)] bg-[#151518]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                alt="M. Teresa Rogani Freelance Web Designer working at her desk"
                className="w-full h-full object-cover grayscale contrast-125 opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111113]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-[#F8F7F4] space-y-1">
                <p className="font-display font-bold text-lg">M. Teresa Rogani</p>
                <p className="text-[9px] font-mono text-[#E35930] uppercase tracking-widest font-bold">
                  Macerata (Marche), Italia
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* The Single Freelancer Advantage */}
      <section className="py-24 bg-[#151518] border-b border-[rgba(248,247,244,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              {isFacilitated ? "[ I VALORI DI FACILISSIMO WEB ]" : "[ EFFICIENZA & VALORE ]"}
            </span>
            <h2 className="font-display text-3xl font-bold text-[#F8F7F4]">
              {isFacilitated ? "Perché lavorare con me conviene" : "Il Vantaggio del Freelance Unico"}
            </h2>
            <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm">
              {isFacilitated 
                ? "I vantaggi di avere una sola persona esperta che segue il tuo progetto dall'inizio alla fine."
                : "Perché collaborare con una sola persona qualificata è una scelta vincente per la tua azienda rispetto a un'agenzia elefantiaca."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, index) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-[#111113] border border-[rgba(248,247,244,0.1)] space-y-4 hover:border-[#E35930]/40 transition-all"
              >
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.15)] flex items-center justify-center text-[#E35930] group-hover:bg-[#E35930] group-hover:text-[#111113]">
                  {val.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-[#F8F7F4]">
                  {val.title}
                </h3>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed font-sans">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Method / AI & Craftsmanship */}
      <section className="py-24 bg-[#111113]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              {isFacilitated ? "[ METODO DI LAVORO ]" : "[ INTELLIGENZA ARTIGIANALE ]"}
            </span>
            <h2 className="font-display text-3xl font-bold text-[#F8F7F4]">
              {isFacilitated ? "Grafica e Assistenza con Computer" : "Artigianato & Intelligenza Artificiale"}
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed font-sans">
              {isFacilitated ? (
                <>
                  <p>
                    Uso l'Intelligenza Artificiale per velocizzare la parte noiosa del codice. Questo mi permette di dedicare tutto il tempo a quello che conta di più per te: <strong>la grafica su misura, la facilità d'uso del sito e la scrittura di testi semplici per convincere i clienti</strong>.
                  </p>
                  <p>
                    In questo modo ottieni un sito web moderno, curato in ogni dettaglio, pronto in soli 14 giorni e con una spesa molto contenuta.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Molti pensano che l'Intelligenza Artificiale sostituisca il lavoro umano. Per me, è l'esatto contrario: <strong className="text-[#E35930]">l'IA lo potenzia ed eleva ad un livello superiore</strong>.
                  </p>
                  <p>
                    Utilizzo l'IA in ogni fase del mio flusso di lavoro per eliminare i compiti ripetitivi (como la scrittura di codice di base o la generazione di bozze provvisorie). Questo mi permette di concentrarmi completamente su ciò che conta davvero per te: <strong className="text-[#E35930]">la strategia di comunicazione, l'eleganza estetica, l'ottimizzazione dell'esperienza utente e la conversione dei clienti</strong>.
                  </p>
                  <p>
                    Il risultato è un sito web che costa la metà, viene consegnato nella metà del tempo, ma vanta una qualità tecnica e grafica sbalorditiva.
                  </p>
                </>
              )}
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {skillCategories.map((cat, index) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#151518] p-6 border border-[rgba(248,247,244,0.1)] space-y-4 hover:border-[#E35930]/40 transition-all"
              >
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.15)] flex items-center justify-center text-[#E35930]">
                  {cat.icon}
                </div>
                <h4 className="font-display font-bold text-xs text-[#F8F7F4]">
                  {cat.title}
                </h4>
                <ul className="space-y-2 text-[10px] text-[#F8F7F4]/70 font-mono">
                  {cat.skills.map((sk) => (
                    <li key={sk} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-[#E35930]"></span>
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Philosophy Call To Action */}
      <section className="py-24 bg-[#151518] text-[#F8F7F4] text-center border-t border-[rgba(248,247,244,0.1)]">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
            {isFacilitated ? "[ DIRETTO & VELOCE ]" : "[ DIRETTO & VELOCE ]"}
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#F8F7F4]">
            {isFacilitated ? "Vuoi creare il tuo sito con me?" : "Pronto a lavorare direttamente con me?"}
          </h2>
          <p className="text-[#F8F7F4]/80 font-sans text-xs sm:text-sm leading-relaxed">
            {isFacilitated 
              ? "Evita le lunghe attese delle grandi agenzie e i preventivi troppo alti. Parla direttamente con me e sviluppiamo il tuo nuovo sito web."
              : "Elimina i passaggi burocratici, i preventivi gonfiati e i tempi morti di un'agenzia. Parla direttamente con me e sviluppiamo il tuo nuovo sito web in tempi record."}
          </p>
          <div className="pt-4">
            <button
              onClick={() => setCurrentTab("contatti")}
              className="px-8 py-4 bg-[#E35930] text-[#111113] font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-[#E35930] transition-all cursor-pointer border border-[#E35930]"
            >
              {lang === "it" ? "Avvia la collaborazione" : "Start cooperation"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
