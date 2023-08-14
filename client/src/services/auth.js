export const SERVICE_URI = '/auth';
export const BASE_URI = '/v1';
export const AUTH_URI = '/v1/local';

export const getCurrentUserDetails = async () =>
  fetch(`${window._env_.API_BACKEND_URL}${SERVICE_URI}${BASE_URI}/current`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((resp) => (resp.ok ? resp.json() : Promise.reject(resp)));
