import * as _ from 'lodash';

import { ActionIcon, Flex, Grid, Group, Image, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

import { useColors } from '../hooks/useColors';
import { BeerFormValueProps } from '../types/beer-form';
import Tooltip from './common/Tooltip';

interface MyBeerItemProps {
  data: BeerFormValueProps[];
  view: string;
  handleRemoveBeer: (id: string) => void;
}

const MyBeerItem = ({ data, view, handleRemoveBeer }: MyBeerItemProps) => {
  const theme = useMantineTheme();
  const { isDark, isTextWhite, isTextIndigo } = useColors();
  const tabletScreen = useMediaQuery('(min-width: 768px');
  const screen480 = useMediaQuery('(max-width: 480px');

  return (
    <>
      {data &&
        data.map((beer: BeerFormValueProps) => {
          return (
            <Grid.Col key={beer.id} span={view === 'list' ? 12 : view === 'grid' && screen480 ? 12 : 6}>
              <Paper
                shadow="md"
                radius="md"
                p="lg"
                withBorder
                sx={{ '&:hover': { background: isDark ? theme.colors.gray['9'] : theme.colors.gray['1'] } }}>
                <Flex
                  direction={
                    view === 'list' && screen480
                      ? 'column'
                      : view === 'list' && !screen480
                      ? 'row'
                      : view === 'grid' && !tabletScreen
                      ? 'column'
                      : 'row'
                  }
                  columnGap="lg"
                  align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'flex-start'}>
                  <Image src={beer.image} alt={_.findLast(beer.image.split('/'))} width={110} height={110} fit="contain" />
                  <Flex
                    direction="column"
                    gap={5}
                    mt={screen480 ? 'md' : view === 'grid' && !tabletScreen ? 'md' : 0}
                    align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'flex-start'}>
                    <Group spacing={5}>
                      <Title
                        order={4}
                        weight={600}
                        color={isTextWhite}
                        align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'left'}>
                        {beer.name}
                      </Title>
                      <Tooltip label="Delete">
                        <ActionIcon color="red" size="sm" radius="xl" variant="light" onClick={() => handleRemoveBeer(String(beer.id))}>
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                    <Title
                      order={6}
                      weight={500}
                      color={isTextIndigo}
                      align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'left'}>
                      {beer.genre}
                    </Title>
                    <Text size="sm" color="dimmed" mt={5} align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'left'}>
                      {beer.description.slice(0, view === 'list' ? 250 : 100)}
                    </Text>
                  </Flex>
                </Flex>
              </Paper>
            </Grid.Col>
          );
        })}
    </>
  );
};

export default MyBeerItem;
