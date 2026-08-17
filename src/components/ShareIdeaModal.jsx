import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

const X = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="20"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <line x1="200" y1="56" x2="56" y2="200"></line>
    <line x1="200" y1="200" x2="56" y2="56"></line>
  </svg>
);

const Lightbulb = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M235.91,91.86,220,44.15a16,16,0,0,0-10.22-10.22l-47.71-15.9a15.91,15.91,0,0,0-16.14,4.24l-89.65,89.65a15.9,15.9,0,0,0-4.24,16.14l15.9,47.71A16,16,0,0,0,78.15,186l47.71,15.9a15.9,15.9,0,0,0,16.14-4.24l89.65-89.65A15.91,15.91,0,0,0,235.91,91.86ZM184,88a12,12,0,1,1,12-12A12,12,0,0,1,184,88Zm-32,32a12,12,0,1,1,12-12A12,12,0,0,1,152,120Z"></path>
  </svg>
);

const ShareIdeaModal = ({ isOpen, onClose, onCreated }) => {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const tagArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch(`${API_BASE_URL}/api/v1/users/idea`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          tags: tagArray,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setTitle("");
        setDescription("");
        setTags("");
        if (onCreated) onCreated();
        onClose();
      } else {
        setError(data.error || "Failed to publish idea.");
      }
    } catch (err) {
      setError("Network error. Failed to publish idea.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[90vh] bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-y-auto transform transition-all my-auto"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo/logo.png"
              alt="BrainDump Logo"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                Share an Idea
              </h3>
              <p className="text-xs text-slate-500">
                Inspire others with your next big concept
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <X className="text-lg" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
              Idea Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI-powered Code Reviewer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Briefly describe what this project is about, key features, and problem it solves..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. React, Go, Docker"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
            />
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 disabled:opacity-75 flex items-center gap-2"
            >
              {isSubmitting ? "Publishing..." : "Publish Idea"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ShareIdeaModal;
