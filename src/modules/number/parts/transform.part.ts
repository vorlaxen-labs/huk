export const numberTransform = {
  clamp: (value: number, min: number, max: number): number =>
    Math.min(Math.max(value, min), max),

  round: (value: number, decimals = 0): number => {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  },

  floor: (value: number, decimals = 0): number => {
    const factor = Math.pow(10, decimals);
    return Math.floor(value * factor) / factor;
  },

  ceil: (value: number, decimals = 0): number => {
    const factor = Math.pow(10, decimals);
    return Math.ceil(value * factor) / factor;
  },

  lerp: (start: number, end: number, t: number): number =>
    start + (end - start) * t,

  normalize: (value: number, min: number, max: number): number =>
    max === min ? 0 : (value - min) / (max - min),

  toFixed: (value: number, decimals: number): number =>
    parseFloat(value.toFixed(decimals)),

  abs: (value: number): number =>
    Math.abs(value),

  sum: (...values: number[]): number =>
    values.reduce((acc, v) => acc + v, 0),

  average: (...values: number[]): number =>
    values.length === 0 ? 0 : numberTransform.sum(...values) / values.length,

  median: (...values: number[]): number => {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  },
  
  percentage: (value: number, total: number, decimals = 1): number => {
    if (total === 0) return 0;
    const factor = Math.pow(10, decimals);
    return Math.round((value / total) * 100 * factor) / factor;
  },
};
