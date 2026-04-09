import { useState } from 'react';

/**
 * Dropdown 상태 관리 Hook
 *
 * 기능:
 * - open / close
 * - 선택 값 관리
 * - option 선택
 *
 * @example
 * const dropdown = useDropdown(['A', 'B']);
 */
export const useDropdown = <T>(options: T[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<T | null>(null);

  const toggle = () => setIsOpen((prev) => !prev);

  const select = (item: T) => {
    setSelected(item);
    setIsOpen(false);
  };

  return { isOpen, selected, toggle, select };
};
