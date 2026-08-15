import { useState } from "react";

function TaskForm({ addTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            alert("Please enter task title");
            return;
        }

        await addTask({
            title: title.trim(),
            description: description.trim(),
            due_date: dueDate
        });

        setTitle("");
        setDescription("");
        setDueDate("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Task Title</label>

                <input
                    type="text"
                    placeholder="What do you need to accomplish?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>


            <div className="form-group">
                <label>Description</label>

                <textarea
                    placeholder="Add some details about this task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>


            <div className="form-bottom">

                <div className="form-group date-group">
                    <label>Due Date</label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>


                <button
                    type="submit"
                    className="add-task-btn"
                >
                    <span>＋</span>
                    Add Task
                </button>

            </div>

        </form>
    );
}

export default TaskForm;
