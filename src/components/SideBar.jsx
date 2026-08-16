import React, { useState } from "react";

const SideBar = () => {
  // 1. Fixed data structure to match your JSX (objects instead of strings)
  const TECHNOLOGIES = [
    { name: "JavaScript", count: 142 },
    { name: "React", count: 98 },
    { name: "Node.js", count: 76 },
    { name: "Express", count: 45 },
    { name: "Go", count: 32 },
    { name: "PostgreSQL", count: 67 },
  ];

  // 2. Added missing DIFFICULTIES array
  const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced", "Expert"];

  // 3. Added state to manage selected checkboxes
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [selectedDiffs, setSelectedDiffs] = useState([]);

  // 4. Added toggle handler for technologies
  const toggleTech = (techName) => {
    setSelectedTechs((prev) =>
      prev.includes(techName)
        ? prev.filter((name) => name !== techName)
        : [...prev, techName],
    );
  };

  // Added toggle handler for difficulties to make the second section work
  const toggleDiff = (diffName) => {
    setSelectedDiffs((prev) =>
      prev.includes(diffName)
        ? prev.filter((name) => name !== diffName)
        : [...prev, diffName],
    );
  };

  return (
    <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
      <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-6">
        {/* Popular Technologies */}
        <div>
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            Popular Technologies
          </h3>
          <div className="space-y-2">
            {TECHNOLOGIES.map((tech) => {
              const isSelected = selectedTechs.includes(tech.name);
              return (
                <label
                  key={tech.name}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected ? "bg-black text-white font-bold shadow-xs" : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-white border-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-black"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={4}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => toggleTech(tech.name)}
                    />
                    <span className="text-sm font-bold">{tech.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    {tech.count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
            Difficulty Level
          </h3>
          <div className="space-y-2">
            {DIFFICULTIES.map((diff) => {
              const isSelected = selectedDiffs.includes(diff);
              return (
                <label
                  key={diff}
                  className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected ? "bg-black text-white font-bold shadow-xs" : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-white border-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={4}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={isSelected}
                    onChange={() => toggleDiff(diff)}
                  />
                  <span className="text-sm font-bold">{diff}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
