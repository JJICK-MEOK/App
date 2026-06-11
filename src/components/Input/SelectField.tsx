import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import ArrowDownSvg from '@/assets/images/ArrowDown.svg';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

type SelectFieldProps = {
  options: string[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export const SelectField = ({
  options,
  value,
  placeholder = '선택하세요',
  onChange,
}: SelectFieldProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const displayText = value ?? placeholder;
  const otherOptions = options.filter((opt) => opt !== value);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      <Pressable style={styles.header} onPress={() => setIsOpen((prev) => !prev)}>
        <Typography size="md" weight="medium" color="primary">
          {displayText}
        </Typography>
        <View style={isOpen ? styles.arrowUp : undefined}>
          <ArrowDownSvg width={30} height={30} />
        </View>
      </Pressable>

      {isOpen && (
        <View style={styles.optionList}>
          {otherOptions.map((option) => (
            <Pressable key={option} onPress={() => handleSelect(option)}>
              <Typography size="md" color="tertiary">
                {option}
              </Typography>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.disabled,
    borderRadius: 10,
    backgroundColor: colors.neutral.white,
  },
  containerOpen: {
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 41,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  arrowUp: {
    transform: [{ rotate: '180deg' }],
  },
  optionList: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
});
