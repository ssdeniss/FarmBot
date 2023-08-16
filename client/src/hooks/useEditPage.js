import { useEffect, useState, useCallback, useMemo } from 'react';

import { notification } from 'antd';

export function useEditPage({
  id,
  isNew,
  isInvalid,
  initial,
  dependency = null, // will trigger findOne function on change
  existent,
  onInvalid, // or handleCancel will be called
  onFailed,
  onCreate,
  onUpdate,
  onCancel = () => {},
  onError = () => {},
  onSuccess = () => {},
}) {
  const [entity, setEntity] = useState(undefined);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFail = useCallback(() => {
    notification.error({
      message: 'Eroare la încărcarea datelor',
    });
  }, []);

  const handleCancel = useCallback(() => onCancel(), [onCancel]);

  useEffect(() => {
    if (isInvalid) {
      if (typeof onInvalid === 'function') {
        onInvalid();
      } else {
        handleCancel();
      }
    } else {
      (isNew ? Promise.resolve(initial) : existent(id))
        .then((res) => setEntity(res))
        .catch((err) => {
          if (typeof onFailed === 'function') {
            onFailed(err);
          } else {
            handleFail();
          }
        });
    }
  }, [
    id,
    isNew,
    dependency,
    isInvalid,
    initial,
    existent,
    onInvalid,
    onFailed,
    handleCancel,
    handleFail,
  ]);

  const handleSubmit = useCallback(
    (value) => {
      setErrors(null);
      setLoading(true);
      return (isNew ? onCreate(value) : onUpdate({ ...value, id }))
        .then((res) => {
          notification.success({
            message: 'Datele au fost salvate cu succes',
            duration: 3,
          });
          if (onSuccess && typeof onSuccess === 'function') {
            onSuccess(res);
          }
        })
        .catch((msg) => {
          const { inner, status } = msg || {};
          const { _: messageCode } = inner || {};

          setErrors(inner);

          notification.error({
            message: messageCode || 'Erroare la extragerea datelor',
          });

          if (status === 409 && onError && typeof onError === 'function') {
            onError();
          }

          return Promise.reject(msg);
        })
        .finally(() => setLoading(false));
    },
    [id, isNew, onCreate, onUpdate, onError, onSuccess],
  );
  const result = useMemo(
    () => [entity, handleSubmit, handleCancel, errors, loading],
    [entity, handleSubmit, handleCancel, errors, loading],
  );

  return result;
}
