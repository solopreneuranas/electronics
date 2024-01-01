import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import Dashboard from './components/Dashboard';
import Home from './components/userInterface/components/screens/Home';
import Store from './components/userInterface/components/screens/Store';
import ProductPage from './components/userInterface/components/screens/ProductPage';
import CategoryPage from './components/userInterface/components/screens/CategoryPage';
import Cart from './components/userInterface/components/screens/Cart';
import BrandPage from './components/userInterface/components/screens/BrandPage';
import ReduxProducts from './components/userInterface/components/screens/ReduxProducts';
import DisplayReduxProducts from './components/userInterface/components/screens/DisplayReduxProducts';
import Checkout from './components/userInterface/components/screens/Checkout';
import Account from './components/userInterface/components/screens/Account';
import UserProfile from './components/userInterface/components/screens/UserProfile';
import Wishlist from './components/userInterface/components/screens/Wishlist';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<AdminLogin />} path="/adminlogin" />
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<Home />} path="/" />
          <Route element={<Store />} path="/store" />
          <Route element={<ProductPage />} path="/product" />
          <Route element={<CategoryPage />} path="/category" />
          <Route element={<BrandPage />} path="/brand" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<Wishlist />} path="/wishlist" />
          <Route element={<ReduxProducts />} path="/employee" />
          <Route element={<DisplayReduxProducts />} path="/displayemployees" />
          <Route element={<Checkout />} path="/checkout" />
          <Route element={<Account />} path="/account" />
          <Route element={<UserProfile />} path="/account/profile" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
