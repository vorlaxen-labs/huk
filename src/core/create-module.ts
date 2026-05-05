type StaticMethods<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: T[K];
};

export function createModule<T extends object>(ctor: T): StaticMethods<T> {
  return new Proxy({} as StaticMethods<T>, {
    get(_, key: string) {
      const val = (ctor as any)[key];
      if (typeof val === 'function') {
        return val.bind(ctor);
      }
      return val;
    },
    ownKeys() {
      return Object.getOwnPropertyNames(ctor)
        .filter((k) => typeof (ctor as any)[k] === 'function' && k !== 'length' && k !== 'name' && k !== 'prototype');
    },
    getOwnPropertyDescriptor(_, key) {
      const val = (ctor as any)[key];
      if (typeof val === 'function') {
        return { configurable: true, enumerable: true, value: val.bind(ctor) };
      }
    },
  });
}