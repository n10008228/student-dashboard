
"use client";

import { useState, type FormEvent } from "react";

// Define the structure of a task.
export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskManagerProps {
  title: string;
  initialTasks?: Task[];
}

type TaskFilter = "all" | "pending" | "completed";

export default function TaskManager({
  title,
  initialTasks = [],
}: TaskManagerProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTask, setNewTask] = useState<string>("");
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [error, setError] = useState<string>("");

  // Add a task when the form is submitted.
  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!newTask.trim()) {
      setError("Please enter a task description.");
      return;
    }

    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks((previous) => [...previous, task]);
    setNewTask("");
    setError("");
  }

  // Change the completion status of a selected task.
  function toggleTask(id: number) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Delete a selected task.
  function deleteTask(id: number) {
    setTasks((previous) =>
      previous.filter((task) => task.id !== id)
    );
  }

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  // Filter tasks based on the selected option.
  const visibleTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const filters: TaskFilter[] = [
    "all",
    "pending",
    "completed",
  ];

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <span className="eyebrow">STAY ORGANIZED</span>
          <h2>{title}</h2>
          <p>Keep track of everything you need to do.</p>
        </div>

        <span className="count-badge">
          {completedCount}/{tasks.length} Done
        </span>
      </div>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          value={newTask}
          onChange={(event) => {
            setNewTask(event.target.value);
            setError("");
          }}
          placeholder="What do you need to work on?"
          aria-label="New task"
        />

        <button className="primary-button" type="submit">
          + Add Task
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="filter-buttons">
        {filters.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={
              filter === option ? "filter active" : "filter"
            }
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      <div className="task-list">
        {/* Show an empty message or render the filtered tasks. */}
        {visibleTasks.length === 0 ? (
          <div className="empty-state">
            <span>✦</span>
            <p>No tasks found. You re all caught up!</p>
          </div>
        ) : (
          visibleTasks.map((task) => (
            <div className="task-item" key={task.id}>
              <label className="task-label">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />

                <span
                  className={task.completed ? "completed" : ""}
                >
                  {task.text}
                </span>
              </label>

              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.text}`}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Show a success message when every task is complete. */}
      {tasks.length > 0 &&
        completedCount === tasks.length && (
          <div className="success-message">
            🎉 Amazing work! You completed all your tasks!
          </div>
        )}
    </section>
  );
}
