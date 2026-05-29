export const arrayUtils = {
  first: <T>(arr: T[]): T | undefined => arr[0],
  
  last: <T>(arr: T[]): T | undefined => arr[arr.length - 1],
  
  groupBy: <T, K extends string | number | symbol>(arr: T[], fn: (item: T) => K) => {
    return arr.reduce((acc, item) => {
      const key = fn(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {} as Record<K, T[]>);
  }
};