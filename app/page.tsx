
import Link from "next/link";
import WelcomeCard from "../components/WelcomeCard";

export default function Home() {
  return (
    <div className="page">
      <div className="page-top">
        <div>
          <span className="eyebrow">OVERVIEW</span>
          <h1 className="page-title">My Dashboard</h1>
          <p className="page-description">
            Everything you need to stay productive.
          </p>
        </div>

        <span className="status-pill">
          ● Ready to Learn
        </span>
      </div>

      <WelcomeCard
        studentName="Student"
        course="Advanced Front-End Development"
      />

      <div className="section-heading">
        <h2>Quick Access</h2>
        <p>Choose a tool to get started.</p>
      </div>

      <div className="feature-grid">
        <Link href="/tasks" className="feature-card">
          <div className="feature-icon purple">☑</div>
          <h3>Task Manager</h3>
          <p>
            Organize assignments, track progress,
            and complete your daily goals.
          </p>
          <span className="feature-link">
            Manage Tasks →
          </span>
        </Link>

        <Link href="/timer" className="feature-card">
          <div className="feature-icon blue">◷</div>
          <h3>Study Timer</h3>
          <p>
            Stay focused with a dedicated study timer
            and track completed sessions.
          </p>
          <span className="feature-link">
            Start Studying →
          </span>
        </Link>

        <div className="feature-card">
          <div className="feature-icon green">✦</div>
          <h3>Stay Motivated</h3>
          <p>
            Build productive habits and make consistent
            progress toward your goals.
          </p>
          <span className="feature-link muted">
            Keep Going!
          </span>
        </div>
      </div>

      <div className="tip-card">
        <span>💡</span>
        <div>
          <strong>Productivity Tip</strong>
          <p>
            Break large assignments into smaller tasks
            and use focused study sessions to finish them.
          </p>
        </div>
      </div>
    </div>
  );
}
