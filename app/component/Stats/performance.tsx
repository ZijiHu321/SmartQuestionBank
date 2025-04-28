import { parseQuestionFile } from "@/app/questionParser";

interface QuestionData {
  difficulty: number;
  correct: boolean;
}

const calculatePerformanceIndex = async (courseName: string) => {
  const answered = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
  
  const results = await Promise.all(
    Object.entries(answered).map(async ([id, correct]) => {
      // 1. Fix ID parsing for units with underscores
      if (!id.startsWith(`q${courseName}_`)) return null;
      
      // Remove 'q' prefix and split components
      const parts = id.substring(1).split('_');
      if (parts.length < 3) return null;
      
      const [coursePart, ...rest] = parts;
      const idx = rest.pop();
      const unit = rest.join('_');
      const index = parseInt(idx || "", 10);

      if (coursePart !== courseName || isNaN(index)) return null;

      // 2. Correct file path to match /public/[type]/[course]/[unit].txt
      for (const type of ['MCquestion', 'LAquestion']) {
        try {
          const res = await fetch(`/${type}/${courseName}/${unit}.txt`);
          if (!res.ok) throw new Error('File not found');
          
          const text = await res.text();
          const questions = parseQuestionFile(text, unit, courseName);
          const q = questions[index - 1];
          
          if (q?.difficulty !== undefined) {
            return {
              difficulty: q.difficulty,
              correct: correct as boolean
            };
          }
        } catch {
          continue;
        }
      }
      return null;
    })
  );

  // 3. Filter and categorize valid results
  const validResults = results.filter(Boolean) as QuestionData[];
  const groups = {
    low: validResults.filter(q => q.difficulty <= 4),
    medium: validResults.filter(q => q.difficulty > 4 && q.difficulty <= 6),
    high: validResults.filter(q => q.difficulty > 6)
  };

  // --- NEW MODEL STARTING HERE ---
  // 4. Calculate accuracy and practice metrics for each difficulty group
  const correct = {
    low: groups.low.filter(q => q.correct).length,
    medium: groups.medium.filter(q => q.correct).length,
    high: groups.high.filter(q => q.correct).length
  };

  const N = {
    low: groups.low.length,
    medium: groups.medium.length,
    high: groups.high.length
  };

  // Constants for weights and confidence (tuned to exam distribution)
  const W = { low: 0.55, medium: 0.40, high: 0.05 };
  const K = { low: 3, medium: 3, high: 2 };

  // 5. Calculate contributions for each difficulty tier
  const getContribution = (correct: number, total: number, W: number, K: number) => {
    if (total === 0) return 0;
    const accuracy = correct / total;
    const confidence = total / (total + K);
    return accuracy * W * confidence;
  };

  const contributions = {
    low: getContribution(correct.low, N.low, W.low, K.low),
    medium: getContribution(correct.medium, N.medium, W.medium, K.medium),
    high: getContribution(correct.high, N.high, W.high, K.high)
  };

  // 6. Calculate confidence factor
  const getConfidence = (total: number, W: number, K: number) => 
    W * (total / (total + K));

  const confidenceFactor = (
    getConfidence(N.low, W.low, K.low) +
    getConfidence(N.medium, W.medium, K.medium) +
    getConfidence(N.high, W.high, K.high)
  );

  // 7. Compute final score
  const examAlignedScore = contributions.low + contributions.medium + contributions.high;
  const finalScore = examAlignedScore * confidenceFactor * 100;

  // 8. Return clamped value between 0-100
  return Math.min(100, Math.max(0, finalScore));
};

export default calculatePerformanceIndex;