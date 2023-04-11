import { createStyles } from '@mantine/core';

export const useMenuStyles = createStyles((theme) => ({
  ct_menu_link: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.dark[3],
    userSelect: 'none',
    position: 'relative',

    '&:hover': {
      textDecoration: 'none',
      color: theme.colorScheme === 'dark' ? theme.colors.indigo[2] : theme.colors.indigo[6],
    },

    '&.active': {
      color: theme.colorScheme === 'dark' ? theme.colors.indigo[2] : theme.colors.indigo[6],

      '&:before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        borderBottom: `2px solid ${theme.colorScheme === 'dark' ? theme.colors.indigo[2] : theme.colors.indigo[6]}`,
      },
    },
  },

  ct_menu_link_icon: {
    fontSize: 16,
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',

    '.tabler-icon': {
      width: 18,
      height: 18,
    },
  },
}));
