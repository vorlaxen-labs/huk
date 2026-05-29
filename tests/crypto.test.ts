import { HuK } from '../src';

describe('HuK - CryptoModule', () => {

  test('generateUuid: should generate a valid UUID v4', () => {
    const uuid = HuK.crypto.generateUuid();
    expect(HuK.crypto.validate.isUuid(uuid)).toBe(true);
  });

  test('toBase64 / fromBase64: should encode and decode correctly', () => {
    const original = 'Vorlaxen-Labs';
    const encoded = HuK.crypto.toBase64(original);
    const decoded = HuK.crypto.fromBase64(encoded);
    
    expect(HuK.crypto.validate.isBase64(encoded)).toBe(true);
    expect(decoded).toBe(original);
  });

  test('hash: should produce consistent salted hashes', async () => {
    const data = 'my-secret-data';
    const salt = 'random-salt-123';
    
    const hash1 = await HuK.crypto.hash(data, salt);
    const hash2 = await HuK.crypto.hash(data, salt);
    
    expect(hash1).toBe(hash2);
    expect(HuK.crypto.validate.isSha256(hash1)).toBe(true);
  });

  test('hash: should produce different hashes with different salts', async () => {
    const data = 'my-secret-data';
    const hash1 = await HuK.crypto.hash(data, 'salt-1');
    const hash2 = await HuK.crypto.hash(data, 'salt-2');
    
    expect(hash1).not.toBe(hash2);
  });

  test('validate: should correctly validate security formats', () => {
    expect(HuK.crypto.validate.isSha256('a'.repeat(64))).toBe(true);
    expect(HuK.crypto.validate.isSha256('short')).toBe(false);
    expect(HuK.crypto.validate.isStrongSalt('short-salt', 5)).toBe(true);
    expect(HuK.crypto.validate.isStrongSalt('short', 10)).toBe(false);
  });
});