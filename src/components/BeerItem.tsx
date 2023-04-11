import * as _ from 'lodash';

import { Divider, Flex, Grid, Image, Paper, Text, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import { useColors } from '../hooks/useColors';
import { BeersResult } from '../types/beers';
import Tooltip from './common/Tooltip';

interface BeerItemProps {
  data: BeersResult[];
  view: string;
}

const BeerItem = ({ data, view }: BeerItemProps) => {
  const theme = useMantineTheme();
  const { isDark, isTextWhite, isTextIndigo } = useColors();
  const tabletScreen = useMediaQuery('(min-width: 768px');
  const screen480 = useMediaQuery('(max-width: 480px');

  return (
    <>
      {data &&
        data.map((beer: BeersResult) => {
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
                  <Tooltip
                    position="top"
                    label={
                      <>
                        <Text size={12}>Ingredients</Text>
                        <Divider my={5} />
                        {beer.ingredients.malt.slice(0, 2).map(({ name, amount }, key) => (
                          <Text key={key}>
                            {name}: {amount.value} {amount.unit}
                          </Text>
                        ))}
                        {beer.ingredients.hops.slice(0, 2).map(({ name, amount }, key) => (
                          <Text key={key}>
                            {name}: {amount.value} {amount.unit}
                          </Text>
                        ))}
                        <Text>Yeast: {beer.ingredients.yeast}</Text>
                      </>
                    }
                    arrowSize={8}
                    width={230}
                    multiline>
                    <Image src={beer.image_url} alt={_.findLast(beer.image_url.split('/'))} width={110} height={110} fit="contain" />
                  </Tooltip>
                  <Flex
                    direction="column"
                    gap={5}
                    mt={screen480 ? 'md' : view === 'grid' && !tabletScreen ? 'md' : 0}
                    align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'flex-start'}>
                    <Title
                      order={4}
                      weight={600}
                      color={isTextWhite}
                      align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'left'}>
                      {beer.name}
                    </Title>
                    <Title
                      order={6}
                      weight={500}
                      color={isTextIndigo}
                      align={screen480 ? 'center' : view === 'grid' && !tabletScreen ? 'center' : 'left'}>
                      {beer.tagline}
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

export default BeerItem;
