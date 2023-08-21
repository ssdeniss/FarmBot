import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, notification } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import imageCompression from 'browser-image-compression';

const ImageUploader = ({
  url,
  onImageClear = () => {},
  onImageUpload,
  disabled = false,
  size = 200,
  options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 900,
    useWebWorker: true,
  },
  radius = '50%',
}) => {
  const [imageUrl, setImageUrl] = useState(url);
  const limitFileSize = parseInt(window._env_.FILE_SIZE_LIMIT_BYTES, 10);

  useEffect(() => {
    setImageUrl(url);
  }, [url]);

  const clearImage = useCallback(() => {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
    onImageClear();
  }, [imageUrl, onImageClear]);

  const saveImage = useCallback(
    (compresed) => {
      if (compresed) {
        const reader = new FileReader();
        reader.readAsDataURL(compresed);
        reader.onload = () => {
          const base64String = reader.result.split(',')[1];
          try {
            const arrayBuffer = Uint8Array.from(atob(base64String), (c) =>
              c.charCodeAt(0),
            ).buffer;
            const blob = new Blob([arrayBuffer]);
            const objectUrl = URL.createObjectURL(blob);
            setImageUrl(objectUrl);
          } catch (e) {
            console.error(
              "Couldn't decode image base64, string not correctly encoded",
            );
            setImageUrl(null);
          }
          onImageUpload(base64String);
        };
      }
    },
    [onImageUpload],
  );

  const { getInputProps, open } = useDropzone({
    accept: 'image/*',
    maxSize: limitFileSize,
    multiple: false,
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
  });

  return (
    <div className="settings__uploader">
      <div className={`settings__image ${imageUrl ? 'active' : ''}`}>
        <Image
          src={imageUrl}
          preview={false}
          width={size}
          height={size}
          style={{
            borderRadius: radius,
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        {imageUrl ? (
          <div className="settings__image-overlay">
            <button
              type="button"
              className="settings__image-delete"
              onClick={clearImage}
            >
              <DeleteOutlined />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="settings__image-upload"
            onClick={open}
            style={{ width: size, height: size }}
          >
            <input {...getInputProps()} />
            <div className="settings__upload-icon">
              <PlusOutlined />
              <div>Încarcă imaginea</div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
