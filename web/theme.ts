import { extendTheme, withDefaultColorScheme, theme as baseTheme } from '@chakra-ui/react';

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
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
);
