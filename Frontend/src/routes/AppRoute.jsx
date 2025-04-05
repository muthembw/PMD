import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../components/Dashboard.jsx';
import Products from '../pages/Products.jsx';
import Orders from '../pages/Orders.jsx';
import Register from '../pages/Register.jsx';
import Login from '../pages/Login.jsx';
import Report from '../pages/Report.jsx';
import App from '../App.jsx'; // Main app layout with sidebar, navbar, etc.

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="dashboard" element={<Dashboard />} />  {/* Add the route for Dashboard */}
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route path="report" element={<Report />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;
