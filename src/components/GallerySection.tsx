import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { safeStorage } from "../lib/safeStorage";
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Filter, 
  Maximize2, 
  FolderOpen, 
  AlertCircle, 
  CheckCircle2,
  Trash2,
  HelpCircle
} from "lucide-react";

const logoImage = "/f (1600 x 500 px) (1).svg";

interface GalleryItem {
  id: string;
  filename: string;
  title: string;
  category: string;
  fallbackUrl: string;
  description: string;
  dimensions: string;
}

interface GallerySectionProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function GallerySection({ lang, isFacilitated }: GallerySectionProps) {
  // 1. Initial gallery definition referencing the dynamic path /public/assets/images/
  const initialItems: GalleryItem[] = [
    {
      id: "pizza",
      filename: "ristorante-amala.jpg",
      title: lang === "it" ? "Amala Pizza Premium Web" : "Amala Pizza Premium Web",
      category: "Food",
      fallbackUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
      description: lang === "it" 
        ? "Riprogettazione dell'identità visiva e sviluppo di un sito web multipagina completo."
        : "Visual identity redesign and development of a complete multi-page business website.",
      dimensions: "1600x1000"
    },
    {
      id: "nexa",
      filename: "dashboard-nexa.jpg",
      title: "Nexa AI Hub",
      category: "Fintech",
      fallbackUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      description: lang === "it"
        ? "Interfaccia bento-grid reattiva per il monitoraggio e la gestione di flussi cloud di IA."
        : "Sleek bento-grid analytics control center for monitoring cloud AI pipelines.",
      dimensions: "1920x1080"
    },
    {
      id: "artisan",
      filename: "ecommerce-artisan.jpg",
      title: "Artisan Wood Lab",
      category: "E-Commerce",
      fallbackUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      description: lang === "it"
        ? "Piattaforma e-commerce ad alte prestazioni progettata per arredi di lusso artigianali."
        : "High-performance e-commerce architecture crafted for luxury artisan wooden furniture.",
      dimensions: "1400x900"
    },
    {
      id: "architetti",
      filename: "studio-architettura.jpg",
      title: "Spazio Architetti",
      category: "Portfolio",
      fallbackUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      description: lang === "it"
        ? "Portfolio ad alto impatto visivo con transizioni dinamiche per uno studio di design d'interni."
        : "Immersive high-impact visual portfolio with custom layouts for an interior design studio.",
      dimensions: "1600x1200"
    }
  ];

  // State to track load status for each item
  // "checking" | "loaded_local" | "failed_using_fallback"
  const [loadStatus, setLoadStatus] = useState<Record<string, "checking" | "loaded_local" | "failed_using_fallback">>({});
  
  // State for user uploaded mock images (stored in state as data URLs)
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = safeStorage.getItem("facilissimo_gallery_custom");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Filter and Lightbox States
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutti");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  
  // Drag and Drop State
  const [isDragging, setIsDragging] = useState<string | null>(null); // holds itemId
  const [dragOverGlobal, setDragOverGlobal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);

  // Save custom images to localStorage
  useEffect(() => {
    safeStorage.setItem("facilissimo_gallery_custom", JSON.stringify(customImages));
  }, [customImages]);

  // Categories
  const categories = ["Tutti", "Food", "Fintech", "E-Commerce", "Portfolio"];

  // Handle Image Load Success
  const handleLoadSuccess = (itemId: string) => {
    setLoadStatus(prev => ({
      ...prev,
      [itemId]: "loaded_local"
    }));
  };

  // Handle Image Load Error -> Fall back to Unsplash
  const handleLoadError = (itemId: string) => {
    setLoadStatus(prev => {
      // If we already resolved it as fallback or it's currently checking, set it to fallback
      if (prev[itemId] !== "failed_using_fallback") {
        return {
          ...prev,
          [itemId]: "failed_using_fallback"
        };
      }
      return prev;
    });
  };

