import { useMantineTheme } from '@mantine/core';

export const useColors = () => {
  const theme = useMantineTheme();

  const isDark = theme.colorScheme === 'dark';
  const isTextWhite = `${isDark && theme.white}`;
  const isTextIndigo = isDark ? theme.colors.indigo['2'] : theme.colors.indigo['6'];

  return { isDark, isTextWhite, isTextIndigo };
};
