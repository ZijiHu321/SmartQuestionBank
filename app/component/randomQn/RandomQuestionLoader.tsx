'use client';
import { useState, useEffect } from 'react';
import QuestionCard from '@/app/questiontemp';

const RandomQuestionLoader = ({ filePath }: { filePath: string }) => {
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRandomQuestion = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(filePath);
      const text = await response.text();
      // ... (keep your existing question loading logic)
    } catch (err) {
      setError('Failed to load question');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filePath) {
      loadRandomQuestion();
    }
  }, [filePath]);

  if (loading) return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      color: '#37474f'
    }}>
      Loading question...
    </div>
  );

  if (error) return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      color: '#d32f2f'
    }}>
      {error}
    </div>
  );

  if (!question) return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      color: '#37474f'
    }}>
      No questions found in this unit
    </div>
  );

  return (
    <div style={{ marginTop: '20px' }}>
      <QuestionCard
        key={question.id}
        id={question.id}
        question={question.question}
        choices={question.choices}
        correctIndex={question.correctIndex}
        difficulty={question.difficulty}
        unit={question.unit}
        topics={question.topics}
        course={question.course}
      />
      
      <button 
        onClick={loadRandomQuestion}
        style={{
          marginTop: '30px',
          padding: '12px 24px',
          backgroundColor: '#37474f',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '1rem',
          transition: 'all 0.2s ease',
          width: '100%',
          
        }}
      >
        Load Another Random Question
      </button>
    </div>
  );
};

export default RandomQuestionLoader;