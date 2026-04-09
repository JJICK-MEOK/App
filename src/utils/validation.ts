/**
 * 필수 입력 검사
 */
export const required = (value: string) => {
  if (!value) return '필수 입력';
  return '';
};

/**
 * 이메일 검사
 */
export const email = (value: string) => {
  if (!/\S+@\S+\.\S+/.test(value)) return '이메일 오류';
  return '';
};
