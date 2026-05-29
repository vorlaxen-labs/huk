export class Control {
  public static once<T extends (...args: any[]) => any>(fn: T) {
    let called = false;
    let result: ReturnType<T>;
    return (...args: Parameters<T>): ReturnType<T> => {
      if (!called) {
        called = true;
        result = fn(...args);
      }
      return result;
    };
  }

  public static memoize<T extends (...args: any[]) => any>(fn: T) {
    const cache = new Map<string, ReturnType<T>>();
    return (...args: Parameters<T>): ReturnType<T> => {
      const key = JSON.stringify(args);
      if (cache.has(key)) return cache.get(key)!;
      const result = fn(...args);
      cache.set(key, result);
      return result;
    };
  }

  public static async retry<T>(
    fn: () => Promise<T>,
    attempts: number = 3,
    delayMs: number = 300
  ): Promise<T> {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (e) {
        if (i === attempts - 1) throw e;
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
    throw new Error('HuK fn.retry: unreachable');
  }
}