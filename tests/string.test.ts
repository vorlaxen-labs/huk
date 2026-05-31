import { HuK } from '../src';

describe('HuK - StringModule', () => {

  describe('Transformations', () => {
    test('slugify: should convert complex strings to URL-friendly slugs', () => {
      const input = 'Hello World! Bu Bir Testtir @2026';
      const expected = 'hello-world-bu-bir-testtir-2026';
      expect(HuK.string.slugify(input)).toBe(expected);
    });

    test('slugify: should handle Turkish characters correctly', () => {
      const input = 'çalışma ekranı şifreleme';
      const expected = 'calisma-ekrani-sifreleme';
      expect(HuK.string.slugify(input)).toBe(expected);
    });

    test('truncate: should cut string and append suffix', () => {
      const text = 'This is a very long text for testing purposes';
      expect(HuK.string.truncate(text, 10)).toBe('This is a...');
    });

    test('case conversion: should convert to PascalCase and camelCase', () => {
      const input = 'hello_world-test';
      expect(HuK.string.toPascalCase(input)).toBe('HelloWorldTest');
      expect(HuK.string.toCamelCase(input)).toBe('helloWorldTest');
    });

    test('toTitleCase: should capitalize first letter of each word', () => {
      const input = 'merhaba dünya bu bir test';
      expect(HuK.string.toTitleCase(input)).toBe('Merhaba Dünya Bu Bir Test');
    });

    test('toSentenceCase: should capitalize only the first letter of the sentence', () => {
      const input = 'merhaba dünya';
      expect(HuK.string.toSentenceCase(input)).toBe('Merhaba dünya');
    });

    test('removeWhitespace: should remove all whitespace from string', () => {
      const input = ' a b c ';
      expect(HuK.string.removeWhitespace(input)).toBe('abc');
    });

    test('truncateWords: should truncate without breaking words', () => {
      const text = 'Bu bir test mesajıdır';
      expect(HuK.string.truncateWords(text, 10)).toBe('Bu bir...');
    });

    test('removeNumbers: should strip all digits from the string', () => {
      const input = 'abc123def456';
      expect(HuK.string.removeNumbers(input)).toBe('abcdef');
    });

    test('reverse: should reverse the string', () => {
      const input = 'hello';
      expect(HuK.string.reverse(input)).toBe('olleh');
    });
  });

  describe('Security', () => {
    test('mask: should hide middle characters', () => {
      const card = '1234567812345678';
      // Default: last 4 visible
      expect(HuK.string.mask(card)).toBe('************5678');
    });

    test('mask: should handle custom options', () => {
      const phone = '905554443322';
      const masked = HuK.string.mask(phone, { visibleStart: 2, visibleEnd: 2, char: '#' });
      expect(masked).toBe('90########22');
    });

    test('secureRandom: should return string of correct length', () => {
      const len = 32;
      const random = HuK.string.secureRandom(len);
      expect(random).toHaveLength(len);
      expect(typeof random).toBe('string');
    });

    test('escapeHtml: should prevent XSS by escaping tags', () => {
      const unsafe = '<script>alert("xss")</script>';
      const safe = HuK.string.escapeHtml(unsafe);
      expect(safe).not.toContain('<script>');
      expect(safe).toContain('&lt;script&gt;');
    });
  });

  describe('Validation', () => {
    test('isEmail: should validate email formats', () => {
      expect(HuK.string.isEmail('test@vorlaxen.com')).toBe(true);
      expect(HuK.string.isEmail('invalid-email')).toBe(false);
    });

    test('isStrongPassword: should validate complexity', () => {
      expect(HuK.string.isStrongPassword('Weak123')).toBe(false); // no special char
      expect(HuK.string.isStrongPassword('Strong@123')).toBe(true);
    });

    test('isEmpty: should check null, undefined and empty strings', () => {
      expect(HuK.string.isEmpty('')).toBe(true);
      expect(HuK.string.isEmpty('   ')).toBe(true);
      expect(HuK.string.isEmpty('Hakan')).toBe(false);
    });
  });

});