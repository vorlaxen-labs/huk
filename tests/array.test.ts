import { HuK } from '../src';

describe('HuK - ArrayModule', () => {

  describe('Transformations', () => {
    test('compact: should remove falsy values', () => {
      const input = [1, 0, null, 'hello', undefined, false, ''];
      expect(HuK.array.compact(input)).toEqual([1, 'hello']);
    });

    test('unique: should remove duplicates', () => {
      const input = [1, 2, 2, 3, 4, 4, 5];
      expect(HuK.array.unique(input)).toEqual([1, 2, 3, 4, 5]);
    });

    test('flatten: should flatten nested arrays', () => {
      const input = [1, [2, [3, [4]], 5]];
      expect(HuK.array.flatten(input)).toEqual([1, 2, 3, 4, 5]);
    });

    test('shuffle: should return array of same length with same elements', () => {
      const input = [1, 2, 3, 4, 5];
      const result = HuK.array.shuffle(input);
      expect(result).toHaveLength(input.length);
      expect(result.sort()).toEqual(input.sort());
    });
  });

  describe('Utils', () => {
    test('first: should return the first element', () => {
      expect(HuK.array.first([10, 20, 30])).toBe(10);
      expect(HuK.array.first([])).toBeUndefined();
    });

    test('last: should return the last element', () => {
      expect(HuK.array.last([10, 20, 30])).toBe(30);
      expect(HuK.array.last([])).toBeUndefined();
    });

    test('groupBy: should group items by a property', () => {
      const data = [
        { category: 'A', value: 1 },
        { category: 'B', value: 2 },
        { category: 'A', value: 3 },
      ];
      const grouped = HuK.array.groupBy(data, (item) => item.category);
      expect(grouped).toEqual({
        A: [{ category: 'A', value: 1 }, { category: 'A', value: 3 }],
        B: [{ category: 'B', value: 2 }],
      });
    });
  });

});