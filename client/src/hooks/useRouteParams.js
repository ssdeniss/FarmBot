import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

export function useRouteParams(name = 'id') {
  const params = useParams();

  const value = useMemo(() => {
    const param = params[name];
    const ident = Number(param);

    if (!Number.isInteger(ident)) {
      return {
        [name]: null,
        isNew: param === 'new',
        isInvalid: param !== 'new',
      };
    }

    return {
      [name]: ident,
      isNew: false,
      isInvalid: false,
    };
  }, [params, name]);

  return value;
}
