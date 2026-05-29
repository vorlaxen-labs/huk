export type CurrencyOptions = {
  currency?: string;
  locale?: string;
  decimals?: number;
};

export type FormatOptions = {
  locale?: string;
  decimals?: number;
  notation?: "standard" | "scientific" | "engineering" | "compact";
};

export const numberFormat = {
  format: (value: number, options: FormatOptions = {}): string => {
    const { locale = "en-US", decimals, notation = "standard" } = options;
    return new Intl.NumberFormat(locale, {
      notation,
      ...(decimals !== undefined && {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    }).format(value);
  },

  currency: (value: number, options: CurrencyOptions = {}): string => {
    const { currency = "USD", locale = "en-US", decimals = 2 } = options;
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  },

  compact: (value: number, locale = "en-US"): string =>
    new Intl.NumberFormat(locale, { notation: "compact" }).format(value),

  ordinal: (value: number, locale = "en-US"): string => {
    const pr = new Intl.PluralRules(locale, { type: "ordinal" });
    const suffixes: Record<string, string> = {
      one: "st",
      two: "nd",
      few: "rd",

      other: "th",
    };
    const rule = pr.select(value);
    const suffix = suffixes[rule] ?? "th";
    return `${value}${suffix}`;
  },

  bytes: (value: number, decimals = 2): string => {
    if (value === 0) return "0 B";
    const k = 1024;
    const units = ["B", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(Math.abs(value)) / Math.log(k));
    const clamped = Math.min(i, units.length - 1);
    return `${parseFloat((value / Math.pow(k, clamped)).toFixed(decimals))} ${units[clamped]}`;
  },

  pad: (value: number, length: number, char = "0"): string =>
    String(value).padStart(length, char),
};
