import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Search, HelpCircle, Sparkles } from "lucide-react";
import faqData from "../data/faqData.json";

const logoImage = "/f (1600 x 500 px).webp";

interface FAQSectionProps {
  lang?: "it" | "en";
  className?: string;
  isDark?: boolean;
}

export default function FAQSection({
  lang = "it",
  className = "",
  isDark = false,
}: FAQSectionProps) {
  const currentData = faqData[lang] || faqData.it;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = currentData.categories;

  // Flatten or filter items based on category and search query
  const allItems = categories.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, categoryName: cat.name, categoryId: cat.id }))
  );

  const filteredItems = allItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.categoryId === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const bgColor = isDark ? "bg-[#111113]" : "bg-[#FAF9F6]";
  const textColor = isDark ? "text-[#F8F7F4]" : "text-[#111113]";
  const borderColor = isDark ? "border-white/10" : "border-[#111113]/15";
  const cardBg = isDark ? "bg-[#1a1a1e]" : "bg-[#F8F7F4]";

  return (
    <section className={`py-20 md:py-24 ${bgColor} ${textColor} border-t ${borderColor} ${className}`} id="faq-section">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="flex justify-center mb-2">
            <img
              src={logoImage}
              alt="Facilissimo Web Logo"
              className="w-24 h-24 object-contain"
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black text-white text-xs font-mono font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>[ FAQ & SUPPORTO ]</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {currentData.title}
          </h2>

          <p className="text-sm sm:text-base opacity-80 font-sans max-w-xl mx-auto leading-relaxed">
            {currentData.subtitle}
          </p>
        </div>

        {/* Controls: Search Bar & Category Filter Tabs */}
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "it" ? "Cerca tra le domande..." : "Search questions..."}
              className={`w-full pl-11 pr-4 py-3 text-xs sm:text-sm font-sans ${cardBg} border ${borderColor} focus:border-black focus:outline-none transition-all shadow-xs`}
              id="faq-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100 font-mono font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-black text-white border-black"
                  : `${cardBg} ${textColor} ${borderColor} hover:border-black`
              }`}
              id="faq-cat-all"
            >
              {lang === "it" ? "Tutte" : "All"} ({allItems.length})
            </button>

            {categories.map((cat) => {
              const count = cat.items.length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? "bg-black text-white border-black"
                      : `${cardBg} ${textColor} ${borderColor} hover:border-black`
                  }`}
                  id={`faq-cat-${cat.id}`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#111113]/20 p-8 space-y-3">
            <Sparkles className="w-8 h-8 text-amber-500 mx-auto" />
            <p className="font-display font-bold text-lg">
              {lang === "it"
                ? "Nessuna domanda trovata per la ricerca corrente."
                : "No questions found for your current query."}
            </p>
            <p className="text-xs opacity-70 font-sans">
              {lang === "it"
                ? "Prova a modificare la parola chiave o seleziona un'altra categoria."
                : "Try changing the keyword or select a different category."}
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-2 px-4 py-2 bg-black text-white text-xs font-mono uppercase font-bold"
            >
              {lang === "it" ? "Reimposta filtri" : "Reset filters"}
            </button>
          </div>
        ) : (
          <div className="space-y-4" id="faq-accordion-list">
            {filteredItems.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`border ${borderColor} ${cardBg} transition-all duration-300 shadow-xs hover:border-black`}
                  id={`faq-card-${item.id}`}
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 flex items-center justify-between text-left focus:outline-none cursor-pointer group"
                    aria-expanded={isOpen}
                    id={`faq-btn-${item.id}`}
                  >
                    <div className="space-y-1 pr-4">
                      <span className="inline-block text-[10px] font-mono font-bold text-amber-700 bg-amber-400/20 border border-amber-500/30 px-2 py-0.5 uppercase tracking-wider mb-1">
                        {item.categoryName}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg leading-snug group-hover:text-black transition-colors">
                        {item.q}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full border border-black/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-black text-white" : "bg-white text-black"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                        id={`faq-answer-${item.id}`}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-black/5 text-xs sm:text-sm leading-relaxed font-sans opacity-90">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
