import { Image, StyleSheet, Text, View } from 'react-native';
import AddButton from '@/src/components/Button/AddButton';
import { colors } from '@/src/constants/colors';
import { typography } from '@/src/constants/typography';

type CategoryCardProps = {
  categoryName: string;
  subscriberText: string;
  imageUri: string;
  subscribed?: boolean;
  onSubscribePress: () => void;
};

export const CategoryCard = ({
  categoryName,
  subscriberText,
  imageUri,
  subscribed = false,
  onSubscribePress,
}: CategoryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <View style={styles.textArea}>
          <Text style={styles.categoryName}>{categoryName}</Text>
          <Text style={styles.subscriberText}>{subscriberText}</Text>
        </View>
      </View>

      <AddButton selected={subscribed} onPress={onSubscribePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.neutral.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textArea: {
    gap: 2,
  },
  categoryName: {
    fontFamily: typography.family.base,
    fontSize: typography.size.xl,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
    lineHeight: 26,
  },
  subscriberText: {
    fontFamily: typography.family.base,
    fontSize: typography.size.md,
    fontWeight: typography.weight.regular,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
