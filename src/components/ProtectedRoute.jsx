import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="relative flex items-center justify-center">
          {/* Outer Ring */}
          <div className="w-16 h-16 border-4 border-slate-200 border-t-teal-600 rounded-full animate-spin"></div>
          {/* Inner pulsating dot */}
          <div className="absolute w-6 h-6 bg-teal-500/20 rounded-full animate-pulse"></div>
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-500 uppercase animate-pulse">
          Loading Profile...
        </p>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
