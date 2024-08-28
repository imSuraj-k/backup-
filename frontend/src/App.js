import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './store/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Order from './pages/Order';
import Settings from './pages/Settings';
import Complaints from './pages/Complaints';
import PinMessages from './pages/PinMessages';
import Product from './pages/Product';
import Category from './pages/Category';
import Brands from './pages/Brands';
import CancelOrder from './pages/CancelOrder';
import ReturnOrder from './pages/ReturnOrder';
import Register from './pages/Register';
import BarChart from './components/Chart/BarChart';
import Inventory from './pages/AddProductPage/Inventroy';
import AddProductTwo from './pages/AddProductPage/AddProductTwo';
import AdminLogin from './pages/AdminLogin';
import AddProductPage from './pages/AddProductPage/AddProductPage';
import MultiStepForm from './pages/MultiStepForm/MultiStepForm'
import Store from './pages/Store/Store';

function App() {
  const  {isAuthenticated }= useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
      
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/" element={<AdminLogin/>} />
          <Route path="/multistepfrom" element={<MultiStepForm/>} />


      
       
           
          {isAuthenticated ? (
            <>
            <Route path="/storeDetails" element={<Store/>} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/sidebar" element={<Sidebar />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/order" element={<Order />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/pin-message" element={<PinMessages />} />
              <Route path="/product" element={<Product />} />
              <Route path="/category" element={<Category />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/cancel-order" element={<CancelOrder />} />
              <Route path="/return-order" element={<ReturnOrder />} />
              <Route path="/register" element={<Register />} />
              <Route path="/barchart" element={<BarChart />} />
              <Route path="/addProductpage" element={<AddProductPage/>} />
              <Route path="/addProductTwo" element={<AddProductTwo/>} />

    
            </>
          ) : (
            <Route path="*" element={<Link to="/" />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
