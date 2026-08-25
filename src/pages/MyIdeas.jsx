import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { API_BASE_URL } from "../config/api";
import LoaderGooeyBlobs from "../components/ui/loaders-gooey-blobs";
import EditIdeaModal from "../components/EditIdeaModal";
import IdeaDetailsModal from "../components/IdeaDetailsModal";

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

const MyIdeaCard = ({ idea, onEdit, onDelete, onOpen }) => {
  const authorName = idea.author_name || idea.author?.name || "you";
  const avatarUrl =
    idea.author?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=f1f5f9&color=0f172a`;
  const tags = Array.isArray(idea.tags) ? idea.tags : [];

  return (
    <article
      onClick={() => onOpen(idea)}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-black/40 dark:hover:border-white/40 transition-all duration-300 flex flex-col cursor-pointer group overflow-hidden"
    >
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug group-hover:text-black dark:group-hover:text-slate-100 transition-colors line-clamp-2">
              {idea.title}
            </h3>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(idea);
              }}
              className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Edit Idea"
            >
              <PencilSimple className="text-lg" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(idea.id);
              }}
              className="p-1.5 rounded-lg text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
              title="Delete Idea"
            >
              <Trash className="text-lg" />
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
              onOpen(idea);
            }}
            className="flex items-center gap-1.5 transition-colors focus:outline-none cursor-pointer group/comment"
            title="Comments"
          >
            <MessageCircle className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover/comment:text-slate-900 dark:group-hover/comment:text-white transition-colors" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {idea.comments_count || idea.comments?.length || 0}
            </span>
          </button>
          <div className="flex items-center gap-1.5 transition-colors">
            <Heart
              weight={idea.likes > 0 ? "fill" : "regular"}
              className={`text-base ${idea.likes > 0 ? "text-slate-900 dark:text-white fill-slate-900 dark:fill-white" : ""}`}
            />
            <span className="text-xs font-semibold">{idea.likes || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const MyIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIdea, setEditingIdea] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);
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
    }
  };

  const handleUpdateIdea = (updatedIdea) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === updatedIdea.id ? { ...idea, ...updatedIdea } : idea,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      <main className="flex-grow w-full px-4 sm:px-8 lg:px-12 flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              My Published Ideas
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
              Manage and track all project ideas you have submitted.
            </p>
          </div>

          <button
            onClick={openShareModal}
            className="inline-flex items-center justify-center px-5 py-3 rounded-2xl text-sm font-extrabold text-white dark:text-black bg-black dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md hover:shadow-xl transition-all self-start sm:self-auto cursor-pointer"
          >
            <Plus className="mr-2 text-lg" />
            Create New Idea
          </button>
        </div>

        {/* Idea Cards Grid */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20 text-slate-900 dark:text-slate-100 gap-4">
            <LoaderGooeyBlobs color="currentColor" size={16} />
            <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              Loading your ideas...
            </span>
          </div>
        ) : ideas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <MyIdeaCard
                key={idea.id}
                idea={idea}
                onEdit={(selectedIdea) => setEditingIdea(selectedIdea)}
                onDelete={handleDelete}
                onOpen={setSelectedIdea}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <PencilSimple className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              No ideas created yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
              Share your project ideas with the community and get feedback.
            </p>
            <button
              onClick={openShareModal}
              className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-white dark:text-black bg-black dark:bg-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Plus className="mr-1.5 text-lg" />
              Create your first idea
            </button>
          </div>
        )}
      </main>

      <EditIdeaModal
        isOpen={Boolean(editingIdea)}
        onClose={() => setEditingIdea(null)}
        idea={editingIdea}
        onUpdated={handleUpdateIdea}
      />
      <IdeaDetailsModal
        idea={selectedIdea}
        onClose={() => setSelectedIdea(null)}
      />
    </div>
  );
};

export default MyIdeas;
