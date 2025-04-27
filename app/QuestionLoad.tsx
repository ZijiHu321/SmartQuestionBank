import { useState, useEffect } from 'react';
import QuestionCard from './questiontemp';

interface Question {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  difficulty: number;
  unit: string;
  topics: string[];
  course: string;
}

interface QuestionLoaderProps {
  filePath: string;
}

const extractCourseFromPath = (filePath: string): string => {
  const pathSegments = filePath.split('/').filter(seg => seg !== '');
  const mcqIndex = pathSegments.indexOf('MCquestion');
  return mcqIndex !== -1 && mcqIndex < pathSegments.length - 1 
    ? pathSegments[mcqIndex + 1] 
    : 'General';
};

const QuestionLoader = ({ filePath }: QuestionLoaderProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [course, setCourse] = useState('General');

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const detectedCourse = extractCourseFromPath(filePath);
        setCourse(detectedCourse);

        const response = await fetch(`/${filePath}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const text = await response.text();
        const questionBlocks = text.split(/^---$/m).filter(b => b.trim() !== '');

        const fileName = filePath.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'q';
        const encodedCourse = encodeURIComponent(detectedCourse);
        const encodedFileName = encodeURIComponent(fileName);
        const idPrefix = `${encodedCourse}_${encodedFileName}_`;

        const parsedQuestions = questionBlocks.map((block, index) => {
          const lines = block.split('\n');
          const question: Partial<Question> = { 
            choices: [],
            course: detectedCourse
          };
          let currentKey: string | null = null;
          let currentValue: string[] = [];

          const flushCurrentValue = () => {
            if (currentKey && currentValue.length > 0) {
              const value = currentValue.join('\n').trim();
              switch(currentKey.toLowerCase()) {
                case 'question':
                  question.question = value.replace(/\n/g, '  \n');
                  break;
                case 'choices':
                  question.choices = value.split('\n')
                    .filter(l => l.startsWith('-'))
                    .map(l => l.substring(1).trim());
                  break;
                case 'correct':
                  question.correctIndex = parseInt(value, 10);
                  break;
                case 'difficulty':
                  question.difficulty = parseInt(value, 10);
                  break;
                case 'unit':
                  question.unit = value;
                  break;
                case 'topics':
                  question.topics = value.split(',').map(t => t.trim());
                  break;
              }
              currentValue = [];
            }
          };

          lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            const keyMatch = trimmedLine.match(/^(question|choices|correct|difficulty|unit|topics):/i);
            if (keyMatch) {
              flushCurrentValue();
              currentKey = keyMatch[1].toLowerCase();
              currentValue.push(trimmedLine.replace(/^.*?:/, '').trim());
            } else if (currentKey) {
              currentValue.push(trimmedLine);
            }
          });

          flushCurrentValue();

          // Validate mandatory fields
          if (!question.choices || question.choices.length === 0) {
            console.warn(`Skipping question ${index + 1} - missing choices`);
            return null;
          }
          if (typeof question.correctIndex === 'undefined') {
            console.warn(`Skipping question ${index + 1} - missing correct index`);
            return null;
          }
          if (!question.question) {
            console.warn(`Skipping question ${index + 1} - missing question text`);
            return null;
          }

          return {
            id: `${idPrefix}${index + 1}`,
            question: question.question!,
            choices: question.choices!,
            correctIndex: question.correctIndex!,
            difficulty: question.difficulty || 1,
            unit: question.unit || 'Uncategorized',
            topics: question.topics || [],
            course: detectedCourse
          };
        });

        setQuestions(parsedQuestions.filter((q): q is Question => q !== null));
      } catch (error) {
        console.error(`Failed to load questions from ${filePath}:`, error);
        setQuestions([]);
      }
    };

    loadQuestions();
  }, [filePath]);

  return (
    <div className="question-loader">
      {questions.length === 0 && (
        <div className="loading-message">
          {questions.length === 0 ? 'Loading questions...' : 'No questions found'}
        </div>
      )}
      
      {questions.map((question) => (
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
      ))}
    </div>
  );
};

export default QuestionLoader;