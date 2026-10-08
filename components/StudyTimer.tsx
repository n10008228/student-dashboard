
"use client";

import { useState, useEffect, useRef } from "react";

interface StudyTimerProps {
  initialMinutes?: number;
}

export default function StudyTimer({
  initialMinutes = 25,
}: StudyTimerProps) {
  const totalSeconds = Math.max(
    1,
    Math.round(initialMinutes * 60)
  );

  const [secondsLeft, setSecondsLeft] = useState<number>(
    totalSeconds
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessions, setSessions] = useState<number>(0);

  // Store the deadline without triggering re-renders.
  const deadlineRef = useRef<number | null>(null);

  // Count down while the study session is active.
  useEffect(() => {
    if (!isRunning) return;

    const remainingAtStart = secondsLeft;
    const deadline = Date.now() + remainingAtStart * 1000;
    deadlineRef.current = deadline;

    const interval = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((deadline - Date.now()) / 1000)
      );

      setSecondsLeft(remaining);

      if (remaining === 0) {
        window.clearInterval(interval);
        deadlineRef.current = null;
        setIsRunning(false);
        setSessions((previous) => previous + 1);
      }
    }, 250);

    return () => {
      window.clearInterval(interval);
    };
    // The countdown is restarted only when isRunning changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  function toggleTimer() {
    if (isRunning && deadlineRef.current !== null) {
      const remaining = Math.max(
        0,
        Math.ceil((deadlineRef.current - Date.now()) / 1000)
      );
      setSecondsLeft(remaining);
    }

    setIsRunning((previous) => !previous);
  }

  function resetTimer() {
    setIsRunning(false);
    deadlineRef.current = null;
    setSecondsLeft(totalSeconds);
  }

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const progress =
    ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <section className="panel timer-panel">
      <span className="eyebrow">FOCUS MODE</span>
      <h2>Study Timer</h2>
      <p>Eliminate distractions and focus on your goals.</p>

      <div
        className="timer-circle"
        style={{
          background: `conic-gradient(
            #8b5cf6 ${progress}%,
            #29283c ${progress}%
          )`,
        }}
      >
        <div className="timer-inner">
          <span className="timer-label">
            {secondsLeft === 0
              ? "SESSION COMPLETE"
              : isRunning
                ? "STAY FOCUSED"
                : "READY TO FOCUS"}
          </span>

          <div className="timer-display">
            {formattedTime}
          </div>

          <span className="timer-subtitle">
            MINUTES : SECONDS
          </span>
        </div>
      </div>

      <div className="timer-actions">
        <button
          className="primary-button"
          onClick={toggleTimer}
          disabled={secondsLeft === 0}
        >
          {isRunning ? "Ⅱ Pause" : "▶ Start"}
        </button>

        <button
          className="secondary-button"
          onClick={resetTimer}
        >
          ↺ Reset
        </button>
      </div>

      <div className="session-counter">
        <strong>{sessions}</strong>
        <span>Completed Study Sessions</span>
      </div>

      {/* Show feedback when the countdown reaches zero. */}
      {secondsLeft === 0 && (
        <div className="success-message">
          🎉 Excellent! Your study session is complete.
          Take a well-deserved break!
        </div>
      )}
    </section>
  );
}
