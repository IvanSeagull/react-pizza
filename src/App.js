import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Cart from './pages/Cart';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

export const AppContext = React.createContext('');

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <AppContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
