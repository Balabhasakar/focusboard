export const STATUSES = ["To do", "In progress", "Completed"];
export const PRIORITIES = ["Low", "Medium", "High"];

function isValidTask(t) {
  return (
    t !== null &&
    typeof t === "object" &&
    (typeof t.id === "number" || typeof t.id === "string") &&
    typeof t.title === "string" &&
    typeof t.description === "string" &&
    typeof t.category === "string" &&
    STATUSES.includes(t.status) &&
    PRIORITIES.includes(t.priority) &&
    typeof t.dueDate === "string"
  );
}

// An empty array is valid: it means the user deleted every task.
export function isValidTaskList(value) {
  return Array.isArray(value) && value.every(isValidTask);
}