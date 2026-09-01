import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Sparkles, Heart, Bookmark, MessageSquare } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';

function formatRelativeTime(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString();
}

function getNotificationIcon(type) {
  switch (type) {
    case 'like':
      return {
        icon: Heart,
        color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40',
      };
    case 'save':
      return {
        icon: Bookmark,
        color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
      };
    case 'comment':
      return {
        icon: MessageSquare,
        color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
      };
    default:
      return {
        icon: Sparkles,
        color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40',
      };
  }
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { notifications, unreadCount, markAsRead, markAllAsRead, loading } = useNotifications();

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={toggleDropdown}
        className="relative p-2 rounded-full border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4" />

        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                  Notifications
                </span>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-extrabold bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  Mark all read
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
              {loading && notifications.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500">
                  Loading notifications...
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
                  No notifications yet
                </div>
              ) : (
                notifications.map((item) => {
                  const { icon: IconComponent, color } = getNotificationIcon(item.type);
                  const isRead = Boolean(item.is_read);

                  return (
                    <div
                      key={item.id}
                      onClick={() => !isRead && markAsRead(item.id)}
                      className={`flex items-start gap-3 p-3.5 transition-colors cursor-pointer ${
                        isRead
                          ? 'bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800/40'
                          : 'bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100/70 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${color}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`text-xs font-bold truncate ${isRead ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-slate-100'}`}>
                            {item.title}
                          </p>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">
                            {formatRelativeTime(item.created_at)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                          {item.body}
                        </p>
                      </div>

                      {!isRead && (
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 self-center" />
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;
