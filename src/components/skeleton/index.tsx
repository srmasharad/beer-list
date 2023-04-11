import { Box, Flex, Grid, Paper, Skeleton } from '@mantine/core';

export const BeerSkeleton = ({ view }: { view: string }) => {
  const length = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {length.map((val) => {
        return (
          <Grid.Col key={val} span={view === 'list' ? 12 : 6}>
            <Paper shadow="md" radius="md" p="lg" withBorder>
              <Flex direction="row" columnGap="lg">
                <Box>
                  <Skeleton width={100} height={100} radius="md" />
                </Box>
                <Box sx={{ width: '100%' }}>
                  <Skeleton height={8} mt={6} width={view === 'list' ? '25%' : '40%'} radius="xl" />
                  <Skeleton height={6} mt="sm" width={view === 'list' ? '15%' : '30%'} radius="xl" />
                  <Box mt="lg">
                    <Skeleton height={6} radius="xl" />
                    <Skeleton height={6} mt={8} radius="xl" />
                    <Skeleton height={6} mt={8} width="70%" radius="xl" />
                  </Box>
                </Box>
              </Flex>
            </Paper>
          </Grid.Col>
        );
      })}
    </>
  );
};
