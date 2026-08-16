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
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">

          {/* Left: Logo */}
          <Link to="/explore" className="flex-shrink-0 flex items-center gap-3 group no-underline">
            <img
              src="/logo/logo.png"
              alt="BrainDump Logo"
              className="w-10 h-10 rounded-xl object-contain shadow-xs transition-transform group-hover:scale-105"
            />
            <span className="font-extrabold text-2xl tracking-tight text-black">BrainDump</span>
          </Link>

          {/* Center: Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8 max-w-xl">
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-black transition-colors">
                <MagnifyingGlass className="text-lg" />
              </div>
              <input
                type="text"
                placeholder="Search ideas, technologies..."
                className="block w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-100/70 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black text-sm font-medium transition-all shadow-inner"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <span className="text-xs font-bold text-slate-400 border border-slate-200 rounded-md px-1.5 py-0.5 bg-white shadow-2xs">⌘K</span>
              </div>
            </div>
          </div>

          {/* Right: Links & Auth */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `text-sm font-bold px-4 py-2 rounded-full transition-all ${
                  isActive ? 'bg-black text-white shadow-xs' : 'text-slate-600 hover:text-black'
                }`
              }
            >
              Explore
            </NavLink>
            <NavLink
              to="/my-ideas"
              className={({ isActive }) =>
                `text-sm font-bold px-4 py-2 rounded-full transition-all ${
                  isActive ? 'bg-black text-white shadow-xs' : 'text-slate-600 hover:text-black'
                }`
              }
            >
              My Ideas
            </NavLink>
            <NavLink 
              to="/saved" 
              className={({ isActive }) => 
                `text-sm font-bold px-4 py-2 rounded-full transition-all ${
                  isActive ? 'bg-black text-white shadow-xs' : 'text-slate-600 hover:text-black'
                }`
              }
            >
              Saved
            </NavLink>
            <NavLink 
              to="/profile" 
              className={({ isActive }) => 
                `text-sm font-bold px-4 py-2 rounded-full transition-all ${
                  isActive ? 'bg-black text-white shadow-xs' : 'text-slate-600 hover:text-black'
                }`
              }
            >
              Profile
            </NavLink>
          </div>
          
          <div className="flex items-center gap-4 ml-4">
            {token && (
              <Link to="/profile" className="flex items-center gap-2.5 group bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full border border-slate-200/60 transition-colors">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.username || 'User')}&background=09090b&color=fff`}
                  alt="Profile"
                  className="w-7 h-7 rounded-full ring-2 ring-white object-cover"
                />
                <span className="hidden sm:inline text-xs font-bold text-slate-900 group-hover:text-black">
                  @{user?.username}
                </span>
              </Link>
            )}
            {token ? (
              <button
                onClick={logout}
                className="hidden sm:block text-xs font-bold text-slate-700 hover:text-black px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-100 cursor-pointer transition-all"
              >
                Logout
              </button>
            ) : (
              <NavLink 
                to="/login" 
                className="hidden sm:block text-xs font-bold text-white bg-black hover:bg-slate-800 px-4 py-2 rounded-xl shadow-xs transition-all"
              >
                Login
              </NavLink>
            )}
            {/* Mobile Menu Button */}
            <button className="lg:hidden p-2 text-slate-700 hover:text-black">
              <List className="text-2xl" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;