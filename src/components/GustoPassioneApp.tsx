import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Pizza,
  MapPin,
  Gem,
  BookOpen,
  Gift,
  HelpCircle,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
  Trash2,
  Banknote,
  CreditCard,
  Send,
  ShieldCheck,
  Landmark,
  Loader,
  CheckCircle2,
  UtensilsCrossed,
  Cookie,
  Award,
  Info,
  ChevronDown,
  ChevronLeft,
  Plus,
  ChevronRight,
  Phone,
  CupSoda,
  Beef,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  desc: string;
  emoji: string;
  image: string;
}

interface CartItem {
  product: Product;
  qty: number;
  notes: string;
  isFreeReward: boolean;
}

const products: Product[] = [
  // PIZZE
  {
    id: 1,
    name: "Margherita Tradizionale",
    category: "Pizze",
    price: 7.0,
    desc: "Salsa di pomodoro biologico, mozzarella fior di latte marchigiana, basilico fresco, olio EVO.",
    emoji: "🍕",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Diavola di Campagna",
    category: "Pizze",
    price: 8.5,
    desc: "Pomodoro, mozzarella fresca, ciauscolo piccante locale, peperoncino fresco.",
    emoji: "🌶️",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Capricciosa dei Monti Sibillini",
    category: "Pizze",
    price: 9.5,
    desc: "Pomodoro, carciofini freschi, funghi prataioli, olive nere marchigiane marinate, crudo.",
    emoji: "🍄",
    image: "https://images.unsplash.com/photo-1571066811602-71683a3f680d?w=400&auto=format&fit=crop&q=60",
  },

  // PRIMI
  {
    id: 4,
    name: "Vincisgrassi Maceratesi",
    category: "Primi",
    price: 11.0,
    desc: "La ricetta classica della lasagna di Macerata, con pasta all'uovo tirata a mano e ragù ricco.",
    emoji: "🍝",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 5,
    name: "Tagliatelle al Cinghiale",
    category: "Primi",
    price: 12.0,
    desc: "Pasta fresca all'uovo con ragù rustico di cinghiale sfumato al vino rosso delle Marche.",
    emoji: "🐗",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=60",
  },

  // SECONDI
  {
    id: 6,
    name: "Frittura di Calamari & Gamberi",
    category: "Secondi",
    price: 15.5,
    desc: "Calamari e gamberi dell'Adriatico infarinati e fritti al momento, serviti con limoni biologici.",
    emoji: "🍤",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 7,
    name: "Tagliata di Scottona IGP",
    category: "Secondi",
    price: 18.0,
    desc: "Carne bovina selezionata del territorio, servita con scaglie di pecorino di grotta e rucola.",
    emoji: "🥩",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop&q=60",
  },

  // BIBITE
  {
    id: 8,
    name: "Coca-Cola Originale (Vetro)",
    category: "Bibite",
    price: 2.5,
    desc: "La classica bibita rinfrescante servita in bottiglia di vetro da 33cl.",
    emoji: "🥤",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 9,
    name: "Aranciata Bio Marchigiana",
    category: "Bibite",
    price: 3.0,
    desc: "Fatta solo con succo di arance italiane biologiche, fresca e dissetante. 275ml.",
    emoji: "🍊",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 10,
    name: "Gassosa / Spuma d'Altri Tempi",
    category: "Bibite",
    price: 2.8,
    desc: "La spuma della nostra tradizione, con estratti naturali di rabarbaro e caramello.",
    emoji: "🍋",
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 11,
    name: "Birra Artigianale dei Sibillini",
    category: "Bibite",
    price: 5.0,
    desc: "Birra bionda artigianale non filtrata da luppoli marchigiani. 33cl.",
    emoji: "🍺",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 12,
    name: "Vino Passerina Marche IGT",
    category: "Bibite",
    price: 10.0,
    desc: "Vino bianco profumato, perfetto per accompagnare pesce o pizze bianche (Bottiglia 75cl).",
    emoji: "🍷",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 13,
    name: "Vernaccia di Serrapetrona DOCG",
    category: "Bibite",
    price: 13.5,
    desc: "Vino rosso frizzante d'eccellenza, unico delle nostre colline di Macerata. 75cl.",
    emoji: "🍾",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 14,
    name: "Acqua Naturale Frasassi",
    category: "Bibite",
    price: 1.5,
    desc: "Acqua pura dalle sorgenti delle Grotte di Frasassi, bottiglia in vetro da 75cl.",
    emoji: "💧",
    image: "https://images.unsplash.com/photo-1608885898957-a599fb18de36?w=400&auto=format&fit=crop&q=60",
  },

  // DOLCI
  {
    id: 15,
    name: "Tiramisù Tradizionale",
    category: "Dolci",
    price: 5.0,
    desc: "Crema soffice al mascarpone artigianale marchigiano, savoiardi e caffè espresso.",
    emoji: "🍰",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&auto=format&fit=crop&q=60",
  },
  {
    id: 16,
    name: "Cantucci & Vino Cotto",
    category: "Dolci",
    price: 6.0,
    desc: "Cantucci croccanti alle mandorle locali da inzuppare nel tradizionale vino cotto delle Marche.",
    emoji: "🍪",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&auto=format&fit=crop&q=60",
  },
];

interface GustoPassioneAppProps {
  lang?: "it" | "en";
}

