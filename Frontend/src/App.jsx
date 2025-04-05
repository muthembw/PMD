import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import Navbar from './components/Navbar';
import ReportCard from './components/ReportCard';
import OrderList from './components/OrderList';
import ProductTable from './components/ProductTable';
import Dashboard from './components/Dashboard';


const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Navbar />
      <main className="pt-6 px-6 md:ml-64">
        <Routes>
          {/* Parent Route */}
          <Route path="/" element={<Dashboard />}>
            <Route path="orders" element={<OrderList />} />
            <Route path="products" element={<ProductTable />} />
            <Route path="report" element={<ReportCard />} />
          </Route>
        </Routes>
      </main>
    </div>
    
  );
};

export default App;
