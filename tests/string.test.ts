import { huk } from '../src';

describe('HuK - StringModule', () => {
  
  describe('Transformations', () => {
    test('slugify: should convert complex strings to URL-friendly slugs', () => {
      const input = 'Hello World! Bu Bir Testtir @2026';
      const expected = 'hello-world-bu-bir-testtir-2026';
      expect(huk.string.slugify(input)).toBe(expected);
    });

    test('slugify: should handle Turkish characters correctly', () => {
      const input = 'çalışma ekranı şifreleme';
      const expected = 'calisma-ekrani-sifreleme';
      expect(huk.string.slugify(input)).toBe(expected);
    });

    test('truncate: should cut string and append suffix', () => {
      const text = 'This is a very long text for testing purposes';
      expect(huk.string.truncate(text, 10)).toBe('This is a...');
    });

    test('case conversion: should convert to PascalCase and camelCase', () => {
      const input = 'hello_world-test';
      expect(huk.string.toPascalCase(input)).toBe('HelloWorldTest');
      expect(huk.string.toCamelCase(input)).toBe('helloWorldTest');
    });
  });

  describe('Security', () => {
    test('mask: should hide middle characters', () => {
      const card = '1234567812345678';
      // Default: last 4 visible
      expect(huk.string.mask(card)).toBe('************5678');
    });

    test('mask: should handle custom options', () => {
      const phone = '905554443322';
      const masked = huk.string.mask(phone, { visibleStart: 2, visibleEnd: 2, char: '#' });
      expect(masked).toBe('90########22');
    });

    test('secureRandom: should return string of correct length', () => {
      const len = 32;
      const random = huk.string.secureRandom(len);
      expect(random).toHaveLength(len);
      expect(typeof random).toBe('string');
    });

    test('escapeHtml: should prevent XSS by escaping tags', () => {
      const unsafe = '<script>alert("xss")</script>';
      const safe = huk.string.escapeHtml(unsafe);
      expect(safe).not.toContain('<script>');
      expect(safe).toContain('&lt;script&gt;');
    });
  });

  describe('Validation', () => {
    test('isEmail: should validate email formats', () => {
      expect(huk.string.isEmail('test@vorlaxen.com')).toBe(true);
      expect(huk.string.isEmail('invalid-email')).toBe(false);
    });

    test('isStrongPassword: should validate complexity', () => {
      expect(huk.string.isStrongPassword('Weak123')).toBe(false); // no special char
      expect(huk.string.isStrongPassword('Strong@123')).toBe(true);
    });

    test('isEmpty: should check null, undefined and empty strings', () => {
      expect(huk.string.isEmpty('')).toBe(true);
      expect(huk.string.isEmpty('   ')).toBe(true);
      expect(huk.string.isEmpty('Hakan')).toBe(false);
    });
  });

});