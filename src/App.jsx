import { useEffect, useState } from "react";
import { ListChecks, Clock3, Check, Plus } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FocusNotes from "./components/FocusNotes";
import StatCard from "./components/StatCard";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ConfirmDialog from "./components/ConfirmDialog";
import useLocalStorage from "./hooks/useLocalStorage";
import { sampleTasks } from "./data/sampleTasks";
import { isValidTaskList } from "./data/taskValidation";

const STORAGE_KEY = "focusboard_tasks";

function App() {
  const [activeNav, setActiveNav] = useState("overview");

  // Saved tasks load first; sample data is used only when nothing valid is saved
  const [tasks, setTasks] = useLocalStorage(
    STORAGE_KEY,
    sampleTasks,
    isValidTaskList
  );

  // Form state: closed, creating (editingTask = null) or editing
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Delete confirmation: holds the task waiting to be confirmed (or null)
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Filter state (the task list itself is never modified by filtering)
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  // Stop the page behind a dialog from scrolling
  useEffect(() => {
    document.body.style.overflow = formOpen || taskToDelete ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [formOpen, taskToDelete]);

  // ----- Task operations (always create new arrays, never mutate) -----
  const addTask = (data) => {
    const newTask = { id: Date.now(), category: "General", ...data };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (id, data) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const changeStatus = (id, status) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // ----- Form open / close / save -----
  const openCreate = () => {
    setEditingTask(null);
    setFormOpen(true);
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingTask(null);
  };

  const handleSave = (data) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    closeForm();
  };

  // ----- Delete flow: ask first, delete only on confirm -----
  const confirmDelete = () => {
    if (taskToDelete) deleteTask(taskToDelete.id);
    setTaskToDelete(null);
  };

  // ----- Derived statistics: always calculated from the task data -----
  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "In progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const completionPercent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // ----- Derived visible tasks: search + status + priority applied together -----
  const query = search.trim().toLowerCase();
  const visibleTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filtersActive =
    search !== "" || statusFilter !== "All" || priorityFilter !== "All";

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  };

  return (
    <div className="app">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      <div className="main">
        <Header />

        <main className="page" id="main-content" tabIndex={-1}>
          <div className="page-head">
            <div>
              <h1>
                Your work,<br className="mobile-br" /> in focus.
              </h1>
              <p className="page-sub">
                <span className="sub-desktop">
                  Plan your day, stay organized, and celebrate small wins.
                </span>
                <span className="sub-mobile">
                  Stay organized and keep moving forward.
                </span>
              </p>
            </div>
            <button
              type="button"
              className="btn-primary btn-new"
              onClick={openCreate}
            >
              New task
            </button>
          </div>

          <FocusNotes />

          <section aria-label="Overview statistics">
            <h2 className="overview-heading">Overview</h2>
            <div className="stats-grid">
              <StatCard
                icon={ListChecks}
                tone="purple"
                label="Total tasks"
                value={total}
                note="Across all projects"
              />
              <StatCard
                icon={Clock3}
                tone="blue"
                label="In progress"
                value={inProgress}
                note="Keep the momentum"
                hideOnMobile
              />
              <StatCard
                icon={Check}
                tone="green"
                label="Completed"
                value={completed}
                note={`${completionPercent}% complete`}
              />
            </div>
          </section>

          <section aria-labelledby="my-tasks-heading">
            <div className="tasks-head">
              <div>
                <h2 id="my-tasks-heading">My tasks</h2>
                <p>
                  <span className="sub-desktop">
                    Manage and track everything in one place.
                  </span>
                  <span className="sub-mobile">Your priorities for this week</span>
                </p>
              </div>
              <button
                type="button"
                className="btn-soft btn-view-all"
                onClick={resetFilters}
              >
                View all tasks
              </button>
              <button
                type="button"
                className="btn-primary btn-add"
                aria-label="New task"
                onClick={openCreate}
              >
                <Plus size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="toolbar">
              <FilterTabs
                active={statusFilter}
                onChange={setStatusFilter}
                counts={{ All: total }}
              />
              <div className="toolbar-right">
                <SearchBar value={search} onChange={setSearch} />
                <select
                  className="priority-select"
                  aria-label="Filter by priority"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  <option value="All">Priority: All</option>
                  <option value="High">Priority: High</option>
                  <option value="Medium">Priority: Medium</option>
                  <option value="Low">Priority: Low</option>
                </select>
                {filtersActive && (
                  <button type="button" className="btn-reset" onClick={resetFilters}>
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Read out by screen readers when search or filters change */}
            <p className="sr-only" role="status" aria-live="polite">
              {visibleTasks.length} of {total} tasks shown
            </p>

            <TaskList
              tasks={visibleTasks}
              hasAnyTasks={total > 0}
              onEdit={openEdit}
              onDelete={setTaskToDelete}
              onStatusChange={changeStatus}
              onCreate={openCreate}
            />
          </section>
        </main>
      </div>

      {formOpen && (
        <TaskForm
          key={editingTask ? editingTask.id : "new"}
          task={editingTask}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}

      {taskToDelete && (
        <ConfirmDialog
          title="Delete this task?"
          message={
            <>
              <strong>{taskToDelete.title}</strong> will be permanently removed.
              This can't be undone.
            </>
          }
          confirmLabel="Delete task"
          onConfirm={confirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}

export default App;