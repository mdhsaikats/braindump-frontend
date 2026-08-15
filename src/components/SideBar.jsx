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
    <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8 mt-8 ml-8">
      {/* Popular Technologies */}
      <div>
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
          Popular Technologies
        </h3>
        <div className="space-y-3">
          {TECHNOLOGIES.map((tech) => {
            const isSelected = selectedTechs.includes(tech.name);
            return (
              <label
                key={tech.name}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-teal-600 border-teal-600"
                      : "border-slate-300 bg-white group-hover:border-teal-400"
                  }`}
                >
                  {/* Replaced undefined <Check /> with a standard SVG */}
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
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
                <span
                  className={`text-sm transition-colors ${
                    isSelected
                      ? "text-slate-900 font-medium"
                      : "text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {tech.name}
                </span>
                <span className="ml-auto text-xs text-slate-400">
                  {tech.count}
                </span>
              </label>
            );
          })}
        </div>
        <button className="mt-4 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
          Show more tags...
        </button>
      </div>

      {/* Difficulty Filter */}
      <div className="pt-6 border-t border-slate-200">
        <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">
          Difficulty
        </h3>
        <div className="space-y-3">
          {DIFFICULTIES.map((diff) => {
            const isSelected = selectedDiffs.includes(diff);
            return (
              <label
                key={diff}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-teal-600 border-teal-600"
                      : "border-slate-300 bg-white group-hover:border-teal-400"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
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
                <span
                  className={`text-sm transition-colors ${
                    isSelected
                      ? "text-slate-900 font-medium"
                      : "text-slate-600 group-hover:text-slate-900"
                  }`}
                >
                  {diff}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
