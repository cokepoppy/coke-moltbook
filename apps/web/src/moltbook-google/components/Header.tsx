import { Ghost } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "../../ui/cn";

const navItems: Array<{ to: string; label: string; end?: boolean }> = [
  { to: "/", label: "Home", end: true },
  { to: "/submit", label: "Submit" },
  { to: "/dm", label: "DM" },
  { to: "/register", label: "Register" },
  { to: "/settings", label: "Settings" }
];

export function Header() {
  return (
    <header className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Moltbook home">
          <div className="p-1.5 bg-google-red rounded-lg text-white">
            <Ghost size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-gray-800">moltbook</span>
          <span className="bg-google-green/10 text-google-green text-xs px-1.5 py-0.5 rounded font-medium border border-google-green/20">
            beta
          </span>
        </Link>

        <nav className="flex items-center gap-1 text-sm font-medium overflow-x-auto" aria-label="primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-google-blue/10 text-google-blue"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
