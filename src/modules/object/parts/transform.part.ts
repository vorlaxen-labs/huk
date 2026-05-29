export const objectTransform = {
  clone: <T>(obj: T): T => JSON.parse(JSON.stringify(obj)),

  merge: <T extends Record<string, any>>(target: T, source: Partial<T>): T => {
    const result = { ...target };

    for (const key in source) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (sourceValue !== null && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
        // Hata burada oluşuyordu, (result[key] as any) kullanarak tipi esnetiyoruz
        result[key as keyof T] = objectTransform.merge(
          (targetValue || {}) as any, 
          sourceValue as any
        );
      } else {
        result[key as keyof T] = sourceValue as any;
      }
    }
    return result;
  }
};