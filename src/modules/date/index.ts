import { createModule } from '../../core/create-module';
import { dateValidation } from './parts/validation.part';
import { dateTransform } from './parts/transform.part';
import { dateFormat } from './parts/format.part';

const Validation = createModule(dateValidation);
const Transform = createModule(dateTransform);
const Format = createModule(dateFormat);

export const date = { ...Validation, ...Transform, ...Format };

export const {
    // validation
    isValid, isLeapYear, isBefore, isAfter, isSameDay, isWeekend, isToday,
    // transform
    add, subtract, startOf,
    // format
    format, toISODate, relative
} = date;

export type DateModule = typeof date;