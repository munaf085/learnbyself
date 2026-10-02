export interface IStorageDriver {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

class MemoryStorageDriver implements IStorageDriver {
  private store: Map<string, string> = new Map();

  getItem(key: string): string | null {
    return this.store.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
}

class BrowserLocalStorageDriver implements IStorageDriver {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  }
  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  }
  removeItem(key: string): void {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  }
  clear(): void {
    if (typeof window === 'undefined') return;
    window.localStorage.clear();
  }
}

class StorageManager {
  private driver: IStorageDriver;
  private prefix: string = 'lbs:';

  constructor(driver?: IStorageDriver) {
    if (driver) {
      this.driver = driver;
    } else if (typeof window !== 'undefined' && window.localStorage) {
      this.driver = new BrowserLocalStorageDriver();
    } else {
      this.driver = new MemoryStorageDriver();
    }
  }

  setDriver(driver: IStorageDriver): void {
    this.driver = driver;
  }

  get<T>(key: string, fallback: T): T {
    try {
      const raw = this.driver.getItem(this.prefix + key);
      if (!raw) return fallback;
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      this.driver.setItem(this.prefix + key, JSON.stringify(value));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  remove(key: string): void {
    this.driver.removeItem(this.prefix + key);
  }
}

export const storage = new StorageManager();
export { MemoryStorageDriver, BrowserLocalStorageDriver };
