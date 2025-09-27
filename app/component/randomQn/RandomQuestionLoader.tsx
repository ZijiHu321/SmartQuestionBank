'use client';
import { useState, useEffect, useCallback } from 'react';
import QuestionCard from '@/app/questiontemp';
import { parseLAQuestionFile, LAQuestion } from '@/app/LA_Parser';
import { parseQuestionFile, Question } from '@/app/questionParser';

// Type definitions for MathJax
interface MathJaxConfig {
  tex: {
    inlineMath: string[][];
    displayMath: string[][];
    processEscapes: boolean;
    processEnvironments: boolean;
  };
  options: {
    skipHtmlTags: string[];
  };
}

interface MathJaxWindow extends Window {
  MathJax?: {
    typesetPromise?: () => Promise<void>;
  } & MathJaxConfig;
}

declare const window: MathJaxWindow;

// Union type for both question types
type AnyQuestion = Question | LAQuestion;

// Type guard to check if question is LA question
const isLAQuestion = (question: AnyQuestion): question is LAQuestion => {
  return 'solution' in question && !('choices' in question);
};

// Extract question type from filepath
const extractQuestionType = (filePath: string): 'regular' | 'la' => {
  const pathParts = filePath.split('/');
  const questionFolder = pathParts.find(part => part.includes('question'));
  
  if (questionFolder?.toLowerCase().includes('la')) {
    return 'la';
  }
  return 'regular';
};

// Extract course from filepath
const extractCourse = (filePath: string): string => {
  const pathParts = filePath.split('/');
  const questionFolderIndex = pathParts.findIndex(part => part.includes('question'));
  
  if (questionFolderIndex !== -1 && questionFolderIndex + 1 < pathParts.length) {
    return pathParts[questionFolderIndex + 1];
  }
  return '';
};

// Extract filename from filepath
const extractFilename = (filePath: string): string => {
  const pathParts = filePath.split('/');
  const filename = pathParts[pathParts.length - 1];
  return filename.replace('.txt', '');
};

// Component to render text with MathJax and bold formatting support
const MathJaxRenderer = ({ text }: { text: string }) => {
  const [renderedHTML, setRenderedHTML] = useState<string>('');
  const [mathJaxReady, setMathJaxReady] = useState(false);
  
  useEffect(() => {
    // Check if MathJax is loaded and ready
    const checkMathJax = () => {
      if (typeof window !== 'undefined' && window.MathJax) {
        setMathJaxReady(true);
      } else {
        setTimeout(checkMathJax, 100); // Check again in 100ms
      }
    };
    checkMathJax();
  }, []);
  
  // Function to process bold formatting and line breaks
  const processFormatting = (text: string): string => {
    let processed = text;
    
    // Convert newlines to <br /> tags
    processed = processed.replace(/\n/g, '<br />');
    
    // Process bold text (**text**)
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return processed;
  };
  
  useEffect(() => {
    const renderContent = async () => {
      try {
        // Process formatting
        const processedText = processFormatting(text);
        
        // Set the processed text
        setRenderedHTML(processedText);
        
        // If MathJax is ready, process math expressions
        if (mathJaxReady) {
          setTimeout(() => {
            if (window.MathJax && window.MathJax.typesetPromise) {
              window.MathJax.typesetPromise()
                .then(() => {
                  console.log('MathJax rendering complete');
                })
                .catch((err: Error) => {
                  console.error('MathJax rendering error:', err);
                });
            }
          }, 10);
        }
        
      } catch (error) {
        console.error('Content rendering error:', error);
        // Fallback to simple processing
        setRenderedHTML(processFormatting(text));
      }
    };
    
    renderContent();
  }, [text, mathJaxReady]);
  
  return (
    <div 
      dangerouslySetInnerHTML={{ __html: renderedHTML }}
      className="mathjax-content"
    />
  );
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

  // Load MathJax
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Only load MathJax if it's not already loaded
      if (!window.MathJax) {
        // Configure MathJax
        window.MathJax = {
          tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
            processEnvironments: true
          },
          options: {
            skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre']
          }
        };

        // Load MathJax script
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js';
        script.async = true;
        script.onload = () => {
          console.log('MathJax loaded successfully');
        };
        document.head.appendChild(script);
      }
    }
  }, []);

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
        // Render LA Question
        <div className="la-question-card">
          <div className="question-header">
            <span className="question-type-badge la">Long Answer</span>
            <div className="question-meta">
              <span className="difficulty">Difficulty: {question.difficulty}</span>
              <span className="unit">{question.unit}</span>
            </div>
          </div>
          
          <div className="question-content">
            <h3>Question:</h3>
            <div className="question-text">
              <MathJaxRenderer text={question.question} />
            </div>
          </div>
          
          <div className="solution-content">
            <h3>Solution:</h3>
            <div className="solution-text">
              <MathJaxRenderer text={question.solution} />
            </div>
          </div>
          
          <div className="question-footer">
            <div className="topics">
              <strong>Topics:</strong> {question.topics.join(', ')}
            </div>
            <div className="tags">
              <strong>Tags:</strong> {question.tags.join(', ')}
            </div>
          </div>
        </div>
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