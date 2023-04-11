import { Box, Center, Text, ThemeIcon, Title, useMantineTheme } from '@mantine/core';
import { IconFolderOff } from '@tabler/icons-react';

const NoDataMessage = () => {
  const theme = useMantineTheme();

  return (
    <Center sx={{ minHeight: 300, textAlign: 'center', width: '100%' }}>
      <Box>
        <ThemeIcon color="indigo" variant="light" size={48} radius="xl">
          <IconFolderOff stroke={1.75} size={24} />
        </ThemeIcon>
        <Title order={5} mt={10} mb={8} weight={500}>
          No data to display
        </Title>
        <Text color="dimmed">No data available. Please start adding your data.</Text>
      </Box>
    </Center>
  );
};

export default NoDataMessage;
