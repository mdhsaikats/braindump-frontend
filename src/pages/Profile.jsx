import React, { useState, useEffect } from "react";
import { Mail, Check, Sun, Moon, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Sync state with authenticated user data from context
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setEmail(user.email || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSaved(false);
    setIsSaving(true);

    try {
      const result = await updateProfile(username, email, bio);
      if (result.success) {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col selection:bg-teal-500/30 transition-colors duration-200">
      <main className="flex-grow w-full px-4 sm:px-8 lg:px-12 py-6">
        
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Profile Settings
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Manage your personal profile information and account details.
          </p>
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Account Details
            </h2>
            <button 
              type="button" 
              onClick={logout}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 transition-colors border border-rose-200 dark:border-rose-900/50 rounded px-2.5 py-1 bg-white dark:bg-slate-900 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
            >
              Sign Out
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 rounded-xl text-rose-700 dark:text-rose-300 text-sm font-medium animate-fadeIn">
              <div className="flex gap-2 items-center">
                <svg className="w-5 h-5 text-rose-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                Username
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <span className="text-slate-400 font-semibold text-sm">@</span>
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all font-medium"
                />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">
                Your unique handle across BrainDump.
              </p>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all font-medium"
                />
              </div>
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-2">
                Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about yourself..."
                className="block w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all resize-none"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              {isSaved ? (
                <div className="flex items-center text-slate-900 dark:text-slate-100 text-sm font-bold animate-fadeIn">
                  <Check className="mr-1.5 text-lg text-emerald-500" />
                  Profile saved successfully!
                </div>
              ) : (
                <span />
              )}
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white dark:text-black bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSaving && (
                  <svg className="animate-spin h-4 w-4 text-white dark:text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Appearance / Theme Settings */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Appearance & Theme
              </h2>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                Toggle dark mode for a native dark color theme across all pages.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
                {isDarkMode ? "Dark Mode On" : "Light Mode"}
              </span>
              <button
                type="button"
                onClick={toggleDarkMode}
                className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
                }`}
                aria-label="Toggle Dark Mode"
              >
                <span
                  className={`pointer-events-none flex items-center justify-center h-6 w-6 transform rounded-full bg-white dark:bg-slate-900 shadow ring-0 transition duration-200 ease-in-out ${
                    isDarkMode ? 'translate-x-7' : 'translate-x-0'
                  }`}
                >
                  {isDarkMode ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                </span>
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Profile;
