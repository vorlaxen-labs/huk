export class StringValidation {
  public static isEmail(str: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  public static isStrongPassword(str: string): boolean {
    // Min 8 chars, 1 upper, 1 lower, 1 number, 1 special
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(str);
  }

  public static isEmpty(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
  }
}