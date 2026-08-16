import React from 'react'

const Lightbulb = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M235.91,91.86,220,44.15a16,16,0,0,0-10.22-10.22l-47.71-15.9a15.91,15.91,0,0,0-16.14,4.24l-89.65,89.65a15.9,15.9,0,0,0-4.24,16.14l15.9,47.71A16,16,0,0,0,78.15,186l47.71,15.9a15.9,15.9,0,0,0,16.14-4.24l89.65-89.65A15.91,15.91,0,0,0,235.91,91.86ZM184,88a12,12,0,1,1,12-12A12,12,0,0,1,184,88Zm-32,32a12,12,0,1,1,12-12A12,12,0,0,1,152,120Z"></path>
  </svg>
);

const GithubLogo = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <path d="M119.8,224c-22-2-41-10.4-55.2-22.7A102.7,102.7,0,0,1,32,128c0-54.3,42.4-98.8,96-98.8s96,44.5,96,98.8a100.8,100.8,0,0,1-37.4,78.2c-15.1,12.3-35.3,20.4-58.8,22.2"></path>
    <path d="M96,224v-8a48,48,0,0,1,26.8-43V160a24,24,0,0,1,24-24h32"></path>
  </svg>
);

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-200/80 mt-auto py-8">
            <div className="w-full px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-slate-700">
                    <img
                      src="/logo/logo.png"
                      alt="BrainDump Logo"
                      className="w-7 h-7 rounded-lg object-contain"
                    />
                    <span className="text-sm font-bold">© 2026 BrainDump. Built for developers worldwide.</span>
                </div>
                <div className="flex items-center gap-6 text-sm font-bold text-slate-600">
                    <a href="#" className="hover:text-black transition-colors">About</a>
                    <a href="#" className="hover:text-black transition-colors">Terms</a>
                    <a href="#" className="hover:text-black transition-colors">Privacy</a>
                    <a href="#" className="hover:text-black transition-colors flex items-center gap-1.5">
                        <GithubLogo className="text-lg text-black" />
                        GitHub
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer