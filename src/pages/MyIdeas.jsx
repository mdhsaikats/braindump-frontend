import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
import LoaderGooeyBlobs from "../components/ui/loaders-gooey-blobs";

const Plus = ({ className }) => (

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
    <line x1="128" y1="40" x2="128" y2="216"></line>
    <line x1="40" y1="128" x2="216" y2="128"></line>
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

const Trash = ({ className }) => (
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
    <line x1="216" y1="56" x2="40" y2="56"></line>
    <line x1="104" y1="104" x2="104" y2="168"></line>
    <line x1="152" y1="104" x2="152" y2="168"></line>
    <path d="M200,56V208a8,8,0,0,1-8,8H64a8,8,0,0,1-8-8V56"></path>
    <path d="M168,56V40a16,16,0,0,0-16-16H104A16,16,0,0,0,88,40V56"></path>
  </svg>
);

const MOCK_MY_IDEAS = [
  {
    id: 1,
    title: "Real-time Chat Application",
    description:
      "Build a simple real-time chat application where users can communicate through private and group conversations. Implement typing indicators and read receipts.",
    tags: ["React", "Node.js", "WebSocket"],
    difficulty: "Intermediate",
    status: "In Progress",
    author: {
      name: "saikat",
      avatar:
        "https://ui-avatars.com/api/?name=Saikat&background=f1f5f9&color=0f172a",
    },
    likes: 24,
    comments: 5,
    isBookmarked: true,
  },
  {
    id: 7,
    title: "AI BrainDump Assistant",
    description:
      "An intelligent assistant tool that converts unorganized notes and brain dumps into structured task lists, mind maps, and project roadmaps.",
    tags: ["React", "Go", "OpenAI API"],
    difficulty: "Advanced",
    status: "Idea Stage",
    author: {
      name: "saikat",
      avatar:
        "https://ui-avatars.com/api/?name=Saikat&background=f1f5f9&color=0f172a",
    },
    likes: 58,
    comments: 14,
    isBookmarked: true,
  },
  {
    id: 8,
    title: "Developer Snippet Manager",
    description:
      "A lightweight snippet manager allowing developers to quickly store, search, and copy code snippets with syntax highlighting and tags.",
    tags: ["Tailwind", "Vite", "LocalStorage"],
    difficulty: "Beginner",
    status: "Completed",
    author: {
      name: "saikat",
      avatar:
        "https://ui-avatars.com/api/?name=Saikat&background=f1f5f9&color=0f172a",
    },
    likes: 31,
    comments: 4,
    isBookmarked: false,
  },
];

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

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-emerald-100 text-emerald-800";
    case "in progress":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-slate-100 text-slate-700";
  }
};



const MyIdeaCard = ({ idea, onDelete }) => {
  const authorName = idea.author_name || idea.author?.name || "you";
  const avatarUrl = idea.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f1f5f9&color=0f172a`;
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  return (
    <article className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-teal-500/40 transition-all duration-300 flex flex-col cursor-pointer group overflow-hidden">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
              {idea.title}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(idea.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Delete Idea"
            >
              <Trash className="text-lg" />
            </button>
          </div>
        </div>
        <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-auto">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50/80 text-teal-700 border border-teal-200/50"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
        <div className="flex items-center gap-2 group/author">
          <img
            src={avatarUrl}
            alt={authorName}
            className="w-6 h-6 rounded-full ring-2 ring-white shadow-xs"
          />
          <span className="text-xs font-semibold text-slate-700 group-hover/author:text-slate-900 transition-colors">
            @{authorName}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
            <Heart
              weight={idea.likes > 0 ? "fill" : "regular"}
              className={`text-base ${idea.likes > 0 ? "text-teal-600" : ""}`}
            />
            <span className="text-xs font-medium">{idea.likes || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const MyIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openShareModal, refreshKey } = useOutletContext() || {};
  const { token } = useAuth();

  const fetchMyIdeas = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/v1/users/my-ideas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.ideas)) {
        setIdeas(data.ideas);
      }
    } catch (err) {
      console.error("Error fetching my ideas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyIdeas();
  }, [refreshKey, token]);

  const handleDelete = async (id) => {
    if (!token) return;

    setIdeas((prev) => prev.filter((idea) => idea.id !== id));

    try {
      await fetch(`${API_BASE_URL}/api/v1/users/idea/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error deleting idea:", err);
      fetchMyIdeas(); // Revert/refetch on error
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-teal-500/30">
      <main className="flex-grow max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              My Ideas
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Manage and track the ideas you have submitted.
            </p>
          </div>

          <button 
            onClick={openShareModal}
            className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 self-start sm:self-auto cursor-pointer"
          >
            <Plus className="mr-2 text-lg" />
            Create New Idea
          </button>
        </div>

        {/* Idea Cards Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 text-teal-600 gap-4">
            <LoaderGooeyBlobs color="#0d9488" size={16} />
            <span className="text-sm font-semibold text-slate-500">Loading your ideas...</span>
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ideas.map((idea) => (
              <MyIdeaCard
                key={idea.id}
                idea={idea}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <PencilSimple className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No ideas created yet
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Share your project ideas with the community and get feedback.
            </p>
            <button 
              onClick={openShareModal}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors cursor-pointer"
            >
              <Plus className="mr-1.5 text-lg" />
              Create your first idea
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyIdeas;
