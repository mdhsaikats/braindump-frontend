// src/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar'; // Adjust path if needed
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;