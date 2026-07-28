import { motion } from "motion/react";
import { ArrowRight, BookOpen, Compass, Award, Palette, Layers, Cpu, Film, UserCheck } from "lucide-react";

const logoImage = "/f (1600 x 500 px).webp";

interface AboutViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function AboutView({ setCurrentTab, lang, isFacilitated }: AboutViewProps) {
  const formationSteps = [
    {
      num: "01",
      title: "Grammatica Visiva e Metodo Progettuale",
      subtitle: "Diploma in Tecnico Grafico Pubblicitario",
      icon: <Palette className="w-5 h-5 text-black" />,
      desc: "Il mio percorso parte dai principi fondamentali del design sistemico e della comunicazione visiva. La formazione tecnica mi ha fornito competenze consolidate in tipografia, teoria della percezione (Gestalt), griglie compositive e gerarchia dell'informazione. Una solida struttura di base che guida tuttora la mia metodologia progettuale nella realizzazione di layout essenziali, performanti ed ergonomici.",
    },
    {
      num: "02",
      title: "Sintassi Narrativa e Semiotica dell'Immagine",
      subtitle: "Laurea in Tecniche della Comunicazione Visiva — Accademia di Belle Arti di Macerata",
      icon: <Film className="w-5 h-5 text-black" />,
      desc: "L'approfondimento universitario ha spostato il focus sulla dimensione semiotica e narrativa dei linguaggi visivi. La laurea, completata con una tesi in Storia del Cinema, mi ha permesso di analizzare la sintassi dell'immagine in movimento, la teoria del colore, il ritmo sequenziale e la costruzione dell'inquadratura. Trasferisco questa sensibilità nel web design per strutturare percorsi di navigazione coerenti, ingaggianti e dotati di un forte impianto narrativo.",
    },
    {
      num: "03",
      title: "Logica Concettuale e Analisi del Linguaggio",
      subtitle: "Percorso Universitario in Filosofia Classica — Università di Macerata (Incompiuto)",
      icon: <BookOpen className="w-5 h-5 text-black" />,
      desc: "L'interesse per l'origine del linguaggio e la struttura del pensiero mi ha spinta ad affrontare una parentesi di studi filosofici. Anche se ho poi interrotto il corso di laurea, il superamento di diversi esami di logica e filosofia ha affinato la mia capacità analitica, il rigore concettuale e la sintesi. In ambito lavorativo, questo background si traduce nell'ascolto analitico dei bisogni del committente e in un'architettura dell'informazione limpida e priva di ridondanze.",
    },
    {
      num: "04",
      title: "Spazialità e Materialità dell'Interfaccia",
      subtitle: "Esperienza Formativa in Scultura Contemporanea — Accademia di Belle Arti (Non conclusa)",
      icon: <Layers className="w-5 h-5 text-black" />,
      desc: "Il periodo di ricerca artistica all'interno del corso di Scultura Contemporanea, al fianco di figure come Franko B, pur non essendosi concluso con il diploma specialistico, è stato un importante banco di prova concettuale. Mi ha lasciato una forte consapevolezza del corpo, dello spazio e dell'interazione, guidandomi oggi a progettare le interfacce web non come meri elementi grafici bidimensionali, ma come veri e propri spazi di esperienza e presenza per l'utente.",
    },
  ];

