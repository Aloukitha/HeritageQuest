
export interface QuizResult {
  destinationId: string;
  levelNumber: number;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  xp: number;
  accuracy: number;
  stars: number;
  badge: string;
}

export function calculateResult(
  destinationId: string,
  levelNumber: number,
  totalQuestions: number,
  correctAnswers: number
): QuizResult {
  const accuracy =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const score = correctAnswers * 10;
  const xp = score;

  let stars = 0;
  if (accuracy >= 40) stars = 1;
  if (accuracy >= 70) stars = 2;
  if (accuracy === 100) stars = 3;

  let badge = "Keep Exploring";
  if (accuracy === 100) badge = "Heritage Master";
  else if (accuracy >= 70) badge = "Heritage Explorer";
  else if (accuracy >= 40) badge = "Curious Traveller";

  return {
    destinationId,
    levelNumber,
    totalQuestions,
    correctAnswers,
    score,
    xp,
    accuracy,
    stars,
    badge,
  };
}
