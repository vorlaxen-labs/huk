export type DateFormatOptions = {
    locale?: string;
    dateStyle?: "full" | "long" | "medium" | "short";
    timeStyle?: "full" | "long" | "medium" | "short";
    format?: string;
};

export const dateFormat = {
    format: (date: Date, options: DateFormatOptions = {}): string => {
        const { locale = "en-US", dateStyle, timeStyle } = options;
        return new Intl.DateTimeFormat(locale, { dateStyle, timeStyle }).format(date);
    },

    toISODate: (date: Date): string => date.toISOString().split('T')[0],

    relative: (date: Date, locale = "en-US"): string => {
        const now = new Date();
        const diffInSeconds = (date.getTime() - now.getTime()) / 1000;

        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

        const absDiff = Math.abs(diffInSeconds);

        if (absDiff < 60) return rtf.format(Math.round(diffInSeconds), 'second');
        if (absDiff < 3600) return rtf.format(Math.round(diffInSeconds / 60), 'minute');
        if (absDiff < 86400) return rtf.format(Math.round(diffInSeconds / 3600), 'hour');
        return rtf.format(Math.round(diffInSeconds / 86400), 'day');
    },

    part: (date: Date, part: Intl.DateTimeFormatPartTypes, locale = "en-US"): string => {
        const formatter = new Intl.DateTimeFormat(locale, { [part]: "long" });
        return formatter.format(date);
    }
};