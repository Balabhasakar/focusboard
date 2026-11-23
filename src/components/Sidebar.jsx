import { LayoutGrid, ListChecks, Calendar, Settings } from "lucide-react";
import Logo from "./Logo";

const navItems = [
  { id: "overview", label: "Overview", shortLabel: "Overview", icon: LayoutGrid },
  { id: "tasks", label: "My tasks", shortLabel: "Tasks", icon: ListChecks },
  { id: "calendar", label: "Calendar", shortLabel: "Calendar", icon: Calendar },
  { id: "settings", label: "Settings", shortLabel: "Settings", icon: Settings },
];

function Sidebar({ activeNav, onNavChange }) {
  return (
    <>
      <aside className="sidebar">
        <Logo />
        <p className="sidebar-label">WORKSPACE</p>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map(({ id, label, icon: Icon }) => (
              <li key={id}>
                <button
                  type="button"
                  className={`nav-item ${activeNav === id ? "active" : ""}`}
                  aria-current={activeNav === id ? "page" : undefined}
                  onClick={() => onNavChange(id)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        {navItems.map(({ id, shortLabel, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`bottom-nav-item ${activeNav === id ? "active" : ""}`}
            aria-current={activeNav === id ? "page" : undefined}
            onClick={() => onNavChange(id)}
          >
            <Icon size={20} aria-hidden="true" />
            <span>{shortLabel}</span>
          </button>
        ))}
      </nav>
    </>
  );
}

export default Sidebar;