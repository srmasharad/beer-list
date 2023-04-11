import { useState } from 'react';

import * as _ from 'lodash';

import { Alert, Grid, Group, Loader, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconExclamationCircle } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';

import API from '../../api/api';
import ActionBar from '../../components/Actionbar';
import BeerItem from '../../components/BeerItem';
import NoDataMessage from '../../components/common/NoDataMessage';
import { BeerSkeleton } from '../../components/skeleton';
import { urls } from '../../constants/urls';
import { useBeerView } from '../../hooks/useBeerView';
import { useColors } from '../../hooks/useColors';

const urlsPath = urls?.beers;

const Home = () => {
  const { isTextIndigo } = useColors();
  const { view, onViewChange } = useBeerView('list');

  const [dataLimit, setDataLimit] = useState<number>(10);

  const beersAPI = new API(urlsPath);

  const { isLoading, isError, isSuccess, isFetching, data } = useQuery(['beers', dataLimit], () => beersAPI.list({ per_page: dataLimit }), {
    keepPreviousData: true,
  });

  if (isError) {
    return (
      <Alert icon={<IconExclamationCircle size={24} />} title="Bummer!" color="red">
        Sorry! Something terrible happened.
      </Alert>
    );
  }

  return (
    <>
      <ActionBar title="All Beers" onViewChange={onViewChange} view={view} />

      <Grid>
        {isLoading && <BeerSkeleton view={view} />}
        {isSuccess && data?.data.length < 1 ? <NoDataMessage /> : <BeerItem data={data?.data} view={view} />}
      </Grid>

      {isSuccess && data?.data.length >= 1 && (
        <Group position="center" mt="xl">
          <UnstyledButton color="indigo" onClick={() => setDataLimit((prev) => prev + 10)}>
            <Group spacing={4}>
              <Text weight={500} size="sm" color={isTextIndigo}>
                Load More
              </Text>
              {isFetching ? <Loader size={16} color={isTextIndigo} /> : <IconChevronDown size={16} color={isTextIndigo} />}
            </Group>
          </UnstyledButton>
        </Group>
      )}
    </>
  );
};

export default Home;
