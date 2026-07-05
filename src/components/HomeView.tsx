import { motion } from "motion/react";
import { Brain, Cpu, Zap, ArrowRight, Heart, CheckCircle2 } from "lucide-react";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function HomeView({ setCurrentTab }: HomeViewProps) {
  const features = [
    {
      icon: <Brain className="w-5 h-5 text-[#E35930]" />,
      title: "Sviluppo Web AI",
      description:
        "Siti web veloci, dinamici e leggeri. Utilizzo l'Intelligenza Artificiale per velocizzare la scrittura del codice e ottimizzare i flussi logici, garantendo un rilascio rapidissimo.",
      tags: ["INTELLIGENZA ARTIFICIALE", "FAST-DEV"],
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#E35930]" />,
      title: "UI/UX Design Moderno",
      description:
        "Interfacce utente progettate con precisione millimetrica. Layout fluidi e moderni orientati all'utente finale per massimizzare il coinvolgimento visivo su mobile e desktop.",
      tags: ["TECH-FORWARD", "USER-CENTRIC"],
    },
    {
      icon: <Zap className="w-5 h-5 text-[#E35930]" />,
      title: "Ottimizzazione Conversioni",
      description:
        "Ottimizzazione automatica basata sui dati reali. Scrittura di testi ottimizzati per motori di ricerca (SEO) e conversioni per trasformare ogni visitatore in cliente.",
      tags: ["SEO PREVENTIVA", "CONVERSIONS"],
    },
  ];

  const projects = [
    {
      title: "Amala Pizza",
      category: "Sito Multipagina & Logo Redesign",
      desc: "Riprogettazione dell'identità visiva, nuovo logo design e sviluppo di un sito web multipagina completo ospitato su Hostinger. Un classico pacchetto completo \"chiavi in mano\" per valorizzare un brand di ristorazione d'eccellenza.",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
      link: "https://amalapizza.it/",
    },
    {
      title: "Nexa AI Hub",
      category: "Brand Identity & Platform Design",
      desc: "Interfaccia di controllo bento-grid per l'analisi dati e la gestione dei flussi cloud di Nexa. Palette modernissima e grafica interamente vettoriale.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="w-full bg-[#111113] text-[#F8F7F4]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden border-b border-[rgba(248,247,244,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block mb-2">
              [ M. TERESA ROGANI — STUDIO ]
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-[#F8F7F4] leading-[0.95] tracking-tight">
              Siti Web Evoluti con{" "}
              <span className="italic block mt-1 font-normal text-[#E35930] font-display">
                l'Intelligenza Artificiale
              </span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#F8F7F4]/80 max-w-xl leading-relaxed">
              Progetto e sviluppo esperienze digitali moderne, performanti e su misura per far crescere il tuo brand velocemente, eliminando i costi di agenzia e ottimizzando la SEO semantica.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="editorial-button-primary flex items-center gap-2 cursor-pointer"
              >
                Lavoriamo Insieme
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentTab("chi-sono")}
                className="editorial-button-secondary cursor-pointer"
              >
                Scopri il mio metodo
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-[rgba(248,247,244,0.1)] text-[9px] uppercase tracking-widest font-mono text-[#F8F7F4]/50 max-w-lg">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E35930]" />
                <span>100% DIRETTO</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E35930]" />
                <span>VELOCITÀ IA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E35930]" />
                <span>PREZZI TRASPARENTI</span>
              </div>
            </div>
          </motion.div>

          {/* Right illustration / image representation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-square bg-[#151518] p-4 overflow-hidden border border-[rgba(248,247,244,0.1)]">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
                alt="Modern workspace showing digital wireframe of an AI application"
                className="w-full h-full object-cover grayscale contrast-125 opacity-90"
                referrerPolicy="no-referrer"
              />
              {/* Overlapping interactive overlay simulating AI design element */}
              <div className="absolute bottom-8 left-8 right-8 bg-[#111113] p-4 border border-[rgba(248,247,244,0.15)] flex items-center gap-3">
                <div className="w-9 h-9 border border-[#E35930]/30 flex items-center justify-center text-[#E35930]">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-[#E35930] font-mono tracking-widest uppercase">
                    AI Generative Design
                  </h4>
                  <p className="text-[10px] text-[#F8F7F4]/60 font-sans">
                    Prototypes created instantly &amp; refined manually.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services / Focus Grid */}
      <section className="py-24 bg-[#151518] border-b border-[rgba(248,247,244,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              [ APPROCCIO E FILOSOFIA ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F7F4]">
              Innovazione e Performance
            </h2>
            <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm">
              Soluzioni digitali d'avanguardia che uniscono estetica moderna, usabilità e algoritmi intelligenti per scalare la tua attività.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-[rgba(248,247,244,0.1)] bg-[#111113] transition-all duration-300 group hover:border-[#E35930]/40"
              >
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.15)] flex items-center justify-center mb-6 group-hover:bg-[#E35930] group-hover:text-[#111113] transition-all">
                  {feat.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-[#F8F7F4] mb-3">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed mb-6 font-sans">
                  {feat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-[rgba(248,247,244,0.1)] text-[#E35930] text-[9px] font-bold tracking-widest font-mono bg-transparent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Progetti Evoluti */}
      <section className="py-24 bg-[#111113]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
                [ FEATURED WORK ]
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F7F4]">
                Progetti Evoluti
              </h2>
              <p className="text-[#F8F7F4]/70 text-xs sm:text-sm">
                Uno sguardo ad alcuni progetti realizzati combinando cura artigianale del design e flussi di ottimizzazione guidati dall'IA.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("proposte")}
              className="text-[#E35930] hover:text-[#F8F7F4] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all group cursor-pointer"
            >
              Vedi i miei servizi
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((proj, index) => {
              const CardComponent = proj.link ? motion.a : motion.div;
              const extraProps = proj.link
                ? { href: proj.link, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <CardComponent
                  key={proj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer bg-[#111113] border border-[rgba(248,247,244,0.1)] hover:border-[#E35930]/40 transition-all block"
                  {...extraProps}
                >
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#151518] border-b border-[rgba(248,247,244,0.1)]">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#E35930] text-[#111113] px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                      {proj.category}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="font-display text-xl font-bold text-[#F8F7F4] group-hover:text-[#E35930] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#F8F7F4]/70 leading-relaxed font-sans">
                      {proj.desc}
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-[#E35930] font-bold tracking-widest uppercase border-b border-[#E35930]/20 pb-0.5 group-hover:border-[#E35930] transition-colors">
                        {proj.link ? "Visita il Sito Web →" : "Dettagli Case Study →"}
                      </span>
                    </div>
                  </div>
                </CardComponent>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-[#151518] border-y border-[rgba(248,247,244,0.1)] relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10 space-y-8">
          <div className="inline-flex p-3 border border-[#E35930]/30 text-[#E35930]">
            <Heart className="w-5 h-5" />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-medium italic tracking-tight text-[#F8F7F4] leading-relaxed">
            "Lavorare con Teresa Rogani è stato fantastico. Essendo l'unico interlocutore, le decisioni vengono prese all'istante, la sua consulenza sulla SEO IA ha fatto decollare le nostre vendite e il sito è stato consegnato in sole due settimane."
          </h2>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 border border-[#E35930]/30 overflow-hidden bg-[#111113]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
                alt="Alessandro Bianchi client headshot"
                className="w-full h-full object-cover grayscale contrast-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="font-bold text-[#F8F7F4] text-base">Alessandro Bianchi</p>
            <p className="text-[9px] text-[#E35930] font-mono tracking-widest uppercase font-bold">
              CEO, Innova Solutions
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="py-24 px-6 md:px-12 bg-[#111113]">
        <div className="max-w-7xl mx-auto bg-[#151518] text-[#F8F7F4] p-12 md:p-20 relative overflow-hidden border border-[rgba(248,247,244,0.1)]">
          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              [ INIZIA ORA ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F7F4]">
              Il tuo business merita di dominare.
            </h2>
            <p className="text-[#F8F7F4]/80 font-sans text-xs sm:text-sm leading-relaxed">
              Trasformiamo la tua visione in realtà digitale oggi, con un design d'impatto e testi scritti per convertire i tuoi contatti. Parla direttamente con me.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="px-8 py-4 bg-[#E35930] text-[#111113] font-bold text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-[#E35930] hover:border-[#E35930] transition-all cursor-pointer border border-[#E35930]"
              >
                Parliamo del tuo progetto
              </button>
              <button
                onClick={() => setCurrentTab("chat")}
                className="px-8 py-4 bg-transparent hover:bg-[rgba(248,247,244,0.05)] border border-[rgba(248,247,244,0.2)] text-[#F8F7F4] font-bold text-[10px] tracking-widest uppercase transition-all cursor-pointer"
              >
                Chatta con l'AI Assistant
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
