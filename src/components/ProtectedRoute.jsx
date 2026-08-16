import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoaderGooeyBlobs from "./ui/loaders-gooey-blobs";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
        <LoaderGooeyBlobs color="#0d9488" size={18} />
        <p className="text-sm font-semibold text-slate-500 uppercase">
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
