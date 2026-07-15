import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";
const logoImage = "/f (1600 x 500 px) (1).svg";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  showIcon?: boolean;
  containerClassName?: string;
}

export default function FAQAccordion({
  items,
  title = "Domande Frequenti",
  subtitle = "Tutto quello che c'è da sapere sul processo creativo, la gestione del budget e la consegna dei lavori.",
  showIcon = true,
  containerClassName = "",
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-[#544848] text-[#F8F7F4]">
      <div className={`max-w-3xl mx-auto px-6 ${containerClassName}`}>
        {(title || subtitle || showIcon) && (
          <div className="text-center mb-16 space-y-4">
            <div className="flex justify-center mb-4">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="w-[150px] h-[150px] object-contain"
              />
            </div>
            {showIcon && <HelpCircle className="w-8 h-8 text-[#a3e635] mx-auto animate-pulse" id="faq-icon" />}
            {title && (
              <h2 className="font-display text-3xl font-bold text-[#F8F7F4]" id="faq-title">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-[#F8F7F4]/70 text-xs sm:text-sm font-sans max-w-lg mx-auto" id="faq-subtitle">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-2" id="faq-list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-[rgba(248,247,244,0.1)] bg-transparent transition-all duration-300"
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex justify-between items-center text-left focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <span className="font-display font-semibold text-sm sm:text-base text-[#F8F7F4] pr-4 group-hover:text-[#a3e635] transition-colors">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#a3e635] transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                      id={`faq-content-${index}`}
                    >
                      <div className="pb-6 pt-1 text-xs sm:text-sm text-[#F8F7F4]/75 leading-relaxed font-sans bg-transparent">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
