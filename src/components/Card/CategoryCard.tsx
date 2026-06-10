import { Image, StyleSheet, View } from 'react-native';
import AddButton from '@/src/components/Button/AddButton';
import { Typography } from '@/src/components/Typography/Typography';

type CategoryCardProps = {
  categoryName: string;
  imageUri: string;
  onSubscribePress: () => void;
  subscriberText?: string;
  subscribed?: boolean;
};

export const CategoryCard = ({
  categoryName,
  imageUri,
  onSubscribePress,
  subscriberText,
  subscribed = false,
}: CategoryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
        <View style={styles.textArea}>
          <Typography size="lg" weight="semiBold" color="primary">
            {categoryName}
          </Typography>
          {subscriberText ? (
            <Typography size="md" color="secondary">
              {subscriberText}
            </Typography>
          ) : null}
        </View>
      </View>

      <AddButton selected={subscribed} onPress={onSubscribePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    gap: 6,
  },
});
