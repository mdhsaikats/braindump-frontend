import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Pencil, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

const EditIdeaModal = ({ isOpen, onClose, idea, onUpdated }) => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Sync title and description when idea changes or modal opens
  useEffect(() => {
    if (idea && isOpen) {
      setTitle(idea.title || "");
      setDescription(idea.description || "");
      setError("");
      setSuccessMsg("");
    }
  }, [idea, isOpen]);

  // Lock body scroll when modal is open and add Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen || !idea) return null;

  const originalTitle = (idea.title || "").trim();
  const originalDescription = (idea.description || "").trim();

  const currentTitle = title.trim();
  const currentDescription = description.trim();

  const titleChanged = currentTitle !== originalTitle && currentTitle.length > 0;
  const descriptionChanged = currentDescription !== originalDescription && currentDescription.length > 0;

  // Require at least one changed and non-empty field
  const isFormValid = titleChanged || descriptionChanged;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!isFormValid) {
      setError("Please modify at least one field before saving.");
      return;
    }

    if (!token) {
      setError("You must be logged in to update an idea.");
      logout();
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = { idea_id: idea.id };
      if (titleChanged) {
        payload.title = currentTitle;
      }
      if (descriptionChanged) {
        payload.description = currentDescription;
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/users/idea/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMsg(result.message || "Idea updated successfully!");
        const updatedData = result.data || {};
        const updatedIdea = {
          ...idea,
          title: updatedData.title || (titleChanged ? currentTitle : idea.title),
          description: updatedData.description || (descriptionChanged ? currentDescription : idea.description),
        };

        if (onUpdated) {
          onUpdated(updatedIdea);
        }

        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        if (response.status === 401) {
          setError(result.message || "Your session has expired. Please log in again.");
          setTimeout(() => {
            logout();
            navigate("/login");
          }, 1500);
        } else if (response.status === 400) {
          setError(result.message || "Invalid input. Please provide at least one modified field.");
        } else if (response.status === 404) {
          setError(result.message || "Idea not found or you do not have permission to edit it.");
        } else {
          setError(result.message || "Failed to update idea. Please try again.");
        }
      }
    } catch (err) {
      console.error("Error updating idea:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div
      onClick={() => {
        if (!isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-idea-modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto transform transition-all my-auto text-slate-900 dark:text-slate-100"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100">
              <Pencil className="w-5 h-5" />
            </div>
            <div>
              <h3 id="edit-idea-modal-title" className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                Edit Idea
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update your project title or description
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="text-lg" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {error && (
            <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 rounded-lg text-rose-700 dark:text-rose-300 text-xs font-medium animate-fadeIn">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-lg text-emerald-700 dark:text-emerald-300 text-xs font-medium animate-fadeIn">
              {successMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Idea Title
            </label>
            <input
              type="text"
              required
              placeholder="Idea Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all disabled:opacity-60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={4}
              placeholder="Idea Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 focus:border-black dark:focus:border-white transition-all resize-none disabled:opacity-60"
            />
          </div>

          {/* Modal Footer Buttons */}
          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isFormValid}
              className="px-5 py-2 text-sm font-medium text-white dark:text-black bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EditIdeaModal;
