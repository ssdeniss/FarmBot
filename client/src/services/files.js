import { get, postFiles, remove, downloadFile } from '../helpers/api';

const BASE_PATH = '/files/api/v1';

export const uploadFiles = async (files) => {
  if (files && files.length === 0) {
    return [];
  }
  const data = new FormData();
  files.forEach((file) => data.append('files', file, file.name));
  return postFiles(`${BASE_PATH}/`, data).then((res) => res.json());
};

export const getFiles = async (id) =>
  get(`${BASE_PATH}/${Array.isArray(id) ? id.join(',') : id}`);

export const downloadFiles = async (id) =>
  downloadFile(`${BASE_PATH}/${Array.isArray(id) ? id.join(',') : id}?download`)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });

export const getBlobFile = async (id) => {
  const downloadUrl = `${BASE_PATH}/${
    Array.isArray(id) ? id.join(',') : id
  }?download`;

  try {
    const blob = await downloadFile(downloadUrl).then((res) => res.blob());
    return blob;
  } catch (error) {
    console.error('Error occurred while fetching the file:', error);
    throw error;
  }
};

export const removeFile = async (id) =>
  remove(`${BASE_PATH}/${Array.isArray(id) ? id.join(',') : id}`);
