import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ShareIdeaModal from '../components/ShareIdeaModal';

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const refreshIdeas = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-[1750px] mx-auto min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6">
          <Outlet context={{ openShareModal: openModal, refreshKey, refreshIdeas }} />
        </main>
      </div>
      <ShareIdeaModal isOpen={isModalOpen} onClose={closeModal} onCreated={refreshIdeas} />
    </div>
  );
};

export default Layout;


