import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";
import { API_BASE_URL } from "../config/api";
import { useAuth } from "../context/AuthContext";

const IdeaDetailsModal = ({ idea, onClose }) => {
  const { token } = useAuth();
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

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

  // Fetch comments when modal opens for an idea
  useEffect(() => {
    if (!idea?.id) return;
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await fetch(`${API_BASE_URL}/api/v1/users/comment`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          // Filter comments belonging to this specific idea
          const filtered = data.data.filter((c) => c.idea_id === idea.id);
          setComments(filtered);
        }
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [idea?.id, token]);

  if (!idea) return null;

  const authorName = idea.author_name || idea.author?.name || "anonymous";
  const avatarUrl =
    idea.author?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f1f5f9&color=0f172a`;
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (!token) {
      setError("Please sign in to comment.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const res = await fetch(`${API_BASE_URL}/api/v1/users/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          idea_id: idea.id,
          idea_user_id: idea.user_id || idea.author?.id,
          comment: commentText.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok || data.status) {
        const newCommentObj = data.data || {
          id: Date.now(),
          comment: commentText.trim(),
          created_at: new Date().toISOString(),
          author_name: "You",
        };
        setComments((prev) => [newCommentObj, ...prev]);
        setCommentText("");
      } else {
        setError(data.message || "Failed to post comment");
      }
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Failed to post comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
        className="w-full max-w-2xl max-h-[90vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-5 px-6 py-5 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Idea details
            </p>
            <h2
              id="idea-details-title"
              className="text-2xl font-extrabold text-slate-950 dark:text-white leading-tight break-words"
            >
              {idea.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close idea details"
            className="shrink-0 p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Author info */}
          <div className="flex items-center gap-3">
            <img
              src={avatarUrl}
              alt={authorName}
              className="w-9 h-9 rounded-full ring-2 ring-slate-100 dark:ring-slate-700"
            />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              @{authorName}
            </span>
          </div>

          {/* Description */}
          <p className="whitespace-pre-wrap break-words text-base leading-7 text-slate-700 dark:text-slate-300">
            {idea.description || "No description provided."}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              {tags.map((tag, index) => (
                <span
                  key={`${tag}-${index}`}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Comments ({comments.length})
              </h3>
            </div>

            {/* Comment List */}
            {loadingComments ? (
              <div className="flex items-center justify-center py-6 text-slate-400 gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-semibold">
                  Loading comments...
                </span>
              </div>
            ) : comments.length > 0 ? (
              <div className="space-y-3.5 mb-6">
                {comments.map((item) => {
                  const cAuthor = item.author_name || "User";
                  const cAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(cAuthor)}&background=f1f5f9&color=0f172a`;
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800/80"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <img
                            src={cAvatar}
                            alt={cAuthor}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            @{cAuthor}
                          </span>
                        </div>
                        {item.created_at && (
                          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7 break-words">
                        {item.comment}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 italic mb-6">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </div>

        {/* Comment Input Form at Bottom */}
        <div className="p-4 sm:p-5 bg-slate-50/80 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {error && (
            <p className="text-xs font-semibold text-rose-500 mb-2">{error}</p>
          )}
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20 transition-all"
            />
            <button
              type="submit"
              disabled={submitting || !commentText.trim()}
              className="inline-flex items-center justify-center p-2.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Post Comment"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </form>
        </div>
      </section>
    </div>,
    document.body,
  );
};

export default IdeaDetailsModal;
