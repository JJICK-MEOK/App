export const typography = {
  family: {
    base: 'Pretendard',
  },
  size: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    xxxl: 24,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 16,
    normal: 20,
    relaxed: 24,
  },
  letterSpacing: {
    normal: 0,
    wide: 1.12,
  },
} as const;
