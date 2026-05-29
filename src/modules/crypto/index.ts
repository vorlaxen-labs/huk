import { cryptoValidation } from "./parts/validation.part";

const getCrypto = (): Crypto | null => {
  if (typeof globalThis.crypto !== 'undefined') return globalThis.crypto;
  return null;
};

const cryptoObj = getCrypto();

export const crypto = {
  generateUuid: (): string => {
    if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  },

  toBase64: (data: string): string =>
    typeof Buffer !== 'undefined' ? Buffer.from(data).toString('base64') : btoa(data),

  fromBase64: (data: string): string =>
    typeof Buffer !== 'undefined' ? Buffer.from(data, 'base64').toString('utf-8') : atob(data),

  hash: async (data: string, salt: string = ''): Promise<string> => {
    const saltedData = data + salt;
    const subtle = cryptoObj?.subtle;

    if (subtle) {
      const encoder = new TextEncoder();
      const msgUint8 = encoder.encode(saltedData);
      const hashBuffer = await subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    const nodeCrypto = await import('node:crypto');
    return nodeCrypto.createHash('sha256').update(saltedData, 'utf8').digest('hex');
  },

  validate: cryptoValidation,
};

export type CryptoModule = typeof crypto;