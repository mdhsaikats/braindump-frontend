import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Lightbulb = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M235.91,91.86,220,44.15a16,16,0,0,0-10.22-10.22l-47.71-15.9a15.91,15.91,0,0,0-16.14,4.24l-89.65,89.65a15.9,15.9,0,0,0-4.24,16.14l15.9,47.71A16,16,0,0,0,78.15,186l47.71,15.9a15.9,15.9,0,0,0,16.14-4.24l89.65-89.65A15.91,15.91,0,0,0,235.91,91.86ZM184,88a12,12,0,1,1,12-12A12,12,0,0,1,184,88Zm-32,32a12,12,0,1,1,12-12A12,12,0,0,1,152,120Z"></path>
  </svg>
);

const MagnifyingGlass = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <circle cx="112" cy="112" r="80"></circle>
    <line x1="216" y1="216" x2="168.6" y2="168.6"></line>
  </svg>
);

const List = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <line x1="40" y1="128" x2="216" y2="128"></line>
    <line x1="40" y1="64" x2="216" y2="64"></line>
    <line x1="40" y1="192" x2="216" y2="192"></line>
  </svg>
);

const NavBar = () => {
  const { user, token, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Left: Logo */}
          <Link to="/explore" className="flex-shrink-0 flex items-center gap-2 group no-underline">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white group-hover:bg-brand-600 transition-colors">
              <Lightbulb weight="bold" className="text-xl" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">BrainDump</span>
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8 max-w-2xl">
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-600 transition-colors">
                <MagnifyingGlass className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search ideas..."
                className="block w-full pl-10 pr-12 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 sm:text-sm transition-all shadow-inner"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <span className="text-xs text-slate-400 border border-slate-200 rounded px-1.5 py-0.5 bg-white">⌘K</span>
              </div>
            </div>
          </div>

          {/* Right: Links & Auth */}
          <div className="hidden lg:flex items-center space-x-6">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/my-ideas"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              My Ideas
            </NavLink>
            <NavLink 
              to="/saved" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              Saved
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              Profile
            </NavLink>
          </div>
          
          <div className="flex items-center gap-4 ml-6">
            {token && (
              <Link to="/profile" className="flex items-center gap-2 group">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}&background=0f172a&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full ring-2 ring-slate-200 group-hover:ring-teal-500 transition-all object-cover"
                />
                <span className="hidden sm:inline text-xs font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                  @{user?.username}
                </span>
              </Link>
            )}
            {token ? (
              <button
                onClick={logout}
                className="hidden sm:block text-sm font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `hidden sm:block text-sm font-medium transition-colors ${isActive ? 'text-slate-900 font-semibold' : 'text-slate-600 hover:text-slate-900'}`
                }
              >
                Login
              </NavLink>
            )}
            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-slate-500 hover:text-slate-900">
              <List className="text-2xl" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;