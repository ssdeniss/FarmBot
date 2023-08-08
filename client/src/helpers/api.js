const handleHttpErrors = (response) => {
  if (!response.ok) {
    switch (response.status) {
      case 401:
      case 403:
        window.location.href = '/';
        return Promise.reject(response);
      case 400:
      case 409:
        return response.json().then((envelope) =>
          // eslint-disable-next-line prefer-promise-reject-errors
          Promise.reject({
            inner: envelope.payload || envelope,
            status: response.status,
          }),
        );
      default:
        return Promise.reject(response);
    }
  }
  return response;
};

const flatObject = (object, target = {}, prev = '') => {
  Object.entries(object).forEach(([k, v]) => {
    const newKey = `${prev}.${k}`;
    if (typeof v === 'object' && v !== null) {
      flatObject(v, target, newKey);
    } else {
      // eslint-disable-next-line no-param-reassign
      target[newKey] = v;
    }
  });
  return target;
};

const pairToString = (key, value) => {
  if (Array.isArray(value)) {
    return value.map((subvalue) => pairToString(key, subvalue)).join('&');
  }

  if (typeof value === 'object' && value !== null) {
    return Object.entries(flatObject(value))
      .map(([flattenKey, subvalue]) =>
        pairToString(`${key}${flattenKey}`, subvalue),
      )
      .join('&');
  }

  return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
};

const getSearchQueryString = (data) =>
  [
    ...Object.entries(data?.criterias || {}).map(([key, value]) =>
      pairToString(key, value),
    ),
    ...[data?.pageNumber ? `page=${data.pageNumber - 1}` : null],
    ...[data?.pageSize ? `size=${data.pageSize}` : null],
    ...[
      data?.sort
        ? `sort=${encodeURIComponent(`${data.sort[0]},${data.sort[1]}`)}`
        : null,
    ],
    ...[data?.export ? `export=${data.export}` : null],
  ]
    .filter((val) => val != null)
    .join('&');

export const search = (endpoint, data, options = {}) =>
  fetch(
    `${window._env_.API_BACKEND_URL}${endpoint}${
      endpoint.endsWith('&') ? '' : '?'
    }${getSearchQueryString(data)}`,
    {
      method: 'GET',
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    },
  )
    .catch(() => Promise.resolve({ status: 0 }))
    .then(handleHttpErrors)
    .then((resp) => resp.json());

export const get = (endpoint, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    ...options,
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  })
    .catch(() => Promise.resolve({ status: 0 }))
    .then(handleHttpErrors)
    .then((resp) => resp.json());

export const getMpass = async (endpoint, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'GET',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  }).then(handleHttpErrors);

export const downloadFile = async (endpoint, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      ...(options.headers || {}),
    },
    ...options,
  }).then(handleHttpErrors);

export const post = (endpoint, data, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    body: data == null ? '' : JSON.stringify(data),
  })
    .catch(() => Promise.resolve({ status: 0 }))
    .then(handleHttpErrors)
    .then((resp) => resp.json());

export const postScheduler = async (endpoint, data, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    body: data == null ? '' : JSON.stringify(data),
    ...options,
  }).then(handleHttpErrors);

export const postMpass = async (endpoint, data, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    body: data == null ? '' : JSON.stringify(data),
    ...options,
  }).then(handleHttpErrors);

export const postWithRawResponse = (endpoint, data, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    body: data == null ? '' : JSON.stringify(data),
  })
    .catch(() => Promise.resolve({ status: 0 }))
    .then(handleHttpErrors);

export const postFiles = async (endpoint, data, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    ...(data ? { body: data } : {}),
    ...options,
  }).then(handleHttpErrors);

export const put = (endpoint, data, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'PUT',
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    body: data == null ? '' : JSON.stringify(data),
  })
    .catch(() => Promise.resolve({ status: 0 }))
    .then(handleHttpErrors);

export const patch = (endpoint, data, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'PATCH',
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/merge-patch+json',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    body: data == null ? '' : JSON.stringify(data),
  })
    .catch(() => Promise.resolve({ status: 0 }))
    .then(handleHttpErrors);

export const download = async (endpoint, data, options = {}) => {
  return fetch(
    `${window._env_.API_BACKEND_URL}${endpoint}${
      endpoint.endsWith('&') ? '' : '?'
    }${getSearchQueryString(data)}`,
    {
      method: 'GET',
      credentials: 'include',
      ...options,
      headers: {
        'Content-Type': 'application/octet-stream',
        Accept: 'text/csv',
        ...(options.headers || {}),
      },
    },
  )
    .then(handleHttpErrors)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.download = 'document.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
};

export const remove = (endpoint, options = {}) =>
  fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method: 'DELETE',
    credentials: 'include',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })
    .catch(() => Promise.resolve({ status: 0 }))
    .then(handleHttpErrors);

export const genericService = (serviceUri, baseUri) => {
  const uri = `${serviceUri}${baseUri}`;

  return {
    findAll: (data) => search(uri, data),
    findOne: (id) => get(`${uri}/${id}`),
    create: (entity) => post(`${uri}`, entity),
    update: (entity) => put(`${uri}/${entity.id}`, entity),
    remove: (entity) => remove(`${uri}/${entity.id}`),
    generate: () => get(`${uri}`),
  };
};
