import { useEffect, useState, useCallback } from 'react';

const init = (definition) =>
  Object.entries(definition).reduce(
    (acc, [key]) => ({
      ...acc,
      [key]: { content: [], loading: true, error: false },
    }),
    {},
  );

const load = (definition) =>
  Promise.all(
    Object.entries(definition).map(([key, fetcher]) =>
      fetcher({ pageSize: 5000 })
        .then((result) => ({
          [key]: { content: result.content, loading: false, error: false },
        }))
        .catch(() => {
          return { [key]: { content: [], loading: false, error: true } };
        }),
    ),
  ).then((res) => res.reduce((acc, val) => ({ ...acc, ...val }), {}));

export default function useDictionaries(
  definition,
  options = {
    allowFetcher: true,
  },
) {
  const [dictionaries, setDictionaries] = useState(init(definition));
  const [isLoading, setIsLoading] = useState(true);
  const { allowFetcher } = options;

  const reload = useCallback(() => {
    setIsLoading(true);
    if (allowFetcher) {
      Promise.resolve()
        .then(() => init(definition))
        .then(() => load(definition))
        .then((res) => setDictionaries(res))
        .finally(() => setIsLoading(false));
    }
  }, [definition, allowFetcher]);

  useEffect(() => {
    reload();
  }, [reload]);

  return [dictionaries, reload, isLoading];
}
