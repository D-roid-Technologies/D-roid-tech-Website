import StudentScoreTable from "./examsAndRecord/StudentScoreTable";

interface examProps{
    onBack : () => void;
}
export default function Exam({ onBack } : examProps) {
  return (
    <div>
      <button onClick={onBack} style={{ marginBottom: "1rem" }}>
        ← Back to Class
      </button>
      <h2>Exam Section</h2>
      <StudentScoreTable/>
       <h2>Exam Section2</h2>
    </div>
  );
}
