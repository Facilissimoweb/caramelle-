import React, { useState } from "react";
import { CreditCard, Link, ShieldCheck, HelpCircle, Code, Sparkles, CheckCircle, ChevronRight } from "lucide-react";

interface StripePaymentsDemoProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function StripePaymentsDemo({ lang, isFacilitated }: StripePaymentsDemoProps) {
  const [activeTab, setActiveTab] = useState<"link" | "api">("link");
  const [stripeLinkInput, setStripeLinkInput] = useState("https://buy.stripe.com/mock_link_facilissimoweb");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationStep, setSimulationStep] = useState<"input" | "checkout" | "success">("input");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("123");
  const [cardName, setCardName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleStartSimulation = () => {
    setIsSimulating(true);
    setSimulationStep("checkout");
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSimulationStep("success");
    }, 1500);
  };

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimulationStep("input");
    setEmailInput("");
    setCardName("");
  };

  return (
    <div className="w-full bg-[#FAF9F6] border-y border-[#111113]/10 py-16 px-6 md:px-12 font-sans" id="stripe-payment-integration-guide">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left column: Explanations and Guides */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block">
              {lang === "it" ? "[ GUIDA INTEGRAZIONE PAGAMENTI ]" : "[ PAYMENT INTEGRATION GUIDE ]"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111113] tracking-tight">
              {lang === "it" ? "Come Accettare Pagamenti Online sul tuo Sito" : "How to Accept Online Payments on Your Website"}
            </h2>
            <p className="text-xs sm:text-sm text-[#111113]/70 leading-relaxed">
              {lang === "it"
                ? "Sì! La risposta breve è: puoi assolutamente utilizzare una 'stringa' (chiamata Stripe Payment Link) senza scrivere codice. Ma analizziamo insieme i due approcci principali per integrare i pagamenti online con Stripe."
                : "Yes! The short answer is: you can absolutely use a 'string' (known as a Stripe Payment Link) without writing any backend code. Let's compare the two main integration models."}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex border-b border-[#111113]/10">
            <button
              onClick={() => setActiveTab("link")}
              className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 px-4 transition-all cursor-pointer ${
                activeTab === "link"
                  ? "border-[#E35930] text-[#E35930]"
                  : "border-transparent text-[#111113]/40 hover:text-[#111113]/70"
              }`}
            >
              {lang === "it" ? "Metodo 1: Stripe Payment Link" : "Method 1: Stripe Payment Link"}
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`pb-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 px-4 transition-all cursor-pointer ${
                activeTab === "api"
                  ? "border-[#E35930] text-[#E35930]"
                  : "border-transparent text-[#111113]/40 hover:text-[#111113]/70"
              }`}
            >
              {lang === "it" ? "Metodo 2: Stripe API / Custom" : "Method 2: Stripe API / Custom"}
            </button>
          </div>

          {activeTab === "link" ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-[#F8F7F4] border border-[#E35930]/30 rounded-none space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E35930] uppercase">
                  <Link className="w-4 h-4" />
                  <span>{lang === "it" ? "La famosa 'Stringa di Stripe'" : "The 'Stripe Link String' approach"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#111113]/85 leading-relaxed">
                  {lang === "it"
                    ? "È il metodo più semplice, consigliato per Landing Page, liberi professionisti e proposte di consulenza. Accedi al tuo pannello Stripe, crei un prodotto, e Stripe genera una URL (es. https://buy.stripe.com/123). Non richiede server nè scrittura di codice."
                    : "The easiest method, recommended for Landing Pages, freelancers, and consultation deposits. You log into your Stripe Dashboard, create a product, and Stripe gives you a simple URL string. No backend programming is needed."}
                </p>
              </div>

              <div className="space-y-3 font-sans text-xs text-[#111113]/75 leading-relaxed">
                <h4 className="font-mono text-xs font-bold text-[#111113] uppercase tracking-wide">
                  {lang === "it" ? "Come si implementa sul sito:" : "How to place it on the site:"}
                </h4>
                <ol className="list-decimal list-inside space-y-2.5">
                  <li>
                    <strong>{lang === "it" ? "Creazione:" : "Creation:"}</strong>{" "}
                    {lang === "it"
                      ? "Crea un link in 1 minuto su Stripe con il prezzo fisso (es. Acconto di 500€)."
                      : "Generate a custom checkout link in 1 minute inside your Stripe Dashboard."}
                  </li>
                  <li>
                    <strong>{lang === "it" ? "Collegamento:" : "Binding:"}</strong>{" "}
                    {lang === "it"
                      ? "Incolliamo il link sul pulsante 'Acquista Ora' o 'Prenota' del tuo sito."
                      : "We bind that link directly to a call-to-action button on your web pages."}
                  </li>
                  <li>
                    <strong>{lang === "it" ? "Pagamento:" : "Payment:"}</strong>{" "}
                    {lang === "it"
                      ? "Al clic, il cliente viene indirizzato sulla pagina di pagamento Stripe, che supporta Carte, Apple Pay e Google Pay. A transazione avvenuta, torna sul tuo sito su una pagina di ringraziamento dedicata."
                      : "When clicked, the customer is securely redirected to Stripe checkout. Upon success, they are seamlessly returned to your thank-you page."}
                  </li>
                </ol>
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 bg-[#F8F7F4] border border-[#111113]/10 rounded-none space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E35930] uppercase">
                  <Code className="w-4 h-4" />
                  <span>{lang === "it" ? "Integrazione API Completa" : "Full API/Elements Checkout"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#111113]/85 leading-relaxed">
                  {lang === "it"
                    ? "Ideale per e-commerce avanzati e software personalizzati (SaaS). Il modulo di pagamento è incorporato direttamente nella pagina del tuo sito, senza reindirizzare l'utente. Richiede l'attivazione di un server backend sicuro."
                    : "Ideal for full e-commerce platforms and custom software suites. The payment input is embedded directly on your own page without redirections. This requires hosting a secure server-side API."}
                </p>
              </div>

              <div className="space-y-3 font-sans text-xs text-[#111113]/75 leading-relaxed">
                <h4 className="font-mono text-xs font-bold text-[#111113] uppercase tracking-wide">
                  {lang === "it" ? "Cosa implemento per te nel piano Enterprise:" : "What I implement for you in the Enterprise plan:"}
                </h4>
                <ul className="list-disc list-inside space-y-2.5">
                  <li>
                    <strong>{lang === "it" ? "Interfaccia Integrata:" : "Embedded Fields:"}</strong>{" "}
                    {lang === "it"
                      ? "Utilizzo Stripe Elements per mostrare i campi carta sicuri direttamente nel carrello."
                      : "Using Stripe Elements to show fields cleanly and securely directly within your checkout cart."}
                  </li>
                  <li>
                    <strong>{lang === "it" ? "Integrazione API Server:" : "Server-side API:"}</strong>{" "}
                    {lang === "it"
                      ? "Configuro una rotta server API sicura (es. /api/create-payment-intent) per comunicare con Stripe in modo criptato."
                      : "Configuring a secure server route to securely process and initialize Stripe payment intents."}
                  </li>
                  <li>
                    <strong>{lang === "it" ? "Webhooks Dinamici:" : "Dynamic Webhooks:"}</strong>{" "}
                    {lang === "it"
                      ? "Collego un sistema automatico che aggiorna il tuo database o invia la ricevuta via e-mail non appena Stripe conferma la transazione."
                      : "Setting up webhooks to automatically update your inventory or DB upon payment confirmation."}
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Trust points */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-[#111113]/10">
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#111113]/55">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
              <span>PCI-DSS Compliant</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#111113]/55">
              <CreditCard className="w-3.5 h-3.5 text-[#E35930]" />
              <span>Carte, Apple Pay, Google Pay</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Sandbox Simulator */}
        <div className="lg:col-span-5 bg-[#F8F7F4] border border-[#111113]/10 p-6 relative flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#E35930] uppercase">
                {lang === "it" ? "LIVE SIMULATOR" : "LIVE SIMULATOR"}
              </span>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-green-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                <span>Sandbox Active</span>
              </div>
            </div>

            {simulationStep === "input" && (
              <div className="space-y-4 py-4 animate-fadeIn">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wide text-[#111113]/60 block">
                    {lang === "it" ? "1. La tua Stringa / Link Stripe:" : "1. Your Stripe Link / String:"}
                  </label>
                  <input
                    type="text"
                    value={stripeLinkInput}
                    onChange={(e) => setStripeLinkInput(e.target.value)}
                    className="w-full bg-[#FAF9F6] border border-[#111113]/15 text-xs font-mono text-[#111113]/85 px-3 py-2.5 focus:border-[#E35930] outline-none transition-colors"
                  />
                  <p className="text-[10px] text-[#111113]/40 font-mono italic">
                    {lang === "it"
                      ? "Puoi inserire un link simulato o reale."
                      : "Try editing this with any simulated URL."}
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F6] border border-[#111113]/10 space-y-3">
                  <span className="text-[9px] font-mono font-bold text-[#E35930] uppercase block tracking-wider">
                    {lang === "it" ? "Anteprima Pulsante nel tuo Sito" : "Button Preview on Your Site"}
                  </span>
                  
                  {/* Styled simulated payment button */}
                  <button
                    onClick={handleStartSimulation}
                    className="w-full py-3 bg-[#E35930] text-[#FAF9F6] font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-[#E35930] hover:border-[#E35930] transition-all duration-300 border border-[#E35930] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>{lang === "it" ? "Paga con Stripe" : "Pay with Stripe"}</span>
                  </button>
                  
                  <p className="text-[9px] text-center text-[#111113]/40 font-mono uppercase">
                    {lang === "it" ? "Clicca sopra per simulare il checkout!" : "Click above to simulate Stripe checkout!"}
                  </p>
                </div>
              </div>
            )}

            {simulationStep === "checkout" && (
              <div className="space-y-4 py-2 animate-fadeIn font-sans text-xs">
                <div className="border-b border-[#111113]/10 pb-3 flex items-center justify-between">
                  <span className="font-bold text-[#111113]">Stripe Checkout</span>
                  <span className="text-[10px] font-mono text-[#111113]/60">Facilissimo Web</span>
                </div>
                
                <form onSubmit={handleProcessPayment} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#111113]/60 block">{lang === "it" ? "Indirizzo Email" : "Email Address"}</label>
                    <input
                      type="email"
                      required
                      placeholder="mario.rossi@example.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#111113]/15 text-xs px-3 py-2 outline-none focus:border-[#E35930]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#111113]/60 block">{lang === "it" ? "Informazioni Carta" : "Card Information"}</label>
                    <div className="bg-[#FAF9F6] border border-[#111113]/15 px-3 py-2 flex justify-between items-center text-xs font-mono">
                      <span className="text-[#111113]/80">{cardNumber}</span>
                      <span className="text-[#111113]/50">{cardExpiry}</span>
                      <span className="text-[#111113]/50">{cardCvc}</span>
                    </div>
                    <p className="text-[9px] text-[#E35930]/80 font-mono">
                      {lang === "it" ? "Simulatore: carta di prova precompilata." : "Simulator mode: prefilled test card."}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-[#111113]/60 block">{lang === "it" ? "Nome sulla Carta" : "Name on Card"}</label>
                    <input
                      type="text"
                      required
                      placeholder="Mario Rossi"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-[#FAF9F6] border border-[#111113]/15 text-xs px-3 py-2 outline-none focus:border-[#E35930]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-3 bg-[#E35930] text-[#FAF9F6] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer border border-[#E35930] hover:bg-transparent hover:text-[#E35930] disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-3.5 h-3.5 border-2 border-[#FAF9F6] border-t-transparent rounded-full animate-spin" />
                        <span>{lang === "it" ? "Elaborazione..." : "Processing..."}</span>
                      </span>
                    ) : (
                      <span>{lang === "it" ? "Paga €450,00" : "Pay €450.00"}</span>
                    )}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={resetSimulation}
                  className="w-full text-center text-[10px] font-mono uppercase text-[#111113]/40 hover:text-[#E35930] transition-colors mt-2"
                >
                  {lang === "it" ? "Annulla e Torna Indietro" : "Cancel and Go Back"}
                </button>
              </div>
            )}

            {simulationStep === "success" && (
              <div className="py-8 text-center space-y-4 animate-fadeIn">
                <div className="w-12 h-12 bg-green-500/10 border border-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="font-display font-bold text-lg text-green-600">
                  {lang === "it" ? "Pagamento Riuscito!" : "Payment Successful!"}
                </h4>
                <div className="space-y-1.5 text-xs text-[#111113]/75 font-sans max-w-xs mx-auto">
                  <p>
                    {lang === "it"
                      ? "Hai visto? Questo è esattamente ciò che accade quando un cliente clicca sul tuo link."
                      : "See? This is exactly what happens when your client clicks on your checkout link."}
                  </p>
                  <p className="text-[10px] font-mono text-[#111113]/70 bg-[#FAF9F6] p-2.5">
                    <strong>{lang === "it" ? "Mail cliente:" : "Client email:"}</strong> {emailInput || "mario@example.com"} <br/>
                    <strong>{lang === "it" ? "Intestatario:" : "Card Holder:"}</strong> {cardName || "Mario Rossi"}
                  </p>
                </div>
                
                <button
                  onClick={resetSimulation}
                  className="px-6 py-2.5 bg-transparent text-[#E35930] border border-[#E35930]/30 hover:border-[#E35930] text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer"
                >
                  {lang === "it" ? "Ripeti Simulazione" : "Run Again"}
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#111113]/10 text-[9px] font-mono text-[#111113]/45 uppercase tracking-widest text-center leading-relaxed">
            {lang === "it"
              ? "Sicurezza e crittografia garantiti al 100% dal gateway certificato Stripe."
              : "100% Secured and encrypted payments powered by Stripe gateway."}
          </div>
        </div>

      </div>
    </div>
  );
}
