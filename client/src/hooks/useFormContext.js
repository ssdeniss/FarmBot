import React, { useContext, createContext } from 'react';

export const FormContext = createContext(null);

export const FormContextProvider = ({ form, children }) => (
  <FormContext.Provider value={form}>{children}</FormContext.Provider>
);

export default function useFormContext() {
  const form = useContext(FormContext);
  return form;
}
