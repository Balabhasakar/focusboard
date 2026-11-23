import TaskCard from "./TaskCard";
import "./TaskList.css";

function TaskList({
  tasks,
  hasAnyTasks,
  onEdit,
  onDelete,
  onStatusChange,
  onCreate,
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        {hasAnyTasks ? (
          <p>No tasks match your search or filters.</p>
        ) : (
          <>
            <p>You have no tasks yet.</p>
            <button type="button" className="btn-primary" onClick={onCreate}>
              Create your first task
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </ul>
  );
}

export default TaskList;