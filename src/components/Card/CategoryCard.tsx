import { Image, StyleSheet, View } from 'react-native';
import AddButton from '@/src/components/Button/AddButton';
import { colors } from '@/src/constants/colors';
import { Typography } from '@/src/components/Typography/Typography';

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
          <Typography size="xl" style={styles.categoryName}>
            {categoryName}
          </Typography>
          <Typography size="md" color="secondary" style={styles.subscriberText}>
            {subscriberText}
          </Typography>
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
    lineHeight: 26,
  },
  subscriberText: {
    lineHeight: 20,
  },
});
