import { View, Pressable } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';

/**
 * Dropdown 컴포넌트
 *
 * 기능:
 * - 옵션 리스트를 렌더링
 * - 옵션 선택 시 onSelect 콜백 호출
 *
 * @param {Object} props
 * @param {Array<string>} props.options - 드롭다운에 표시할 옵션 배열
 * @param {(item: string) => void} props.onSelect - 옵션 선택 시 호출되는 함수
 *
 * @example
 * <Dropdown
 *   options={['Option 1', 'Option 2', 'Option 3']}
 *   onSelect={(item) => console.log(item)}
 * />
 */
export const Dropdown = ({ options, onSelect }: any) => {
  return (
    <View>
      {options.map((item: any, idx: number) => (
        <Pressable key={idx} onPress={() => onSelect(item)}>
          <Typography>{item}</Typography>
        </Pressable>
      ))}
    </View>
  );
};
