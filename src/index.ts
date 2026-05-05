import { StringModule } from './modules/string/string.module';

class HuK {
  public readonly string = new StringModule();
}

export const huk = new HuK();