import React, { createContext, useContext } from 'react';

/**
 * Form Context
 *
 * 기능:
 * - form 상태 공유
 */
const FormContext = createContext<any>(null);

export const FormProvider = ({ children, value }: any) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  return useContext(FormContext);
};
