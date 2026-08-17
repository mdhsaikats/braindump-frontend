import React from "react";
import { Link } from "react-router-dom";
import { Lightbulb, Bookmark, Zap, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans py-12 px-4 sm:px-8 lg:px-12 transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-800 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-extrabold uppercase tracking-wider mb-4 shadow-xs">
            About BrainDump
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight mb-4">
            Empowering Developers to Share & Build Side Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-3xl">
            BrainDump is a minimalist, developer-first platform designed to dump, discover, and refine project ideas. From quick micro-SaaS concepts to full-stack architectures, we make side project brainstorming effortless.
          </p>
        </div>

        {/* Platform Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center font-black">
              <Lightbulb className="w-5 h-5 text-white dark:text-black" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">Share Ideas</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Post detailed side project concepts complete with tech stacks, target problems, and core features.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center font-black">
              <Bookmark className="w-5 h-5 text-white dark:text-black" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">Save & Build</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Bookmark inspiration for your next weekend hackathon or long-term open-source contribution.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center font-black">
              <Zap className="w-5 h-5 text-white dark:text-black" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">Realtime Feed</h3>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
              Explore trending technologies, filter by difficulty levels, and connect with fellow creators.
            </p>
          </div>
        </div>

        {/* Tech Stack Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 shadow-xs space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">Built With Modern Engineering</h2>
          <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            BrainDump is engineered with high-performance technologies for rapid response times and clean design aesthetics:
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["Go (Golang)", "REST API", "PostgreSQL", "React 19", "Vite", "Tailwind CSS v4", "Framer Motion", "Lucide Icons"].map((tech) => (
              <span key={tech} className="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-extrabold text-slate-900 dark:text-slate-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-extrabold rounded-2xl shadow-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-all"
          >
            <span>Explore Community Feed</span>
            <ArrowRight className="w-4 h-4 text-white dark:text-black" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
