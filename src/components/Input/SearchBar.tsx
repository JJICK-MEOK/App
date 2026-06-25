import { View, TextInput, StyleSheet } from 'react-native';
import Search from '@/assets/images/Search.svg';
import { colors } from '@/src/constants/colors';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = '활동명을 검색해보세요',
}: Props) {
  return (
    <View style={styles.container}>
      <Search width={25} height={25} color="#222" style={styles.icon} />
      <TextInput
        style={[styles.input, { fontFamily: value ? 'Pretendard-SemiBold' : 'Pretendard-Medium' }]}
        placeholder={placeholder}
        placeholderTextColor={colors.text.tertiary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 500,
    backgroundColor: colors.neutral.surface,
  },
  icon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
