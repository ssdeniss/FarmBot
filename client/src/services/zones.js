import { genericService } from '../helpers/api';

export const SERVICE_URI = '/backend/api';
export const BASE_URI = '/v1/zones';

export const { findOne, findAll, create, update, remove } = genericService(
  SERVICE_URI,
  BASE_URI,
);
