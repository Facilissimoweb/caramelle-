import { motion } from "motion/react";
import { ShieldCheck, Zap, Heart, Sparkles, Code, Pencil, ArrowRight } from "lucide-react";

interface AboutViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function AboutView({ setCurrentTab }: AboutViewProps) {
  const values = [
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Interlocutore Unico", desc: "Niente account manager o sviluppatori junior nascosti. Parli, discuti e definisci tutto direttamente con me." },
    { icon: <Zap className="w-5 h-5" />, title: "Zero Burocrazia", desc: "Le agenzie richiedono giorni. Qui decidiamo al mattino e vediamo la modifica live nel pomeriggio." },
    { icon: <Heart className="w-5 h-5" />, title: "Massimo Risparmio", desc: "Lavorando da sola non ho uffici imponenti da mantenere: tariffe fino a 3× più basse." },
  ];

  const skillCategories = [
    { icon: <Code className="w-5 h-5" />, title: "Sviluppo & Tools", skills: ["React / Vite", "Tailwind CSS", "HTML5 & CSS3", "Express Node.js", "Figma", "Cursor / AI IDEs"] },
    { icon: <Sparkles className="w-5 h-5" />, title: "AI Integration", skills: ["Gemini LLMs API", "OpenAI Advanced API", "Midjourney / SD", "Vector Search", "AI Copywriting"] },
    { icon: <Pencil className="w-5 h-5" />, title: "Marketing & Strategy", skills: ["SEO Predittiva", "Google Analytics", "Brand Identity", "CRO Optimization", "Copywriting Persuasivo"] },
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="section py-24" data-testid="about-hero">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <span className="holo-tag">// PROFILO</span>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none">
              M. Teresa <span className="holo-text italic">Rogani</span>
            </h1>
            <p className="font-mono-tech text-[11px] holo-text uppercase tracking-[0.25em] font-bold">
              Freelance Web Designer · AI-Powered Developer
            </p>
            <div className="space-y-4 text-[#f2ecff]/80 leading-relaxed">
              <p>
                Sono la fondatrice e <strong className="holo-text">unica titolare</strong> di Facilissimo Web. Ho creato questo studio per abbattere le barriere del web design tradizionale offrendo siti ultra-professionali, veloci e ottimizzati con AI di ultima generazione.
              </p>
              <p>
                A differenza delle agenzie dove il progetto passa di mano in mano, qui <strong className="holo-text">non c'è nessun team</strong>. Lavoro da sola: comunicazione diretta, trasparente ed estremamente veloce.
              </p>
            </div>
            <button onClick={() => setCurrentTab("contatti")} className="btn-holo" data-testid="about-cta-btn">
              Parliamo del tuo sito <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
          >
            <div className="hero-orb aspect-[4/5]">
              <div className="inner relative">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="M. Teresa Rogani workspace"
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05030d] via-[#05030d]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 holo-panel !rounded-2xl p-4">
                  <span className="sheen" />
                  <p className="font-display font-bold text-lg text-white">M. Teresa Rogani</p>
                  <p className="text-[10px] holo-text font-mono-tech uppercase tracking-widest font-bold mt-1">
                    Milano · Operatività Globale
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section py-24" data-testid="values-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="holo-tag purple">// VALORE AGGIUNTO</span>
            <h2 className="font-display text-4xl font-bold text-white">Il vantaggio del <span className="holo-text">Freelance unico</span></h2>
            <p className="text-[#f2ecff]/70">Perché una freelance qualificata batte un'agenzia elefantiaca — su ogni fronte.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="holo-panel p-8 space-y-4"
                data-testid={`value-card-${i}`}
              >
                <span className="sheen" />
                <div className="icon-holo">{val.icon}</div>
                <h3 className="font-display text-xl font-bold text-white">{val.title}</h3>
                <p className="text-sm text-[#f2ecff]/70 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section py-24" data-testid="skills-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-32"
          >
            <span className="holo-tag pink">// INTELLIGENZA ARTIGIANALE</span>
            <h2 className="font-display text-4xl font-bold text-white">
              Artigianato + <span className="holo-text">AI</span>
            </h2>
            <div className="space-y-4 text-[#f2ecff]/75 leading-relaxed">
              <p>
                L'Intelligenza Artificiale non sostituisce il lavoro umano: <strong className="holo-text">lo potenzia</strong> ed eleva a un livello superiore.
              </p>
              <p>
                Uso l'AI in ogni fase per eliminare i compiti ripetitivi. Questo mi permette di concentrarmi su <strong className="holo-text">strategia, estetica, UX e conversione</strong>.
              </p>
              <p>Un sito che costa la metà, viene consegnato in metà tempo, con qualità sbalorditiva.</p>
            </div>
          </motion.div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {skillCategories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="holo-panel p-6 space-y-4"
                data-testid={`skill-card-${i}`}
              >
                <span className="sheen" />
                <div className="icon-holo">{cat.icon}</div>
                <h4 className="font-display text-lg font-bold text-white">{cat.title}</h4>
                <ul className="space-y-2 text-sm text-[#f2ecff]/70 font-mono-tech">
                  {cat.skills.map((sk) => (
                    <li key={sk} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#4ff5ff] to-[#ff5fd4]" />
                      <span>{sk}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-24" data-testid="about-cta-section">
        <div className="max-w-4xl mx-auto px-6">
          <div className="holo-panel !rounded-3xl p-12 text-center">
            <span className="sheen" />
            <span className="holo-tag mb-4 inline-flex">// DIRETTO &amp; VELOCE</span>
            <h2 className="font-display text-4xl font-bold text-white mt-4">
              Pronto a lavorare <span className="holo-text">direttamente</span> con me?
            </h2>
            <p className="text-[#f2ecff]/75 mt-4 max-w-lg mx-auto">
              Elimina i passaggi burocratici e sviluppiamo il tuo nuovo sito in tempi record.
            </p>
            <button onClick={() => setCurrentTab("contatti")} className="btn-holo mt-8" data-testid="about-final-cta">
              Avvia la collaborazione <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
