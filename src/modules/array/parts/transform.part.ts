export const arrayTransform = {
  compact: <T>(arr: T[]): T[] => arr.filter(Boolean),
  
  unique: <T>(arr: T[]): T[] => Array.from(new Set(arr)),
  
  flatten: <T>(arr: any[]): T[] => arr.flat(Infinity),
  
  shuffle: <T>(arr: T[]): T[] => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }
};