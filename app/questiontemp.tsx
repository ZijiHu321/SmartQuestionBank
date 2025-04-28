import { useState, useEffect } from 'react';
import Difficulty from './Difficulty';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

const initializeDictionaries = () => {
  if (!localStorage.getItem('Topics')) {
    localStorage.setItem('Topics', JSON.stringify({}));
  }
  if (!localStorage.getItem('Units')) {
    localStorage.setItem('Units', JSON.stringify({}));
  }
};

interface QuestionCardProps {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  difficulty: number;
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

const QuestionCard = ({
  id, 
  question, 
  choices, 
  correctIndex, 
  difficulty,
  topics,
  unit,
  course
}: QuestionCardProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    initializeDictionaries();
    const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
    setIsAnswered(id in answeredQuestions);
  }, [id]);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('Bookmarks') || '[]');
    setIsBookmarked(bookmarks.includes(id));
  }, [id]);

  useEffect(() => {
    initializeCourseDictionaries(course);
  }, [course]);

  const updateWeakAreas = () => {
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

    topics.forEach(topic => {
      newTopics[topic] = (newTopics[topic] || 0) + 1;
    });

    newUnits[unit] = (newUnits[unit] || 0) + 1;

    localStorage.setItem(topicsKey, JSON.stringify(newTopics));
    localStorage.setItem(unitsKey, JSON.stringify(newUnits));
  };

  const handleChoiceClick = (index: number) => {
    const isCorrect = index === correctIndex;
    const questionId = `q${id}`;
    const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
    
    const isFirstAttempt = !Object.prototype.hasOwnProperty.call(answeredQuestions, questionId);

    if (isFirstAttempt) {
      const currentAnswered = parseInt(localStorage.getItem('answered') || '0', 10);
      localStorage.setItem('answered', (currentAnswered + 1).toString());

      if (isCorrect) {
        const currentCorrect = parseInt(localStorage.getItem('correct') || '0', 10);
        localStorage.setItem('correct', (currentCorrect + 1).toString());
      } else {
        updateWeakAreas();
      }

      answeredQuestions[questionId] = isCorrect;
      localStorage.setItem('answeredQuestions', JSON.stringify(answeredQuestions));
      setIsAnswered(true);
    }

    setSelectedIndex(index);
    setResultMessage(isCorrect ? 'Correct!' : 'Incorrect!');
  };

  const handleBookmark = () => {
    const bookmarks: string[] = JSON.parse(localStorage.getItem('Bookmarks') || '[]');
    const newBookmarks = isBookmarked
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id];
    
    localStorage.setItem('Bookmarks', JSON.stringify(newBookmarks));
    setIsBookmarked(!isBookmarked);
  };

  const getCardColor = () => {
    if (selectedIndex !== null) {
      return selectedIndex === correctIndex ? '#e8f5e9' : '#ffebee';
    }
    if (isAnswered) {
      const answeredQuestions = JSON.parse(localStorage.getItem('answeredQuestions') || '{}');
      return answeredQuestions[`q${id}`] ? '#e8f5e9' : '#ffebee';
    }
    return '#ffffff';
  };

  return (
    <div style={{
      margin: '8rem auto',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: getCardColor(),
      transition: 'all 0.3s ease',
      width: '80%'
    }}>
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0 }}>
          <Difficulty difficulty={difficulty} />
        </div>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <ReactMarkdown 
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeMathjax]}
          components={{
            p: ({ children}) => (
              <div style={{ 
                margin: 0, 
                whiteSpace: 'pre-line',
                lineHeight: '1.6'
              }}>
                {children}
              </div>
            ),
            img: (props) => {
              const [path, params] = (props.src || '').split('?');
              const size = new URLSearchParams(params).get('size')?.split('x') || [];
              
              return (
                <div style={{ 
                  margin: '1rem 0',
                  textAlign: 'center'
                }}>
                  <img
                    {...props}
                    src={path}
                    alt={props.alt || ''}
                    style={{
                      width: size[0] ? `${size[0]}px` : 'auto',
                      height: size[1] ? `${size[1]}px` : 'auto',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  {props.alt && (
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#666',
                      marginTop: '0.5rem'
                    }}>
                      {props.alt}
                    </div>
                  )}
                </div>
              );
            }
          }}
        >
          {question}
        </ReactMarkdown>
        
        {resultMessage && (
          <div style={{
            marginTop: '1rem',
            fontWeight: 'bold',
            color: resultMessage === 'Correct!' ? '#2e7d32' : '#d32f2f'
          }}>
            {resultMessage}
          </div>
        )}
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: 'flex',
              width: '100%',
              minHeight: '3rem',
              padding: '1rem',
              margin: '0.5rem 0',
              border: '1px solid #ddd',
              borderRadius: '4px',
              backgroundColor: 
                selectedIndex === index 
                  ? (index === correctIndex ? '#c8e6c9' : '#ffcdd2') 
                  : (hoveredIndex === index ? '#f5f5f5' : '#fff'),
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              alignItems: 'flex-start',
              textAlign: 'left'
            }}
          >
            <ReactMarkdown 
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeMathjax]}
              components={{
                p: (props) => <div {...props} style={{ margin: 0 }}/>
              }}
            >
              {choice}
            </ReactMarkdown>
          </button>
        ))}
      </div>

      <button
    onClick={handleBookmark}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      transition: 'all 0.2s ease',
      backgroundColor: isHovered ? '#f0f0f0' : 'transparent'
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
  );
};

export default QuestionCard;