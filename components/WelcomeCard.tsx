
"use client";

import { useState } from "react";

// Define the properties received by this component.
interface WelcomeCardProps {
  studentName: string;
  course: string;
}

export default function WelcomeCard({
  studentName,
  course,
}: WelcomeCardProps) {
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // Update state when the user clicks the button.
  function toggleMessage() {
    setShowMessage((previous) => !previous);
  }

  return (
    <section className="welcome-card">
      <div>
        <span className="eyebrow">
          YOUR PERSONAL WORKSPACE
        </span>

        <h1>Welcome back, {studentName}! 👋</h1>

        <p>
          Stay organized, manage your assignments,
          and make every study session count.
        </p>

        <span className="course-tag">{course}</span>

        <div className="welcome-actions">
          <button
            className="primary-button"
            onClick={toggleMessage}
          >
            {showMessage ? "Hide Message" : "Get Motivated"}
          </button>
        </div>

        {/* Display this message only when showMessage is true. */}
        {showMessage && (
          <p className="motivation-message">
            Great things are achieved one step at a time.
            Keep learning and stay consistent!
          </p>
        )}
      </div>

      <div className="welcome-decoration">✦</div>
    </section>
  );
}
