import { genericService, get } from '../../helpers/api';

export const SERVICE_URI = '/backend/api';
export const BASE_URI = '/v1/tax/app-parameters';

export const { findAll, findOne, create, update, remove } = genericService(
  SERVICE_URI,
  BASE_URI,
);

export const findByCode = (code) =>
  get(`${SERVICE_URI}${BASE_URI}/code/${code}`);