  const valuesGuida = [
    {
      num: "1",
      title: "Rigore Strutturale e Sintassi Visiva",
      icon: <Award className="w-5 h-5 text-black" />,
      desc: "Il design parte dal metodo. Dalla tipografia alla griglia compositiva, fino alla teoria della percezione, ogni elemento della pagina risponde a precise regole di gerarchia ed ergonomia visiva. La pulizia di un layout è il risultato di un progetto studiato per eliminare il superfluo e valorizzare l'essenziale.",
    },
    {
      num: "2",
      title: "Architettura del Pensiero e Ascolto Analitico",
      icon: <Cpu className="w-5 h-5 text-black" />,
      desc: "Prima di disegnare, occorre comprendere. L'attitudine all'analisi e alla logica concettuale mi permette di decomporre le esigenze del committente, decodificare i messaggi e tradurli in un'architettura dell'informazione limpida e coerente. L'ascolto profondo è la prima fase di ogni processo progettuale.",
    },
    {
      num: "3",
      title: "Narrazione per Immagini (Sintesi Cinematografica)",
      icon: <Compass className="w-5 h-5 text-black" />,
      desc: "Ogni interfaccia racconta una storia. Attingendo alla grammatica del cinema e della semiotica visiva, la gestione del colore, del ritmo e dell'inquadratura guida l'utente all'interno dell'esperienza digitale in modo fluido, naturale ed emozionalmente ingaggiante.",
    },
    {
      num: "4",
      title: "Presenza e Dimensione Umana",
      icon: <UserCheck className="w-5 h-5 text-black" />,
      desc: "L'interfaccia non è un semplice schermo bidimensionale, ma uno spazio di relazione. Dalle esperienze artistiche e performative porto nel web la consapevolezza del corpo, della spazialità e della percezione: il digitale è progettato da un essere umano per altri esseri umani, mettendo sempre al centro l'esperienza reale dell'utente.",
    },
  ];

