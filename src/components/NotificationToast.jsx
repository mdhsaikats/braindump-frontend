import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, Bookmark, MessageSquare, Sparkles } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";

function getNotificationIcon(type) {
  switch (type) {
    case "like":
      return {
        icon: Heart,
        color: "text-rose-500 bg-rose-50 dark:bg-rose-950/50",
      };
    case "save":
      return {
        icon: Bookmark,
        color: "text-amber-500 bg-amber-50 dark:bg-amber-950/50",
      };
    case "comment":
      return {
        icon: MessageSquare,
        color: "text-blue-500 bg-blue-50 dark:bg-blue-950/50",
      };
    default:
      return {
        icon: Sparkles,
        color: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50",
      };
  }
}

const NotificationToast = () => {
  const { toasts, dismissToast, markAsRead } = useNotifications();

  if (!toasts || toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          const { icon: IconComponent, color } = getNotificationIcon(
            toast.type,
          );

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.92, x: 20 }}
              animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 40 }}
              transition={{ type: "spring", stiffness: 450, damping: 30 }}
              onClick={() => {
                markAsRead(toast.id);
                dismissToast(toast.id);
              }}
              className="pointer-events-auto flex items-start gap-3.5 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/15 dark:shadow-black/40 cursor-pointer hover:border-black/30 dark:hover:border-white/30 transition-all group overflow-hidden relative"
            >
              {/* Progress line for auto-dismiss */}
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute bottom-0 left-0 h-0.5 bg-black/20 dark:bg-white/20"
              />

              {/* Icon */}
              <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
                <IconComponent className="w-4 h-4" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {toast.title}
                  </h4>
                  <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 shrink-0">
                    Just now
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-0.5 leading-relaxed">
                  {toast.body}
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dismissToast(toast.id);
                }}
                className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </aside>
  );
};

export default NotificationToast;
