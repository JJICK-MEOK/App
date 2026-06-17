import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Search from '@/assets/images/Search.svg';
import Bell from '@/assets/images/Bell.svg';
import { Typography } from '@/src/components/Typography/Typography';

type Props = {
  name: string;
};

export default function TopNav({ name }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* 백엔드 연결 시 Image 컴포넌트로 교체 */}
        <View style={styles.profile} />
        <Typography size="xxl" weight="semiBold" style={styles.title}>
          {name} 님
        </Typography>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            /* router.push('/search') */
          }}
        >
          <Search width={28} height={28} color="#222222" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            /* router.push('/notifications') */
          }}
        >
          <Bell width={28} height={28} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 375,
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
