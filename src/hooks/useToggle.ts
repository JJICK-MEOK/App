import { useState, useCallback } from 'react';

/**
 * boolean 상태를 토글하는 Hook
 *
 * 기능:
 * - 상태 true/false 관리
 * - toggle / setTrue / setFalse 제공
 *
 * @example
 * const { isOn, toggle } = useToggle();
 */
export const useToggle = (initialValue = false) => {
  const [isOn, setIsOn] = useState(initialValue);

  const toggle = useCallback(() => setIsOn((prev) => !prev), []);
  const setTrue = useCallback(() => setIsOn(true), []);
  const setFalse = useCallback(() => setIsOn(false), []);

  return { isOn, toggle, setTrue, setFalse };
};
