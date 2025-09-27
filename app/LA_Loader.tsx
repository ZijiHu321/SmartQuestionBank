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
        setError(err instanceof Error ? err.message : 'Will be added soon');
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [filePath, course]);

  if (loading) {
    return (
      <div style={{padding: '2rem', textAlign: 'center', marginTop:'5rem'}}>
        <div className="bouncing-dots">
          <div className="dot dot1"></div>
          <div className="dot dot2"></div>
          <div className="dot dot3"></div>
        </div>
        <div style={{marginTop: '1rem', fontWeight: 600, fontSize: '1.2rem', color: '#3498db'}}>
          Loading questions...
        </div>
        <style jsx>{`
          .bouncing-dots {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            height: 48px;
            gap: 10px;
          }
          .dot {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #f39c12;
            animation: bounce 0.6s infinite alternate;
          }
          .dot2 {
            background: #e74c3c;
            animation-delay: 0.2s;
          }
          .dot3 {
            background: #3498db;
            animation-delay: 0.4s;
          }
          @keyframes bounce {
            to {
              transform: translateY(-24px);
            }
          }
        `}</style>
      </div>
    );
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