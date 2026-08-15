import React, { useState } from "react";

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

const MOCK_SAVED_IDEAS = [
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
    isBookmarked: true,
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
    isBookmarked: true,
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

const SavedIdeaCard = ({ idea, onRemove }) => {
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
              onRemove(idea.id);
            }}
            className="flex-shrink-0 text-teal-600 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors focus:outline-none"
            title="Remove from saved"
          >
            <BookmarkSimple weight="fill" className="text-xl" />
          </button>
        </div>
        <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {idea.tags.map((tag) => (
            <span
              key={tag}
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
            src={idea.author.avatar}
            alt={idea.author.name}
            className="w-6 h-6 rounded-full ring-2 ring-white"
          />
          <span className="text-sm font-medium text-slate-700 group-hover/author:text-slate-900 transition-colors">
            @{idea.author.name}
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
            <Heart
              weight={idea.likes > 100 ? "fill" : "regular"}
              className={`text-base ${idea.likes > 100 ? "text-teal-600" : ""}`}
            />
            <span className="text-xs font-medium">{idea.likes}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const Saved = () => {
  const [savedIdeas, setSavedIdeas] = useState(MOCK_SAVED_IDEAS);

  const handleRemove = (id) => {
    setSavedIdeas((prev) => prev.filter((idea) => idea.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-teal-500/30">
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col gap-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Saved Ideas
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Ideas you have bookmarked to build or reference later.
            </p>
          </div>
        </div>

        {/* Idea Cards Grid */}
        {savedIdeas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {savedIdeas.map((idea) => (
              <SavedIdeaCard
                key={idea.id}
                idea={idea}
                onRemove={handleRemove}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark className="text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              No saved ideas yet
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Browse the explore feed and click the bookmark icon on any idea to save it here.
            </p>
            <a
              href="/explore"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Explore Ideas
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Saved;
