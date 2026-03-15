import { NavLink } from "react-router-dom";

export default function Navbar() {
  const baseClasses =
    "px-4 py-2 rounded-lg text-sm font-medium transition-colors";
  const activeClasses = "bg-slate-700 text-white";
  const inactiveClasses = "text-slate-300 hover:bg-slate-800 hover:text-white";

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">ShiftTrack</h1>

        <div className="flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/companies"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Companies
          </NavLink>

          <NavLink
            to="/work-entries"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`
            }
          >
            Work Entries
          </NavLink>
        </div>
      </div>
    </nav>
  );
}