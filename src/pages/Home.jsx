import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";

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

const GithubLogo = ({ className }) => (
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
    <path d="M119.8,224c-22-2-41-10.4-55.2-22.7A102.7,102.7,0,0,1,32,128c0-54.3,42.4-98.8,96-98.8s96,44.5,96,98.8a100.8,100.8,0,0,1-37.4,78.2c-15.1,12.3-35.3,20.4-58.8,22.2"></path>
    <path d="M96,224v-8a48,48,0,0,1,26.8-43V160a24,24,0,0,1,24-24h32"></path>
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

const MOCK_IDEAS = [
  {
    id: 1,
    title: "Real-time Chat Application",
    description:
      "Build a simple real-time chat application where users can communicate through private and group conversations. Implement typing indicators and read receipts.",
    tags: ["React", "Node.js", "WebSocket"],
    difficulty: "Intermediate",
    author: {
      name: "saikat",
      avatar:
        "https://ui-avatars.com/api/?name=Saikat&background=f1f5f9&color=0f172a",
    },
    likes: 24,
    comments: 5,
    isBookmarked: false,
  },
  {
    id: 2,
    title: "URL Shortener API",
    description:
      "Create a high-performance REST API that takes long URLs and generates short, unique aliases. Include analytics tracking for click counts and referrers.",
    tags: ["Go", "Redis", "Docker"],
    difficulty: "Advanced",
    author: {
      name: "alexdev",
      avatar:
        "https://ui-avatars.com/api/?name=AlexDev&background=f1f5f9&color=0f172a",
    },
    likes: 112,
    comments: 18,
    isBookmarked: false,
  },
  {
    id: 3,
    title: "Markdown Note Taking App",
    description:
      "A minimalist web app for taking notes using Markdown. Features should include live preview, local storage saving, and basic categorization.",
    tags: ["Next.js", "Tailwind"],
    difficulty: "Beginner",
    author: {
      name: "elenacodes",
      avatar:
        "https://ui-avatars.com/api/?name=Elena+C&background=f1f5f9&color=0f172a",
    },
    likes: 89,
    comments: 12,
    isBookmarked: true,
  },
  {
    id: 4,
    title: "Personal Expense Tracker",
    description:
      "Help users manage their finances. Build a dashboard to log daily expenses, categorize spending, and visualize data using simple charts.",
    tags: ["Vue.js", "Firebase"],
    difficulty: "Beginner",
    author: {
      name: "markz",
      avatar:
        "https://ui-avatars.com/api/?name=Mark+Z&background=f1f5f9&color=0f172a",
    },
    likes: 45,
    comments: 8,
    isBookmarked: false,
  },
  {
    id: 5,
    title: "Developer Portfolio Builder",
    description:
      "A platform where developers can input their GitHub username, select a template, and automatically generate a static portfolio website populated with their pinned repos.",
    tags: ["React", "PostgreSQL", "GitHub API"],
    difficulty: "Intermediate",
    author: {
      name: "sam_builds",
      avatar:
        "https://ui-avatars.com/api/?name=Sam+Dev&background=f1f5f9&color=0f172a",
    },
    likes: 210,
    comments: 34,
    isBookmarked: false,
  },
  {
    id: 6,
    title: "Simple File Sharing Service",
    description:
      "Create a secure, ephemeral file sharing service. Users upload a file, receive a one-time download link, and the file is automatically deleted from storage after being downloaded once or after 24 hours.",
    tags: ["Python", "FastAPI", "AWS S3"],
    difficulty: "Advanced",
    author: {
      name: "davidr",
      avatar:
        "https://ui-avatars.com/api/?name=David+R&background=f1f5f9&color=0f172a",
    },
    likes: 156,
    comments: 22,
    isBookmarked: false,
  },
];

const TECHNOLOGIES = [
  { name: "React", count: 142 },
  { name: "Node.js", count: 98 },
  { name: "Python", count: 85 },
  { name: "Go", count: 41 },
  { name: "PostgreSQL", count: 76 },
  { name: "MongoDB", count: 53 },
  { name: "Docker", count: 62 },
  { name: "Next.js", count: 112 },
];

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "intermediate":
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    case "advanced":
      return "bg-rose-50 text-rose-700 border-rose-200/60";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200/60";
  }
};



const IdeaCard = ({ idea, onBookmarkToggle, onLikeToggle }) => {
  const authorName = idea.author_name || idea.author?.name || "anonymous";
  const avatarUrl = idea.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f1f5f9&color=0f172a`;
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col cursor-pointer group">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="text-lg font-semibold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
            {idea.title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkToggle(idea.id, idea.isBookmarked);
            }}
            className={`flex-shrink-0 transition-colors focus:outline-none p-1 -m-1 ${idea.isBookmarked ? "text-teal-600" : "text-slate-400 hover:text-teal-500"}`}
            title={idea.isBookmarked ? "Remove Idea" : "Save Idea"}
          >
            <BookmarkSimple
              weight={idea.isBookmarked ? "fill" : "regular"}
              className="text-xl"
            />
          </button>
        </div>
        <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between">
        <div className="flex items-center gap-2 group/author">
          <img
            src={avatarUrl}
            alt={authorName}
            className="w-6 h-6 rounded-full ring-2 ring-white"
          />
          <span className="text-sm font-medium text-slate-700 group-hover/author:text-slate-900 transition-colors">
            @{authorName}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLikeToggle(idea.id);
            }}
            className="flex items-center gap-1.5 hover:text-teal-600 transition-colors focus:outline-none"
          >
            <Heart
              weight={idea.likes > 0 ? "fill" : "regular"}
              className={`text-base ${idea.likes > 0 ? "text-teal-600" : ""}`}
            />
            <span className="text-xs font-medium">{idea.likes || 0}</span>
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

  const fetchAllIdeas = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/v1/users/idea`, {
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
  }, [refreshKey, token]);

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
      prev.map((idea) =>
        idea.id === id ? { ...idea, likes: (idea.likes || 0) + 1 } : idea
      )
    );

    try {
      await fetch(`${API_BASE_URL}/api/v1/users/idea/${id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-teal-500/30">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-10">
        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {/* Feed Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Latest Ideas
            </h2>

            <div className="flex items-center gap-3">
              <button
                onClick={openShareModal}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 cursor-pointer"
              >
                + Share Idea
              </button>
            </div>
          </div>

          {/* Idea Cards Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20 text-slate-500">
              Loading ideas...
            </div>
          ) : ideas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                No ideas published yet
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Be the first to share an idea with the community!
              </p>
              <button
                onClick={openShareModal}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer"
              >
                Share First Idea
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
