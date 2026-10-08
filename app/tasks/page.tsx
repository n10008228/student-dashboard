
import TaskManager, {
  type Task,
} from "../../components/TaskManager";

export default function TasksPage() {
  // Initial tasks passed to the component through props.
  const sampleTasks: Task[] = [
    {
      id: 1,
      text: "Review React components and props",
      completed: true,
    },
    {
      id: 2,
      text: "Complete Next.js assignment",
      completed: false,
    },
    {
      id: 3,
      text: "Practice JavaScript event handling",
      completed: false,
    },
  ];

  return (
    <div className="page">
      <div className="page-top">
        <div>
          <span className="eyebrow">PRODUCTIVITY</span>
          <h1 className="page-title">Task Manager</h1>
          <p className="page-description">
            Plan your work and celebrate your progress.
          </p>
        </div>
      </div>

      <TaskManager
        title="My Assignments"
        initialTasks={sampleTasks}
      />
    </div>
  );
}
