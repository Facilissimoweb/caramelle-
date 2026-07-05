import { motion } from "motion/react";
import { Brain, Cpu, Zap, ArrowRight, CheckCircle2, Sparkles, Code2, Rocket } from "lucide-react";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ setCurrentTab }: HomeViewProps) {
  const features = [
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Sviluppo AI-Driven",
      description:
        "Siti veloci, dinamici e leggeri. Uso l'AI per accelerare il codice e ottimizzare i flussi logici, con rilascio in tempi record.",
      tag: "NEURAL DEV",
      accent: "cyan",
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "UI/UX Iperreale",
      description:
        "Interfacce moderne progettate al millimetro. Layout fluidi orientati all'utente per massimo coinvolgimento visivo su ogni device.",
      tag: "USER-CENTRIC",
      accent: "purple",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Conversioni Predittive",
      description:
        "Ottimizzazione basata su dati reali. Copy e SEO scritti per convertire ogni visitatore in cliente attivo.",
      tag: "PREDICTIVE SEO",
      accent: "pink",
    },
  ];

  const projects = [
    {
      title: "Amala Pizza",
      category: "Brand + Multipage",
      desc: "Ridisegno completo dell'identità visiva, nuovo logo e sviluppo di un sito multipagina hostato su Hostinger. Un chiavi-in-mano per un brand di ristorazione d'eccellenza.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1000",
      link: "https://amalapizza.it/",
    },
    {
      title: "Nexa AI Hub",
      category: "Platform Design",
      desc: "Interfaccia bento-grid per l'analisi dati e la gestione dei flussi cloud. Palette iridescente e grafica interamente vettoriale.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  const marqueeTags = [
    "REACT", "AI CODEGEN", "VITE", "TAILWIND V4", "MOTION", "GEMINI", "CLAUDE", "PREDICTIVE SEO",
    "NEURAL UX", "EDGE DEPLOY", "3D WEBGL", "MOTION DESIGN", "COPY AI",
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center py-20 overflow-hidden" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="pulse-dot" />
              <span className="holo-tag">M. TERESA ROGANI · STUDIO 2026</span>
            </div>

            <h1 className="font-display text-[42px] sm:text-6xl lg:text-[88px] font-bold leading-[0.92] tracking-tight text-white">
              Siti web che vivono nel{" "}
              <span className="holo-text italic">futuro</span>{" "}
              <br className="hidden sm:block" />
              costruiti con l'<span className="chrome-text">Intelligenza Artificiale</span>.
            </h1>

            <p className="text-base sm:text-lg text-[#f2ecff]/75 max-w-xl leading-relaxed">
              Progetto esperienze digitali iperperformanti, iridescenti e su misura. Senza agenzie, senza intermediari, con la potenza dell'AI e la cura di una freelance italiana.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => setCurrentTab("contatti")} className="btn-holo" data-testid="hero-cta-primary">
                Lavoriamo insieme
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => setCurrentTab("chi-sono")} className="btn-ghost" data-testid="hero-cta-secondary">
                Scopri il metodo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-8 text-[10px] uppercase tracking-widest font-mono-tech text-[#f2ecff]/60">
              {["100% Diretto", "Consegna AI-Speed", "Prezzi Trasparenti"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4ff5ff]" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Holographic Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="hero-orb aspect-square">
              <div className="inner p-6 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5fd4] animate-pulse" />
                    <span className="text-[10px] font-mono-tech tracking-widest text-white/80">LIVE.SYNC</span>
                  </div>
                  <span className="text-[9px] font-mono-tech tracking-widest text-[#4ff5ff]">v3.0</span>
                </div>

                <div className="relative flex-1 flex items-center justify-center py-8">
                  <div className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-[#4ff5ff]/30 via-[#b26bff]/30 to-[#ff5fd4]/30 blur-3xl" />
                  <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[#4ff5ff] via-[#b26bff] to-[#ff5fd4] flex items-center justify-center shadow-[0_0_80px_-10px_rgba(178,107,255,0.9)] animate-pulse">
                    <Sparkles className="w-14 h-14 text-[#05030d]" strokeWidth={2} />
                  </div>
                </div>

                <div className="holo-panel !rounded-2xl p-4 flex items-center gap-3">
                  <span className="sheen" />
                  <div className="icon-holo !w-10 !h-10">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-tech tracking-widest holo-text font-bold">
                      AI GENERATIVE ENGINE
                    </div>
                    <p className="text-[11px] text-[#f2ecff]/70">Prototipi istantanei, rifiniti a mano.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="section py-8 border-y border-[rgba(180,160,255,0.14)] bg-[#05030d]/60 backdrop-blur-sm" data-testid="marquee-section">
        <div className="marquee">
          <div className="marquee-inner">
            {[...marqueeTags, ...marqueeTags].map((t, i) => (
              <span key={i} className="font-mono-tech text-sm tracking-[0.25em] font-bold">
                <span className={i % 3 === 0 ? "holo-text" : "text-[#f2ecff]/60"}>{t}</span>
                <span className="text-[#4ff5ff]/40 ml-10">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section py-28" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16 space-y-4">
            <span className="holo-tag purple">// APPROCCIO</span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Innovazione, <span className="holo-text">performance</span><br />e cura artigianale.
            </h2>
            <p className="text-[#f2ecff]/70 text-base leading-relaxed">
              Soluzioni digitali d'avanguardia che uniscono estetica iridescente, usabilità e algoritmi intelligenti per scalare la tua attività.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="holo-panel p-8 group"
                data-testid={`feature-card-${index}`}
              >
                <span className="sheen" />
                <div className="icon-holo mb-6">{feat.icon}</div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-sm text-[#f2ecff]/70 leading-relaxed mb-6">{feat.description}</p>
                <span className={`holo-tag ${feat.accent === "pink" ? "pink" : feat.accent === "purple" ? "purple" : ""}`}>
                  {feat.tag}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section py-28" data-testid="portfolio-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-14">
            <div className="max-w-xl space-y-4">
              <span className="holo-tag">// FEATURED WORK</span>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                Progetti <span className="holo-text">iridescenti</span>
              </h2>
              <p className="text-[#f2ecff]/70">
                Uno sguardo ai progetti realizzati combinando design artigianale e flussi AI.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("proposte")}
              className="btn-ghost group"
              data-testid="view-services-btn"
            >
              Vedi servizi
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((proj, index) => {
              const Component: any = proj.link ? motion.a : motion.div;
              const extra = proj.link ? { href: proj.link, target: "_blank", rel: "noopener noreferrer" } : {};
              return (
                <Component
                  key={proj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="holo-panel group cursor-pointer block !rounded-3xl"
                  data-testid={`project-card-${index}`}
                  {...extra}
                >
                  <span className="sheen" />
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05030d]/95 via-[#05030d]/20 to-transparent" />
                    <div className="absolute top-5 left-5">
                      <span className="holo-tag">{proj.category}</span>
                    </div>
                  </div>
                  <div className="p-8 space-y-3">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:holo-text transition-all">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-[#f2ecff]/70 leading-relaxed">{proj.desc}</p>
                    <div className="pt-3 text-[11px] font-mono-tech text-[#4ff5ff] font-bold tracking-widest uppercase group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      {proj.link ? "Visita il sito" : "Case study"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Component>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section py-28" data-testid="testimonial-section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="holo-panel !rounded-3xl p-12 text-center">
            <span className="sheen" />
            <div className="icon-holo mx-auto mb-8">
              <Code2 className="w-5 h-5" />
            </div>
            <blockquote className="font-display text-2xl sm:text-3xl italic text-white leading-relaxed">
              "Lavorare con Teresa è stato fantastico. Essendo l'unico interlocutore, le decisioni si prendono all'istante, la sua consulenza SEO ha fatto <span className="holo-text not-italic">decollare le nostre vendite</span> e il sito è stato consegnato in sole due settimane."
            </blockquote>
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#b26bff]/50 shadow-[0_0_30px_-6px_rgba(178,107,255,0.6)]">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                  alt="Alessandro Bianchi"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="font-bold text-white text-base">Alessandro Bianchi</p>
              <p className="text-[10px] holo-text font-mono-tech tracking-widest uppercase font-bold">
                CEO · Innova Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-28" data-testid="cta-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="holo-panel !rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <span className="sheen" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#b26bff]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative space-y-6">
              <span className="holo-tag purple">// INIZIA ORA</span>
              <h2 className="font-display text-4xl sm:text-6xl font-bold text-white tracking-tight leading-tight">
                Il tuo business<br />merita di <span className="holo-text">dominare</span>.
              </h2>
              <p className="text-[#f2ecff]/75 text-base leading-relaxed max-w-xl mx-auto">
                Trasformiamo la tua visione in realtà digitale oggi, con un design d'impatto e testi che convertono. Parla direttamente con me.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button onClick={() => setCurrentTab("contatti")} className="btn-holo" data-testid="cta-contact-btn">
                  Parliamo del progetto
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={() => setCurrentTab("chat")} className="btn-ghost" data-testid="cta-chat-btn">
                  Chatta con l'AI
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
