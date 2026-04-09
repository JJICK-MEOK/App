import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useToggle } from './useToggle';

/**
 * Modal 상태 관리 Hook
 *
 * 기능:
 * - open / close 상태 관리
 * - ESC로 닫기
 *
 * @example
 * const { isOpen, open, close } = useModal();
 */
export const useModal = () => {
  const { isOn: isOpen, setTrue: open, setFalse: close } = useToggle();

  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isOpen) {
        close();
        return true;
      }
      return false;
    });

    return () => sub.remove();
  }, [isOpen, close]);

  return { isOpen, open, close };
};