export default function GustoPassioneApp({ lang = "it" }: GustoPassioneAppProps) {
  const [points, setPoints] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currentTab, setCurrentTab] = useState<"menu" | "loyalty" | "faq">("menu");
  const [currentCategory, setCurrentCategory] = useState<string>("Tutti");
  const [searchQuery, setSearchQuery] = useState<string>(" ");
  const [splashOpen, setSplashOpen] = useState<boolean>(true);

  // Cookie banner
  const [cookieAccepted, setCookieAccepted] = useState<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false);

  // Toast
  const [toast, setToast] = useState<{ msg: string; icon: string; visible: boolean }>({
    msg: "",
    icon: "info",
    visible: false,
  });

  // Modal Dettaglio Prodotto
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQty, setSelectedQty] = useState<number>(1);
  const [selectedNotes, setSelectedNotes] = useState<string>("");

  // Modale Carrello & Checkout
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "takeaway">("delivery");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [checkoutName, setCheckoutName] = useState<string>("");
  const [checkoutAddress, setCheckoutAddress] = useState<string>("");

  // Modale Pagamento Carta
  const [paymentOpen, setPaymentOpen] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardExpiry, setCardExpiry] = useState<string>("");
  const [cardCVV, setCardCVV] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

  // Loyalty rewards applied states
  const [rewardApplied, setRewardApplied] = useState<boolean>(false);

  // Interactive Loyalty Calculator states
  const [calcSpendAmount, setCalcSpendAmount] = useState<number>(50);

  // FAQ Accordion Open Indexes
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Image failure helper
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  // Initialize and load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("gusto_premium_state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.points === "number") setPoints(parsed.points);
        if (parsed.cookieAccepted) setCookieAccepted(parsed.cookieAccepted);
        if (parsed.user) {
          if (parsed.user.name) setCheckoutName(parsed.user.name);
          if (parsed.user.address) setCheckoutAddress(parsed.user.address);
        }
      } catch (e) {
        console.error("Local storage load error", e);
      }
    }

    // Delay cookie banner slightly if not set
    const timer = setTimeout(() => {
      const state = localStorage.getItem("gusto_premium_state");
      if (!state) {
        setShowCookieBanner(true);
      } else {
        const parsed = JSON.parse(state);
        if (!parsed.cookieAccepted) {
          setShowCookieBanner(true);
        }
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Save changes to local storage helper
  const saveStateToLocal = (newPoints: number, newCookie: string | null, nameVal?: string, addressVal?: string) => {
    const dataToSave = {
      points: newPoints,
      cookieAccepted: newCookie,
      user: {
        name: nameVal !== undefined ? nameVal : checkoutName,
        address: addressVal !== undefined ? addressVal : checkoutAddress,
      },
    };
    localStorage.setItem("gusto_premium_state", JSON.stringify(dataToSave));
  };

  // Helper trigger Toast
  const showToast = (msg: string, icon: string = "info") => {
    setToast({ msg, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  // Cookie accept logic
  const acceptCookies = (all: boolean) => {
    const decision = all ? "all" : "necessary";
    setCookieAccepted(decision);
    setShowCookieBanner(false);
    saveStateToLocal(points, decision);
    showToast(lang === "it" ? "Preferenze salvate!" : "Preferences saved!", "cookie");
  };

  // Render product categories
  const categories = ["Tutti", ...Array.from(new Set(products.map((p) => p.category)))];

  // Filter products based on category and search query
  const filteredProducts = products.filter((p) => {
    const matchCategory = currentCategory === "Tutti" || p.category === currentCategory;
    const cleanSearch = searchQuery.trim().toLowerCase();
    const matchSearch =
      cleanSearch === "" ||
      p.name.toLowerCase().includes(cleanSearch) ||
      p.desc.toLowerCase().includes(cleanSearch);
    return matchCategory && matchSearch;
  });

  // Calculate cart subtotal (excluding free rewards)
  const cartSubtotal = cart.reduce((acc, item) => {
    if (item.isFreeReward) return acc;
    return acc + item.product.price * item.qty;
  }, 0);

  // Total item count in cart
  const totalCartItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const pointsFromOrder = Math.floor(cartSubtotal);

  // Quick add button logic
  const handleQuickAdd = (p: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === p.id && item.notes === "" && !item.isFreeReward);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += 1;
      setCart(updated);
    } else {
      setCart([...cart, { product: p, qty: 1, notes: "", isFreeReward: false }]);
    }
    showToast(lang === "it" ? `${p.name} aggiunto!` : `${p.name} added!`, "shopping-bag");
  };

  // Detail Modal add logic
  const handleModalAdd = () => {
    if (!selectedProduct) return;
    const notesClean = selectedNotes.trim();

    const existingIndex = cart.findIndex(
      (item) => item.product.id === selectedProduct.id && item.notes === notesClean && !item.isFreeReward
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].qty += selectedQty;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          product: selectedProduct,
          qty: selectedQty,
          notes: notesClean,
          isFreeReward: false,
        },
      ]);
    }

    showToast(lang === "it" ? `${selectedProduct.name} aggiunto!` : `${selectedProduct.name} added!`, "shopping-bag");
    setSelectedProduct(null);
  };

  // Remove item from cart
  const handleRemoveCartItem = (idx: number) => {
    const item = cart[idx];
    if (item.isFreeReward) {
      setRewardApplied(false);
    }
    const updated = cart.filter((_, i) => i !== idx);
    setCart(updated);
  };

  // Update item quantity inside cart
  const handleUpdateCartItemQty = (idx: number, change: number) => {
    const updated = [...cart];
    updated[idx].qty += change;
    if (updated[idx].qty < 1) {
      handleRemoveCartItem(idx);
    } else {
      setCart(updated);
    }
  };

  // Apply Reward to Cart
  const handleApplyReward = () => {
    if (points < 100) return;
    const tiramisu = products.find((p) => p.id === 15);
    if (!tiramisu) return;

    setCart([
      ...cart,
      {
        product: { ...tiramisu, price: 0 },
        qty: 1,
        notes: "REGALO FEDELTÀ",
        isFreeReward: true,
      },
    ]);

    setRewardApplied(true);
    showToast(lang === "it" ? "Tiramisù in regalo aggiunto!" : "Free Tiramisù added!", "gift");
  };

  // Formatted credit card inputs
  const formatCardNum = (val: string) => {
    const digits = val.replace(/\D/g, "");
    const matched = digits.match(/.{1,4}/g);
    return matched ? matched.join(" ") : "";
  };

  const formatCardExpiryStr = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length > 2) {
      return digits.substring(0, 2) + "/" + digits.substring(2, 4);
    }
    return digits;
  };

  // Complete submission
  const handleOrderSubmit = (isPaidOnline: boolean) => {
    let msg = `*Nuovo Ordine da Gusto & Passione*\n\n`;
    msg += `*Cliente:* ${checkoutName}\n`;
    msg += `*Modalità:* ${deliveryType === "delivery" ? "Consegna a domicilio" : "Ritiro in sede"}\n`;
    msg += `*${deliveryType === "delivery" ? "Indirizzo" : "Orario Ritiro"}:* ${checkoutAddress}\n`;
    msg += `*Stato Pagamento:* ${
      isPaidOnline ? "✅ _PAGATO ONLINE (Carta Credito)_" : "💵 _Pagamento alla consegna/ritiro_"
    }\n\n`;

    msg += `*PIATTI ORDINATI:*\n`;
    cart.forEach((item) => {
      const displayPrice = item.isFreeReward ? "OMAGGIO" : `€ ${item.product.price.toFixed(2)}`;
      msg += `• ${item.qty}x ${item.product.name} _(${displayPrice})_\n`;
      if (item.notes) {
        msg += `  _Nota: ${item.notes}_\n`;
      }
    });

    msg += `\n*TOTALE ORDINE: € ${cartSubtotal.toFixed(2)}*\n`;

    // Process points updates
    let nextPoints = points;
    if (rewardApplied) {
      nextPoints = Math.max(0, nextPoints - 100);
      setRewardApplied(false);
    }
    if (pointsFromOrder > 0) {
      nextPoints += pointsFromOrder;
      msg += `*Punti Fedeltà Ottenuti:* +${pointsFromOrder} pti 🌟\n`;
      msg += `*Nuovo Saldo Punti:* ${nextPoints} pti`;
    }

    setPoints(nextPoints);
    saveStateToLocal(nextPoints, cookieAccepted, checkoutName, checkoutAddress);

    const encoded = encodeURIComponent(msg);
    const link = `https://api.whatsapp.com/send?phone=393475551234&text=${encoded}`;

    window.open(link, "_blank");

    // Clear state
    setCart([]);
    setCartOpen(false);
    showToast(lang === "it" ? "Inoltro ordine su WhatsApp..." : "Forwarding order to WhatsApp...", "send");
  };

  const handleCheckoutClick = () => {
    if (!checkoutName.trim()) {
      showToast(lang === "it" ? "Inserisci il tuo Nome!" : "Please enter your Name!", "alert-circle");
      return;
    }
    if (!checkoutAddress.trim()) {
      const alertMsg =
        deliveryType === "delivery"
          ? lang === "it"
            ? "Indica l'indirizzo di consegna!"
            : "Indicate delivery address!"
          : lang === "it"
          ? "Indica l'orario di ritiro!"
          : "Indicate pickup time!";
      showToast(alertMsg, "alert-circle");
      return;
    }
    if (cart.length === 0) {
      showToast(lang === "it" ? "Carrello vuoto!" : "Empty cart!", "shopping-bag");
      return;
    }

    // Save standard user detail changes
    saveStateToLocal(points, cookieAccepted, checkoutName, checkoutAddress);

    if (paymentMethod === "card") {
      setPaymentOpen(true);
    } else {
      handleOrderSubmit(false);
    }
  };

  const processMockCardPayment = () => {
    const cleanNum = cardNumber.replace(/\s+/g, "");
    if (cleanNum.length < 16 || cardExpiry.length < 5 || cardCVV.length < 3 || !cardName.trim()) {
      showToast(lang === "it" ? "Dati della carta incompleti!" : "Incomplete card data!", "alert-circle");
      return;
    }

    setIsProcessingPayment(true);
    setTimeout(() => {
      setPaymentDone(true);
      setTimeout(() => {
        setPaymentOpen(false);
        setIsProcessingPayment(false);
        setPaymentDone(false);
        setCardNumber("");
        setCardExpiry("");
        setCardCVV("");
        setCardName("");
        handleOrderSubmit(true);
      }, 1200);
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-zinc-50 font-sans relative flex flex-col overflow-hidden text-zinc-900">
      
      {/* Dynamic Toast System */}
      <AnimatePresence>
          {toast.visible && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="absolute top-6 left-4 right-4 bg-zinc-950 text-white px-4 py-3 rounded-2xl shadow-xl z-50 flex items-center gap-2.5 border border-zinc-800/80"
            >
              <div className="w-5 h-5 text-amber-500 shrink-0">
                {toast.icon === "cookie" ? (
                  <Cookie className="w-5 h-5 text-amber-500" />
                ) : toast.icon === "gift" ? (
                  <Gift className="w-5 h-5 text-amber-500" />
                ) : toast.icon === "shopping-bag" ? (
                  <ShoppingBag className="w-5 h-5 text-amber-500" />
                ) : (
                  <Info className="w-5 h-5 text-amber-500" />
                )}
              </div>
              <span className="text-xs font-semibold">{toast.msg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GDPR Cookie Consent Panel */}
        <AnimatePresence>
          {showCookieBanner && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="absolute bottom-24 left-4 right-4 bg-zinc-900 text-white p-4 rounded-2xl shadow-2xl z-50 flex flex-col gap-3 border border-zinc-800"
            >
              <div className="flex items-start gap-3">
                <Cookie className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold tracking-wide">
                    {lang === "it" ? "Esperienza Personalizzata" : "Personalized Experience"}
                  </h5>
                  <p className="text-[10px] text-zinc-300 mt-1 leading-relaxed">
                    {lang === "it"
                      ? "Salviamo sul tuo dispositivo i tuoi dati di spedizione, il carrello e i punti fedeltà per velocizzare i prossimi ordini."
                      : "We save your shipping info, cart, and loyalty points on your device to expedite your future orders."}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => acceptCookies(false)}
                  className="text-[10px] text-zinc-400 hover:text-white px-3 py-1.5 font-semibold"
                >
                  {lang === "it" ? "Solo necessari" : "Necessary only"}
                </button>
                <button
                  onClick={() => acceptCookies(true)}
                  className="bg-amber-500 hover:bg-amber-600 text-zinc-950 text-[10px] font-bold px-4 py-1.5 rounded-xl transition"
                >
                  {lang === "it" ? "Accetta tutto" : "Accept all"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Splash screen component */}
        <AnimatePresence>
          {splashOpen && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-950 to-amber-950 z-50 flex flex-col items-center justify-between text-white p-8"
            >
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-red-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/20">
                  <UtensilsCrossed className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight text-center bg-gradient-to-r from-white via-amber-200 to-amber-500 bg-clip-text text-transparent">
                  Gusto & Passione
                </h1>
                <p className="text-zinc-400 mt-2 text-xs text-center max-w-[250px] leading-relaxed">
                  {lang === "it"
                    ? "Cucina Marchigiana d'eccellenza. Ordina su WhatsApp, accumula punti e gusta la tradizione."
                    : "Outstanding Marche cuisine. Order on WhatsApp, get rewards, and enjoy local tradition."}
                </p>
              </div>

              <div className="w-full flex flex-col items-center gap-4">
                <button
                  onClick={() => setSplashOpen(false)}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold py-3.5 rounded-2xl shadow-lg shadow-amber-500/20 hover:opacity-95 transition active:scale-95 duration-200 text-sm"
                >
                  {lang === "it" ? "Inizia l'Esperienza" : "Start Experience"}
                </button>
                <p className="text-[9px] text-zinc-500 tracking-wider uppercase font-medium">
                  {lang === "it" ? "Facilissimo Web App • Demo Clienti" : "Facilissimo Web App • Client Demo"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header section with brand and tabs */}
        <header className="bg-white border-b border-zinc-100 px-4 pt-7 pb-3 flex flex-col gap-3 shrink-0 shadow-sm z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center shadow-md shadow-amber-500/10 shrink-0">
                <Pizza className="w-5 h-5 text-zinc-950" />
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-zinc-900 leading-none">Gusto & Passione</h2>
                <span className="text-[10px] text-zinc-500 flex items-center gap-0.5 mt-1 font-medium">
                  <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                  <span className="truncate max-w-[150px]">Corso della Repubblica, Macerata</span>
                </span>
              </div>
            </div>

            {/* Mini point indicator */}
            <button
              onClick={() => setCurrentTab("loyalty")}
              className="bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition shrink-0"
            >
              <Gem className="w-3.5 h-3.5 text-amber-500 animate-pulse shrink-0" />
              <span className="text-[10px] font-bold">{points} Pti</span>
            </button>
          </div>

          {/* Navigational tab buttons */}
          <div className="flex bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrentTab("menu")}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1.5 ${
                currentTab === "menu" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Menu
            </button>
            <button
              onClick={() => setCurrentTab("loyalty")}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1.5 ${
                currentTab === "loyalty" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <Gift className="w-3.5 h-3.5" /> Club
            </button>
            <button
              onClick={() => setCurrentTab("faq")}
              className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1.5 ${
                currentTab === "faq" ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-900"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> FAQ
            </button>
          </div>

          {/* Area search and categories (only visible on menu) */}
          {currentTab === "menu" && (
            <div className="space-y-2.5">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={lang === "it" ? "Cerca piatti, pizze o bibite..." : "Search pizzas, courses, soda..."}
                  value={searchQuery === " " ? "" : searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-100 text-zinc-800 pl-10 pr-4 py-2 rounded-xl text-xs border border-transparent focus:outline-none focus:border-amber-500 focus:bg-white transition"
                />
              </div>

              {/* Categories scroll panel */}
              <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                {categories.map((cat) => {
                  const isAct = cat === currentCategory;
                  const count = cat === "Tutti"
                    ? products.length
                    : products.filter(p => p.category === cat).length;
                  
                  let icon = <Pizza className="w-4 h-4" />;
                  if (cat === "Primi") icon = <UtensilsCrossed className="w-4 h-4" />;
                  else if (cat === "Secondi") icon = <Beef className="w-4 h-4" />;
                  else if (cat === "Bibite") icon = <CupSoda className="w-4 h-4" />;
                  else if (cat === "Dolci") icon = <Cookie className="w-4 h-4" />;
                  else if (cat === "Tutti") icon = <BookOpen className="w-4 h-4" />;

                  return (
                    <button
                      key={cat}
                      onClick={() => setCurrentCategory(cat)}
                      className={`px-3.5 py-2 rounded-2xl transition-all duration-200 flex items-center gap-2 shrink-0 border cursor-pointer ${
                        isAct
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold border-amber-500 shadow-md shadow-amber-500/20"
                          : "bg-white text-zinc-600 border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 ${
                        isAct ? "bg-zinc-950/10 text-zinc-950" : "bg-zinc-100 text-zinc-500"
                      }`}>
                        {icon}
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-[10px] font-extrabold tracking-tight uppercase">{cat}</p>
                        <p className={`text-[8px] ${isAct ? "text-zinc-900/60" : "text-zinc-400"} mt-0.5 font-medium`}>
                          {count} {lang === "it" ? "piatti" : "dishes"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        {/* Scrollable central content container */}
        <main className="flex-1 overflow-y-auto px-4 pb-28 bg-zinc-50/50">
          {/* TAB 1: MENU */}
          {currentTab === "menu" && (
            <div className="space-y-4 pt-3">
              {/* Promo Banner */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 p-4 rounded-2xl shadow-md flex items-center justify-between">
                <div className="pr-2">
                  <h4 className="text-[11px] font-extrabold uppercase tracking-wider">
                    {lang === "it" ? "Benvenuto nel Club" : "Welcome to the Club"}
                  </h4>
                  <p className="text-[10px] opacity-90 mt-0.5 font-medium leading-tight">
                    {lang === "it"
                      ? "Guadagna 1 punto per ogni 1€ speso! Ottieni dolci gratis."
                      : "Earn 1 point for every 1€ spent! Get free sweet courses."}
                  </p>
                </div>
                <span className="text-xl shrink-0">✨</span>
              </div>

              {/* Products list */}
              <div className="space-y-3">
                {filteredProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
                    <Search className="w-10 h-10 mb-2 opacity-30" />
                    <p className="text-xs font-semibold">
                      {lang === "it" ? "Nessun prodotto trovato..." : "No products found..."}
                    </p>
                  </div>
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProduct(p);
                        setSelectedQty(1);
                        setSelectedNotes("");
                      }}
                      className="bg-white rounded-2xl overflow-hidden flex shadow-sm hover:shadow-md transition duration-300 cursor-pointer border border-zinc-100"
                    >
                      {/* Interactive Image box */}
                      <div className="w-24 h-24 shrink-0 relative bg-zinc-100">
                        {imgErrors[p.id] ? (
                          <div className="absolute inset-0 bg-amber-50 flex items-center justify-center text-3xl">
                            {p.emoji}
                          </div>
                        ) : (
                          <img
                            src={p.image}
                            alt={p.name}
                            onError={() => setImgErrors((prev) => ({ ...prev, [p.id]: true }))}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="absolute top-2 left-2 bg-black/75 text-[10px] w-6 h-6 rounded-full flex items-center justify-center">
                          {p.emoji}
                        </div>
                      </div>

                      {/* Info details */}
                      <div className="flex-grow p-3 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-extrabold text-zinc-900 text-xs leading-snug truncate">{p.name}</h4>
                          <p className="text-[10px] text-zinc-400 line-clamp-2 mt-0.5 leading-tight">{p.desc}</p>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black text-amber-600">€ {p.price.toFixed(2)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickAdd(p);
                            }}
                            className="w-7 h-7 bg-amber-500 hover:bg-amber-600 text-zinc-950 rounded-lg flex items-center justify-center shadow-sm active:scale-95 transition shrink-0"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CLUB LOYALTY */}
          {currentTab === "loyalty" && (
            <div className="space-y-4 pt-4">
              {/* Graphic Club Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-5 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 opacity-10">
                  <Award className="w-32 h-32 text-white" />
                </div>
                <span className="text-[9px] font-bold tracking-widest text-amber-400 uppercase">
                  {lang === "it" ? "La tua fedeltà premiata" : "Your loyalty rewarded"}
                </span>
                <h3 className="text-3xl font-black mt-1">{points} Punti</h3>
                <p className="text-[10px] text-zinc-400 mt-1">
                  {lang === "it"
                    ? "Accumula punti e riscatta premi deliziosi."
                    : "Earn loyalty club rewards on every purchase."}
                </p>

                {/* Progress bar state */}
                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold">
                    <span className="text-zinc-300">
                      {points >= 100
                        ? lang === "it"
                          ? "Dolce omaggio sbloccato!"
                          : "Free dessert unlocked!"
                        : lang === "it"
                        ? `Ti mancano ${100 - points} punti al premio`
                        : `${100 - points} points to reward`}
                    </span>
                    <span className="text-amber-400">100 Pti</span>
                  </div>
                  <div className="w-full bg-zinc-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-amber-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (points / 100) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* How it works details */}
              <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm space-y-3">
                <h4 className="font-bold text-xs text-zinc-800 flex items-center gap-1.5">
                  <HelpCircle className="text-amber-500 w-4 h-4" />
                  {lang === "it" ? "Come funziona?" : "How does it work?"}
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-zinc-50 rounded-xl">
                    <span className="text-lg">🍕</span>
                    <h5 className="text-[10px] font-bold text-zinc-800 mt-1 leading-none">
                      {lang === "it" ? "Ordina" : "Order"}
                    </h5>
                    <p className="text-[8px] text-zinc-400 mt-1 leading-tight">
                      {lang === "it" ? "Ogni 1€ = 1 Punto" : "Every 1€ = 1 Point"}
                    </p>
                  </div>
                  <div className="p-2 bg-zinc-50 rounded-xl">
                    <span className="text-lg">📱</span>
                    <h5 className="text-[10px] font-bold text-zinc-800 mt-1 leading-none">
                      {lang === "it" ? "Accumula" : "Earn"}
                    </h5>
                    <p className="text-[8px] text-zinc-400 mt-1 leading-tight">
                      {lang === "it" ? "Salvati in locale" : "Saved locally"}
                    </p>
                  </div>
                  <div className="p-2 bg-zinc-50 rounded-xl">
                    <span className="text-lg">🎁</span>
                    <h5 className="text-[10px] font-bold text-zinc-800 mt-1 leading-none">
                      {lang === "it" ? "Gusta" : "Enjoy"}
                    </h5>
                    <p className="text-[8px] text-zinc-400 mt-1 leading-tight">
                      {lang === "it" ? "Ottieni i regali" : "Claim rewards"}
                    </p>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE LOYALTY CALCULATOR & SIMULATOR */}
              <div className="bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-xs text-zinc-900 flex items-center gap-1.5">
                    <Gem className="text-amber-500 w-4 h-4" />
                    {lang === "it" ? "Calcolatore Punti & Risparmio" : "Points & Savings Calculator"}
                  </h4>
                  <span className="text-[8px] bg-amber-500/15 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {lang === "it" ? "Interattivo" : "Interactive"}
                  </span>
                </div>

                <p className="text-[10px] text-zinc-500 leading-relaxed">
                  {lang === "it"
                    ? "Sposta il cursore per stimare i punti accumulabili con il tuo prossimo pasto e calcolare il controvalore dei premi!"
                    : "Move the slider to estimate points for your next order and calculate rewards value!"}
                </p>

                {/* Slider and inputs */}
                <div className="bg-zinc-50 p-3 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-zinc-500">
                      {lang === "it" ? "Simula Spesa Pasto:" : "Simulate Bill Amount:"}
                    </span>
                    <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                      € {calcSpendAmount}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={calcSpendAmount}
                    onChange={(e) => setCalcSpendAmount(Number(e.target.value))}
                    className="w-full accent-amber-500 h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer"
                  />

                  {/* Calculation Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <div className="bg-white p-2 rounded-lg border border-zinc-100 text-center">
                      <p className="text-[8px] text-zinc-400 font-bold uppercase">
                        {lang === "it" ? "Punti Ottenuti" : "Points Unlocked"}
                      </p>
                      <p className="text-xs font-extrabold text-zinc-800 mt-1">
                        +{calcSpendAmount} pti ★
                      </p>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-zinc-100 text-center">
                      <p className="text-[8px] text-zinc-400 font-bold uppercase">
                        {lang === "it" ? "Valore Regalo (10%)" : "Cashback Value (10%)"}
                      </p>
                      <p className="text-xs font-extrabold text-emerald-600 mt-1">
                        € {(calcSpendAmount * 0.10).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Simulator buttons */}
                  <div className="flex gap-2 pt-0.5">
                    <button
                      onClick={() => {
                        const newPoints = points + calcSpendAmount;
                        setPoints(newPoints);
                        saveStateToLocal(newPoints, cookieAccepted);
                        showToast(
                          lang === "it"
                            ? `Tessera aggiornata: +${calcSpendAmount} Punti caricati!`
                            : `Card updated: +${calcSpendAmount} Points loaded!`,
                          "gift"
                        );
                      }}
                      className="flex-grow bg-zinc-900 hover:bg-zinc-800 text-white font-extrabold py-2 rounded-xl text-[9px] transition uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      {lang === "it" ? "Carica su Tessera" : "Load onto Card"}
                    </button>
                    
                    <button
                      onClick={() => {
                        setPoints(0);
                        saveStateToLocal(0, cookieAccepted);
                        showToast(
                          lang === "it" ? "Tessera svuotata!" : "Card reset to 0!",
                          "info"
                        );
                      }}
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-500 font-bold px-3 py-2 rounded-xl text-[9px] transition uppercase cursor-pointer"
                    >
                      {lang === "it" ? "Azzera" : "Reset"}
                    </button>
                  </div>
                </div>

                <div className="text-[8.5px] text-zinc-400 text-center leading-snug italic">
                  {lang === "it"
                    ? "💡 Carica i punti per sbloccare e riscattare subito il Tiramisù in omaggio!"
                    : "💡 Load simulated points to immediately unlock and redeem your free Tiramisù!"}
                </div>
              </div>

              {/* Reward claim section */}
              <div className="space-y-2.5">
                <h4 className="font-bold text-xs text-zinc-800">{lang === "it" ? "Premi Disponibili" : "Rewards"}</h4>

                <div className="bg-white p-3 rounded-2xl border border-zinc-100 shadow-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                      🍰
                    </div>
                    <div className="min-w-0">
                      <h5 className="text-xs font-bold text-zinc-800 truncate">
                        {lang === "it" ? "Tiramisù Tradizionale Gratis" : "Free Traditional Tiramisù"}
                      </h5>
                      <p className="text-[9px] text-zinc-400">
                        {lang === "it" ? "Valore di 5.00€ • Richiede 100 punti" : "Worth 5.00€ • Requires 100 points"}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (points >= 100) {
                        handleApplyReward();
                        setCartOpen(true);
                      }
                    }}
                    disabled={points < 100}
                    className={`shrink-0 text-[10px] font-bold px-3 py-2 rounded-xl transition ${
                      points >= 100
                        ? "bg-amber-500 hover:bg-amber-600 text-zinc-950 cursor-pointer shadow-md"
                        : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                    }`}
                  >
                    {lang === "it" ? "Riscatta" : "Claim"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAQ ACCORDION */}
          {currentTab === "faq" && (
            <div className="space-y-4 pt-4">
              <div className="text-center max-w-xs mx-auto mb-2">
                <h3 className="text-sm font-extrabold text-zinc-800">
                  {lang === "it" ? "Domande Frequenti" : "Frequently Asked Questions"}
                </h3>
                <p className="text-[10px] text-zinc-400 mt-1">
                  {lang === "it"
                    ? "Tutto quello che c'è da sapere sulle modalità di ordine, pagamento e ritiro dei piatti."
                    : "Everything regarding our ordering system, payments, and pickup process."}
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    q: lang === "it" ? "Come funziona l'ordine tramite WhatsApp?" : "How does WhatsApp ordering work?",
                    a:
                      lang === "it"
                        ? "Seleziona i tuoi piatti, compila i dati di consegna e clicca su 'Invia Ordine'. L'app formatterà un messaggio pronto per essere inviato direttamente alla nostra chat WhatsApp. Il nostro staff ti risponderà subito confermando l'orario stimato!"
                        : "Pick your dishes, complete delivery info, and submit. The app formats a message directly to our WhatsApp. Our team will answer immediately with your estimated delivery time!",
                  },
                  {
                    q: lang === "it" ? "I pagamenti con carta sono sicuri?" : "Are card payments secure?",
                    a:
                      lang === "it"
                        ? "Sì, assolutamente! Nella versione finale utilizziamo circuiti sicuri e protetti come Stripe. In questa demo l'interfaccia simula il flusso di pagamento in totale sicurezza sul tuo dispositivo locale, senza salvare dati all'esterno."
                        : "Yes, fully! In production we use fully secure systems like Stripe. This demo runs a simulation client-side with complete privacy and zero data risks.",
                  },
                  {
                    q: lang === "it" ? "Quali sono le opzioni per la consegna?" : "What are the options for delivery?",
                    a:
                      lang === "it"
                        ? "Offriamo la consegna a domicilio gratuita a Macerata e dintorni per ordini superiori a 15€. In alternativa puoi scegliere 'Ritiro in Sede' per ritirare i tuoi piatti caldi direttamente nel nostro locale all'orario da te selezionato."
                        : "We offer free delivery in Macerata for orders above 15€. Otherwise, choose 'Ritiro in Sede' (Pickup) to fetch your hot courses directly at our restaurant.",
                  },
                  {
                    q: lang === "it" ? "Come funziona l'accumulo dei punti fedeltà?" : "How do loyalty points accumulate?",
                    a:
                      lang === "it"
                        ? "Per ogni euro speso sull'app guadagni 1 Punto Fedeltà. I punti vengono salvati sul tuo telefono in modo sicuro. Una volta raggiunti i 100 punti, potrai sbloccare un dessert in omaggio da inserire nel tuo prossimo carrello!"
                        : "For each euro spent, you gain 1 Club Point. Points are saved locally. Reaching 100 points unlocks a free sweet dessert in your next cart order!",
                  },
                ].map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                        className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                      >
                        <span className="text-xs font-bold text-zinc-800">{item.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-[11px] text-zinc-500 leading-relaxed border-t border-zinc-50/50 pt-2"
                          >
                            {item.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Call-to-action assistance container */}
              <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 text-center mt-4">
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  {lang === "it" ? "Hai bisogno di assistenza?" : "Need support?"}
                </span>
                <p className="text-[11px] text-zinc-600 mt-1 leading-snug">
                  {lang === "it"
                    ? "Chiamaci direttamente in sede per richieste speciali o intolleranze particolari."
                    : "Call our restaurant directly for any special requests or culinary intolerances."}
                </p>
                <a
                  href="tel:+393475551234"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-extrabold mt-2 hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" /> +39 347 555 1234
                </a>
              </div>
            </div>
          )}
        </main>

        {/* BOTTOM ACTIVE NAVIGATION BAR */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-4 py-4 flex items-center justify-between z-30 shadow-lg">
          <div className="flex flex-col">
            <span className="text-[9px] text-zinc-400 font-semibold tracking-wider uppercase">
              {lang === "it" ? "Totale stimato" : "Estimated Total"}
            </span>
            <span className="text-base font-black text-zinc-900">€ {cartSubtotal.toFixed(2)}</span>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-bold px-5 py-3 rounded-2xl shadow-md shadow-amber-500/10 flex items-center gap-2 transform active:scale-95 transition"
          >
            <ShoppingBag className="w-4 h-4 text-zinc-950 shrink-0" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider">
              {lang === "it" ? "Carrello" : "Cart"}
            </span>
            <span className="bg-zinc-950 text-white rounded-full text-[9px] w-5 h-5 flex items-center justify-center font-black shrink-0">
              {totalCartItems}
            </span>
          </button>
        </nav>

        {/* PRODUCT DETAIL MODAL */}
        <AnimatePresence>
          {selectedProduct && (
            <div 
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-zinc-950/60 z-45 flex items-end justify-center cursor-pointer"
            >
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full rounded-t-[32px] p-6 max-h-[85%] overflow-y-auto flex flex-col gap-4 shadow-2xl relative text-zinc-900 cursor-default"
              >
                {/* Visual Swipe handle */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="w-12 h-1.5 bg-zinc-200 rounded-full mx-auto focus:outline-none cursor-pointer mb-1 shrink-0"
                  aria-label="Close"
                />

                {/* Explicit prominent Close button (X) */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 rounded-full flex items-center justify-center transition cursor-pointer z-50 shadow-sm"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-start mt-1">
                  <div>
                    <span className="text-[9px] font-bold text-amber-500 tracking-wider uppercase">
                      {selectedProduct.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-zinc-900 leading-tight">{selectedProduct.name}</h3>
                  </div>
                  <span className="text-lg font-black text-amber-600 shrink-0">€ {selectedProduct.price.toFixed(2)}</span>
                </div>

                <div className="w-full h-36 rounded-2xl overflow-hidden relative shadow-inner bg-zinc-100 shrink-0">
                  {imgErrors[selectedProduct.id] ? (
                    <div className="w-full h-full flex items-center justify-center bg-amber-50 text-5xl">
                      {selectedProduct.emoji}
                    </div>
                  ) : (
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      onError={() => setImgErrors((prev) => ({ ...prev, [selectedProduct.id]: true }))}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                <p className="text-zinc-500 text-xs leading-relaxed">{selectedProduct.desc}</p>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1.5">
                    {lang === "it" ? "Note per lo Chef (Opzionale)" : "Notes for the Chef (Optional)"}
                  </label>
                  <textarea
                    placeholder={
                      lang === "it"
                        ? "Es. No cipolla, ben cotto, allergie..."
                        : "e.g. No onion, well cooked, allergies..."
                    }
                    value={selectedNotes}
                    onChange={(e) => setSelectedNotes(e.target.value)}
                    className="w-full border border-zinc-200 rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition"
                    rows={2}
                  />
                </div>

                <div className="flex items-center justify-between gap-4 mt-1">
                  <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 shrink-0">
                    <button
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold text-base focus:outline-none"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-zinc-800 text-xs">{selectedQty}</span>
                    <button
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:bg-zinc-100 font-bold text-base focus:outline-none"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleModalAdd}
                    className="flex-grow bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 font-extrabold h-9 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition text-[11px] uppercase tracking-wider"
                  >
                    {lang === "it" ? "Aggiungi al carrello" : "Add to Cart"} • €{" "}
                    {(selectedProduct.price * selectedQty).toFixed(2)}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* CART & CHECKOUT DRAWER MODAL */}
        <AnimatePresence>
          {cartOpen && (
            <div className="absolute inset-0 bg-zinc-950/60 z-40 flex items-end justify-center">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-white w-full h-[92%] rounded-t-[32px] flex flex-col overflow-hidden shadow-2xl"
              >
                {/* Header panel */}
                <div className="p-4 border-b border-zinc-100 flex items-center justify-between shrink-0">
                  <h3 className="text-sm font-extrabold text-zinc-900 flex items-center gap-2">
                    <ShoppingCart className="text-amber-500 w-4 h-4" />
                    {lang === "it" ? "Il tuo Carrello" : "Your Cart"}
                  </h3>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-7 h-7 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600 hover:bg-zinc-200 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Cart items scroll block */}
                <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-zinc-50/50">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
                      <ShoppingCart className="w-12 h-12 mb-2 text-zinc-300 opacity-40" />
                      <p className="text-xs font-semibold">
                        {lang === "it" ? "Il tuo carrello è vuoto" : "Your cart is empty"}
                      </p>
                      <button
                        onClick={() => setCartOpen(false)}
                        className="mt-4 bg-amber-500 text-zinc-950 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider"
                      >
                        {lang === "it" ? "Sfoglia Menu" : "Browse Menu"}
                      </button>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-2xl p-3 shadow-sm flex items-center justify-between border border-zinc-100 gap-2"
                      >
                        <div className="flex-grow min-w-0 pr-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-sm shrink-0">{item.product.emoji}</span>
                            <h4 className="font-bold text-zinc-800 text-xs leading-none truncate">
                              {item.product.name}
                            </h4>
                          </div>
                          {item.notes && (
                            <p
                              className={`text-[9px] ${
                                item.isFreeReward ? "text-amber-600 font-extrabold" : "text-red-500"
                              } italic mt-1 truncate`}
                            >
                              &quot;{item.notes}&quot;
                            </p>
                          )}
                          <span className="text-[9px] text-zinc-400 mt-1 block">
                            {item.isFreeReward
                              ? lang === "it"
                                ? "OMAGGIO CLUB"
                                : "CLUB REWARD"
                              : `€ ${item.product.price.toFixed(2)} / cad.`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {!item.isFreeReward && (
                            <div className="flex items-center border border-zinc-100 rounded-lg bg-zinc-50">
                              <button
                                onClick={() => handleUpdateCartItemQty(idx, -1)}
                                className="w-6 h-6 flex items-center justify-center text-zinc-600 font-bold text-xs focus:outline-none"
                              >
                                -
                              </button>
                              <span className="w-5 text-center font-bold text-zinc-800 text-[11px]">{item.qty}</span>
                              <button
                                onClick={() => handleUpdateCartItemQty(idx, 1)}
                                className="w-6 h-6 flex items-center justify-center text-zinc-600 font-bold text-xs focus:outline-none"
                              >
                                +
                              </button>
                            </div>
                          )}
                          <button
                            onClick={() => handleRemoveCartItem(idx)}
                            className="text-zinc-300 hover:text-red-500 transition p-1 shrink-0"
                            aria-label="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Loyalty Promo notice card inside cart drawer */}
                {points >= 100 && !rewardApplied && (
                  <div className="mx-4 my-2 p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xl shrink-0">🎁</span>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-amber-950">
                          {lang === "it" ? "Premio Sbloccato!" : "Reward Unlocked!"}
                        </p>
                        <p className="text-[9px] text-amber-800 truncate">
                          {lang === "it" ? "Aggiungi un Tiramisù in omaggio" : "Add a free Tiramisù to order"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleApplyReward}
                      className="bg-amber-500 hover:bg-amber-600 text-zinc-950 text-[9px] font-bold px-3 py-1.5 rounded-lg transition shrink-0"
                    >
                      {lang === "it" ? "Aggiungi" : "Add"}
                    </button>
                  </div>
                )}

                {/* Shipping & Delivery detail fields */}
                <div className="p-4 border-t border-zinc-100 shrink-0 bg-white space-y-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDeliveryType("delivery")}
                      className={`flex-1 py-2 rounded-xl font-bold text-[10px] transition text-center border-2 ${
                        deliveryType === "delivery"
                          ? "border-amber-500 bg-amber-50 text-amber-600"
                          : "border-transparent bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {lang === "it" ? "A Domicilio" : "Home Delivery"}
                    </button>
                    <button
                      onClick={() => setDeliveryType("takeaway")}
                      className={`flex-1 py-2 rounded-xl font-bold text-[10px] transition text-center border-2 ${
                        deliveryType === "takeaway"
                          ? "border-amber-500 bg-amber-50 text-amber-600"
                          : "border-transparent bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {lang === "it" ? "Ritiro in Sede" : "Takeaway / Pickup"}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder={lang === "it" ? "Nome e Cognome sul citofono *" : "First and Last name on bell *"}
                      value={checkoutName}
                      onChange={(e) => setCheckoutName(e.target.value)}
                      className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder={
                        deliveryType === "delivery"
                          ? lang === "it"
                            ? "Indirizzo di Consegna (Via, N.) *"
                            : "Delivery Address (Street, No.) *"
                          : lang === "it"
                          ? "Orario indicativo di ritiro (Es. 19:45) *"
                          : "Estimated pickup time (e.g. 19:45) *"
                      }
                      value={checkoutAddress}
                      onChange={(e) => setCheckoutAddress(e.target.value)}
                      className="w-full border border-zinc-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  {/* Payment selector */}
                  <div className="space-y-1.5">
                    <label className="block text-[8px] font-bold text-zinc-500 uppercase tracking-wider">
                      {lang === "it" ? "Seleziona Metodo di Pagamento" : "Select Payment Method"}
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setPaymentMethod("cash")}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-bold border transition flex items-center justify-center gap-1 ${
                          paymentMethod === "cash"
                            ? "border-amber-500 bg-amber-50 text-amber-800"
                            : "border-zinc-200 text-zinc-500"
                        }`}
                      >
                        <Banknote className="w-4 h-4 shrink-0" />
                        {lang === "it" ? "Alla Consegna" : "On Delivery"}
                      </button>
                      <button
                        onClick={() => setPaymentMethod("card")}
                        className={`flex-1 py-2 rounded-xl text-[10px] font-bold border transition flex items-center justify-center gap-1 ${
                          paymentMethod === "card"
                            ? "border-amber-500 bg-amber-50 text-amber-800"
                            : "border-zinc-200 text-zinc-500"
                        }`}
                      >
                        <CreditCard className="w-4 h-4 shrink-0" />
                        {lang === "it" ? "Carta Online" : "Card Online"}
                      </button>
                    </div>
                  </div>

                  {/* Pricing preview */}
                  <div className="pt-2 border-t border-zinc-100 flex justify-between items-center text-zinc-800">
                    <div>
                      <span className="font-bold text-xs">{lang === "it" ? "Totale:" : "Total:"}</span>
                      <p className="text-[9px] text-amber-600 font-medium">
                        +{pointsFromOrder} {lang === "it" ? "punti fedeltà" : "loyalty points"}
                      </p>
                    </div>
                    <span className="text-lg font-black text-zinc-900">€ {cartSubtotal.toFixed(2)}</span>
                  </div>

                  {/* Final Checkout CTA Button */}
                  <button
                    onClick={handleCheckoutClick}
                    className={`w-full py-2.5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition active:scale-95 text-xs font-extrabold uppercase tracking-wider ${
                      paymentMethod === "card"
                        ? "bg-amber-500 hover:bg-amber-600 text-zinc-950"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {paymentMethod === "card" ? (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>{lang === "it" ? "Paga con Carta Online" : "Pay Online with Card"}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === "it" ? "Procedi con l'Ordine" : "Place Order on WhatsApp"}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* SECURE CARD PAYMENT POPUP SIMULATOR */}
        <AnimatePresence>
          {paymentOpen && (
            <div className="absolute inset-0 bg-zinc-950/80 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl flex flex-col gap-4 relative"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-extrabold text-zinc-800 flex items-center gap-1.5">
                    <ShieldCheck className="text-emerald-500 w-4 h-4" />
                    {lang === "it" ? "Pagamento Protetto" : "Secure Payment"}
                  </h4>
                  <button
                    onClick={() => setPaymentOpen(false)}
                    className="w-7 h-7 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600 hover:bg-zinc-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Virtual credit card item */}
                <div className="bg-gradient-to-tr from-amber-500 to-red-600 text-white p-4.5 rounded-2xl shadow-lg relative overflow-hidden flex flex-col justify-between h-32">
                  <div className="absolute -right-6 -bottom-6 opacity-10">
                    <CreditCard className="w-28 h-28" />
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-bold tracking-widest opacity-85">GUSTO CARD</span>
                    <Landmark className="w-4 h-4 opacity-85" />
                  </div>

                  <div className="text-sm font-mono tracking-widest my-1.5">
                    {cardNumber ? formatCardNum(cardNumber) : "•••• •••• •••• ••••"}
                  </div>

                  <div className="flex justify-between items-end text-[9px] font-mono">
                    <div>
                      <span className="text-[6px] block opacity-50">TITOLARE</span>
                      <span className="uppercase truncate max-w-[150px] inline-block">
                        {cardName ? cardName.toUpperCase() : "NOME COGNOME"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[6px] block opacity-50">SCADENZA</span>
                      <span>{cardExpiry ? formatCardExpiryStr(cardExpiry) : "MM/AA"}</span>
                    </div>
                  </div>
                </div>

                {/* Form fields for credit card data */}
                <div className="space-y-2">
                  <div>
                    <label className="block text-[8px] font-bold text-zinc-500 mb-0.5 uppercase tracking-wider">
                      {lang === "it" ? "Numero Carta" : "Card Number"}
                    </label>
                    <input
                      type="text"
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNum(e.target.value))}
                      className="w-full border border-zinc-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-500 mb-0.5 uppercase tracking-wider">
                        {lang === "it" ? "Scadenza" : "Expiry"}
                      </label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatCardExpiryStr(e.target.value))}
                        className="w-full border border-zinc-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500 font-mono text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-zinc-500 mb-0.5 uppercase tracking-wider">CVV</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength={3}
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ""))}
                        className="w-full border border-zinc-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500 font-mono text-center"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[8px] font-bold text-zinc-500 mb-0.5 uppercase tracking-wider">
                      {lang === "it" ? "Nome Titolare" : "Cardholder Name"}
                    </label>
                    <input
                      type="text"
                      placeholder="Mario Rossi"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full border border-zinc-200 rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <button
                  onClick={processMockCardPayment}
                  disabled={isProcessingPayment || paymentDone}
                  className="w-full mt-1 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2.5 rounded-xl text-xs transition flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>{lang === "it" ? "Transazione in corso..." : "Processing transaction..."}</span>
                    </>
                  ) : paymentDone ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>{lang === "it" ? "Pagamento Eseguito!" : "Payment Approved!"}</span>
                    </>
                  ) : (
                    <span>{lang === "it" ? "Conferma e Paga" : "Confirm & Pay"}</span>
                  )}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }
