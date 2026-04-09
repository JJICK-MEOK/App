/**
 * 필수 입력 검사 함수
 *
 * 기능
 * - 값이 비어있거나 공백만 있는 경우 '필수 입력' 에러 반환
 * - 값이 존재하면 빈 문자열 반환
 *
 * @param {string} value - 검사할 문자열 값
 * @returns {string} 에러 메시지
 *
 * @example
 * const error1 = required('');   // '필수 입력'
 * const error2 = required('   '); // '필수 입력' (공백만 있는 경우)
 * const ok = required('hello');  // '' (유효한 입력)
 */
export const required = (value: string) => {
  if (!value?.trim()) return '필수 입력';
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
