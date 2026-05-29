import { HuK } from '../src';

describe('HuK - StorageModule', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('set and get: should store and retrieve objects', () => {
    const user = { id: 1, name: 'Vorlaxen' };
    HuK.storage.set('user', user);
    expect(HuK.storage.get('user')).toEqual(user);
  });

  test('get: should return default value if key not found', () => {
    expect(HuK.storage.get('missing', 'default')).toBe('default');
  });

  test('remove: should remove item', () => {
    HuK.storage.set('key', 'value');
    HuK.storage.remove('key');
    expect(HuK.storage.get('key')).toBeNull();
  });

  test('clear: should remove all items', () => {
    HuK.storage.set('a', 1);
    HuK.storage.set('b', 2);
    HuK.storage.clear();
    expect(HuK.storage.get('a')).toBeNull();
    expect(HuK.storage.get('b')).toBeNull();
  });
});