import { TouchableOpacity, StyleSheet } from 'react-native';
import Search from '@/assets/images/Search.svg';

type Props = {
  onPress?: () => void;
};

export default function ZoomButton({ onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <Search width={20} height={20} color="#FFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 500,
    borderWidth: 0.5,
    borderColor: '#DDD',
    backgroundColor: 'rgba(102, 102, 102, 0.8)',
    padding: 3,
    alignItems: 'center',
    gap: 7.368,
    alignSelf: 'flex-start',
  },
});
