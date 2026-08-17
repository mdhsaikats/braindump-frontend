import React from 'react';
import { Link } from 'react-router-dom';

const Github = ({ className = "w-5 h-5 text-black dark:text-white" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 mt-auto py-8 transition-colors duration-200">
            <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
                    <img
                      src="/logo/logo.png"
                      alt="BrainDump Logo"
                      className="w-7 h-7 rounded-lg object-contain"
                    />
                    <span className="text-sm font-bold">© 2026 BrainDump. Built for developers worldwide.</span>
                </div>
                <div className="flex items-center gap-6 text-sm font-bold text-slate-600 dark:text-slate-400">
                    <Link to="/about" className="hover:text-black dark:hover:text-white transition-colors">About</Link>
                    <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
                    <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy</Link>
                    <a
                      href="https://github.com/mdhsaikats/braindump-frontend"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-black dark:hover:text-white transition-transform transform hover:scale-110 p-1"
                      aria-label="GitHub Repository"
                    >
                        <Github className="w-5 h-5 text-black dark:text-white" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;