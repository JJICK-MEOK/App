import { Image, StyleSheet, View } from 'react-native';
import AddButton from '@/src/components/Button/AddButton';
import { Typography } from '@/src/components/Typography/Typography';

type SvgProps = { width?: number | string; height?: number | string };

type CategoryCardProps = {
  categoryName: string;
  imageUri?: string;
  ImageComponent?: React.ComponentType<SvgProps>;
  onSubscribePress: () => void;
  subscriberText?: string;
  subscribed?: boolean;
};

export const CategoryCard = ({
  categoryName,
  imageUri,
  ImageComponent,
  onSubscribePress,
  subscriberText,
  subscribed = false,
}: CategoryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        {ImageComponent ? (
          <View style={styles.image}>
            <ImageComponent width={70} height={70} />
          </View>
        ) : imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : null}
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
    width: '100%',
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
    width: 133,
  },
});
