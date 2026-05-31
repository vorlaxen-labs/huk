import { createModule } from '../../core/create-module';
import { numberValidation } from './parts/validation.part';
import { numberTransform } from './parts/transform.part';
import { numberFormat } from './parts/format.part';

const Validation = createModule(numberValidation);
const Transform  = createModule(numberTransform);
const Format     = createModule(numberFormat);

export const number = { ...Validation, ...Transform, ...Format };

export type NumberModule = typeof number;

export const {
  // validation
  isNumber,
  isInteger,
  isFloat,
  isFinite,
  isPositive,
  isNegative,
  isZero,
  isBetween,
  isMultipleOf,
  isSafeInteger,
  // transform
  clamp,
  round,
  floor,
  ceil,
  lerp,
  normalize,
  toFixed,
  abs,
  sum,
  average,
  median,
  percentage,
  // format
  format,
  currency,
  compact,
  ordinal,
  bytes,
  pad,
} = number;

export type { CurrencyOptions, FormatOptions } from './parts/format.part';
