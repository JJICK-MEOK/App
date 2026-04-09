import { useState } from 'react';

/**
 * useForm Hook
 *
 * 기능
 * - 폼 필드 값 관리 (values)
 * - 검증(validation) 및 에러 관리 (errors)
 * - 입력 변경(handleChange) 및 제출(handleSubmit) 처리
 * - onSubmit 콜백이 없더라도 안전하게 동작
 *
 * @example
 * const form = useForm({
 *   initialValues: { email: '', password: '' },
 *   validate: (values) => {
 *     const errors: Record<string, string> = {};
 *     if (!values.email) errors.email = '이메일은 필수입니다';
 *     return errors;
 *   },
 *   onSubmit: (values) => console.log('제출:', values),
 * });
 *
 * form.handleChange('email', 'test@example.com');
 * form.handleSubmit();
 *
 * @param initialValues 초기 폼 값 객체
 * @param validate (선택) 검증 함수, errors 객체 반환
 * @param onSubmit (선택) 제출 시 호출되는 콜백
 *
 */
export const useForm = ({ initialValues, validate, onSubmit }: any) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (name: string, value: any) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const newErrors = validate ? validate(values) : {};
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};
