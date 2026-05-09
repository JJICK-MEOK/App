import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Icon from '@/src/components/Icon/Icon';
import { colors } from '@/src/constants/colors';
import { radius } from '@/src/constants/spacing';
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
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setIsOpen((prev) => !prev)}>
        <Typography size="md" color={value ? 'primary' : 'tertiary'} style={styles.optionText}>
          {displayText}
        </Typography>
        <View style={isOpen ? styles.iconOpen : styles.iconClosed}>
          <Icon name="arrowDown" />
        </View>
      </Pressable>

      {isOpen && (
        <View style={styles.optionList}>
          {otherOptions.map((option, idx) => (
            <Pressable
              key={option}
              onPress={() => handleSelect(option)}
              style={idx > 0 ? styles.optionItem : styles.optionItemFirst}
            >
              <Typography size="md" color="tertiary" style={styles.optionText}>
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
    borderRadius: radius.sm,
    backgroundColor: colors.neutral.white,
    paddingLeft: 18,
    paddingRight: 10,
    paddingVertical: 7,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    lineHeight: 20,
  },
  iconClosed: {
    transform: [{ rotate: '0deg' }],
  },
  iconOpen: {
    transform: [{ rotate: '-90deg' }],
  },
  optionList: {
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    marginTop: 7,
    paddingTop: 12,
    gap: 10,
  },
  optionItemFirst: {},
  optionItem: {},
});
