import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { notification } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import imageCompression from 'browser-image-compression';

const ImageUploader = ({
  onImageClear = () => {},
  onImageUpload,
  disabled = false,
  size = 200,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const limitFileSize = parseInt(window._env_.FILE_SIZE_LIMIT_BYTES, 10);

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 900,
    useWebWorker: true,
  };

  const clearImage = useCallback(() => {
    URL.revokeObjectURL(imageUrl);
    setImageUrl('');
    onImageClear();
  }, [imageUrl, onImageClear]);

  const saveImage = useCallback(
    (compresed) => {
      if (compresed) {
        const reader = new FileReader();
        reader.readAsDataURL(compresed);
        reader.onload = () => {
          const base64String = reader.result.split(',')[1];
          onImageUpload(base64String);
          clearImage();
        };
      }
    },
    [clearImage, onImageUpload],
  );

  const { getInputProps, open } = useDropzone({
    onDrop: (files) => {
      if (disabled) {
        return;
      }
      const file = files[0];
      imageCompression(file, options)
        .then((compressedFile) => {
          return saveImage(compressedFile);
        })
        .catch(() => {
          notification.error({ message: 'Imaginea nu a putut fi încărcată' });
        });
    },

    validator: (file) => {
      if (file.size > limitFileSize) {
        notification.error(
          ('file.size',
          {
            fileName: file.name,
            limitSize: Math.ceil(limitFileSize / 1024 ** 2),
          }),
        );
      }
    },
    accept: 'image/*',
    maxSize: limitFileSize,
    multiple: false,
  });

  return (
    <div className="settings__uploader">
      <div className={`settings__image ${imageUrl ? 'active' : ''}`}>
        <img src={imageUrl} alt="" />
        <div className="settings__image-overlay">
          <button
            type="button"
            className="settings__image-delete"
            onClick={clearImage}
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>

      <button
        type="button"
        className={`settings__image-crop  ${imageUrl ? 'active' : ''}`}
        onClick={open}
        style={{ width: size, height: size }}
      >
        <input {...getInputProps()} />
        <div className="settings__upload-icon">
          <PlusOutlined />
          <div>Încarcă imaginea</div>
        </div>
      </button>
    </div>
  );
};

export default ImageUploader;
