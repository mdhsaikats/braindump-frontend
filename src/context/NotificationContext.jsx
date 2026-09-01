import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const isFetchingRef = useRef(false);
  const knownNotificationIds = useRef(new Set());
  const isInitialFetch = useRef(true);

  const currentUserId = user?.id || user?.userId;

  // Add a floating toast notification
  const addToast = useCallback((notif) => {
    const toastItem = {
      id: notif.id || Date.now(),
      title: notif.title || "New Notification",
      body: notif.body || "",
      type: notif.type || "general",
    };

    setToasts((prev) => [toastItem, ...prev.slice(0, 4)]); // Keep max 5 toasts

    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toastItem.id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch notifications from backend API
  const fetchNotifications = useCallback(async () => {
    if (!token || isFetchingRef.current) return;
    try {
      isFetchingRef.current = true;
      const response = await fetch(`${API_BASE_URL}/api/v1/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok && data.success) {
        const list = data.notifications || [];

        // If not initial fetch, check if there are new unread notifications to toast
        if (!isInitialFetch.current && list.length > 0) {
          list.forEach((item) => {
            if (!knownNotificationIds.current.has(item.id) && !item.is_read) {
              addToast(item);
            }
          });
        }

        // Record all known IDs
        list.forEach((item) => knownNotificationIds.current.add(item.id));
        isInitialFetch.current = false;

        setNotifications(list);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [token, addToast]);

  // 1. Fetch immediately whenever token is available & set up polling fallback
  useEffect(() => {
    if (!token) {
      setNotifications([]);
      setToasts([]);
      knownNotificationIds.current.clear();
      isInitialFetch.current = true;
      return;
    }

    // Initial fetch
    fetchNotifications();

    // Periodic polling every 8 seconds
    const pollInterval = setInterval(() => {
      fetchNotifications();
    }, 8000);

    // Refetch when tab regains focus
    const handleFocus = () => fetchNotifications();
    window.addEventListener("focus", handleFocus);

    return () => {
      clearInterval(pollInterval);
      window.removeEventListener("focus", handleFocus);
    };
  }, [token, fetchNotifications]);

  // 2. Real-time WebSocket connection via Socket.IO
  useEffect(() => {
    if (!token || !currentUserId) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const socketClient = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    socketClient.on("connect", () => {
      console.log("Socket.IO connected:", socketClient.id, "for user:", currentUserId);
      socketClient.emit("register_user", String(currentUserId));
    });

    socketClient.on("connect_error", (err) => {
      console.log("Socket.IO connection status:", err.message);
    });

    // Listen for new real-time notification
    socketClient.on("new_notification", (incoming) => {
      console.log("Real-time notification received:", incoming);
      const newNotif = {
        id: incoming.data?.id || Date.now(),
        title: incoming.title || "New Notification",
        body: incoming.body || incoming.data?.body || "",
        type: incoming.data?.type || "general",
        reference_id: incoming.data?.reference_id,
        is_read: false,
        created_at: incoming.data?.created_at || new Date().toISOString(),
        actor_username:
          incoming.data?.actor?.username ||
          incoming.data?.actor_username ||
          "Someone",
      };

      knownNotificationIds.current.add(newNotif.id);
      addToast(newNotif); // Pop up toast instantly!

      setNotifications((prev) => {
        if (prev.some((n) => n.id === newNotif.id)) return prev;
        return [newNotif, ...prev];
      });
    });

    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, [token, currentUserId, addToast]);

  // Mark single notification as read
  const markAsRead = async (id) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );

    if (!token) return;
    try {
      await fetch(`${API_BASE_URL}/api/v1/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    // Optimistic update
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));

    if (!token) return;
    try {
      await fetch(`${API_BASE_URL}/api/v1/notifications/read-all`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        toasts,
        addToast,
        dismissToast,
        loading,
        markAsRead,
        markAllAsRead,
        refreshNotifications: fetchNotifications,
        socket,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
