import { useEffect } from 'react';

export default function useDefaultValues(form, defaultValues) {
  useEffect(() => {
    if (form) {
      const values = form.getFieldsValue(Object.keys(defaultValues));
      form.setFieldsValue(
        Object.keys(defaultValues).reduce(
          (acc, key) => ({
            [key]: values[key] || defaultValues[key],
            ...acc,
          }),
          {},
        ),
      );
    }
  }, [defaultValues, form]);
}
