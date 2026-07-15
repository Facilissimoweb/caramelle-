export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return typeof window !== "undefined" ? localStorage.getItem(key) : null;
    } catch (e) {
      console.warn(`[SafeStorage] Failed to read key "${key}" from localStorage (sandboxed environment):`, e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(`[SafeStorage] Failed to write key "${key}" to localStorage (sandboxed environment):`, e);
    }
  },
  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] Failed to remove key "${key}" from localStorage (sandboxed environment):`, e);
    }
  }
};

export const safeCookies = {
  get: (): string => {
    try {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        return document.cookie || "";
      }
    } catch (e) {
      console.warn("[SafeStorage] Failed to read document.cookie (sandboxed environment):", e);
    }
    return "";
  },
  set: (value: string): void => {
    try {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        document.cookie = value;
      }
    } catch (e) {
      console.warn("[SafeStorage] Failed to write document.cookie (sandboxed environment):", e);
    }
  }
};

