import React, { useState } from "react";

const EnvelopeSimple = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="16"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M32,56H224a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V64A8,8,0,0,1,32,56Z"></path>
    <polyline points="224 56 128 144 32 56"></polyline>
  </svg>
);

const Check = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="24"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <polyline points="216 72 104 184 48 128"></polyline>
  </svg>
);

const Profile = () => {
  const [username, setUsername] = useState("saikat");
  const [email, setEmail] = useState("saikat@example.com");
  const [bio, setBio] = useState("Full-stack developer & open-source enthusiast building cool ideas!");
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-teal-500/30">
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        
        {/* Profile Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Profile Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage your personal profile information and account details.
          </p>
        </div>

        {/* Profile Edit Form */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
            Account Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
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
                  className="block w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">
                Your unique handle across BrainDump.
              </p>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Email Address
              </label>
              <div className="relative rounded-lg shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <EnvelopeSimple className="text-lg" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Bio Input */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us a bit about yourself..."
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all resize-none"
              />
            </div>

            {/* Form Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              {isSaved ? (
                <div className="flex items-center text-teal-600 text-sm font-medium animate-fadeIn">
                  <Check className="mr-1.5 text-lg" />
                  Profile saved successfully!
                </div>
              ) : (
                <span />
              )}
              <button
                type="submit"
                className="px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

      </main>
    </div>
  );
};

export default Profile;
