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

  public static interpolate = (template: string, values: Record<string, any>) => {
    return template.replace(/{(\w+)}/g, (_, key) => values[key] ?? `{${key}}`);
  };
}