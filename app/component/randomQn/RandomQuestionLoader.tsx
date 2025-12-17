'use client';
import { useState, useEffect, useCallback } from 'react';
import QuestionCard from '@/app/questiontemp';
import LATemp from '@/app/LA_Temp';
import { parseLAQuestionFile, LAQuestion } from '@/app/LA_Parser';
import { parseQuestionFile, Question } from '@/app/questionParser';



// Union type for both question types
type AnyQuestion = Question | LAQuestion;

// Type guard to check if question is LA question
const isLAQuestion = (question: AnyQuestion): question is LAQuestion => {
  return 'solution' in question && !('choices' in question);
};

// Extract question type from filepath
const extractQuestionType = (filePath: string): 'regular' | 'la' => {
  // Split on both forward and back slashes (handles Windows paths), and decode URI components
  const pathParts = filePath.split(/[\\\/]/).map(part => decodeURIComponent(part));
  const questionFolder = pathParts.find(part => /question/i.test(part));
  
  if (questionFolder?.toLowerCase().includes('la')) {
    return 'la';
  }
  return 'regular';
};

// Extract course from filepath
const extractCourse = (filePath: string): string => {
  const pathParts = filePath.split(/[\\\/]/).map(part => decodeURIComponent(part));
  const questionFolderIndex = pathParts.findIndex(part => /question/i.test(part));
  
  if (questionFolderIndex !== -1 && questionFolderIndex + 1 < pathParts.length) {
    const rawCourse = pathParts[questionFolderIndex + 1];
    // Normalize some common variants to match the folder names in public/
    if (rawCourse && rawCourse.toLowerCase().replace(/\s|_/g, '') === 'ibstatistics') {
      return 'IB Statistics';
    }
    return rawCourse;
  }
  return '';
};

// Extract filename from filepath
const extractFilename = (filePath: string): string => {
  const pathParts = filePath.split(/[\\\/]/).map(part => decodeURIComponent(part));
  const filename = pathParts[pathParts.length - 1];
  return filename.replace('.txt', '');
};



const RandomQuestionLoader = ({ filePath }: { filePath: string }) => {
  const [question, setQuestion] = useState<AnyQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [questionType, setQuestionType] = useState<'regular' | 'la'>('regular');

  const loadRandomQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const text = await response.text();
      const detectedQuestionType = extractQuestionType(filePath);
      setQuestionType(detectedQuestionType);
      
      if (detectedQuestionType === 'la') {
        // Parse LA questions
        const course = extractCourse(filePath);
        const filename = extractFilename(filePath);
        const laQuestions = parseLAQuestionFile(text, filename, course);
        
        if (laQuestions.length === 0) {
          setQuestion(null);
          return;
        }
        
        const randomIndex = Math.floor(Math.random() * laQuestions.length);
        setQuestion(laQuestions[randomIndex]);
      } else {
        // Parse regular questions
        const course = extractCourse(filePath);
        const filename = extractFilename(filePath);
        const regularQuestions = parseQuestionFile(text, filename, course);
        
        if (regularQuestions.length === 0) {
          setQuestion(null);
          return;
        }

        const randomIndex = Math.floor(Math.random() * regularQuestions.length);
        setQuestion(regularQuestions[randomIndex]);
      }
    } catch (err) {
      setError('Will be added soon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filePath]);

  useEffect(() => {
    if (filePath) {
      loadRandomQuestion();
    }
  }, [filePath, loadRandomQuestion]);



  if (loading) return (
    <div className="status-message">
      Loading question...
    </div>
  );

  if (error) return (
    <div className="status-message error">
      {error}
    </div>
  );

  if (!question) return (
    <div className="status-message">
      No questions found in this unit
    </div>
  );

  return (
    <div className="question-loader-container">
      {isLAQuestion(question) ? (
        // Use LA_Temp for long-answer rendering (uses ReactMarkdown + rehype-mathjax)
        <LATemp
          id={question.id}
          question={question.question}
          solution={question.solution}
          difficulty={question.difficulty}
          tags={question.tags}
          topics={question.topics}
          unit={question.unit}
          course={question.course}
        />
      ) : (
        // Render Regular Question
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
      )}
      
      <button 
        onClick={loadRandomQuestion}
        className="load-question-button"
      >
        Load Another Random {questionType === 'la' ? 'Long Answer' : ''} Question
      </button>

      <style jsx>{`
        .question-loader-container {
          margin-top: 20px;
        }

        .status-message {
          padding: 20px;
          text-align: center;
          color: #37474f;
          font-size: 1rem;
          border-radius: 8px;
          background-color: #f8f9fa;
          border: 1px solid #e9ecef;
        }

        .status-message.error {
          color: #d32f2f;
          background-color: #ffebee;
          border-color: #ffcdd2;
        }

        .la-question-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
          margin-bottom: 20px;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .question-type-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .question-type-badge.la {
          background-color: #e3f2fd;
          color: #1565c0;
        }

        .question-meta {
          display: flex;
          gap: 15px;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .question-content, .solution-content {
          margin-bottom: 20px;
        }

        .question-content h3, .solution-content h3 {
          color: #374151;
          margin-bottom: 10px;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .question-text, .solution-text {
          color: #4b5563;
          line-height: 1.6;
          padding: 15px;
          background-color: #f9fafb;
          border-radius: 8px;
          border-left: 4px solid #3b82f6;
        }

        .solution-text {
          border-left-color: #10b981;
        }

        /* MathJax and bold formatting styling */
        .mathjax-content {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .mathjax-content .MJXc-display {
          margin: 1em 0;
        }

        .mathjax-content .MathJax {
          font-size: 1.1em;
        }

        .mathjax-content strong {
          font-weight: 600;
          color: #374151;
        }

        .question-footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 15px;
          font-size: 0.9rem;
          color: #6b7280;
        }

        .topics, .tags {
          margin-bottom: 8px;
        }

        .load-question-button {
          margin-top: 30px;
          padding: 12px 24px;
          background-color: #37474f;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.2s ease;
          width: 100%;
        }

        .load-question-button:hover {
          background-color: #2c3b41;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .load-question-button:active {
          transform: translateY(0);
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .load-question-button:focus {
          outline: none;
          box-shadow: 0 0 0 3px rgba(55, 71, 79, 0.3);
        }

        @media (max-width: 768px) {
          .question-loader-container {
            margin-top: 15px;
          }

          .la-question-card {
            padding: 20px;
          }

          .question-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .question-meta {
            gap: 10px;
          }

          .status-message {
            padding: 15px;
            font-size: 0.9rem;
            border-radius: 6px;
          }

          .load-question-button {
            margin-top: 20px;
            padding: 10px 20px;
            font-size: 0.9rem;
            border-radius: 5px;
          }
        }

        @media (max-width: 480px) {
          .question-loader-container {
            margin-top: 10px;
          }

          .la-question-card {
            padding: 16px;
          }

          .question-meta {
            flex-direction: column;
            gap: 5px;
          }

          .status-message {
            padding: 12px;
            font-size: 0.85rem;
          }

          .load-question-button {
            margin-top: 15px;
            padding: 8px 16px;
            font-size: 0.85rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RandomQuestionLoader;