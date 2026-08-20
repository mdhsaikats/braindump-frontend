import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const IdeaDetailsModal = ({ idea, onClose }) => {
  useEffect(() => {
    if (!idea) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [idea, onClose]);

  if (!idea) return null;

  const authorName = idea.author_name || idea.author?.name || "anonymous";
  const avatarUrl = idea.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f1f5f9&color=0f172a`;
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="idea-details-title"
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl"
      >
        <div className="sticky top-0 flex items-start justify-between gap-5 px-6 py-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Idea details</p>
            <h2 id="idea-details-title" className="text-2xl font-extrabold text-slate-950 dark:text-white leading-tight break-words">{idea.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close idea details" className="shrink-0 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <img src={avatarUrl} alt={authorName} className="w-9 h-9 rounded-full ring-2 ring-slate-100 dark:ring-slate-700" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">@{authorName}</span>
          </div>
          <p className="whitespace-pre-wrap break-words text-base leading-7 text-slate-700 dark:text-slate-300">{idea.description || "No description provided."}</p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-7 pt-6 border-t border-slate-100 dark:border-slate-800">
              {tags.map((tag, index) => <span key={`${tag}-${index}`} className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">{tag}</span>)}
            </div>
          )}
        </div>
      </section>
    </div>,
    document.body
  );
};

export default IdeaDetailsModal;
