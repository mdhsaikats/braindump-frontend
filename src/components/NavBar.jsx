import React from 'react';
import { Link, NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const NAV_ITEMS = [
  { to: "/explore", label: "Explore" },
  { to: "/my-ideas", label: "My Ideas" },
  { to: "/saved", label: "Saved" },
  { to: "/profile", label: "Profile" },
];

const NavBar = () => {
  const { user, token, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get("q") || "";

  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (window.location.pathname !== "/explore") {
      navigate(`/explore?q=${encodeURIComponent(value)}`);
    } else {
      if (value) {
        setSearchParams({ q: value });
      } else {
        setSearchParams({});
      }
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Left: Logo */}
          <Link to="/explore" onClick={closeMobileMenu} className="flex-shrink-0 flex items-center gap-3 group no-underline">
            <img
              src="/logo/logo.png"
              alt="BrainDump Logo"
              className="w-10 h-10 rounded-xl object-contain shadow-xs transition-transform group-hover:scale-105"
            />
            <span className="font-extrabold text-2xl tracking-tight text-black dark:text-white transition-colors">BrainDump</span>
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8 max-w-xl">
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search ideas, technologies..."
                className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700/80 rounded-xl leading-5 bg-slate-100/70 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white text-sm font-medium transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Right: Links & Auth */}
          <div className="hidden lg:flex items-center space-x-1 bg-slate-100/80 dark:bg-slate-800/80 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 relative">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative text-sm font-extrabold px-4 py-2 rounded-full transition-colors ${
                    isActive ? 'text-white dark:text-black' : 'text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-xs"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700/80 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white transition-all cursor-pointer"
              aria-label="Toggle Dark Mode"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {token && (
              <Link to="/profile" onClick={closeMobileMenu} className="flex items-center gap-2.5 group bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700 transition-colors">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}&background=09090b&color=fff`}
                  alt="Profile"
                  className="w-7 h-7 rounded-full ring-2 ring-white dark:ring-slate-700 object-cover"
                />
                <span className="hidden sm:inline text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white">
                  @{user?.username}
                </span>
              </Link>
            )}
            {token ? (
              <button
                onClick={logout}
                className="hidden sm:block text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
              >
                Logout
              </button>
            ) : (
              <NavLink 
                to="/login" 
                className="hidden sm:block text-xs font-bold text-white dark:text-black bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 px-4 py-2 rounded-xl shadow-xs transition-all"
              >
                Login
              </NavLink>
            )}
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-6 space-y-4 shadow-xl"
        >
          {/* Mobile Search */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search ideas..."
              className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-medium focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white"
            />
          </div>

          {/* Mobile Nav Links */}
          <div className="flex flex-col space-y-2 pt-2">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-bold transition-all ${
                    isActive ? "bg-black dark:bg-white text-white dark:text-black" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Auth Button */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            {token ? (
              <button
                onClick={() => {
                  logout();
                  closeMobileMenu();
                }}
                className="w-full py-3 rounded-xl text-center text-sm font-bold text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              >
                Sign Out (@{user?.username})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="w-full py-3 rounded-xl text-center text-sm font-bold text-white dark:text-black bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
              >
                Log In / Register
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default NavBar;