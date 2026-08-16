import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import API from "./api";

import "./App.css";


function App() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [currentPage, setCurrentPage] =
        useState("dashboard");


    // ==========================================
    // GET TASKS
    // ==========================================

    const fetchTasks = async () => {

        try {

            const response = await API.get("/tasks");

            console.log(
                "GET TASKS:",
                response.data
            );

            setTasks(
                response.data.tasks || []
            );

        } catch (error) {

            console.error(
                "FETCH TASKS ERROR:",
                error.response?.data ||
                error.message
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
                error.response?.data ||
                error.message
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

        const confirmDelete =
            window.confirm(
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
                error.response?.data ||
                error.message
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
                error.response?.data ||
                error.message
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
            task =>
                task.status === "completed"
        ).length;


    const pendingTasks =
        tasks.filter(
            task =>
                task.status !== "completed"
        ).length;


    // ==========================================
    // NAVIGATION
    // ==========================================

    const handleNavigation = (page) => {

        setCurrentPage(page);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    // ==========================================
    // FILTER TASKS
    // ==========================================

    const getDisplayedTasks = () => {

        switch (currentPage) {

            case "pending":

                return tasks.filter(
                    task =>
                        task.status !== "completed"
                );


            case "completed":

                return tasks.filter(
                    task =>
                        task.status === "completed"
                );


            case "schedule":

                return tasks.filter(
                    task =>
                        task.due_date
                );


            case "mytasks":

                return tasks;


            case "dashboard":

            default:

                return tasks;
        }
    };


    const displayedTasks =
        getDisplayedTasks();


    // ==========================================
    // PAGE TITLE
    // ==========================================

    const getPageTitle = () => {

        switch (currentPage) {

            case "mytasks":
                return "My Tasks";

            case "pending":
                return "Pending Tasks";

            case "completed":
                return "Completed Tasks";

            case "schedule":
                return "Schedule";

            case "settings":
                return "Settings";

            default:
                return "Student Task Manager";
        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="app">


            {/* ==================================
                SIDEBAR
            ================================== */}

            <aside className="sidebar">


                {/* LOGO */}

                <div className="sidebar-logo">

                    <div className="logo-icon">
                        ✓
                    </div>

                    <div>

                        <h2>
                            TaskFlow
                        </h2>

                        <span>
                            Student Workspace
                        </span>

                    </div>

                </div>


                {/* NAVIGATION */}

                <nav className="sidebar-nav">

                    <p className="nav-title">
                        MENU
                    </p>


                    <button
                        className={`nav-item ${
                            currentPage === "dashboard"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "dashboard"
                            )
                        }
                    >

                        <span>
                            ▣
                        </span>

                        Dashboard

                    </button>


                    <button
                        className={`nav-item ${
                            currentPage === "mytasks"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "mytasks"
                            )
                        }
                    >

                        <span>
                            ✓
                        </span>

                        My Tasks

                    </button>


                    <button
                        className={`nav-item ${
                            currentPage === "pending"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "pending"
                            )
                        }
                    >

                        <span>
                            ◷
                        </span>

                        Pending

                        <span className="nav-count">
                            {pendingTasks}
                        </span>

                    </button>


                    <button
                        className={`nav-item ${
                            currentPage === "completed"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "completed"
                            )
                        }
                    >

                        <span>
                            ✓
                        </span>

                        Completed

                        <span className="nav-count">
                            {completedTasks}
                        </span>

                    </button>


                    <p className="nav-title second">
                        WORKSPACE
                    </p>


                    <button
                        className={`nav-item ${
                            currentPage === "schedule"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "schedule"
                            )
                        }
                    >

                        <span>
                            📅
                        </span>

                        Schedule

                    </button>


                    <button
                        className={`nav-item ${
                            currentPage === "settings"
                                ? "active"
                                : ""
                        }`}
                        onClick={() =>
                            handleNavigation(
                                "settings"
                            )
                        }
                    >

                        <span>
                            ⚙
                        </span>

                        Settings

                    </button>

                </nav>


                {/* PROFILE */}

                <div className="sidebar-bottom">

                    <div className="profile-card">

                        <div className="profile-avatar">
                            SM
                        </div>

                        <div>

                            <strong>
                                Student
                            </strong>

                            <span>
                                My Workspace
                            </span>

                        </div>

                    </div>

                </div>

            </aside>


            {/* ==================================
                DASHBOARD
            ================================== */}

            <div className="dashboard">


                {/* HEADER */}

                <header>

                    <div className="header-content">

                        <span className="welcome-text">
                            Welcome back 👋
                        </span>

                        <h1>
                            {getPageTitle()}
                        </h1>

                        <p>
                            Organize your tasks and
                            stay productive.
                        </p>

                    </div>

                </header>


                <main>


                    {/* ==================================
                        SETTINGS PAGE
                    ================================== */}

                    {currentPage === "settings" ? (

                        <section className="settings-section">

                            <div className="section-heading">

                                <div>

                                    <h2>
                                        Settings
                                    </h2>

                                    <p>
                                        Manage your workspace preferences.
                                    </p>

                                </div>

                            </div>


                            <div className="settings-card">

                                <div>

                                    <strong>
                                        Task Manager
                                    </strong>

                                    <p>
                                        Student Task Manager
                                    </p>

                                </div>

                                <span className="settings-status">
                                    Active
                                </span>

                            </div>


                            <div className="settings-card">

                                <div>

                                    <strong>
                                        Total Tasks
                                    </strong>

                                    <p>
                                        Tasks currently stored
                                        in your workspace.
                                    </p>

                                </div>

                                <strong>
                                    {tasks.length}
                                </strong>

                            </div>


                            <div className="settings-card">

                                <div>

                                    <strong>
                                        Completed Tasks
                                    </strong>

                                    <p>
                                        Successfully completed tasks.
                                    </p>

                                </div>

                                <strong>
                                    {completedTasks}
                                </strong>

                            </div>

                        </section>

                    ) : (

                        <>


                            {/* ==================================
                                STATISTICS
                            ================================== */}

                            <section className="stats">


                                <div className="stat-card">

                                    <div className="stat-icon total">
                                        ▣
                                    </div>

                                    <div>

                                        <h2>
                                            {tasks.length}
                                        </h2>

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

                                        <h2>
                                            {completedTasks}
                                        </h2>

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

                                        <h2>
                                            {pendingTasks}
                                        </h2>

                                        <p>
                                            Pending
                                        </p>

                                    </div>

                                </div>

                            </section>


                            {/* ==================================
                                ADD TASK
                            ================================== */}

                            {currentPage === "dashboard" && (

                                <section className="add-section">

                                    <div className="section-heading">

                                        <div>

                                            <h2>
                                                Add New Task
                                            </h2>

                                            <p>
                                                Create a task and
                                                keep track of your work.
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

                            )}


                            {/* ==================================
                                TASK LIST
                            ================================== */}

                            <section className="tasks-section">

                                <div className="section-heading">

                                    <div>

                                        <h2>
                                            {currentPage === "dashboard"
                                                ? "My Tasks"
                                                : getPageTitle()}
                                        </h2>

                                        <p>
                                            Manage and track your tasks.
                                        </p>

                                    </div>


                                    <span className="task-count">

                                        {displayedTasks.length} tasks

                                    </span>

                                </div>


                                {loading ? (

                                    <p>
                                        Loading tasks...
                                    </p>

                                ) : (

                                    <TaskList
                                        tasks={displayedTasks}
                                        deleteTask={deleteTask}
                                        toggleTask={toggleTask}
                                    />

                                )}

                            </section>

                        </>

                    )}

                </main>

            </div>

        </div>
    );
}

export default App;
