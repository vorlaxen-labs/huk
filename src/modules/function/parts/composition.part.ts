export class Composition {
  public static pipe<T>(...fns: Array<(arg: T) => T>) {
    return (value: T): T => fns.reduce((acc, fn) => fn(acc), value);
  }

  public static compose<T>(...fns: Array<(arg: T) => T>) {
    return (value: T): T => fns.reduceRight((acc, fn) => fn(acc), value);
  }
}