  return (
    <div className="w-full bg-[#F8F7F4] text-[#111113]">
      {/* Intro Hero Section */}
      <section className="py-20 md:py-24 relative border-b border-[#111113]/10 overflow-hidden">
        {/* Ambient Video Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              src="/facilissimo web (7).mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-15"
              autoPlay
              loop
              muted
              playsInline
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F4]/95 via-[#F8F7F4]/70 to-[#F8F7F4]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F4]/30 via-transparent to-[#F8F7F4]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="w-[140px] h-[140px] object-contain"
              />
            </div>
            <span className="text-[13px] uppercase tracking-[0em] text-black font-mono font-bold block mb-2" style={{ letterSpacing: '0px' }}>
              {lang === "it" ? "[ CHI C'È DIETRO FACILISSIMO WEB ]" : "[ WHO IS BEHIND FACILISSIMO WEB ]"}
            </span>
            
            <h1 className="font-tan text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111113] tracking-tight leading-normal break-words">
              M. Teresa Rogani
            </h1>
            <p className="font-mono text-xs text-black uppercase tracking-widest font-bold">
              Web Designer & Progettista di Interfacce Visive
            </p>

            <p className="text-sm sm:text-base text-[#111113]/80 leading-relaxed font-sans border-l-2 border-black pl-4 py-1 italic">
              "Progetto architetture visive ed esperienziali che uniscono la sintassi dell'immagine, il rigore analitico e la centralità della presenza umana."
            </p>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="solid-light flex items-center gap-2"
              >
                <span>{lang === "it" ? "Contattami ora" : "Contact me now"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="relative w-full aspect-[4/3] overflow-hidden border border-[#111113]/20 bg-[#FAF9F6] shadow-xl">
              <img
                src="/images/IO.jpg"
                alt="M. Teresa Rogani Freelance Web Designer"
                className="w-full h-full object-cover opacity-95 transition-all duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#F8F7F4]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-[#111113] space-y-1">
                <p className="font-display font-bold text-lg">M. Teresa Rogani</p>
                <p className="text-[10px] font-mono text-black uppercase tracking-widest font-bold">
                  Macerata (Marche), Italia
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1-4 Percorso Formativo e Metodo Progettuale */}
      <section className="py-20 md:py-24 bg-[#FAF9F6] border-b border-[#111113]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="inline-block bg-black py-2.5 px-5 text-xs font-mono tracking-[0em] text-white font-bold uppercase" style={{ letterSpacing: '0px' }}>
              [ PERCORSO FORMATIVO E METODO PROGETTUALE ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]">
              Dalla teoria della percezione all'architettura dell'interfaccia
            </h2>
            <p className="text-[#111113]/70 font-sans text-sm sm:text-base leading-relaxed">
              Un itinerario formativo multidisciplinare che intreccia comunicazione visiva, semiotica cinematografica, analisi filosofica e sensibilità spaziale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formationSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 bg-[#F8F7F4] border border-[#111113]/15 space-y-4 hover:border-black transition-all shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-black/10 pb-3">
                    <span className="font-mono text-2xl font-bold text-black">{step.num}.</span>
                    <div className="w-9 h-9 border border-black/20 flex items-center justify-center bg-white rounded-lg">
                      {step.icon}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-[#111113] leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs font-mono font-bold text-black/70 mt-1 uppercase tracking-wider">
                      {step.subtitle}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#111113]/80 leading-relaxed font-sans pt-2">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Statement Section */}
      <section className="py-20 md:py-24 bg-[#111113] text-[#FAF9F6] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8 relative z-10">
          <span className="inline-block bg-white text-black py-2 px-5 text-xs font-mono font-bold tracking-[0em] uppercase" style={{ letterSpacing: '0px' }}>
            [ VISION ]
          </span>

          <blockquote className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-snug tracking-tight">
            "Trasformare la complessità in chiarezza attraverso un design visivo rigoroso, consapevole e orientato all'esperienza."
          </blockquote>

          <div className="w-16 h-0.5 bg-white/30 mx-auto" />

          <p className="text-sm sm:text-base text-white/80 leading-relaxed font-sans max-w-3xl mx-auto">
            Credo in un web e in una comunicazione dove l'estetica non è mai un fine a se stesso, ma la conseguenza naturale di una struttura logica solida. Il mio obiettivo è progettare architetture visive ed esperienziali che uniscano la sintassi dell'immagine, il rigore analitico e la centralità della presenza umana, offrendo soluzioni digitali essenziali, performanti e capaci di raccontare un'identità senza ridondanze.
          </p>
        </div>
      </section>

      {/* Valori Guida */}
      <section className="py-20 md:py-24 bg-[#F8F7F4] border-t border-[#111113]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="inline-block bg-black py-2.5 px-5 text-xs font-mono tracking-[0em] text-white font-bold uppercase" style={{ letterSpacing: '0px' }}>
              [ VALORI GUIDA ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111113]">
              I quattro pilastri del mio approccio progettuale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuesGuida.map((val, idx) => (
              <motion.div
                key={val.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-[#FAF9F6] p-6 border border-[#111113]/15 space-y-4 hover:border-black transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-black border-b-2 border-black pb-0.5">
                      0{val.num}
                    </span>
                    <div className="w-8 h-8 border border-black/15 flex items-center justify-center bg-white rounded-md">
                      {val.icon}
                    </div>
                  </div>

                  <h3 className="font-display text-base font-bold text-[#111113]">
                    {val.title}
                  </h3>

                  <p className="text-xs text-[#111113]/80 leading-relaxed font-sans">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-[#FAF9F6] text-[#111113] text-center border-t border-[#111113]/10">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <span className="inline-block bg-black py-2.5 px-5 text-xs font-mono tracking-[0em] text-white font-bold uppercase" style={{ letterSpacing: '0px' }}>
            [ PROGETTIAMO INSIEME ]
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#111113]">
            Vuoi realizzare un progetto web chiaro, elegante e performante?
          </h2>
          <p className="text-[#111113]/80 font-sans text-xs sm:text-sm leading-relaxed">
            Parla direttamente con me. Analizzeremo i tuoi obiettivi e struttureremo un'architettura digitale su misura per la tua attività.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentTab("contatti")}
              className="solid-light text-center flex items-center justify-center mx-auto gap-2"
            >
              <span>{lang === "it" ? "Inizia la collaborazione" : "Start collaboration"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
