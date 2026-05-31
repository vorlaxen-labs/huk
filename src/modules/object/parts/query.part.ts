export const objectQuery = {
  get: (obj: any, path: string, defaultValue?: any): any => {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue), obj);
  },
  
  pick: <T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
    return keys.reduce((acc, key) => {
      if (key in obj) acc[key] = obj[key];
      return acc;
    }, {} as Pick<T, K>);
  }
};