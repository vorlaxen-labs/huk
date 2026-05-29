import { HuK } from '../src';

describe('HuK - FunctionModule', () => {

  describe('Timing', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.clearAllTimers());

    test('debounce: should only call the function after the delay', () => {
      const func = jest.fn();
      const debounced = HuK.fn.debounce(func, 1000);

      debounced();
      debounced();
      debounced();

      jest.advanceTimersByTime(500);
      expect(func).not.toHaveBeenCalled();

      jest.advanceTimersByTime(500);
      expect(func).toHaveBeenCalledTimes(1);
    });

    test('throttle: should only call the function once within the limit', () => {
      const func = jest.fn();
      const throttled = HuK.fn.throttle(func, 1000);

      throttled();
      expect(func).toHaveBeenCalledTimes(1);

      throttled();
      throttled();
      expect(func).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      throttled();
      expect(func).toHaveBeenCalledTimes(2);
    });

    test('sleep: should resolve after given milliseconds', async () => {
      let done = false;
      HuK.fn.sleep(1000).then(() => (done = true));

      jest.advanceTimersByTime(999);
      await Promise.resolve();
      expect(done).toBe(false);

      jest.advanceTimersByTime(1);
      await Promise.resolve();
      expect(done).toBe(true);
    });
  });

  describe('Composition', () => {
    const double = (x: number) => x * 2;
    const addTen = (x: number) => x + 10;
    const square = (x: number) => x * x;

    test('pipe: should apply functions left to right', () => {
      // (3 * 2) + 10 = 16 → 16^2 = 256
      expect(HuK.fn.pipe(double, addTen, square)(3)).toBe(256);
    });

    test('compose: should apply functions right to left', () => {
      // (3 * 2) + 10 = 16 → 16^2 = 256
      expect(HuK.fn.compose(square, addTen, double)(3)).toBe(256);
    });

    test('pipe: should return value unchanged with no functions', () => {
      expect(HuK.fn.pipe<number>()(5)).toBe(5);
    });

    test('compose: should return value unchanged with no functions', () => {
      expect(HuK.fn.compose<number>()(5)).toBe(5);
    });

    test('pipe and compose: should produce same result for inverse order', () => {
      expect(HuK.fn.pipe(double, addTen)(5)).toBe(HuK.fn.compose(addTen, double)(5));
    });
  });

  describe('Control', () => {
    test('once: should call the function only once', () => {
      const mock = jest.fn(() => 42);
      const onced = HuK.fn.once(mock);

      expect(onced()).toBe(42);
      expect(onced()).toBe(42);
      expect(onced()).toBe(42);
      expect(mock).toHaveBeenCalledTimes(1);
    });

    test('once: should always return the first call result', () => {
      let counter = 0;
      const onced = HuK.fn.once(() => ++counter);

      expect(onced()).toBe(1);
      expect(onced()).toBe(1);
      expect(counter).toBe(1);
    });

    test('memoize: should cache results and not recompute', () => {
      const mock = jest.fn((x: number) => x * 2);
      const memoized = HuK.fn.memoize(mock);

      expect(memoized(5)).toBe(10);
      expect(memoized(5)).toBe(10);
      expect(memoized(6)).toBe(12);
      expect(mock).toHaveBeenCalledTimes(2);
    });

    test('memoize: should differentiate by argument combination', () => {
      const mock = jest.fn((a: number, b: number) => a + b);
      const memoized = HuK.fn.memoize(mock);

      expect(memoized(1, 2)).toBe(3);
      expect(memoized(2, 1)).toBe(3);
      expect(mock).toHaveBeenCalledTimes(2); // (1,2) ve (2,1) farklı key
    });

    describe('retry', () => {
      beforeEach(() => jest.useRealTimers());

      test('retry: should resolve if function succeeds within attempts', async () => {
        let count = 0;
        const flaky = jest.fn(async () => {
          if (count++ < 2) throw new Error('fail');
          return 'ok';
        });

        const result = await HuK.fn.retry(flaky, 3, 0);
        expect(result).toBe('ok');
        expect(flaky).toHaveBeenCalledTimes(3);
      });

      test('retry: should throw after all attempts are exhausted', async () => {
        const alwaysFail = jest.fn(async () => {
          throw new Error('always fails');
        });

        await expect(HuK.fn.retry(alwaysFail, 3, 0)).rejects.toThrow('always fails');
        expect(alwaysFail).toHaveBeenCalledTimes(3);
      });

      test('retry: should succeed on first attempt if no error', async () => {
        const mock = jest.fn(async () => 'immediate');
        const result = await HuK.fn.retry(mock, 3, 0);

        expect(result).toBe('immediate');
        expect(mock).toHaveBeenCalledTimes(1);
      });
    });
  });

});