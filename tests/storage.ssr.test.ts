/**
 * @jest-environment node
 */
import { HuK } from '../src';

describe('HuK - StorageModule (SSR / Node)', () => {
  test('set: should not throw in SSR environment', () => {
    expect(() => HuK.storage.set('key', 'value')).not.toThrow();
  });

  test('get: should return default value in SSR environment', () => {
    expect(HuK.storage.get('key', 'fallback')).toBe('fallback');
  });

  test('remove: should not throw in SSR environment', () => {
    expect(() => HuK.storage.remove('key')).not.toThrow();
  });

  test('clear: should not throw in SSR environment', () => {
    expect(() => HuK.storage.clear()).not.toThrow();
  });
});