import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState(null);

  // Fetch notifications from backend API
  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }, [token]);

  // Connect to Socket.IO and listen for real-time notifications
  useEffect(() => {
    if (!token || !user?.id) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      setNotifications([]);
      return;
    }

    // Initial fetch from database
    fetchNotifications();

    // Initialize Socket.io connection
    const socketClient = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
    });

    socketClient.on("connect", () => {
      console.log("Socket.IO connected:", socketClient.id);
      socketClient.emit("register_user", user.id);
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
        actor_username: incoming.data?.actor?.username || "Someone",
      };

      setNotifications((prev) => [newNotif, ...prev]);
    });

    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, [token, user?.id, fetchNotifications]);

  // Mark single notification as read
  const markAsRead = async (id) => {
    // Optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
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
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
