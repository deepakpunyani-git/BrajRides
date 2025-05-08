import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Locations from './pages/Locations';
import ContactUs from './pages/ContactUs';
import Login from './pages/Login';
import Pricing from './pages/Pricing';

import Safety from './pages/Safety';
import Partner from './pages/Partner';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Checkout from "./pages/Checkout";
import MyBookings from "./pages/MyBookings";
import NotFound from './pages/NotFound';

import FaqBot from './components/FaqBot';


const AppContent = () => {

  return (
    <>
      <Header />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        {/* Login route - accessible only if NOT logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected route - requires login */}
        <Route
  path="/checkout"
  element={
    <PrivateRoute>
        <Checkout />
    </PrivateRoute>
  }
/>
<Route
  path="/my-bookings"
  element={
    <PrivateRoute>
        <MyBookings />
    </PrivateRoute>
  }
/>


<Route path="*" element={<NotFound />} />


      </Routes>
      <FaqBot />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
