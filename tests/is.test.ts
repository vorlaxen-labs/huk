import { HuK } from '../src';

describe('HuK - IsModule', () => {
  
  test('string: should validate strings correctly', () => {
    expect(HuK.is.string('hello')).toBe(true);
    expect(HuK.is.string(123)).toBe(false);
  });

  test('number: should validate numbers and reject NaN', () => {
    expect(HuK.is.number(10)).toBe(true);
    expect(HuK.is.number(NaN)).toBe(false);
    expect(HuK.is.number('10')).toBe(false);
  });

  test('array: should validate arrays', () => {
    expect(HuK.is.array([])).toBe(true);
    expect(HuK.is.array([1, 2])).toBe(true);
    expect(HuK.is.array({})).toBe(false);
  });

  test('object: should validate plain objects and reject null/arrays', () => {
    expect(HuK.is.object({})).toBe(true);
    expect(HuK.is.object({ a: 1 })).toBe(true);
    expect(HuK.is.object(null)).toBe(false);
    expect(HuK.is.object([])).toBe(false);
  });

  test('empty: should detect empty values correctly', () => {
    // Strings
    expect(HuK.is.empty('')).toBe(true);
    expect(HuK.is.empty('   ')).toBe(true);
    expect(HuK.is.empty('hello')).toBe(false);
    
    // Arrays
    expect(HuK.is.empty([])).toBe(true);
    expect(HuK.is.empty([1])).toBe(false);
    
    // Objects
    expect(HuK.is.empty({})).toBe(true);
    expect(HuK.is.empty({ a: 1 })).toBe(false);
    
    // Null/Undefined
    expect(HuK.is.empty(null)).toBe(true);
    expect(HuK.is.empty(undefined)).toBe(true);
  });
});