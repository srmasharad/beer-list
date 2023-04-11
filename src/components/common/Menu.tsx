import { NavLink } from 'react-router-dom';

import { Anchor, Group, Text } from '@mantine/core';

import { routes } from '../../routes/routes';
import { useMenuStyles } from '../../styles/menu.style';

const Menu = () => {
  const { classes } = useMenuStyles();
  return (
    <Group position="center" spacing="xl">
      {routes.map(({ key, name, icon, path }) => (
        <Anchor key={key} component={NavLink} to={path as string} className={classes.ct_menu_link} py={4}>
          <Group spacing={8} align="center">
            <Text component="span" className={classes.ct_menu_link_icon}>
              {icon}
            </Text>
            <Text component="span">{name}</Text>
          </Group>
        </Anchor>
      ))}
    </Group>
  );
};

export default Menu;
