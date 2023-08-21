import { genericService } from '../../helpers/api';

export const SERVICE_URI = '/backend/api';
export const BASE_URI = '/v1/plants';

export const { findAll, findOne, create, update, remove } = genericService(
  SERVICE_URI,
  BASE_URI,
);
