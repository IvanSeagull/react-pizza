import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import './scss/app.scss';

import Home from './pages/Home';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => (
    <div>
      <h1>Loading...</h1>
    </div>
  ),
});

const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));

const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense
              fallback={
                <div>
                  <h1>Loading...</h1>
                </div>
              }>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense
              fallback={
                <div>
                  <h1>Loading...</h1>
                </div>
              }>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense
              fallback={
                <div>
                  <h1>Loading...</h1>
                </div>
              }>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
