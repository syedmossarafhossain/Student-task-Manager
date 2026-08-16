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

        {/* =========================================
            SIDEBAR
        ========================================= */}

        <aside className="sidebar">

            <div className="sidebar-logo">
                <div className="logo-icon">
                    ✓
                </div>

                <div>
                    <h2>TaskFlow</h2>
                    <span>Student Workspace</span>
                </div>
            </div>


            <nav className="sidebar-nav">

                <p className="nav-title">
                    MENU
                </p>

                <button className="nav-item active">
                    <span>▣</span>
                    Dashboard
                </button>

                <button className="nav-item">
                    <span>✓</span>
                    My Tasks
                </button>

                <button className="nav-item">
                    <span>◷</span>
                    Pending
                </button>

                <button className="nav-item">
                    <span>✓</span>
                    Completed
                </button>


                <p className="nav-title second">
                    WORKSPACE
                </p>

                <button className="nav-item">
                    <span>📅</span>
                    Schedule
                </button>

                <button className="nav-item">
                    <span>⚙</span>
                    Settings
                </button>

            </nav>


            <div className="sidebar-bottom">

                <div className="profile-card">

                    <div className="profile-avatar">
                        SM
                    </div>

                    <div>
                        <strong>Student</strong>
                        <span>My Workspace</span>
                    </div>

                </div>

            </div>

        </aside>


        {/* =========================================
            MAIN CONTENT
        ========================================= */}

        <div className="dashboard">

            <header>

                <div className="header-content">

                    <div>
                        <span className="welcome-text">
                            Welcome back 👋
                        </span>

                        <h1>
                            Student Task Manager
                        </h1>

                        <p>
                            Organize your tasks and stay productive.
                        </p>
                    </div>

                </div>

            </header>


            <main>

                {/* Statistics */}

                <section className="stats">

                    <div className="stat-card">

                        <div className="stat-icon total">
                            ▣
                        </div>

                        <div>
                            <h2>{tasks.length}</h2>

                            <p>
                                Total Tasks
                            </p>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon completed-icon">
                            ✓
                        </div>

                        <div>
                            <h2>{completedTasks}</h2>

                            <p>
                                Completed
                            </p>
                        </div>

                    </div>


                    <div className="stat-card">

                        <div className="stat-icon pending-icon">
                            ◷
                        </div>

                        <div>
                            <h2>{pendingTasks}</h2>

                            <p>
                                Pending
                            </p>
                        </div>

                    </div>

                </section>


                {/* Add Task */}

                <section className="add-section">

                    <div className="section-heading">

                        <div>
                            <h2>
                                Add New Task
                            </h2>

                            <p>
                                Create a task and keep track of your work.
                            </p>
                        </div>

                        <div className="section-icon">
                            +
                        </div>

                    </div>

                    <TaskForm
                        addTask={addTask}
                    />

                </section>


                {/* Tasks */}

                <section className="tasks-section">

                    <div className="section-heading">

                        <div>
                            <h2>
                                My Tasks
                            </h2>

                            <p>
                                Manage and track your current tasks.
                            </p>
                        </div>

                        <span className="task-count">
                            {tasks.length} tasks
                        </span>

                    </div>


                    {loading ? (

                        <p>
                            Loading tasks...
                        </p>

                    ) : (

                        <TaskList
                            tasks={tasks}
                            deleteTask={deleteTask}
                            toggleTask={toggleTask}
                        />

                    )}

                </section>

            </main>

        </div>

    </div>
);
}

export default App;
