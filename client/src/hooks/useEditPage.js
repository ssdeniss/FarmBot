import { useEffect, useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { notification } from 'antd';

import { useRouteParams } from './useRouteParams';

export function useEditPage({
  initial,
  dependency = null, // will trigger findOne function on change
  existent,
  goBackPath,
  goForwardPath,
  pushBackOnError = true,
  onInvalid, // or handleCancel will be called
  onFailed,
  onCreate,
  onUpdate,
}) {
  const { id, isNew, isInvalid } = useRouteParams();
  const { t } = useTranslation();
  const history = useHistory();
  const [entity, setEntity] = useState(undefined);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFail = useCallback(
    (err) => {
      notification.error({
        message: t('actions.loadFailed', err),
      });
    },
    [t],
  );

  const handleCancel = useCallback(
    () => history.push(goBackPath),
    [goBackPath, history],
  );

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
            handleFail(err);
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
            message: t('actions.saveSuccessful'),
            duration: 3,
          });

          const url =
            typeof goForwardPath === 'function'
              ? goForwardPath(res)
              : goForwardPath || goBackPath;

          // eslint-disable-next-line no-unused-expressions
          url.startsWith('!')
            ? history.replace(url.substring(1))
            : history.push(url);
        })
        .catch((msg) => {
          const { inner, status } = msg || {};
          const { _: messageCode } = inner || {};

          setErrors(inner);

          notification.error({
            message: messageCode || t('actions.saveFailed'),
          });

          if (status === 409 && pushBackOnError) {
            setTimeout(() => {
              const url =
                typeof goForwardPath === 'function'
                  ? goForwardPath({ ...value, id })
                  : goForwardPath || goBackPath;

              // eslint-disable-next-line no-unused-expressions
              url.startsWith('!')
                ? history.replace(url.substring(1))
                : history.push(url);
            }, 1500);
          }

          return Promise.reject(msg);
        })
        .finally(() => setLoading(false));
    },
    [
      goBackPath,
      goForwardPath,
      history,
      id,
      isNew,
      onCreate,
      onUpdate,
      t,
      pushBackOnError,
    ],
  );
  const result = useMemo(
    () => [entity, handleSubmit, handleCancel, errors, loading],
    [entity, handleSubmit, handleCancel, errors, loading],
  );

  return result;
}
