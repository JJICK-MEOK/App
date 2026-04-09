import { useState } from 'react';

/**
 * Form 상태 관리 Hook
 *
 * 기능:
 * - 값 관리
 * - 에러 관리
 * - validation 실행
 *
 * @example
 * const form = useForm({...});
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
      onSubmit(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};
