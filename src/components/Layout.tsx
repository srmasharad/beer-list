import { Outlet } from 'react-router-dom';

import { Box, Container } from '@mantine/core';

import Header from './common/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Box py={40}>
        <Container size="lg">
          <Outlet />
        </Container>
      </Box>
    </>
  );
};

export default Layout;
