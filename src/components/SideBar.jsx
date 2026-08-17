import React, { useState, useEffect } from "react";

// Dynamically import all image files in the /public/poster directory via Vite glob
const posterModules = import.meta.glob("/public/poster/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const POSTER_PATHS = Object.keys(posterModules).map((path) =>
  path.replace(/^\/public/, "")
);

const FALLBACK_POSTERS = [
  "/poster/b82b4b1f422dca75dd48fa738a75cb95.jpg",
  "/poster/download.png",
  "/poster/poster-1.jpg",
];

const ALL_POSTERS = POSTER_PATHS.length > 0 ? POSTER_PATHS : FALLBACK_POSTERS;

const SideBar = () => {
  const [currentPoster, setCurrentPoster] = useState("");

  useEffect(() => {
    if (ALL_POSTERS.length > 0) {
      const randomIndex = Math.floor(Math.random() * ALL_POSTERS.length);
      setCurrentPoster(ALL_POSTERS[randomIndex]);
    }
  }, []);

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-3 shadow-sm overflow-hidden sticky top-24 transition-colors">
        {currentPoster && (
          <img
            src={currentPoster}
            alt="BrainDump Vertical Poster"
            className="w-full h-auto max-h-[620px] rounded-2xl object-cover shadow-xs transition-all hover:scale-[1.01]"
          />
        )}
      </div>
    </aside>
  );
};

export default SideBar;
