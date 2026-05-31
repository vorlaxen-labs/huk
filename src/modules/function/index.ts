export { Timing } from './parts/timing.part';
export { Composition } from './parts/composition.part';
export { Control } from './parts/control.part';

import { Timing } from './parts/timing.part';
import { Composition } from './parts/composition.part';
import { Control } from './parts/control.part';

export const fn = {
  debounce: Timing.debounce,
  throttle: Timing.throttle,
  sleep: Timing.sleep,
  pipe: Composition.pipe,
  compose: Composition.compose,
  once: Control.once,
  memoize: Control.memoize,
  retry: Control.retry,
};

export type FnModule = typeof fn;