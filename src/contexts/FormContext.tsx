import React, { createContext, useContext } from 'react';

/**
 * FormProvider 컴포넌트
 *
 * @param {FormProviderProps} props - Provider props
 * @param {ReactNode} props.children - 자식 컴포넌트
 * @param {FormContextProps} props.value - 공유할 form 상태
 *
 * @example
 * <FormProvider value={form}>
 *   <Input name="email" />
 * </FormProvider>
 */
const FormContext = createContext<any>(null);

export const FormProvider = ({ children, value }: any) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  return useContext(FormContext);
};
