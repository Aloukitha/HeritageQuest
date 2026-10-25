
import type { QuizResult } from "../lib/gameLogic";

interface ResultPageProps {
  result: QuizResult;
  onRetry: () => void;
  onContinue?: () => void;
}

export default function ResultPage({
  result,
  onRetry,
  onContinue,
}: ResultPageProps) {
  return (
    <section style={styles.container}>
      <div style={styles.card}>
        <div style={{ fontSize: 48 }}>
          {result.stars === 3 ? "🏆" : result.stars > 0 ? "🎉" : "🧭"}
        </div>

        <h1>Level Complete!</h1>
        <h2>{result.badge}</h2>

        <div style={styles.stars}>
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              style={{
                color: star <= result.stars ? "#F5B82E" : "#CBD5E1",
                fontSize: 38,
              }}
            >
              ★
            </span>
          ))}
        </div>

        <p>
          Correct answers: {result.correctAnswers} / {result.totalQuestions}
        </p>
        <p>Accuracy: {result.accuracy}%</p>
        <p>Score: {result.score}</p>
        <p>XP earned: +{result.xp}</p>

        <div style={styles.buttons}>
          <button onClick={onRetry} style={styles.secondary}>
            Retry Level
          </button>

          {onContinue && (
            <button onClick={onContinue} style={styles.primary}>
              Continue
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: 24,
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    padding: 28,
    borderRadius: 20,
    background: "#ffffff",
    color: "#1e293b",
    textAlign: "center",
    boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
  },
  stars: {
    display: "flex",
    justifyContent: "center",
    gap: 8,
    margin: "12px 0",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 24,
  },
  primary: {
    padding: "12px 20px",
    border: "none",
    borderRadius: 10,
    background: "#0f766e",
    color: "#ffffff",
    cursor: "pointer",
  },
  secondary: {
    padding: "12px 20px",
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    background: "#ffffff",
    color: "#1e293b",
    cursor: "pointer",
  },
};
