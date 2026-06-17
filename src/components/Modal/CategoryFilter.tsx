import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Typography } from '@/src/components/Typography/Typography';
import Close from '@/src/components/Icon/Close';
import { colors } from '@/src/constants/colors';

type Props = {
  title: string;
  options: string[];
  selected: string;
  onSelect: (item: string) => void;
  onClose: () => void;
  optionGap?: number;
  height: number;
};

export default function CategoryFilter({
  title,
  options,
  selected,
  onSelect,
  onClose,
  optionGap = 30,
  height,
}: Props) {
  return (
    <View style={[styles.sheet, { height }]}>
      <View style={styles.header}>
        <Typography size="md" weight="medium" style={styles.titleText}>
          {title}
        </Typography>
        <Close onPress={onClose} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={[styles.listContent, { gap: optionGap }]}
      >
        {options.map((item) => (
          <Pressable key={item} onPress={() => onSelect(item)}>
            <Typography
              size="lg"
              weight="semiBold"
              style={item === selected ? styles.selectedText : styles.unselectedText}
            >
              {item}
            </Typography>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    width: '100%',
    backgroundColor: colors.neutral.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 34,
  },
  titleText: {
    color: colors.text.primary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  selectedText: {
    color: colors.text.primary,
    lineHeight: 16,
  },
  unselectedText: {
    color: '#CCCCCC',
    lineHeight: 16,
  },
});
