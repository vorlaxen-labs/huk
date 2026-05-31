import { randomBytes } from 'crypto';

export class StringSecurity {
  /**
   * @description Masks sensitive data. e.g. "4444********1111"
   */
  public static mask(str: string, options?: { visibleStart?: number; visibleEnd?: number; char?: string }): string {
    const { visibleStart = 0, visibleEnd = 4, char = '*' } = options || {};
    if (str.length <= visibleStart + visibleEnd) return str;
    
    const start = str.slice(0, visibleStart);
    const end = str.slice(-visibleEnd);
    const middle = char.repeat(str.length - (visibleStart + visibleEnd));
    return `${start}${middle}${end}`;
  }

  /**
   * @description Cryptographically secure random string.
   */
  public static secureRandom(length: number = 16): string {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  /**
   * @description Simple escape for HTML to prevent XSS.
   */
  public static escapeHtml(str: string): string {
    const tagsToReplace: Record<string, string> = {
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    };
    return str.replace(/[&<>"']/g, (tag) => tagsToReplace[tag] || tag);
  }
}