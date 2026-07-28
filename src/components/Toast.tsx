import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <SingleToast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface SingleToastProps {
  key?: React.Key;
  toast: ToastMessage;
  onDismiss: (id: string) => void;
}

function SingleToast({
  toast,
  onDismiss,
}: SingleToastProps) {
  const duration = toast.duration ?? 4500;

  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  const config = {
    success: {
      bg: "bg-[#111113]",
      border: "border-emerald-500/40",
      accent: "bg-emerald-500",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
      badge: "SUCCESSO",
      badgeColor: "text-emerald-400 bg-emerald-950/80 border-emerald-800/50",
    },
    error: {
      bg: "bg-[#111113]",
      border: "border-rose-500/40",
      accent: "bg-rose-500",
      icon: <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
      badge: "ERRORE",
      badgeColor: "text-rose-400 bg-rose-950/80 border-rose-800/50",
    },
    warning: {
      bg: "bg-[#111113]",
      border: "border-amber-500/40",
      accent: "bg-amber-500",
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
      badge: "AVVISO",
      badgeColor: "text-amber-400 bg-amber-950/80 border-amber-800/50",
    },
    info: {
      bg: "bg-[#111113]",
      border: "border-sky-500/40",
      accent: "bg-sky-500",
      icon: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />,
      badge: "INFO",
      badgeColor: "text-sky-400 bg-sky-950/80 border-sky-800/50",
    },
  }[toast.type];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`pointer-events-auto relative overflow-hidden rounded-xl border shadow-2xl ${config.bg} ${config.border} p-4 text-white`}
    >
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 pr-6 space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase tracking-wider ${config.badgeColor}`}
            >
              {config.badge}
            </span>
            <h4 className="font-sans font-bold text-sm text-white leading-tight">
              {toast.title}
            </h4>
          </div>
          {toast.message && (
            <p className="font-sans text-xs text-white/80 leading-relaxed">
              {toast.message}
            </p>
          )}
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="absolute top-3 right-3 p-1 rounded-md text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Chiudi notifica"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar Animation */}
      {duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: duration / 1000, ease: "linear" }}
            className={`h-full ${config.accent}`}
          />
        </div>
      )}
    </motion.div>
  );
}
