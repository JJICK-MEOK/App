import 'styled-components/native';
import { AppTheme } from '@/src/constants/theme';

declare module 'styled-components/native' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
