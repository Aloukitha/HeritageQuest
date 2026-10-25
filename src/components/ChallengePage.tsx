
import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";

import { getChallenges } from "../data/challenges";
import type { Challenge } from "../data/challenges";

import { calculateResult } from "../lib/gameLogic";
import type { QuizResult } from "../lib/gameLogic";

import ResultPage from "./ResultPage";

interface ChallengePageProps {
  destinationId: string;
  levelNumber?: number;
  onComplete?: (result: QuizResult) => void;
  onContinue?: () => void;
}

export default function ChallengePage({
  destinationId,
  levelNumber = 1,
  onComplete,
  onContinue,
}: ChallengePageProps) {
  const questions: Challenge[] = useMemo(
    () => getChallenges(destinationId, levelNumber),
    [destinationId, levelNumber]
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Reset the quiz whenever a different destination or level is opened.
  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setResult(null);
  }, [destinationId, levelNumber]);

  // Handle missing questions and invalid question indexes safely.
  if (questions.length === 0) {
    return (
      <section style={styles.container}>
        <div style={styles.card}>
          <h2>No questions available for this level.</h2>
          <p>
            Destination: {destinationId}
          </p>
          <p>
            Level: {levelNumber}
          </p>
          <p>
            Check the destination ID and level number in
            src/data/challenges.ts.
          </p>
        </div>
      </section>
    );
  }

  if (result) {
    return (
      <ResultPage
        result={result}
        onRetry={() => {
          setIndex(0);
          setSelected(null);
          setCorrect(0);
          setResult(null);
        }}
        onContinue={onContinue}
      />
    );
  }

  // Protect against an invalid index if the question list changes.
  const questionIndex = Math.min(index, questions.length - 1);
  const question = questions[questionIndex];

  if (!question) {
    return (
      <section style={styles.container}>
        <div style={styles.card}>
          <h2>Unable to load this question.</h2>
          <p>Please return to the heritage trail and try again.</p>
        </div>
      </section>
    );
  }

  const answered = selected !== null;
  const isCorrect = selected === question.correctAnswer;

  function selectAnswer(optionIndex: number) {
    if (selected !== null || result !== null) {
      return;
    }

    setSelected(optionIndex);

    if (optionIndex === question.correctAnswer) {
      setCorrect((previous) => previous + 1);
    }
  }

  function nextQuestion() {
    if (selected === null || result !== null) {
      return;
    }

    if (questionIndex < questions.length - 1) {
      setIndex((previous) => previous + 1);
      setSelected(null);
      return;
    }

    const finalResult = calculateResult(
      destinationId,
      levelNumber,
      questions.length,
      correct
    );

    setResult(finalResult);
    onComplete?.(finalResult);
  }

  function retryQuiz() {
    setIndex(0);
    setSelected(null);
    setCorrect(0);
    setResult(null);
  }

  const progressPercentage =
    ((questionIndex + 1) / questions.length) * 100;

  return (
    <section style={styles.container}>
      <div style={styles.card}>
        <p style={styles.eyebrow}>
          {destinationId.replace(/-/g, " ")} · Level {levelNumber}
        </p>

        <div
          style={styles.progressTrack}
          role="progressbar"
          aria-label="Quiz progress"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={questionIndex + 1}
        >
          <div
            style={{
              ...styles.progressFill,
              width: `${progressPercentage}%`,
            }}
          />
        </div>

        <p style={styles.questionCount}>
          Question {questionIndex + 1} of {questions.length}
        </p>

        <h2 style={styles.questionTitle}>
          {question.question}
        </h2>

        <div style={styles.options}>
          {question.options.map((option, optionIndex) => {
            const isAnswer =
              optionIndex === question.correctAnswer;
            const isChosen = optionIndex === selected;

            let background = "#f1f5f9";
            let borderColor = "#cbd5e1";

            if (answered && isAnswer) {
              background = "#dcfce7";
              borderColor = "#16a34a";
            } else if (answered && isChosen) {
              background = "#fee2e2";
              borderColor = "#dc2626";
            }

            return (
              <button
                key={`${question.id}-${optionIndex}`}
                type="button"
                onClick={() => selectAnswer(optionIndex)}
                disabled={answered}
                aria-pressed={isChosen}
                style={{
                  ...styles.option,
                  background,
                  borderColor,
                  cursor: answered ? "default" : "pointer",
                  opacity:
                    answered && !isAnswer && !isChosen
                      ? 0.75
                      : 1,
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {answered && (
          <div
            style={styles.explanation}
            aria-live="polite"
          >
            <strong>
              {isCorrect ? "Correct! 🎉" : "Not quite."}
            </strong>

            {!isCorrect && (
              <p>
                Correct answer:{" "}
                {question.options[question.correctAnswer]}
              </p>
            )}

            <p>{question.explanation}</p>
          </div>
        )}

        <p style={styles.score}>
          Correct answers so far: {correct}
        </p>

        <button
          type="button"
          onClick={nextQuestion}
          disabled={!answered}
          style={{
            ...styles.next,
            opacity: answered ? 1 : 0.5,
            cursor: answered ? "pointer" : "not-allowed",
          }}
        >
          {questionIndex === questions.length - 1
            ? "View Results"
            : "Next Question"}
        </button>

        <button
          type="button"
          onClick={retryQuiz}
          style={styles.retry}
        >
          Restart this challenge
        </button>
      </div>
    </section>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    padding: 20,
    display: "flex",
    justifyContent: "center",
  },

  card: {
    width: "100%",
    maxWidth: 650,
    padding: 24,
    borderRadius: 18,
    background: "#ffffff",
    color: "#1e293b",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  },

  eyebrow: {
    textTransform: "capitalize",
    color: "#0f766e",
    fontWeight: 700,
  },

  progressTrack: {
    height: 8,
    background: "#e2e8f0",
    borderRadius: 8,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#0f766e",
    transition: "width 0.2s",
  },

  questionCount: {
    color: "#64748b",
    fontSize: 14,
    marginTop: 14,
  },

  questionTitle: {
    lineHeight: 1.5,
  },

  options: {
    display: "grid",
    gap: 12,
    margin: "24px 0",
  },

  option: {
    padding: 14,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    textAlign: "left",
    color: "#1e293b",
    fontSize: 15,
    transition: "background 0.2s, border-color 0.2s",
  },

  explanation: {
    padding: 14,
    background: "#f8fafc",
    borderRadius: 10,
    lineHeight: 1.6,
  },

  score: {
    color: "#475569",
    fontWeight: 600,
  },

  next: {
    width: "100%",
    marginTop: 12,
    padding: 14,
    border: "none",
    borderRadius: 10,
    background: "#0f766e",
    color: "#ffffff",
    fontWeight: 700,
  },

  retry: {
    width: "100%",
    marginTop: 10,
    padding: 12,
    border: "1px solid #cbd5e1",
    borderRadius: 10,
    background: "#ffffff",
    color: "#334155",
    cursor: "pointer",
  },
};
