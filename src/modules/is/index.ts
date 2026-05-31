export const is = {
  string: (val: unknown): val is string => typeof val === 'string',
  number: (val: unknown): val is number => typeof val === 'number' && !isNaN(val),
  boolean: (val: unknown): val is boolean => typeof val === 'boolean',
  
  array: (val: unknown): val is any[] => Array.isArray(val),
  object: (val: unknown): val is Record<string, any> => 
    typeof val === 'object' && val !== null && !Array.isArray(val),
  
  empty: (val: unknown): boolean => {
    if (val === null || val === undefined) return true;
    if (typeof val === 'string' && val.trim() === '') return true;
    if (Array.isArray(val) && val.length === 0) return true;
    if (typeof val === 'object' && Object.keys(val as object).length === 0) return true;
    return false;
  }
};

export type IsModule = typeof is;
