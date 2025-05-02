'use client'

import { useState, useEffect } from 'react';
import { parseLAQuestionFile, LAQuestion } from './LA_Parser';
import LACard from './LA_Temp';

interface LALoaderProps {
  filePath: string;
  course: string;
}

const LALoader = ({ filePath, course }: LALoaderProps) => {
  const [questions, setQuestions] = useState<LAQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // Fetch text file from public directory
        const response = await fetch(`/${filePath}`);
        if (!response.ok) throw new Error('Failed to fetch questions');
        
        const text = await response.text();
        const fileName = filePath.split('/').pop()?.replace('.txt', '') || 'unknown';
        
        // Parse using your LA parser
        const parsedQuestions = parseLAQuestionFile(text, fileName, course);
        
        setQuestions(parsedQuestions);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [filePath, course]);

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', margin: '2rem' }}>
        Error loading questions: {error}
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>No questions found in this file</div>;
  }

  return (
    <div style={{ margin: '2rem 0' }}>
      {questions.map((q) => (
        <LACard
          key={q.id}
          id={q.id}
          question={q.question}
          solution={q.solution}
          difficulty={q.difficulty}
          tags={q.tags}
          topics={q.topics}
          unit={q.unit}
          course={q.course}
        />
      ))}
    </div>
  );
};

export default LALoader;