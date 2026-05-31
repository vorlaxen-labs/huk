import { createModule } from '../../core/create-module';
import { objectTransform } from './parts/transform.part';
import { objectQuery } from './parts/query.part';

const Transform = createModule(objectTransform);
const Query     = createModule(objectQuery);

export const object = { ...Transform, ...Query };

export type ObjectModule = typeof object;

export const { clone, merge, get, pick } = object;