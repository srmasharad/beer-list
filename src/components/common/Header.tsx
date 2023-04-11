import { ActionIcon, Box, Container, Group, Text, ThemeIcon, Title, UnstyledButton, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBottle, IconBrightnessDown, IconMoon } from '@tabler/icons-react';

import { useColors } from '../../hooks/useColors';
import Menu from './Menu';

const Header = () => {
  const theme = useMantineTheme();
  const { toggleColorScheme } = useMantineColorScheme();
  const { isDark } = useColors();
  const tabletScreen = useMediaQuery('(min-width: 768px');

  return (
    <Box>
      <Container size="lg">
        <Group position="apart" py={'sm'}>
          <Group spacing="xs">
            <ThemeIcon variant="light" radius="xl" size={tabletScreen ? 'lg' : 'md'} color="indigo">
              <IconBottle size={tabletScreen ? 22 : 18} stroke={1.75} />
            </ThemeIcon>
            <Title order={6} size={16} weight={600}>
              {tabletScreen ? 'Houzz Beers' : 'HB'}
            </Title>
          </Group>
          <Menu />
          <UnstyledButton component="span" onClick={() => toggleColorScheme()}>
            <Group spacing={7}>
              <ActionIcon variant="light" color="gray" radius="xl">
                {' '}
                {isDark ? <IconBrightnessDown color={theme.colors.yellow['6']} /> : <IconMoon size={20} />}
              </ActionIcon>
              {tabletScreen && (
                <Text weight={500} size="sm" sx={{ userSelect: 'none' }}>
                  {isDark ? 'Light' : 'Dark'}
                </Text>
              )}
            </Group>
          </UnstyledButton>
        </Group>
      </Container>
    </Box>
  );
};

export default Header;
