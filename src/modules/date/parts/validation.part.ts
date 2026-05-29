import { createDate } from "../utils/date.util";

export const dateValidation = {
  isValid: (date: Date): boolean => !isNaN(createDate(date).getTime()),
  isLeapYear: (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0),
  isBefore: (d1: Date, d2: Date) => createDate(d1) < createDate(d2),
  isAfter: (d1: Date, d2: Date) => createDate(d1) > createDate(d2),
  isSameDay: (d1: Date, d2: Date) => createDate(d1).toDateString() === createDate(d2).toDateString(),
  isWeekend: (d: Date) => [0, 6].includes(createDate(d).getDay()),
  isToday: (d: Date) => createDate(d).toDateString() === new Date().toDateString(),
};