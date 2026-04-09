import { View, Text, Pressable } from 'react-native';

/**
 * Dropdown 컴포넌트
 */
export const Dropdown = ({ options, onSelect }: any) => {
  return (
    <View>
      {options.map((item: any, idx: number) => (
        <Pressable key={idx} onPress={() => onSelect(item)}>
          <Text>{item}</Text>
        </Pressable>
      ))}
    </View>
  );
};
