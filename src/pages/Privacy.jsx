import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-12 px-4 sm:px-8 lg:px-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-extrabold uppercase tracking-wider mb-4">
            Legal & Trust
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-2">
            Last Updated: August 17, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">1. Information We Collect</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            BrainDump collects minimal personal information necessary to provide authentication and platform functionality. This includes your username, email address, hashed passwords, and the public idea submissions you choose to publish.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">2. How We Use Your Data</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            Your data is strictly used to authenticate your session, associate ideas and bookmarks with your profile, and enable community discovery. We do NOT sell, rent, or trade user data to third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">3. Authentication & Security</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            Session authentication tokens are stored securely in client-side local storage and transmitted over encrypted HTTPS connections to our cloud serverless infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">4. User Content Rights</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            You retain full ownership of the project ideas and code snippets you publish on BrainDump. You can edit or delete your posted ideas at any time from your "My Ideas" dashboard.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">5. Contact Us</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            If you have questions regarding this Privacy Policy, feel free to reach out to the BrainDump developer team.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
