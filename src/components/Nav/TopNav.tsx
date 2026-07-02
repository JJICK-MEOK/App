import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Search from '@/assets/images/Search.svg';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  name: string;
  profileImageUrl?: string;
  onSearchPress?: () => void;
};

export default function TopNav({ name, profileImageUrl, onSearchPress }: Props) {
  const [imageError, setImageError] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {profileImageUrl && !imageError ? (
          <Image
            source={{ uri: profileImageUrl }}
            style={styles.profile}
            onError={() => setImageError(true)}
          />
        ) : (
          <View style={styles.profile} />
        )}
        <Typography size="xxl" weight="semiBold" style={styles.title}>
          {`${name} 님`}
        </Typography>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity activeOpacity={0.7} onPress={onSearchPress}>
          <Search width={26} height={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 21,
    paddingVertical: 11,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#FFF',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profile: {
    width: 26,
    height: 26,
    borderRadius: 26,
    borderWidth: 0.5,
    borderColor: '#DDD',
    backgroundColor: '#D3D3D3',
  },
  title: {
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.6,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
