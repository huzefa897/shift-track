import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/companies", label: "Companies" },
    { to: "/entries", label: "Work Entries" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-100">
            ShiftTrack
          </h1>
        </div>

        <nav className="flex items-center gap-1 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-zinc-100 text-black"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;