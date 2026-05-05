import { StringTransform } from './parts/transform.part';
import { StringSecurity } from './parts/security.part';
import { StringValidation } from './parts/validation.part';

export class StringModule {
  // Transformation Group
  public readonly slugify = StringTransform.slugify;
  public readonly truncate = StringTransform.truncate;
  public readonly toPascalCase = StringTransform.toPascalCase;
  public readonly toCamelCase = StringTransform.toCamelCase;

  // Security Group
  public readonly mask = StringSecurity.mask;
  public readonly secureRandom = StringSecurity.secureRandom;
  public readonly escapeHtml = StringSecurity.escapeHtml;

  // Validation Group
  public readonly isEmail = StringValidation.isEmail;
  public readonly isStrongPassword = StringValidation.isStrongPassword;
  public readonly isEmpty = StringValidation.isEmpty;
}