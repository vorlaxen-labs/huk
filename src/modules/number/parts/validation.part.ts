export const numberValidation = {
  isNumber: (value: unknown): value is number =>
    typeof value === "number" && !Number.isNaN(value),

  isInteger: (value: unknown): value is number =>
    Number.isInteger(value),

  isFloat: (value: unknown): value is number =>
    typeof value === "number" && !Number.isNaN(value) && !Number.isInteger(value),

  isFinite: (value: unknown): value is number =>
    typeof value === "number" && Number.isFinite(value),

  isPositive: (value: number): boolean =>
    value > 0,

  isNegative: (value: number): boolean =>
    value < 0,

  isZero: (value: number): boolean =>
    value === 0,

  isBetween: (value: number, min: number, max: number, inclusive = true): boolean =>
    inclusive ? value >= min && value <= max : value > min && value < max,

  isMultipleOf: (value: number, factor: number): boolean =>
    factor !== 0 && value % factor === 0,

  isSafeInteger: (value: unknown): value is number =>
    Number.isSafeInteger(value),
};
