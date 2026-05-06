const palette = {
  yellow100: '#FFF7CC',
  yellow200: '#FFF2A6',
  yellow500: '#FFE066',
  black100: '#111111',
  black200: '#222222',
  gray600: '#666666',
  gray400: '#999999',
  gray100: '#DDDDDD',
  white: '#FFFFFF',
  red: '#FF0000',
} as const;

export const colors = {
  primary: {
    main: palette.yellow500,
    sub: palette.yellow200,
    light: palette.yellow100,
  },
  text: {
    heading: palette.black100,
    primary: palette.black200,
    secondary: palette.gray600,
    tertiary: palette.gray400,
    error: palette.red,
  },
  border: {
    default: palette.gray100,
    active: palette.black200,
  },
  neutral: {
    white: palette.white,
  },
} as const;
