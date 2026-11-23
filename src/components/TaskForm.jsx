import { useEffect, useRef, useState } from "react";
import { X, Calendar, ChevronDown } from "lucide-react";
import "./TaskForm.css";

const emptyValues = {
  title: "",
  description: "",
  status: "To do",
  priority: "Medium",
  dueDate: "",
};

function validate(values) {
  const errors = {};
  const title = values.title.trim();
  if (title === "") {
    errors.title = "Please enter a task title.";
  } else if (title.length > 80) {
    errors.title = "Title must be 80 characters or fewer.";
  }
  if (!values.dueDate) {
    errors.dueDate = "Please choose a due date.";
  }
  return errors;
}

// task = existing task when editing, null when creating
function TaskForm({ task, onSave, onCancel }) {
  const isEdit = Boolean(task);

  const [values, setValues] = useState(
    task
      ? {
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
          dueDate: task.dueDate,
        }
      : emptyValues
  );
  const [errors, setErrors] = useState({});

  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const dateRef = useRef(null);

  // Focus the title on open, and give focus back to the opener on close
  useEffect(() => {
    const opener = document.activeElement;
    titleRef.current?.focus();
    return () => {
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the error for a field as soon as the user edits it
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      if (found.title) titleRef.current?.focus();
      else dateRef.current?.focus();
      return;
    }
    onSave({
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate,
    });
  };

  // Escape closes; Tab stays inside the dialog
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onCancel();
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = dialogRef.current.querySelectorAll(
      "button, input, textarea, select, [href], [tabindex]:not([tabindex='-1'])"
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        aria-describedby="form-sub"
        ref={dialogRef}
        onKeyDown={handleKeyDown}
      >
        <div className="modal-head">
          <div>
            <h2 id="form-title">{isEdit ? "Edit task" : "Create new task"}</h2>
            <p id="form-sub">
              {isEdit
                ? "Update the details of this task."
                : "Add your task details to stay on top of your work."}
            </p>
          </div>
          <button
            type="button"
            className="modal-close"
            aria-label="Close form"
            onClick={onCancel}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="task-title">Task title *</label>
            <input
              id="task-title"
              name="title"
              type="text"
              ref={titleRef}
              className={`field-input ${errors.title ? "invalid" : ""}`}
              placeholder="e.g. Update pricing page"
              value={values.title}
              onChange={handleChange}
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="field-error" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="task-description">Description</label>
            <textarea
              id="task-description"
              name="description"
              rows={3}
              className="field-input"
              placeholder="Add notes about this task..."
              value={values.description}
              onChange={handleChange}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="task-status">Status</label>
              <div className="select-wrap">
                <select
                  id="task-status"
                  name="status"
                  className="field-input"
                  value={values.status}
                  onChange={handleChange}
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <ChevronDown size={14} aria-hidden="true" />
              </div>
            </div>

            <div className="field">
              <label htmlFor="task-priority">Priority</label>
              <div className="select-wrap">
                <select
                  id="task-priority"
                  name="priority"
                  className="field-input"
                  value={values.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <ChevronDown size={14} aria-hidden="true" />
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="task-date">Due date *</label>
            <div className="date-wrap">
              <Calendar size={14} aria-hidden="true" />
              <input
                id="task-date"
                name="dueDate"
                type="date"
                ref={dateRef}
                className={`field-input ${errors.dueDate ? "invalid" : ""}`}
                value={values.dueDate}
                onChange={handleChange}
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? "date-error" : undefined}
              />
            </div>
            {errors.dueDate && (
              <p id="date-error" className="field-error" role="alert">
                {errors.dueDate}
              </p>
            )}
          </div>

          <p className="required-note">* Required field</p>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {isEdit ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;