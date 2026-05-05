import { string } from './modules/string/string.module';

class HuKs {
  public readonly string = string;
}

export const HuK = new HuKs();
export type { StringModule } from './modules/string/string.module';