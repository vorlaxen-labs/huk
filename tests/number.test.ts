import { HuK } from '../src';

describe('HuK - NumberModule', () => {

  describe('Validation', () => {
    test('isNumber: should return true for valid numbers', () => {
      expect(HuK.number.isNumber(42)).toBe(true);
      expect(HuK.number.isNumber(0)).toBe(true);
      expect(HuK.number.isNumber(-3.14)).toBe(true);
    });

    test('isNumber: should return false for NaN and non-numbers', () => {
      expect(HuK.number.isNumber(NaN)).toBe(false);
      expect(HuK.number.isNumber('42')).toBe(false);
      expect(HuK.number.isNumber(null)).toBe(false);
    });

    test('isInteger: should distinguish integers from floats', () => {
      expect(HuK.number.isInteger(5)).toBe(true);
      expect(HuK.number.isInteger(5.5)).toBe(false);
    });

    test('isFloat: should return true only for decimal numbers', () => {
      expect(HuK.number.isFloat(3.14)).toBe(true);
      expect(HuK.number.isFloat(3)).toBe(false);
    });

    test('isBetween: should check inclusive range by default', () => {
      expect(HuK.number.isBetween(5, 1, 10)).toBe(true);
      expect(HuK.number.isBetween(1, 1, 10)).toBe(true);
      expect(HuK.number.isBetween(10, 1, 10)).toBe(true);
      expect(HuK.number.isBetween(11, 1, 10)).toBe(false);
    });

    test('isBetween: should respect exclusive range flag', () => {
      expect(HuK.number.isBetween(1, 1, 10, false)).toBe(false);
      expect(HuK.number.isBetween(10, 1, 10, false)).toBe(false);
      expect(HuK.number.isBetween(5, 1, 10, false)).toBe(true);
    });

    test('isMultipleOf: should detect factor relationships', () => {
      expect(HuK.number.isMultipleOf(12, 4)).toBe(true);
      expect(HuK.number.isMultipleOf(7, 3)).toBe(false);
      expect(HuK.number.isMultipleOf(10, 0)).toBe(false);
    });

    test('isPositive / isNegative / isZero: should classify sign correctly', () => {
      expect(HuK.number.isPositive(5)).toBe(true);
      expect(HuK.number.isNegative(-3)).toBe(true);
      expect(HuK.number.isZero(0)).toBe(true);
      expect(HuK.number.isPositive(-1)).toBe(false);
    });
  });

  describe('Transformations', () => {
    test('clamp: should constrain value within min/max range', () => {
      expect(HuK.number.clamp(5, 1, 10)).toBe(5);
      expect(HuK.number.clamp(-99, 1, 10)).toBe(1);
      expect(HuK.number.clamp(99, 1, 10)).toBe(10);
    });

    test('round: should round to specified decimal places', () => {
      expect(HuK.number.round(3.14159, 2)).toBe(3.14);
      expect(HuK.number.round(3.145, 2)).toBe(3.15);
      expect(HuK.number.round(3.5)).toBe(4);
    });

    test('lerp: should interpolate correctly between two values', () => {
      expect(HuK.number.lerp(0, 100, 0.5)).toBe(50);
      expect(HuK.number.lerp(0, 100, 0)).toBe(0);
      expect(HuK.number.lerp(0, 100, 1)).toBe(100);
    });

    test('normalize: should map value to 0–1 range', () => {
      expect(HuK.number.normalize(50, 0, 100)).toBe(0.5);
      expect(HuK.number.normalize(0, 0, 100)).toBe(0);
      expect(HuK.number.normalize(100, 0, 100)).toBe(1);
    });

    test('normalize: should return 0 when min equals max', () => {
      expect(HuK.number.normalize(5, 5, 5)).toBe(0);
    });

    test('sum: should add all provided values', () => {
      expect(HuK.number.sum(1, 2, 3, 4, 5)).toBe(15);
      expect(HuK.number.sum(-5, 5)).toBe(0);
    });

    test('average: should compute arithmetic mean', () => {
      expect(HuK.number.average(1, 2, 3, 4, 5)).toBe(3);
      expect(HuK.number.average(10, 20)).toBe(15);
    });

    test('average: should return 0 for empty input', () => {
      expect(HuK.number.average()).toBe(0);
    });

    test('median: should return correct middle value for odd count', () => {
      expect(HuK.number.median(1, 3, 2)).toBe(2);
      expect(HuK.number.median(5, 1, 9, 3, 7)).toBe(5);
    });

    test('median: should average two middle values for even count', () => {
      expect(HuK.number.median(1, 2, 3, 4)).toBe(2.5);
    });

    test('percentage: should calculate correct ratio out of total', () => {
      expect(HuK.number.percentage(25, 200)).toBe(12.5);
      expect(HuK.number.percentage(1, 3)).toBe(33.3);
      expect(HuK.number.percentage(1, 3, 2)).toBe(33.33);
      expect(HuK.number.percentage(100, 100)).toBe(100);
    });

    test('percentage: should return 0 when total is 0', () => {
      expect(HuK.number.percentage(10, 0)).toBe(0);
      expect(typeof HuK.number.percentage(10, 0)).toBe('number');
    });
  });

  describe('Formatting', () => {
    test('format: should apply locale-based thousand separators', () => {
      expect(HuK.number.format(1234567)).toBe('1,234,567');
    });

    test('format: should respect decimal precision option', () => {
      expect(HuK.number.format(3.14159, { decimals: 2 })).toBe('3.14');
    });

    test('currency: should format as USD by default', () => {
      expect(HuK.number.currency(1234.5)).toBe('$1,234.50');
    });

    test('currency: should support custom currency and locale', () => {
      const result = HuK.number.currency(1000, { currency: 'EUR', locale: 'de-DE' });
      expect(result).toContain('1.000');
      expect(result).toContain('€');
    });

    test('compact: should shorten large numbers with suffix', () => {
      expect(HuK.number.compact(1500000)).toBe('1.5M');
      expect(HuK.number.compact(1200)).toBe('1.2K');
    });

    test('bytes: should convert raw byte count to human-readable size', () => {
      expect(HuK.number.bytes(0)).toBe('0 B');
      expect(HuK.number.bytes(1024)).toBe('1 KB');
      expect(HuK.number.bytes(1048576)).toBe('1 MB');
      expect(HuK.number.bytes(1073741824)).toBe('1 GB');
    });

    test('ordinal: should append correct English suffix', () => {
      expect(HuK.number.ordinal(1)).toBe('1st');
      expect(HuK.number.ordinal(2)).toBe('2nd');
      expect(HuK.number.ordinal(3)).toBe('3rd');
      expect(HuK.number.ordinal(11)).toBe('11th');
      expect(HuK.number.ordinal(21)).toBe('21st');
    });

    test('pad: should left-pad number with zeros to target length', () => {
      expect(HuK.number.pad(5, 3)).toBe('005');
      expect(HuK.number.pad(42, 5)).toBe('00042');
      expect(HuK.number.pad(1000, 3)).toBe('1000');
    });
  });

});
