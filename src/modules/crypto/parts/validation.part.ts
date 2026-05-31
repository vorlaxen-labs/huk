export const cryptoValidation = {
  isUuid: (value: string): boolean => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  },

  isSha256: (value: string): boolean => {
    return /^[a-f0-9]{64}$/i.test(value);
  },

  isBase64: (value: string): boolean => {
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(value);
  },

  isStrongSalt: (salt: string, minLength: number = 16): boolean => {
    return typeof salt === 'string' && salt.length >= minLength;
  }
};