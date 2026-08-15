import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user's profile info
  const fetchProfile = async (authToken) => {
    try {
      const response = await fetch("/api/v1/users/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setUser(result.data);
      } else {
        // Token is invalid/expired
        logout();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Run profile fetch if token is present on load
  useEffect(() => {
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success && result.token) {
        localStorage.setItem("token", result.token);
        setToken(result.token);
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login request error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Register handler
  const register = async (username, email, password) => {
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Automatically attempt login after successful registration
        return await login(email, password);
      } else {
        return { success: false, message: result.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration request error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Update profile handler
  const updateProfile = async (username, email, bio) => {
    if (!token) return { success: false, message: "Not authenticated" };

    try {
      const response = await fetch("/api/v1/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, email, bio }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setUser(result.data); // Update the user state with returning data
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message || "Failed to update profile" };
      }
    } catch (error) {
      console.error("Update profile request error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
