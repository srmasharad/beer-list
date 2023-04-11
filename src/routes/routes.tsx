import { IconListDetails, IconSquareRoundedPlus } from '@tabler/icons-react';

import { Routesprops } from '../types/routes';

export const routes: Routesprops[] = [
  {
    path: '/',
    key: 'home',
    name: 'All Beers',
    icon: <IconListDetails />,
  },
  {
    path: '/my-beers',
    key: 'my_beers',
    name: 'My Beers',
    icon: <IconSquareRoundedPlus />,
  },
];
