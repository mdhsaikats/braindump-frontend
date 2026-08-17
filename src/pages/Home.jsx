import React, { useState, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
import LoaderGooeyBlobs from "../components/ui/loaders-gooey-blobs";
import SideBar from "../components/SideBar";

const PlusCircle = ({ className, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill={weight === "bold" ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={weight === "bold" ? "24" : "16"}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <circle cx="128" cy="128" r="96" fill="none"></circle>
    <line x1="88" y1="128" x2="168" y2="128"></line>
    <line x1="128" y1="88" x2="128" y2="168"></line>
  </svg>
);

const Compass = ({ className, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill={weight === "bold" ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={weight === "bold" ? "24" : "16"}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <circle cx="128" cy="128" r="96" fill="none"></circle>
    <polygon
      points="104 152 168 88 152 104 88 168 104 152"
      fill="none"
    ></polygon>
  </svg>
);

const CaretDown = ({ className, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={weight === "bold" ? "24" : "16"}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <polyline points="208 96 128 176 48 96"></polyline>
  </svg>
);

const Faders = ({ className }) => (
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
    <line x1="96" y1="80" x2="40" y2="80"></line>
    <line x1="216" y1="80" x2="144" y2="80"></line>
    <line x1="160" y1="176" x2="40" y2="176"></line>
    <line x1="216" y1="176" x2="208" y2="176"></line>
    <circle cx="120" cy="80" r="24"></circle>
    <circle cx="184" cy="176" r="24"></circle>
  </svg>
);

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

const ChatCircle = ({ className }) => (
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
    <path d="M45.4,177A95.9,95.9,0,1,1,79,210.6h0L45.8,220a7.9,7.9,0,0,1-9.8-9.8L45.4,177Z"></path>
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

const Check = ({ className, weight }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth={weight === "bold" ? "32" : "16"}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 256 256"
    className={className}
  >
    <polyline points="216 72 104 184 48 128"></polyline>
  </svg>
);

const IdeaCard = ({ idea, onBookmarkToggle, onLikeToggle }) => {
  const authorName = idea.author_name || idea.author?.name || "anonymous";
  const avatarUrl = idea.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f1f5f9&color=0f172a`;
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-black/40 dark:hover:border-white/40 transition-all duration-300 flex flex-col cursor-pointer group overflow-hidden">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-black dark:group-hover:text-slate-100 transition-colors line-clamp-2">
            {idea.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle(idea.id, idea.isBookmarked);
            }}
            className={`flex-shrink-0 transition-all focus:outline-none p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${
              idea.isBookmarked
                ? "text-black dark:text-white bg-slate-100 dark:bg-slate-800"
                : "text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white"
            }`}
            title={idea.isBookmarked ? "Remove Idea" : "Save Idea"}
          >
            <BookmarkSimple
              weight={idea.isBookmarked ? "fill" : "regular"}
              className="text-lg"
            />
          </button>
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
              onLikeToggle(idea.id);
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

const Home = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openShareModal, refreshKey } = useOutletContext() || {};
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const fetchAllIdeas = async () => {
    try {
      setLoading(true);
      const url = searchQuery
        ? `${API_BASE_URL}/api/v1/users/idea?q=${encodeURIComponent(searchQuery)}`
        : `${API_BASE_URL}/api/v1/users/idea`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();

      let savedIds = new Set();
      if (token) {
        try {
          const savesRes = await fetch(`${API_BASE_URL}/api/v1/users/saves`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const savesData = await savesRes.json();
          if (savesData.success && Array.isArray(savesData.ideas)) {
            savesData.ideas.forEach((item) => savedIds.add(item.id));
          }
        } catch (e) {
          console.error("Failed to fetch user saves:", e);
        }
      }

      if (data.success && Array.isArray(data.ideas)) {
        const mappedIdeas = data.ideas.map((item) => ({
          ...item,
          isBookmarked: savedIds.has(item.id),
          is_liked: Boolean(item.is_liked),
        }));
        setIdeas(mappedIdeas);
      }
    } catch (err) {
      console.error("Error fetching ideas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllIdeas();
  }, [refreshKey, token, searchQuery]);

  const toggleBookmark = async (id, currentlyBookmarked) => {
    if (!token) return;

    // Optimistic UI update
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, isBookmarked: !currentlyBookmarked } : idea
      )
    );

    try {
      const method = currentlyBookmarked ? "DELETE" : "POST";
      await fetch(`${API_BASE_URL}/api/v1/users/saves/${id}`, {
        method,
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error toggling bookmark:", err);
      // Revert on error
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === id ? { ...idea, isBookmarked: currentlyBookmarked } : idea
        )
      );
    }
  };

  const toggleLike = async (id) => {
    if (!token) return;

    // Optimistic UI update
    setIdeas((prev) =>
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
        setIdeas((prev) =>
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col pt-4 transition-colors duration-200">
      <main id="explore-ideas" className="flex-grow w-full px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row gap-10">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Feed Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Latest Community Ideas
              </h2>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                Browse project concepts submitted by fellow engineers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openShareModal}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-extrabold text-white dark:text-black bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 shadow-sm transition-all cursor-pointer"
              >
                + Share Idea
              </button>
            </div>
          </div>

          {/* Idea Cards Grid */}
          {loading ? (
            <div className="flex flex-col justify-center items-center py-24 text-slate-900 dark:text-slate-100 gap-4">
              <LoaderGooeyBlobs color="currentColor" size={18} />
              <span className="text-base font-extrabold text-slate-700 dark:text-slate-300">Loading ideas feed...</span>
            </div>
          ) : ideas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  onBookmarkToggle={toggleBookmark}
                  onLikeToggle={toggleLike}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-md mx-auto my-12 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                No ideas published yet
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                Be the first to share an idea with the community!
              </p>
              <button
                onClick={openShareModal}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-extrabold text-white dark:text-black bg-black dark:bg-white rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Share First Idea
              </button>
            </div>
          )}
        </div>

        {/* Filter Sidebar */}
        <SideBar />
      </main>
    </div>
  );
};

export default Home;
