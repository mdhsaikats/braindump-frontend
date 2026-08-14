import React, { useState } from 'react';

const PlusCircle = ({ className, weight }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={weight === "bold" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={weight === "bold" ? "24" : "16"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <circle cx="128" cy="128" r="96" fill="none"></circle>
    <line x1="88" y1="128" x2="168" y2="128"></line>
    <line x1="128" y1="88" x2="128" y2="168"></line>
  </svg>
);

const Compass = ({ className, weight }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={weight === "bold" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={weight === "bold" ? "24" : "16"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <circle cx="128" cy="128" r="96" fill="none"></circle>
    <polygon points="104 152 168 88 152 104 88 168 104 152" fill="none"></polygon>
  </svg>
);

const CaretDown = ({ className, weight }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={weight === "bold" ? "24" : "16"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <polyline points="208 96 128 176 48 96"></polyline>
  </svg>
);

const Faders = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <line x1="96" y1="80" x2="40" y2="80"></line>
    <line x1="216" y1="80" x2="144" y2="80"></line>
    <line x1="160" y1="176" x2="40" y2="176"></line>
    <line x1="216" y1="176" x2="208" y2="176"></line>
    <circle cx="120" cy="80" r="24"></circle>
    <circle cx="184" cy="176" r="24"></circle>
  </svg>
);

const BookmarkSimple = ({ className, weight }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={weight === "fill" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={weight === "fill" ? "0" : "16"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <path d="M192,224l-64-40L64,224V48a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8Z"></path>
  </svg>
);

const Heart = ({ className, weight }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill={weight === "fill" ? "currentColor" : "none"} stroke="currentColor" strokeWidth={weight === "fill" ? "0" : "16"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <path d="M128,216S28,160,28,92A52,52,0,0,1,128,72h0A52,52,0,0,1,228,92C228,160,128,216,128,216Z"></path>
  </svg>
);

const ChatCircle = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <path d="M45.4,177A95.9,95.9,0,1,1,79,210.6h0L45.8,220a7.9,7.9,0,0,1-9.8-9.8L45.4,177Z"></path>
  </svg>
);

const Lightbulb = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256" className={className}>
    <path d="M235.91,91.86,220,44.15a16,16,0,0,0-10.22-10.22l-47.71-15.9a15.91,15.91,0,0,0-16.14,4.24l-89.65,89.65a15.9,15.9,0,0,0-4.24,16.14l15.9,47.71A16,16,0,0,0,78.15,186l47.71,15.9a15.9,15.9,0,0,0,16.14-4.24l89.65-89.65A15.91,15.91,0,0,0,235.91,91.86ZM184,88a12,12,0,1,1,12-12A12,12,0,0,1,184,88Zm-32,32a12,12,0,1,1,12-12A12,12,0,0,1,152,120Z"></path>
  </svg>
);

const GithubLogo = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <path d="M119.8,224c-22-2-41-10.4-55.2-22.7A102.7,102.7,0,0,1,32,128c0-54.3,42.4-98.8,96-98.8s96,44.5,96,98.8a100.8,100.8,0,0,1-37.4,78.2c-15.1,12.3-35.3,20.4-58.8,22.2"></path>
    <path d="M96,224v-8a48,48,0,0,1,26.8-43V160a24,24,0,0,1,24-24h32"></path>
  </svg>
);

const Check = ({ className, weight }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={weight === "bold" ? "32" : "16"} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 256 256" className={className}>
    <polyline points="216 72 104 184 48 128"></polyline>
  </svg>
);

const MOCK_IDEAS = [
  {
    id: 1,
    title: "Real-time Chat Application",
    description: "Build a simple real-time chat application where users can communicate through private and group conversations. Implement typing indicators and read receipts.",
    tags: ["React", "Node.js", "WebSocket"],
    difficulty: "Intermediate",
    author: {
      name: "saikat",
      avatar: "https://ui-avatars.com/api/?name=Saikat&background=f1f5f9&color=0f172a"
    },
    likes: 24,
    comments: 5,
    isBookmarked: false
  },
  {
    id: 2,
    title: "URL Shortener API",
    description: "Create a high-performance REST API that takes long URLs and generates short, unique aliases. Include analytics tracking for click counts and referrers.",
    tags: ["Go", "Redis", "Docker"],
    difficulty: "Advanced",
    author: {
      name: "alexdev",
      avatar: "https://ui-avatars.com/api/?name=AlexDev&background=f1f5f9&color=0f172a"
    },
    likes: 112,
    comments: 18,
    isBookmarked: false
  },
  {
    id: 3,
    title: "Markdown Note Taking App",
    description: "A minimalist web app for taking notes using Markdown. Features should include live preview, local storage saving, and basic categorization.",
    tags: ["Next.js", "Tailwind"],
    difficulty: "Beginner",
    author: {
      name: "elenacodes",
      avatar: "https://ui-avatars.com/api/?name=Elena+C&background=f1f5f9&color=0f172a"
    },
    likes: 89,
    comments: 12,
    isBookmarked: true
  },
  {
    id: 4,
    title: "Personal Expense Tracker",
    description: "Help users manage their finances. Build a dashboard to log daily expenses, categorize spending, and visualize data using simple charts.",
    tags: ["Vue.js", "Firebase"],
    difficulty: "Beginner",
    author: {
      name: "markz",
      avatar: "https://ui-avatars.com/api/?name=Mark+Z&background=f1f5f9&color=0f172a"
    },
    likes: 45,
    comments: 8,
    isBookmarked: false
  },
  {
    id: 5,
    title: "Developer Portfolio Builder",
    description: "A platform where developers can input their GitHub username, select a template, and automatically generate a static portfolio website populated with their pinned repos.",
    tags: ["React", "PostgreSQL", "GitHub API"],
    difficulty: "Intermediate",
    author: {
      name: "sam_builds",
      avatar: "https://ui-avatars.com/api/?name=Sam+Dev&background=f1f5f9&color=0f172a"
    },
    likes: 210,
    comments: 34,
    isBookmarked: false
  },
  {
    id: 6,
    title: "Simple File Sharing Service",
    description: "Create a secure, ephemeral file sharing service. Users upload a file, receive a one-time download link, and the file is automatically deleted from storage after being downloaded once or after 24 hours.",
    tags: ["Python", "FastAPI", "AWS S3"],
    difficulty: "Advanced",
    author: {
      name: "davidr",
      avatar: "https://ui-avatars.com/api/?name=David+R&background=f1f5f9&color=0f172a"
    },
    likes: 156,
    comments: 22,
    isBookmarked: false
  }
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
    case 'beginner':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
    case 'intermediate':
      return 'bg-amber-50 text-amber-700 border-amber-200/60';
    case 'advanced':
      return 'bg-rose-50 text-rose-700 border-rose-200/60';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200/60';
  }
};

const Sidebar = ({ selectedTechs, toggleTech }) => (
  <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
    {/* Popular Technologies */}
    <div>
      <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Popular Technologies</h3>
      <div className="space-y-3">
        {TECHNOLOGIES.map((tech) => {
          const isSelected = selectedTechs.includes(tech.name);
          return (
            <label key={tech.name} className="flex items-center gap-3 cursor-pointer group">
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-teal-600 border-teal-600' : 'border-slate-300 bg-white group-hover:border-teal-400'}`}>
                {isSelected && <Check weight="bold" className="text-white text-[10px]" />}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => toggleTech(tech.name)}
              />
              <span className={`text-sm transition-colors ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>
                {tech.name}
              </span>
              <span className="ml-auto text-xs text-slate-400">{tech.count}</span>
            </label>
          )
        })}
      </div>
      <button className="mt-4 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
        Show more tags...
      </button>
    </div>

    {/* Difficulty Filter */}
    <div className="pt-6 border-t border-slate-200">
      <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Difficulty</h3>
      <div className="space-y-3">
        {DIFFICULTIES.map((diff) => (
          <label key={diff} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-4 h-4 rounded border border-slate-300 bg-white group-hover:border-teal-400 transition-colors flex items-center justify-center" />
            <input type="checkbox" className="hidden" />
            <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{diff}</span>
          </label>
        ))}
      </div>
    </div>
  </aside>
);

const IdeaCard = ({ idea, onBookmarkToggle }) => {
  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col cursor-pointer group">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="text-lg font-semibold text-slate-900 leading-snug group-hover:text-teal-600 transition-colors line-clamp-2">
            {idea.title}
          </h3>
          <button
            onClick={(e) => { e.stopPropagation(); onBookmarkToggle(idea.id); }}
            className={`flex-shrink-0 transition-colors focus:outline-none p-1 -m-1 ${idea.isBookmarked ? 'text-teal-600' : 'text-slate-400 hover:text-teal-500'}`}
            title={idea.isBookmarked ? "Remove Idea" : "Save Idea"}
          >
            <BookmarkSimple weight={idea.isBookmarked ? "fill" : "regular"} className="text-xl" />
          </button>
        </div>
        <p className="text-slate-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          {idea.description}
        </p>

        {/* Tags & Difficulty */}
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {idea.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
              {tag}
            </span>
          ))}
          <span className={`ml-auto inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(idea.difficulty)}`}>
            {idea.difficulty}
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex items-center justify-between">
        <div className="flex items-center gap-2 group/author">
          <img src={idea.author.avatar} alt={idea.author.name} className="w-6 h-6 rounded-full ring-2 ring-white" />
          <span className="text-sm font-medium text-slate-700 group-hover/author:text-slate-900 transition-colors">@{idea.author.name}</span>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
          <div className="flex items-center gap-1.5 hover:text-teal-600 transition-colors">
            <Heart weight={idea.likes > 100 ? "fill" : "regular"} className={`text-base ${idea.likes > 100 ? 'text-teal-600' : ''}`} />
            <span className="text-xs font-medium">{idea.likes}</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-slate-900 transition-colors">
            <ChatCircle className="text-base" />
            <span className="text-xs font-medium">{idea.comments}</span>
          </div>
        </div>
      </div>
    </article>
  );
};


const Home = () => {
  const [ideas, setIdeas] = useState(MOCK_IDEAS);
  const [selectedTechs, setSelectedTechs] = useState(['React', 'Node.js']);

  const toggleBookmark = (id) => {
    setIdeas(ideas.map(idea =>
      idea.id === id ? { ...idea, isBookmarked: !idea.isBookmarked } : idea
    ));
  };

  const toggleTech = (techName) => {
    setSelectedTechs(prev =>
      prev.includes(techName)
        ? prev.filter(t => t !== techName)
        : [...prev, techName]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-teal-500/30">

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col lg:flex-row gap-10">

        {/* Sidebar for Desktop Filters */}
        <Sidebar selectedTechs={selectedTechs} toggleTech={toggleTech} />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">

          {/* Feed Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Latest Ideas</h2>

            <div className="flex items-center gap-3">
              <button className="lg:hidden inline-flex items-center px-3 py-2 border border-slate-200 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                <Faders className="mr-2 text-lg" />
                Filters
              </button>

              <div className="relative group">
                <select className="appearance-none block w-full pl-4 pr-10 py-2 text-sm font-medium border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white text-slate-700 shadow-sm cursor-pointer hover:bg-slate-50 transition-all">
                  <option>Latest</option>
                  <option>Popular</option>
                  <option>Most Discussed</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 group-hover:text-slate-600 transition-colors">
                  <CaretDown weight="bold" />
                </div>
              </div>
            </div>
          </div>

          {/* Idea Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} onBookmarkToggle={toggleBookmark} />
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="inline-flex items-center justify-center px-6 py-2.5 border border-slate-200 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Load more ideas
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Home;