import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ShareIdeaModal from '../components/ShareIdeaModal';
import NotificationToast from '../components/NotificationToast';

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const refreshIdeas = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200 overflow-x-hidden">
      <NotificationToast />
      <div className="w-full min-h-screen flex flex-col overflow-x-hidden">
        <NavBar />
        <main className="flex-1 w-full py-6">
          <Outlet context={{ openShareModal: openModal, refreshKey, refreshIdeas }} />
        </main>
        <Footer />
      </div>
      <ShareIdeaModal isOpen={isModalOpen} onClose={closeModal} onCreated={refreshIdeas} />
    </div>
  );
};

export default Layout;


