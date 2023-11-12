import { extendTheme, withDefaultColorScheme, theme as baseTheme } from '@chakra-ui/react';
// Supports weights 100-900
import '@fontsource/noto-sans';
import '@fontsource-variable/noto-sans-arabic';
export const theme = extendTheme(
  {
    colors: {
      brand: baseTheme.colors.cyan,
    },
    components: {
      Alert: {
        defaultProps: {
          colorScheme: 'blue',
        },
      },
    },
    fonts: {
      body: `'Noto Sans Arabic Variable', 'Noto Sans', sans-serif`,
    },
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
);
