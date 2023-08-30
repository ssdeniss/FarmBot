import { post } from '../helpers/api';

export const SERVICE_URI = '/backend';
export const BASE_URI = '/api/v1/users';

export const changePassword = (data) =>
  post(`${SERVICE_URI}${BASE_URI}/change-password`, data);

export const update = (data) =>
  post(
    `${SERVICE_URI}${BASE_URI}/update-user/${data.name}/${data.avatar}`,
    data.image,
  );
