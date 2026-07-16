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
  isDark?: boolean;
}

export default function FAQAccordion({
  items,
  title = "Domande Frequenti",
  subtitle = "Tutto quello che c'è da sapere sul processo creativo, la gestione del budget e la consegna dei lavori.",
  showIcon = true,
  containerClassName = "",
  isDark = true,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const textColor = isDark ? "text-[#F8F7F4]" : "text-[#111113]";
  const subtitleColor = isDark ? "text-[#F8F7F4]/70" : "text-[#111113]/75";
  const answerColor = isDark ? "text-[#F8F7F4]/75" : "text-[#111113]/85";
  const accentColor = isDark ? "text-[#a3e635]" : "text-[#544848]";
  const borderColor = isDark ? "border-[rgba(248,247,244,0.1)]" : "border-[#111113]/10";
  const hoverText = isDark ? "group-hover:text-[#a3e635]" : "group-hover:text-[#544848]/85";

  return (
    <div className={`w-full bg-transparent ${textColor}`}>
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
            {showIcon && <HelpCircle className={`w-8 h-8 ${accentColor} mx-auto animate-pulse`} id="faq-icon" />}
            {title && (
              <h2 className="font-display text-3xl font-bold" id="faq-title">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`text-xs sm:text-sm font-sans max-w-lg mx-auto ${subtitleColor}`} id="faq-subtitle">
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
                className={`border-b ${borderColor} bg-transparent transition-all duration-300`}
                id={`faq-item-${index}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full py-6 flex justify-between items-center text-left focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <span className={`font-display font-semibold text-sm sm:text-base pr-4 ${hoverText} transition-colors`}>
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ${accentColor} transition-transform duration-300 shrink-0 ${
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
                      <div className={`pb-6 pt-1 text-xs sm:text-sm leading-relaxed font-sans bg-transparent ${answerColor}`}>
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
