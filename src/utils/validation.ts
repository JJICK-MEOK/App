/**
 * 필수 입력 검사 함수
 *
 * @param {string} value - 검사할 값
 * @returns {string} 에러 메시지, 값이 없으면 '필수 입력' 반환, 있으면 빈 문자열
 *
 * @example
 * const error = required(''); // '필수 입력'
 * const ok = required('hello'); // ''
 */
export const required = (value: string) => {
  if (!value) return '필수 입력';
  return '';
};

/**
 * 이메일 형식 검사 함수
 *
 * @param {string} value - 검사할 값
 * @returns {string} 에러 메시지, 이메일 형식이 아니면 '이메일 오류' 반환, 맞으면 빈 문자열
 *
 * @example
 * const error = email('test'); // '이메일 오류'
 * const ok = email('test@example.com'); // ''
 */
export const email = (value: string) => {
  if (!/\S+@\S+\.\S+/.test(value)) return '이메일 오류';
  return '';
};
