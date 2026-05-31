export class StringTransform {
  public static slugify(str: string): string {
    const charMap: Record<string, string> = {
      'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'İ': 'i',
      'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u'
    };

    let result = str;

    Object.keys(charMap).forEach(key => {
      result = result.replace(new RegExp(key, 'g'), charMap[key]);
    });

    return result
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  public static truncate(str: string, length: number = 30, suffix: string = '...'): string {
    return str.length <= length ? str : str.substring(0, length).trim() + suffix;
  }

  public static toPascalCase(str: string): string {
    return (str.match(/[a-zA-Z0-9]+/g) || [])
      .map(w => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase())
      .join('');
  }

  public static toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  public static toTitleCase(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  public static toSentenceCase(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  public static removeWhitespace(str: string): string {
    return str.replace(/\s+/g, '');
  }

  public static truncateWords(str: string, limit: number = 20, suffix: string = '...'): string {
    if (str.length <= limit) return str;
    const sub = str.substring(0, limit);
    return sub.substring(0, Math.min(sub.length, sub.lastIndexOf(' '))) + suffix;
  }

  public static removeNumbers(str: string): string {
    return str.replace(/[0-9]/g, '');
  }

  public static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  public static interpolate = (template: string, values: Record<string, any>) => {
    return template.replace(/{(\w+)}/g, (_, key) => values[key] ?? `{${key}}`);
  };
}