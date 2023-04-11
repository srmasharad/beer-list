import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Home from './pages/Home/Home';
import MyBeer from './pages/MyBeer/MyBeer';
import PageNotFound from './pages/PageNotFound/PageNotFound';

const BaseRouter = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/my-beers" element={<MyBeer />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default BaseRouter;
