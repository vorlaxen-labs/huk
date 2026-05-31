import { createDate } from "../utils/date.util";

const manipulate = (date: Date, amount: number, unit: 'date' | 'month' | 'fullYear', op: 'add' | 'sub' = 'add') => {
  const d = createDate(date);
  const val = d[`get${unit === 'date' ? 'Date' : unit === 'month' ? 'Month' : 'FullYear'}`]();
  d[`set${unit === 'date' ? 'Date' : unit === 'month' ? 'Month' : 'FullYear'}`](op === 'add' ? val + amount : val - amount);
  return d;
};

export const dateTransform = {
  add: (date: Date, amount: number, unit: 'day' | 'month' | 'year') => 
    manipulate(date, amount, unit === 'day' ? 'date' : unit === 'month' ? 'month' : 'fullYear'),
  subtract: (date: Date, amount: number, unit: 'day' | 'month' | 'year') => 
    manipulate(date, amount, unit === 'day' ? 'date' : unit === 'month' ? 'month' : 'fullYear', 'sub'),
  startOf: (date: Date, unit: 'day' | 'month' | 'year') => {
    const d = createDate(date);
    if (unit === 'day') d.setHours(0, 0, 0, 0);
    if (unit === 'month') d.setDate(1);
    if (unit === 'year') d.setMonth(0, 1);
    return d;
  }
};