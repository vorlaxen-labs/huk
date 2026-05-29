const isBrowser = (): boolean => {
  try {
    return typeof window !== 'undefined' &&
           typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
};

export const storage = {
  set: <T>(key: string, value: T): void => {
    if (!isBrowser()) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('HuK Storage: Set error', e);
    }
  },

  get: <T>(key: string, defaultValue: T | null = null): T | null => {
    if (!isBrowser()) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  remove: (key: string): void => {
    if (!isBrowser()) return;
    localStorage.removeItem(key);
  },

  clear: (): void => {
    if (!isBrowser()) return;
    localStorage.clear();
  }
};

export type StorageModule = typeof storage;
