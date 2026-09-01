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
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const isFetchingRef = useRef(false);

  const currentUserId = user?.id || user?.userId;

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
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      isFetchingRef.current = false;
      setLoading(false);
    }
  }, [token]);

  // 1. Fetch immediately whenever token is available & set up polling fallback
  useEffect(() => {
    if (!token) {
      setNotifications([]);
      return;
    }

    // Initial fetch
    fetchNotifications();

    // Periodic polling every 8 seconds (critical fallback for Vercel/serverless environments)
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
      // Soft warning - polling will seamlessly handle updates
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

      setNotifications((prev) => {
        // Avoid duplicates
        if (prev.some((n) => n.id === newNotif.id)) return prev;
        return [newNotif, ...prev];
      });
    });

    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, [token, currentUserId]);

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