  // Handle Custom File Upload (Drag and Drop / Click)
  const processUploadedFile = (file: File, itemId: string) => {
    if (!file.type.startsWith("image/")) {
      alert(lang === "it" ? "Per favore carica solo file immagine." : "Please upload image files only.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === "string") {
        setCustomImages(prev => ({
          ...prev,
          [itemId]: e.target!.result as string
        }));
        // Reset load status to loaded local since it's now present via custom upload
        setLoadStatus(prev => ({
          ...prev,
          [itemId]: "loaded_local"
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle File Input Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0], itemId);
    }
  };

  // Trigger File Input Click
  const triggerUpload = (itemId: string) => {
    setUploadTargetId(itemId);
    setTimeout(() => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }, 50);
  };

  // Clear Custom Uploaded Image
  const clearCustomImage = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomImages(prev => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
    setLoadStatus(prev => {
      const updated = { ...prev };
      delete updated[itemId]; // let it re-evaluate
      return updated;
    });
  };

  // Filtered Items
  const filteredItems = selectedCategory === "Tutti" 
    ? initialItems 
    : initialItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-24 bg-[#111113] border-b border-[rgba(248,247,244,0.1)] relative" id="galleria-dinamica">
      {/* Hidden file input for uploads */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*"
        onChange={(e) => uploadTargetId && handleFileChange(e, uploadTargetId)}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="max-w-xl space-y-3">
            <div className="mb-2">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            <span className="inline-block bg-black py-[12px] px-6 text-[12px] font-mono tracking-[0.3em] text-[#a3e635] font-bold uppercase">
              {lang === "it" ? "[ MEDIA MANAGER & ASSETS ]" : "[ MEDIA MANAGER & ASSETS ]"}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-[#F8F7F4]">
              {lang === "it" ? "Galleria Asset Dinamici" : "Dynamic Asset Gallery"}
            </h2>
            <p className="text-[#F8F7F4]/70 text-xs sm:text-sm font-sans leading-relaxed">
              {lang === "it" 
                ? "Gestione e monitoraggio delle risorse visive del sito. I file vengono cercati in '/public/assets/images/'. Se assenti, il sistema carica automaticamente un segnaposto ad alta definizione. Trascina un'immagine su una card per caricarla al volo nel browser."
                : "Manage and monitor the site's visual resources. The system searches for files in '/public/assets/images/'. If missing, it dynamically falls back to an HD placeholder. Drag and drop an image onto a card to test uploading."}
            </p>
          </div>

          {/* Categories / Filters */}
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 font-mono text-[9px] uppercase tracking-wider border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#a3e635] text-[#111113] border-[#a3e635] font-bold"
                    : "bg-transparent text-[#F8F7F4]/60 border-[rgba(248,247,244,0.1)] hover:text-[#F8F7F4] hover:border-[#F8F7F4]/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item) => {
            const isCustom = !!customImages[item.id];
            const imageSrc = isCustom 
              ? customImages[item.id] 
              : `/assets/images/${item.filename}`;

            const status = loadStatus[item.id] || "checking";

            return (
              <div
                key={item.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(item.id);
                }}
                onDragLeave={() => {
                  setIsDragging(null);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(null);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    processUploadedFile(e.dataTransfer.files[0], item.id);
                  }
                }}
                className={`group bg-[#151518] border transition-all duration-300 flex flex-col relative ${
                  isDragging === item.id 
                    ? "border-[#a3e635] scale-[0.99] bg-[#1a1a1e]" 
                    : "border-[rgba(248,247,244,0.1)] hover:border-[#a3e635]/40"
                }`}
                style={{ contentVisibility: "auto" }}
              >
                {/* Image Frame */}
                <div className="aspect-[16/10] overflow-hidden relative bg-[#0f0f11] border-b border-[rgba(248,247,244,0.08)]">
                  {/* Actual loaded image or fallback image */}
                  <img
                    src={imageSrc}
                    alt={item.title}
                    onLoad={() => handleLoadSuccess(item.id)}
                    onError={() => handleLoadError(item.id)}
                    className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:scale-[1.02] transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Drag and Drop Overly Hint */}
                  {isDragging === item.id && (
                    <div className="absolute inset-0 bg-[#111113]/90 flex flex-col items-center justify-center text-[#a3e635] z-20 animate-fade-in">
                      <Upload className="w-8 h-8 mb-2 animate-bounce" />
                      <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                        {lang === "it" ? "RILASCIA PER SOSTITUIRE" : "RELEASE TO REPLACE"}
                      </span>
                    </div>
                  )}

                  {/* Status Indicator Bar */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                    <span className="bg-[#111113]/80 backdrop-blur-md text-[#a3e635] px-2.5 py-1 text-[8px] font-mono tracking-widest uppercase font-bold border border-[#a3e635]/30">
                      {item.category}
                    </span>

                    {/* Status Badge */}
                    <div className="flex gap-2">
                      {isCustom ? (
                        <span className="bg-[#a3e635] text-[#111113] px-2 py-0.5 text-[8px] font-mono tracking-wider font-bold rounded-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {lang === "it" ? "CARICATO DA UTENTE" : "USER UPLOADED"}
                        </span>
                      ) : status === "loaded_local" ? (
                        <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[8px] font-mono tracking-wider font-bold rounded-sm flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {lang === "it" ? "FILE TROVATO" : "FILE DETECTED"}
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 text-[8px] font-mono tracking-wider font-bold rounded-sm flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {lang === "it" ? "SEGNAPOSTO ATTIVO" : "FALLBACK ACTIVE"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Quick Tools Overlay */}
                  <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    {isCustom && (
                      <button
                        onClick={(e) => clearCustomImage(item.id, e)}
                        title={lang === "it" ? "Ripristina originale" : "Restore original"}
                        className="p-1.5 bg-[#111113]/90 text-red-400 hover:text-red-300 border border-red-500/20 hover:bg-red-500/10 transition-colors rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => triggerUpload(item.id)}
                      title={lang === "it" ? "Carica foto personalizzata" : "Upload custom photo"}
                      className="p-1.5 bg-[#111113]/90 text-[#a3e635] hover:text-[#F8F7F4] border border-[#a3e635]/30 hover:bg-[#a3e635]/20 transition-colors rounded cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setLightboxItem(item)}
                      title={lang === "it" ? "Ingrandisci" : "Enlarge"}
                      className="p-1.5 bg-[#111113]/90 text-[#F8F7F4]/80 hover:text-[#F8F7F4] border border-[rgba(248,247,244,0.1)] hover:bg-[#151518] transition-colors rounded cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Info and Metadata Block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-base font-bold text-[#F8F7F4] group-hover:text-[#a3e635] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#F8F7F4]/60 leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>

                  {/* System file path / path representation */}
                  <div className="pt-3 border-t border-[rgba(248,247,244,0.06)] flex items-center justify-between font-mono text-[9px] text-[#F8F7F4]/40">
                    <div className="flex items-center gap-1">
                      <FolderOpen className="w-3.5 h-3.5 text-[#a3e635]/50" />
                      <span>{isCustom ? "localStorage://data" : `/assets/images/${item.filename}`}</span>
                    </div>
                    <div>{item.dimensions}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#111113]/95 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setLightboxItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#151518] border border-[rgba(248,247,244,0.15)] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-[#111113]/80 hover:bg-[#a3e635] text-[#F8F7F4] hover:text-[#111113] transition-colors border border-[rgba(248,247,244,0.1)] rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Lightbox image view */}
              <div className="flex-1 bg-[#0a0a0c] overflow-hidden flex items-center justify-center relative aspect-video sm:aspect-auto max-h-[60vh]">
                <img
                  src={customImages[lightboxItem.id] ? customImages[lightboxItem.id] : `/assets/images/${lightboxItem.filename}`}
                  alt={lightboxItem.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = lightboxItem.fallbackUrl;
                  }}
                  className="max-w-full max-h-full object-contain grayscale-[20%] contrast-110"
                />
              </div>

              {/* Detail Info Panel */}
              <div className="p-6 border-t border-[rgba(248,247,244,0.1)] bg-[#111113] space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#a3e635] font-bold tracking-widest uppercase">
                      {lightboxItem.category}
                    </span>
                    <h3 className="font-display text-xl font-bold text-[#F8F7F4]">{lightboxItem.title}</h3>
                  </div>
                  <div className="text-right sm:text-right text-left font-mono text-[10px] text-[#F8F7F4]/50 space-y-1">
                    <div>{lang === "it" ? "Risoluzione consigliata" : "Recommended resolution"}: {lightboxItem.dimensions}</div>
                    <div>{lang === "it" ? "Percorso asset" : "Asset path"}: <code className="bg-[#151518] px-1 py-0.5 text-[#a3e635]/80">/public/assets/images/{lightboxItem.filename}</code></div>
                  </div>
                </div>

                <p className="text-xs text-[#F8F7F4]/70 font-sans leading-relaxed">
                  {lightboxItem.description}
                </p>

                <div className="pt-2 flex justify-end gap-3 border-t border-[rgba(248,247,244,0.06)]">
                  <button
                    onClick={() => {
                      triggerUpload(lightboxItem.id);
                      setLightboxItem(null);
                    }}
                    className="px-4 py-2 border border-[#a3e635]/30 hover:border-[#a3e635] text-[#a3e635] font-mono text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer bg-[#151518]"
                  >
                    {lang === "it" ? "Carica Nuova Immagine" : "Upload New Image"}
                  </button>
                  <button
                    onClick={() => setLightboxItem(null)}
                    className="px-4 py-2 bg-[#F8F7F4]/10 hover:bg-[#F8F7F4]/20 text-[#F8F7F4] font-mono text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                  >
                    {lang === "it" ? "Chiudi" : "Close"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
