import { createModule } from '../../core/create-module';
import { StringTransform } from './parts/transform.part';
import { StringSecurity } from './parts/security.part';
import { StringValidation } from './parts/validation.part';

const Transform  = createModule(StringTransform);
const Security   = createModule(StringSecurity);
const Validation = createModule(StringValidation);

export const string = { ...Transform, ...Security, ...Validation };

export type StringModule = typeof string;

export const {
  slugify,
  truncate,
  toPascalCase,
  toCamelCase,
  mask,
  secureRandom,
  escapeHtml,
  isEmail,
  isStrongPassword,
  isEmpty,
} = string;