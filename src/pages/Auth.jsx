import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Auth = () => {
  const navigate = useNavigate();
  const { token, login, register } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/explore");
    }
  }, [token, navigate]);
  
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      let result;
      if (isLogin) {
        result = await login(email, password);
      } else {
        result = await register(username, email, password);
      }

      if (result.success) {
        navigate("/explore");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setEmail("");
    setPassword("");
    setError("");
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">
        
        {/* Brand/Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo/logo.png"
            alt="BrainDump Logo"
            className="w-14 h-14 rounded-2xl object-contain mb-3 shadow-xs hover:scale-105 transition-transform"
          />
          <h1 className="text-2xl font-bold text-slate-900">BrainDump</h1>
          <p className="text-sm text-slate-500 mt-1">
            {isLogin ? "Sign in to access your ideas" : "Get started with your free account"}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-sm font-medium animate-fadeIn">
            <div className="flex gap-2 items-center">
              <svg className="w-5 h-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username (only shown on Registration) */}
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-xs font-semibold uppercase text-slate-500 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autocomplete="username"
                placeholder="mdhsaikats"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black transition-all font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}

          {/* Email Address */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase text-slate-500 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="username"
              placeholder="you@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="password" className="block text-xs font-semibold uppercase text-slate-500">
                Password
              </label>
              <button
                type="button"
                tabIndex="-1"
                onClick={() => setShowPassword(!showPassword)}
                className="text-xs font-semibold text-slate-900 hover:text-black focus:outline-none"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autocomplete={isLogin ? "current-password" : "new-password"}
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black transition-all font-medium"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-black active:bg-slate-950 transition duration-200 shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              isLogin ? "Login" : "Create Account"
            )}
          </button>
        </form>

        {/* Mode Toggle */}
        <div className="mt-8 text-center text-sm text-slate-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={toggleAuthMode}
            className="text-black font-bold hover:underline focus:outline-none"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
