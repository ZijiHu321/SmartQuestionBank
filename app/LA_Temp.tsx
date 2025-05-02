import { useState, useEffect } from 'react';
import Difficulty from './Difficulty';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

interface LACardProps {
  id: string;
  question: string;
  solution: string;
  difficulty: number;
  tags: string[];
  topics: string[];
  unit: string;
  course: string;
}

type TopicDictionary = Record<string, number>;
type UnitDictionary = Record<string, number>;

const initializeCourseDictionaries = (course: string) => {
  const topicsKey = `${course}_Topics`;
  const unitsKey = `${course}_Units`;
  
  if (!localStorage.getItem(topicsKey)) {
    localStorage.setItem(topicsKey, JSON.stringify({}));
  }
  if (!localStorage.getItem(unitsKey)) {
    localStorage.setItem(unitsKey, JSON.stringify({}));
  }
};

const LACard = ({
  id, 
  question, 
  solution,
  difficulty,
  tags,
  topics,
  unit,
  course
}: LACardProps) => {
  const [showSolution, setShowSolution] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [cardColor, setCardColor] = useState('#ffffff');
  const [previousAnswer, setPreviousAnswer] = useState<boolean | null>(null);
  const [isHoveringShowAnswer, setIsHoveringShowAnswer] = useState(false);
  const [isHoveringCorrect, setIsHoveringCorrect] = useState(false);
  const [isHoveringIncorrect, setIsHoveringIncorrect] = useState(false);

  useEffect(() => {
    initializeCourseDictionaries(course);
    const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
    if (id in answeredQuestions) {
      setPreviousAnswer(answeredQuestions[id]);
      setCardColor(answeredQuestions[id] ? '#e8f5e9' : '#ffebee');
    }
  }, [id, course]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('Bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  const updateWeakAreas = (increment: boolean) => {
    const topicsKey = `${course}_Topics`;
    const unitsKey = `${course}_Units`;
    
    const topicsDict: TopicDictionary = JSON.parse(
      localStorage.getItem(topicsKey) || '{}'
    );
    const unitsDict: UnitDictionary = JSON.parse(
      localStorage.getItem(unitsKey) || '{}'
    );

    const newTopics = { ...topicsDict };
    const newUnits = { ...unitsDict };

    const modifier = increment ? 1 : -1;
    
    topics.forEach(topic => {
      newTopics[topic] = (newTopics[topic] || 0) + modifier;
    });

    newUnits[unit] = (newUnits[unit] || 0) + modifier;

    localStorage.setItem(topicsKey, JSON.stringify(newTopics));
    localStorage.setItem(unitsKey, JSON.stringify(newUnits));
  };

  const handleResponse = (isCorrect: boolean) => {
    const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
    const wasPreviouslyAnswered = id in answeredQuestions;
    const previousCorrect = answeredQuestions[id];

    // Reset previous answer if exists
    if (wasPreviouslyAnswered) {
      const currentAnswered = parseInt(localStorage.getItem('answered') || '0', 10);
      localStorage.setItem('answered', Math.max(0, currentAnswered - 1).toString());

      if (previousCorrect) {
        const currentCorrect = parseInt(localStorage.getItem('correct') || '0', 10);
        localStorage.setItem('correct', Math.max(0, currentCorrect - 1).toString());
      } else {
        updateWeakAreas(false);
      }
    }

    // Apply new answer
    const currentAnswered = parseInt(localStorage.getItem('answered') || '0', 10);
    localStorage.setItem('answered', (currentAnswered + 1).toString());

    if (isCorrect) {
      const currentCorrect = parseInt(localStorage.getItem('correct') || '0', 10);
      localStorage.setItem('correct', (currentCorrect + 1).toString());
    } else {
      updateWeakAreas(true);
    }

    answeredQuestions[id] = isCorrect;
    localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
    setCardColor(isCorrect ? '#e8f5e9' : '#ffebee');
    setPreviousAnswer(isCorrect);
  };

  const handleBookmark = () => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('Bookmarks') || '[]');
    const newBookmarks = isBookmarked
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id];
    
    localStorage.setItem('Bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div style={{
      margin: '8rem auto',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: cardColor,
      transition: 'all 0.3s ease',
      width: '80%'
    }}>
      {/* Combined difficulty and tags */}
      <div style={{ 
        display: 'flex',
        flexDirection: 'column', // Stacks children vertically
        gap: '0.5rem',          // Adds spacing between difficulty & tags
        marginBottom: '1rem',
        }}>
        {/* Difficulty (now on its own line) */}
        <div>
            <Difficulty difficulty={difficulty} />
        </div>

        {/* Tags (inline, wrapped if needed) */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map((tag, index) => (
            <span
                key={index}
                style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                backgroundColor: '#f5f5f5',
                border: '1px solid #e0e0e0',
                fontSize: '0.875rem',
                color: '#616161'
                }}
            >
                {tag}
            </span>
            ))}
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <ReactMarkdown 
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
          components={{
            p: ({ children }) => (
              <div style={{ 
                margin: 0, 
                whiteSpace: 'pre-line',
                lineHeight: '1.6'
              }}>
                {children}
              </div>
            )
          }}
        >
          {question}
        </ReactMarkdown>
      </div>

      {showSolution && (
        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          border: '1px solid #e0e0e0'
        }}>
          <ReactMarkdown 
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeMathjax]}
          >
            {solution}
          </ReactMarkdown>
        </div>
      )}

<div style={{ 
    marginTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column', // Stacks children vertically
    gap: '1rem',            // Adds space between the two lines
    }}>
    {/* First button (on its own line) */}
    <div>
        <button
        onClick={() => setShowSolution(!showSolution)}
        onMouseEnter={() => setIsHoveringShowAnswer(true)}
        onMouseLeave={() => setIsHoveringShowAnswer(false)}
        style={{
            padding: '0.5rem 1rem',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            backgroundColor: isHoveringShowAnswer ? '#f5f5f5' : '#fff',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}
        >
        {showSolution ? 'Hide Answer' : 'Show Answer'}
        </button>
    </div>

    {/* Last two buttons (inline on the next line) */}
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
            onClick={() => handleResponse(true)}
            onMouseEnter={() => setIsHoveringCorrect(true)}
            onMouseLeave={() => setIsHoveringCorrect(false)}
            style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: previousAnswer === true ? '#1b5e20' : 
                            isHoveringCorrect ? '#1b5e20' : '#2e7d32',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
            >
            I have no problem with this question
            </button>

            <button
            onClick={() => handleResponse(false)}
            onMouseEnter={() => setIsHoveringIncorrect(true)}
            onMouseLeave={() => setIsHoveringIncorrect(false)}
            style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: previousAnswer === false ? '#b71c1c' : 
                            isHoveringIncorrect ? '#b71c1c' : '#d32f2f',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
            }}
            >
            I can&#39;t do this question by myself
            </button>
    </div>
</div>

      <div style={{
        marginTop: '1rem',
        fontSize: '0.875rem',
        color: '#616161'
      }}>
        *This selection will affect your course performance analysis in the Statistics section.
      </div>

      {/* Left-aligned bookmark */}
      <div style={{ 
        marginTop: '1.5rem',
        textAlign: 'left'
      }}>
        <button
          onClick={handleBookmark}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '50%',
            transition: 'all 0.2s ease'
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={isBookmarked ? '#ffd700' : 'none'}
            stroke="#666"
            strokeWidth="2"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LACard;