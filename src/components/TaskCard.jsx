import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Check,
  Circle,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import "./TaskList.css";
import "./TaskCard.css";

const STATUSES = ["To do", "In progress", "Completed"];

const priorityClass = {
  High: "pill-high",
  Medium: "pill-medium",
  Low: "pill-low",
};

const categoryClass = {
  Design: "cat-design",
  Development: "cat-development",
  Content: "cat-content",
  Research: "cat-research",
  Testing: "cat-testing",
  General: "cat-general",
};

function formatDate(iso) {
  // iso is "YYYY-MM-DD". Build the date from parts to avoid timezone shifts.
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const done = task.status === "Completed";
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);

  // Close the menu on outside click or Escape
  useEffect(() => {
    if (!menuOpen) return;

    const handleClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [menuOpen]);

  // Close the menu when keyboard focus leaves it
  const handleBlur = (e) => {
    if (!wrapRef.current.contains(e.relatedTarget)) {
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <li className="task-card">
      <span className={`task-check ${done ? "done" : ""}`} aria-hidden="true">
        {done ? <Check size={14} /> : <Circle size={12} />}
      </span>

      <div className="task-main">
        <h3 className="task-title">{task.title}</h3>
        <p className="task-sub">
          {task.description ? `${task.description} · ` : ""}
          {task.status}
        </p>
      </div>

      <div className="task-meta">
        <span className={`pill ${categoryClass[task.category] || "cat-general"}`}>
          {task.category}
        </span>
        <span className={`pill ${priorityClass[task.priority]}`}>
          {task.priority}
        </span>
        <span className="task-date">
          <Calendar size={12} aria-hidden="true" />
          {formatDate(task.dueDate)}
        </span>
      </div>

      <div className="task-menu-wrap" ref={wrapRef} onBlur={handleBlur}>
        <button
          type="button"
          ref={buttonRef}
          className="task-menu"
          aria-label={`More actions for ${task.title}`}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MoreHorizontal size={16} aria-hidden="true" />
        </button>

        {menuOpen && (
          <ul className="menu-popover" role="menu">
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="menu-item"
                onClick={() => {
                  closeMenu();
                  onEdit(task);
                }}
              >
                <Pencil size={14} aria-hidden="true" />
                Edit
              </button>
            </li>

            <li role="separator" className="menu-divider" />
            <li role="presentation">
              <p className="menu-label" aria-hidden="true">
                Move to
              </p>
            </li>

            {STATUSES.map((status) => {
              const isCurrent = task.status === status;
              return (
                <li role="none" key={status}>
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={isCurrent}
                    className={`menu-item ${isCurrent ? "current" : ""}`}
                    onClick={() => {
                      closeMenu();
                      if (!isCurrent) onStatusChange(task.id, status);
                    }}
                  >
                    {status}
                    {isCurrent && (
                      <Check size={14} className="menu-check" aria-hidden="true" />
                    )}
                  </button>
                </li>
              );
            })}

            <li role="separator" className="menu-divider" />
            <li role="none">
              <button
                type="button"
                role="menuitem"
                className="menu-item danger"
                onClick={() => {
                  closeMenu();
                  onDelete(task);
                }}
              >
                <Trash2 size={14} aria-hidden="true" />
                Delete
              </button>
            </li>
          </ul>
        )}
      </div>
    </li>
  );
}

export default TaskCard;