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
import OrderPlaced from './components/userInterface/components/screens/OrderPlaced';
import UserOrders from './components/userInterface/components/screens/UserOrders';
import Otp from './components/userInterface/components/screens/Otp';
import OrderDetails from './components/userInterface/components/screens/OrderDetails';


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
          <Route element={<OrderPlaced />} path="/order-successfull" />
          <Route element={<UserOrders />} path="/account/orders" />
          <Route element={<Otp />} path="/otp" />
          <Route element={<OrderDetails />} path="/order-details" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
