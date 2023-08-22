import {
  genericService,
  post,
  get,
  put,
  remove as customRemove,
} from '../helpers/api';

export const SERVICE_URI = '/users';
export const BASE_URI = '/v1/users';

export const { findAll, findOne, create, update, remove } = genericService(
  SERVICE_URI,
  BASE_URI,
);

export const register = (user) =>
  post(`${SERVICE_URI}${BASE_URI}/register`, user);

export const forgot = ({ email }) =>
  post(`${SERVICE_URI}${BASE_URI}/reset`, { email });

export const reset = (token, payload) =>
  post(`${SERVICE_URI}${BASE_URI}/reset/${token}`, payload);

export const getCurrent = () => get(`${SERVICE_URI}${BASE_URI}/current`);

export const getHeaderDetails = (id) =>
  get(`${SERVICE_URI}${BASE_URI}/header/${id}`);

export const updateCurrent = (user) =>
  put(`${SERVICE_URI}${BASE_URI}/current`, user);

export const getSubordinates = (id) =>
  get(`${SERVICE_URI}${BASE_URI}/subordinates/${id}`);

export const getUsersByPostId = (postId) =>
  get(`${SERVICE_URI}${BASE_URI}/by-post-id/${postId}`);

export const findAllByIds = (ids) =>
  get(`${SERVICE_URI}${BASE_URI}/by-ids/${ids}`);

export const resetPassword = (id, password) =>
  post(`${SERVICE_URI}${BASE_URI}/reset-password/${id}`, password);

export const setAvatar = (imageBase64) =>
  post(`${SERVICE_URI}${BASE_URI}/set-avatar`, imageBase64);

export const deleteAvatar = () =>
  customRemove(`${SERVICE_URI}${BASE_URI}/delete-avatar`);

export const getPersonsLikeName = (name) =>
  get(`${SERVICE_URI}${BASE_URI}/get-like/${name}`);
