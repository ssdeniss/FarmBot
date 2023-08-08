import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function useFormErrors(form, errors) {
  const { t } = useTranslation();

  useEffect(() => {
    if (errors) {
      const old = form.getFieldsError();
      if (Array.isArray(old) && old.length > 0) {
        form.setFields(old.map(({ name }) => ({ name, errors: null })));
      }

      form.setFields(
        Object.entries(errors).map(([name, err]) => {
          const parts = name
            .split('.')
            .flatMap((part) =>
              part
                .split('[')
                .map((val) =>
                  val.endsWith(']')
                    ? parseInt(val.substring(0, val.length - 1), 10)
                    : val,
                ),
            );

          return {
            name: parts,
            errors: [t(err)],
          };
        }),
      );
    }
  }, [form, errors, t]);
}
