import React, { createContext, useContext } from 'react';

/**
 * FormProvider 컴포넌트
 *
 * **기능**
 * - 자식 컴포넌트에 form 상태 공유
 * - useFormContext를 통해 상태 접근 가능
 *
 * @example
 * <FormProvider value={form}>
 *   <Input name="email" />
 * </FormProvider>
 *
 * @param children - Provider 하위 자식 컴포넌트
 * @param value - 공유할 form 상태
 */
const FormContext = createContext<any>(null);

export const FormProvider = ({ children, value }: any) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

/**
 * FormContext를 사용하기 위한 커스텀 훅
 *
 * @throws FormProvider 밖에서 호출될 경우 에러 발생
 * @returns FormProvider로부터 전달받은 form 상태
 */
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
