import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import API from "./api";

import "./App.css";


function App() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);


    // ==========================================
    // GET TASKS
    // ==========================================

    const fetchTasks = async () => {

        try {

            const response = await API.get("/tasks");

            console.log("GET TASKS:", response.data);

            setTasks(response.data.tasks || []);

        } catch (error) {

            console.error(
                "FETCH TASKS ERROR:",
                error.response?.data || error.message
            );

            alert("Failed to load tasks");

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // ADD TASK
    // ==========================================

    const addTask = async (task) => {

        try {

            const response = await API.post(
                "/tasks",
                task
            );

            console.log(
                "TASK CREATED:",
                response.data
            );

            await fetchTasks();

        } catch (error) {

            console.error(
                "ADD TASK ERROR:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to add task"
            );
        }
    };


    // ==========================================
    // DELETE TASK
    // ==========================================

    const deleteTask = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await API.delete(
                `/tasks/${id}`
            );

            await fetchTasks();

        } catch (error) {

            console.error(
                "DELETE ERROR:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        }
    };


    // ==========================================
    // TOGGLE TASK
    // ==========================================

    const toggleTask = async (task) => {

        try {

            const newStatus =
                task.status === "completed"
                    ? "pending"
                    : "completed";


            await API.put(
                `/tasks/${task.id}`,
                {
                    title: task.title,

                    description:
                        task.description || "",

                    due_date:
                        task.due_date || "",

                    status: newStatus
                }
            );


            await fetchTasks();

        } catch (error) {

            console.error(
                "UPDATE ERROR:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to update task"
            );
        }
    };


    // ==========================================
    // LOAD TASKS
    // ==========================================

    useEffect(() => {

        fetchTasks();

    }, []);


    // ==========================================
    // STATISTICS
    // ==========================================

    const completedTasks =
        tasks.filter(
            task => task.status === "completed"
        ).length;


    const pendingTasks =
        tasks.length - completedTasks;


    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="app">

            {/* =========================
                SIDEBAR
            ========================= */}

            <aside className="sidebar">

                <div className="brand">

                    <div className="brand-icon">
                        ✓
                    </div>

                    <div className="brand-text">
                        <h2>TaskFlow</h2>
                        <span>Task Manager</span>
                    </div>

                </div>

                <nav className="navigation">

                    <a
                        href="#dashboard"
                        className="nav-item active"
                    >
                        <span>▦</span>
                        <label>Dashboard</label>
                    </a>

                    <a
                        href="#tasks"
                        className="nav-item"
                    >
                        <span>✓</span>
                        <label>My Tasks</label>
                    </a>

                    <a
                        href="#add-task"
                        className="nav-item"
                    >
                        <span>＋</span>
                        <label>Add Task</label>
                    </a>

                </nav>

                <div className="sidebar-bottom">

                    <div className="productivity-card">

                        <div className="productivity-icon">
                            ⚡
                        </div>

                        <div>
                            <strong>
                                Stay productive
                            </strong>

                            <p>
                                Complete your tasks on time.
                            </p>
                        </div>

                    </div>

                    <div className="profile">

                        <div className="avatar">
                            U
                        </div>

                        <div>
                            <strong>
                                User
                            </strong>

                            <span>
                                Task Manager
                            </span>
                        </div>

                    </div>

                </div>

            </aside>

            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="main-content">

                {/* HEADER */}

                <header className="top-header">

                    <div>

                        <p className="welcome">
                            Welcome back 👋
                        </p>

                        <h1>
                            Task Dashboard
                        </h1>

                        <p className="subtitle">
                            Organize your work and stay productive.
                        </p>

                    </div>

                    <button
                        className="header-add-btn"
                        onClick={() =>
                            document
                                .getElementById("add-task")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }
                    >
                        + New Task
                    </button>

                </header>

                <div className="dashboard-container">

                    {/* =========================
                        STATISTICS
                    ========================= */}

                    <section
                        className="stats"
                        id="dashboard"
                    >

                        <div className="stat-card blue">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    ☰
                                </div>

                                <span className="stat-label">
                                    ALL TASKS
                                </span>

                            </div>

                            <h2>
                                {totalTasks}
                            </h2>

                            <p>
                                Total tasks
                            </p>

                        </div>

                        <div className="stat-card orange">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    ◷
                                </div>

                                <span className="stat-label">
                                    PENDING
                                </span>

                            </div>

                            <h2>
                                {pendingTasks}
                            </h2>

                            <p>
                                Tasks remaining
                            </p>

                        </div>

                        <div className="stat-card green">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    ✓
                                </div>

                                <span className="stat-label">
                                    COMPLETED
                                </span>

                            </div>

                            <h2>
                                {completedTasks}
                            </h2>

                            <p>
                                Tasks completed
                            </p>

                        </div>

                        <div className="stat-card purple">

                            <div className="stat-top">

                                <div className="stat-icon">
                                    %
                                </div>

                                <span className="stat-label">
                                    PROGRESS
                                </span>

                            </div>

                            <h2>
                                {completionPercentage}%
                            </h2>

                            <p>
                                Overall progress
                            </p>

                        </div>

                    </section>

                    {/* =========================
                        ADD TASK
                    ========================= */}

                    <section
                        className="form-card"
                        id="add-task"
                    >

                        <div className="section-heading">

                            <div>

                                <span className="section-tag">
                                    {editingId
                                        ? "EDIT TASK"
                                        : "CREATE TASK"}
                                </span>

                                <h2>
                                    {editingId
                                        ? "Update your task"
                                        : "Add a new task"}
                                </h2>

                                <p>
                                    {editingId
                                        ? "Modify the task details below."
                                        : "Create a task and keep your work organized."}
                                </p>

                            </div>

                            <div className="form-icon">
                                ✦
                            </div>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="task-form"
                        >

                            <div className="form-group">

                                <label>
                                    Task Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Complete project documentation"
                                    value={formData.title}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    placeholder="Add some details about this task..."
                                    value={formData.description}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Due Date
                                </label>

                                <input
                                    type="date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="form-buttons">

                                <button
                                    type="submit"
                                    className="primary-btn"
                                >
                                    {editingId
                                        ? "✓ Update Task"
                                        : "+ Create Task"}
                                </button>

                                {editingId && (
                                    <button
                                        type="button"
                                        className="cancel-btn"
                                        onClick={resetForm}
                                    >
                                        Cancel
                                    </button>
                                )}

                            </div>

                        </form>

                    </section>

                    {/* =========================
                        TASK LIST
                    ========================= */}

                    <section
                        className="tasks-section"
                        id="tasks"
                    >

                        <div className="tasks-header">

                            <div>

                                <span className="section-tag">
                                    TASK LIST
                                </span>

                                <h2>
                                    Your Tasks
                                </h2>

                                <p>
                                    Manage and track your tasks.
                                </p>

                            </div>

                            <div className="progress-box">

                                <div className="progress-info">

                                    <span>
                                        Completion
                                    </span>

                                    <strong>
                                        {completionPercentage}%
                                    </strong>

                                </div>

                                <div className="progress-bar">

                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${completionPercentage}%`
                                        }}
                                    />

                                </div>

                            </div>

                        </div>

                        {/* SEARCH */}

                        <div className="task-toolbar">

                            <div className="search-box">

                                <span>
                                    ⌕
                                </span>

                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(
                                            event.target.value
                                        )
                                    }
                                />

                            </div>

                            <div className="filters">

                                <button
                                    className={
                                        filter === "all"
                                            ? "filter-btn active"
                                            : "filter-btn"
                                    }
                                    onClick={() =>
                                        setFilter("all")
                                    }
                                >
                                    All
                                </button>

                                <button
                                    className={
                                        filter === "pending"
                                            ? "filter-btn active"
                                            : "filter-btn"
                                    }
                                    onClick={() =>
                                        setFilter("pending")
                                    }
                                >
                                    Pending
                                </button>

                                <button
                                    className={
                                        filter === "completed"
                                            ? "filter-btn active"
                                            : "filter-btn"
                                    }
                                    onClick={() =>
                                        setFilter("completed")
                                    }
                                >
                                    Completed
                                </button>

                            </div>

                        </div>

                        {/* TASKS */}

                        {loading ? (

                            <div className="empty-state">

                                <div className="loading-spinner">
                                    ⟳
                                </div>

                                <h3>
                                    Loading tasks...
                                </h3>

                            </div>

                        ) : filteredTasks.length === 0 ? (

                            <div className="empty-state">

                                <div className="empty-icon">
                                    ✓
                                </div>

                                <h3>
                                    No tasks found
                                </h3>

                                <p>
                                    Add a new task to get started.
                                </p>

                            </div>

                        ) : (

                            <div className="task-list">

                                {filteredTasks.map((task) => (

                                    <article
                                        className={
                                            task.completed
                                                ? "task-card completed"
                                                : "task-card"
                                        }
                                        key={task.id}
                                    >

                                        <div className="task-check">

                                            <button
                                                onClick={() =>
                                                    toggleComplete(task)
                                                }
                                                className={
                                                    task.completed
                                                        ? "check-btn checked"
                                                        : "check-btn"
                                                }
                                            >
                                                {task.completed
                                                    ? "✓"
                                                    : ""}
                                            </button>

                                        </div>

                                        <div className="task-content">

                                            <div className="task-title-row">

                                                <h3>
                                                    {task.title}
                                                </h3>

                                                <span
                                                    className={
                                                        task.completed
                                                            ? "status completed-status"
                                                            : "status pending-status"
                                                    }
                                                >
                                                    {task.completed
                                                        ? "Completed"
                                                        : "Pending"}
                                                </span>

                                            </div>

                                            <p>
                                                {task.description ||
                                                    "No description provided."}
                                            </p>

                                            <div className="task-meta">

                                                {task.dueDate && (
                                                    <span>
                                                        📅 Due:{" "}
                                                        {task.dueDate}
                                                    </span>
                                                )}

                                                <span>
                                                    ID: {task.id}
                                                </span>

                                            </div>

                                        </div>

                                        <div className="task-actions">

                                            <button
                                                onClick={() =>
                                                    toggleComplete(task)
                                                }
                                                className="action-btn complete-action"
                                            >
                                                {task.completed
                                                    ? "↩ Undo"
                                                    : "✓ Complete"}
                                            </button>

                                            <button
                                                onClick={() =>
                                                    editTask(task)
                                                }
                                                className="action-btn edit-action"
                                            >
                                                ✎ Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteTask(task.id)
                                                }
                                                className="action-btn delete-action"
                                            >
                                                🗑 Delete
                                            </button>

                                        </div>

                                    </article>

                                ))}

                            </div>

                        )}

                    </section>

                </div>

                <footer className="footer">
                    <p>
                        TaskFlow © 2026 • Task Management System
                    </p>
                </footer>

            </main>

        </div>
    );
}

export default App;
