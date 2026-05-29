import { HuK } from '../src';

describe('HuK - DateModule', () => {

  describe('Validation', () => {
    test('isValid: should return true for valid dates', () => {
      expect(HuK.date.isValid(new Date())).toBe(true);
      expect(HuK.date.isValid(new Date('2026-05-28'))).toBe(true);
    });

    test('isValid: should return false for invalid date objects', () => {
      expect(HuK.date.isValid(new Date('invalid-date'))).toBe(false);
    });

    test('isLeapYear: should correctly identify leap years', () => {
      expect(HuK.date.isLeapYear(2024)).toBe(true);
      expect(HuK.date.isLeapYear(2025)).toBe(false);
      expect(HuK.date.isLeapYear(2000)).toBe(true);
    });

    test('isBefore / isAfter: should compare dates correctly', () => {
      const d1 = new Date('2026-01-01');
      const d2 = new Date('2026-01-02');
      expect(HuK.date.isBefore(d1, d2)).toBe(true);
      expect(HuK.date.isAfter(d2, d1)).toBe(true);
    });

    test('isSameDay: should ignore time and compare calendar day', () => {
      const d1 = new Date('2026-05-28T10:00:00');
      const d2 = new Date('2026-05-28T15:00:00');
      expect(HuK.date.isSameDay(d1, d2)).toBe(true);
    });

    test('isWeekend: should identify Saturday and Sunday', () => {
      expect(HuK.date.isWeekend(new Date('2026-05-30'))).toBe(true); // Cumartesi
      expect(HuK.date.isWeekend(new Date('2026-05-28'))).toBe(false); // Perşembe
    });
  });

  describe('Transformations', () => {
    test('add: should add specified units correctly', () => {
      const start = new Date('2026-05-28');
      const result = HuK.date.add(start, 5, 'day');
      expect(result.getDate()).toBe(2); // Haziranın 2'si
      expect(result.getMonth()).toBe(5); // 0-indexed: Haziran
    });

    test('subtract: should subtract specified units correctly', () => {
      const start = new Date('2026-05-28');
      const result = HuK.date.subtract(start, 5, 'day');
      expect(result.getDate()).toBe(23);
    });

    test('startOf: should reset to the beginning of the unit', () => {
      const date = new Date('2026-05-28T15:30:00');
      const dayStart = HuK.date.startOf(date, 'day');
      expect(dayStart.getHours()).toBe(0);
      expect(dayStart.getMinutes()).toBe(0);
    });
  });

  describe('Formatting', () => {
    test('format: should format date based on locale', () => {
      const date = new Date('2026-05-28');
      // "en-US" format "5/28/2026"
      expect(HuK.date.format(date, { locale: 'en-US' })).toBeDefined();
    });

    test('toISODate: should return YYYY-MM-DD format', () => {
      const date = new Date('2026-05-28T12:00:00Z');
      expect(HuK.date.toISODate(date)).toBe('2026-05-28');
    });

    test('relative: should return a string for relative time', () => {
      const pastDate = new Date(Date.now() - 60000); // 1 dk önce
      expect(typeof HuK.date.relative(pastDate)).toBe('string');
    });
  });
});