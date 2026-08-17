import React from "react";

const Terms = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-12 px-4 sm:px-8 lg:px-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-extrabold uppercase tracking-wider mb-4">
            Legal & Trust
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-2">
            Last Updated: August 17, 2026
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">1. Acceptance of Terms</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            By accessing or using BrainDump, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">2. Community Guidelines</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            BrainDump is a community platform for developers. You agree not to post abusive, hateful, spammy, or illegal content. We reserve the right to remove any content that violates community standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">3. Intellectual Property</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            Ideas shared on BrainDump are submitted publicly by community members. BrainDump does not claim ownership over user-submitted content.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">4. Platform Availability</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium text-sm leading-relaxed">
            BrainDump is provided "as is" without warranty of any kind. We continuously improve features and maintain backend infrastructure for high uptime.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
