import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import ShareIdeaModal from '../components/ShareIdeaModal';

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavBar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet context={{ openShareModal: openModal }} />
      </main>
      <ShareIdeaModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Layout;


