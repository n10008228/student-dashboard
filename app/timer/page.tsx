
import StudyTimer from "../../components/StudyTimer";

export default function TimerPage() {
  return (
    <div className="page">
      <div className="page-top">
        <div>
          <span className="eyebrow">PRODUCTIVITY</span>
          <h1 className="page-title">Focus Session</h1>
          <p className="page-description">
            Make every minute count.
          </p>
        </div>
      </div>

      <StudyTimer initialMinutes={25} />
    </div>
  );
}
