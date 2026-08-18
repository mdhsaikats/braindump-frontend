import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
import LoaderGooeyBlobs from "../components/ui/loaders-gooey-blobs";
import EditIdeaModal from "../components/EditIdeaModal";

const BookmarkSimple = ({ className, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill={weight === "fill" ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={weight === "fill" ? "0" : "16"}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"></path>
  </svg>
);

const Heart = ({ className, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill={weight === "fill" ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={weight === "fill" ? "0" : "16"}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <path d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z"></path>
  </svg>
);

const Bookmark = ({ className }) => (
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
    <path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"></path>
  </svg>
);

const PencilSimple = ({ className }) => (
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
    <path d="M92.7,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.7l120-120a8,8,0,0,1,11.4,0l44.7,44.7a8,8,0,0,1,0,11.4l-120,120A7.9,7.9,0,0,1,92.7,216Z"></path>
    <line x1="136" y1="64" x2="192" y2="120"></line>
  </svg>
);

const SavedIdeaCard = ({ idea, currentUser, onRemove, onLikeToggle, onEdit }) => {
  const authorName = idea.author_name || idea.author?.name || "anonymous";
  const avatarUrl = idea.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f1f5f9&color=0f172a`;
  const tags = Array.isArray(idea.tags) ? idea.tags : [];
  const isOwner = currentUser && (idea.user_id === currentUser.id || idea.user_id === currentUser.userId);

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-black/40 dark:hover:border-white/40 transition-all duration-300 flex flex-col cursor-pointer group overflow-hidden">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-black dark:group-hover:text-slate-100 transition-colors line-clamp-2">
            {idea.title}
          </h3>
          <div className="flex items-center gap-1">
            {isOwner && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(idea);
                }}
                className="flex-shrink-0 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
                title="Edit Idea"
              >
                <PencilSimple className="text-lg" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(idea.id);
              }}
              className="flex-shrink-0 text-slate-900 dark:text-white hover:text-black dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none cursor-pointer"
              title="Remove from saved"
            >
              <BookmarkSimple weight="fill" className="text-lg text-black dark:text-white" />
            </button>
          </div>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-auto">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between">
        <div className="flex items-center gap-2 group/author">
          <img
            src={avatarUrl}
            alt={authorName}
            className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-slate-700 shadow-xs"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover/author:text-slate-900 dark:group-hover/author:text-white transition-colors">
            @{authorName}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onLikeToggle) onLikeToggle(idea.id);
            }}
            className="flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer group/like"
            title={idea.is_liked ? "Unlike Idea" : "Like Idea"}
          >
            <Heart
              weight={idea.is_liked ? "fill" : "regular"}
              className={`text-base transition-transform active:scale-125 ${
                idea.is_liked ? "text-rose-500 fill-rose-500" : "text-slate-400 dark:text-slate-500 group-hover/like:text-rose-500"
              }`}
            />
            <span className={`text-xs font-semibold ${idea.is_liked ? "text-rose-600 dark:text-rose-400 font-bold" : "text-slate-600 dark:text-slate-400"}`}>
              {idea.likes || 0}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

const Saved = () => {
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIdea, setEditingIdea] = useState(null);
  const { token, user: currentUser } = useAuth();

  const fetchSavedIdeas = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/v1/users/saves`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.ideas)) {
        setSavedIdeas(data.ideas);
      }
    } catch (err) {
      console.error("Error fetching saved ideas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedIdeas();
  }, [token]);

  const toggleLike = async (id) => {
    if (!token) return;

    setSavedIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === id) {
          const currentlyLiked = idea.is_liked || false;
          const newLiked = !currentlyLiked;
          const currentLikes = parseInt(idea.likes || 0, 10);
          const newLikes = newLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);
          return {
            ...idea,
            is_liked: newLiked,
            likes: newLikes,
          };
        }
        return idea;
      })
    );

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/users/idea/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success && data.data) {
        setSavedIdeas((prev) =>
          prev.map((idea) =>
            idea.id === id
              ? { ...idea, likes: data.data.likes, is_liked: data.data.is_liked }
              : idea
          )
        );
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const handleRemove = async (id) => {
    if (!token) return;

    setSavedIdeas((prev) => prev.filter((idea) => idea.id !== id));

    try {
      await fetch(`${API_BASE_URL}/api/v1/users/saves/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error removing saved idea:", err);
      fetchSavedIdeas();
    }
  };

  const handleUpdateIdea = (updatedIdea) => {
    setSavedIdeas((prev) =>
      prev.map((idea) => (idea.id === updatedIdea.id ? { ...idea, ...updatedIdea } : idea))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <main className="flex-grow w-full px-4 sm:px-8 lg:px-12 flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Bookmarked & Saved Ideas
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
              Your personal reading list and project concepts saved for later reference.
            </p>
          </div>
        </div>

        {/* Idea Cards Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 text-slate-900 dark:text-slate-100 gap-4">
            <LoaderGooeyBlobs color="currentColor" size={16} />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Loading saved ideas...</span>
          </div>
        ) : savedIdeas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedIdeas.map((idea) => (
              <SavedIdeaCard
                key={idea.id}
                idea={idea}
                currentUser={currentUser}
                onRemove={handleRemove}
                onLikeToggle={toggleLike}
                onEdit={(selectedIdea) => setEditingIdea(selectedIdea)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              No saved ideas yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Browse the explore feed and click the bookmark icon on any idea to save it here.
            </p>
            <a
              href="/explore"
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white dark:text-black bg-slate-900 dark:bg-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
            >
              Explore Ideas
            </a>
          </div>
        )}
      </main>

      <EditIdeaModal
        isOpen={Boolean(editingIdea)}
        onClose={() => setEditingIdea(null)}
        idea={editingIdea}
        onUpdated={handleUpdateIdea}
      />
    </div>
  );
};

export default Saved;

