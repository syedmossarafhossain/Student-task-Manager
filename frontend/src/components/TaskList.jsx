function TaskList({
    tasks,
    deleteTask,
    toggleTask
}) {

    if (tasks.length === 0) {

        return (
            <div className="empty">

                <div className="empty-icon">
                    ✓
                </div>

                <h3>
                    No tasks yet
                </h3>

                <p>
                    You're all caught up! Add your first task above.
                </p>

            </div>
        );
    }


    return (
        <div className="task-list">

            {tasks.map((task) => (

                <div
                    className={`task-card ${
                        task.status === "completed"
                            ? "completed"
                            : ""
                    }`}
                    key={task.id}
                >

                    <div className="task-content">

                        <div className="task-title-row">

                            <h3>
                                {task.title}
                            </h3>

                            <span
                                className={`status ${
                                    task.status === "completed"
                                        ? "completed"
                                        : "pending"
                                }`}
                            >
                                {task.status === "completed"
                                    ? "Completed"
                                    : "Pending"}
                            </span>

                        </div>


                        {task.description && (
                            <p className="task-description">
                                {task.description}
                            </p>
                        )}


                        {task.due_date && (
                            <div className="due-date">

                                <span className="calendar-icon">
                                    📅
                                </span>

                                <span>
                                    Due{" "}
                                    {new Date(
                                        task.due_date
                                    ).toLocaleDateString(
                                        "en-US",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )}
                                </span>

                            </div>
                        )}

                    </div>


                    <div className="task-actions">

                        <button
                            className="complete-btn"
                            onClick={() =>
                                toggleTask(task)
                            }
                        >
                            {task.status === "completed"
                                ? "↩ Mark Pending"
                                : "✓ Complete"}
                        </button>


                        <button
                            className="delete-btn"
                            onClick={() =>
                                deleteTask(task.id)
                            }
                        >
                            🗑 Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>
    );
}


export default TaskList;
