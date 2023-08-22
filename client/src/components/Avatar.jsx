import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import ImageUploader from './Uploader/ImageUploader';

const Avatar = ({
  base64,
  src,
  removable = false,
  onUpload = () => {},
  onClear = () => {},
  size,
  preview = false,
  radius = '50%',
  styles,
}) => {
  const [imageUrl, setImageUrl] = useState(null);

  const clearImage = () => {
    if (imageUrl) {
      setImageUrl(null);
      URL.revokeObjectURL(imageUrl);
    }
    onClear();
  };

  useEffect(() => {
    let imageUrlRef = null;
    if (base64 && !src) {
      try {
        const arrayBuffer = Uint8Array.from(atob(base64), (c) =>
          c.charCodeAt(0),
        ).buffer;
        const blob = new Blob([arrayBuffer]);
        const objectUrl = URL.createObjectURL(blob);
        imageUrlRef = objectUrl;
        setImageUrl(objectUrl);
      } catch (e) {
        console.error(
          "Couldn't decode image base64, string not correctly encoded",
        );
        setImageUrl(null);
      }
    } else if (src) {
      setImageUrl(src);
    }

    return () => {
      if (imageUrlRef) {
        URL.revokeObjectURL(imageUrlRef);
      }
    };
    // eslint-disable-next-line
  }, [base64, src]);

  console.log(imageUrl);

  return (
    <>
      {!removable ? (
        <div
          className="avatar__component"
          style={{ width: size, height: size, ...styles }}
        >
          <Image
            src={imageUrl}
            preview={preview}
            width={size}
            height={size}
            style={{
              borderRadius: radius,
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      ) : (
        <ImageUploader
          url={imageUrl}
          onImageUpload={onUpload}
          onImageClear={clearImage}
          radius={radius}
          size={size}
        />
      )}
    </>
  );
};

export default Avatar;
