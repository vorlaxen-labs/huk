import { createModule } from '../../core/create-module';
import { arrayTransform } from './parts/transform.part';
import { arrayUtils } from './parts/utils.part';

const Transform = createModule(arrayTransform);
const Utils     = createModule(arrayUtils);

export const array = { ...Transform, ...Utils };

export type ArrayModule = typeof array;

export const {
  // transform
  compact, unique, flatten, shuffle,
  // utils
  first, last, groupBy
} = array;