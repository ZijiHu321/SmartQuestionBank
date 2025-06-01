'use client';
import { useState, useEffect, useCallback } from 'react';
import QuestionCard from '@/app/questiontemp';

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

const parseQuestionBlock = (block: string): Question => {
  // Implement your actual parsing logic here
  const lines = block.split('\n');
  const question: Partial<Question> = { choices: [] };
  let currentKey: string | null = null;
  let currentValue: string[] = [];

  const flushCurrentValue = () => {
    if (currentKey && currentValue.length > 0) {
      const value = currentValue.join('\n').trim();
      switch(currentKey.toLowerCase()) {
        case 'question':
          question.question = value;
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

  return {
    id: `generated_${Date.now()}`,
    question: question.question || '',
    choices: question.choices || [],
    correctIndex: question.correctIndex || 0,
    difficulty: question.difficulty || 1,
    unit: question.unit || '',
    topics: question.topics || [],
    course: ''
  };
};

const RandomQuestionLoader = ({ filePath }: { filePath: string }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadRandomQuestion = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const text = await response.text();
      const questionBlocks = text.split(/^---$/m).filter(b => b.trim() !== '');
      
      if (questionBlocks.length === 0) {
        setQuestion(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * questionBlocks.length);
      const parsedQuestion = parseQuestionBlock(questionBlocks[randomIndex]);
      setQuestion(parsedQuestion);
    } catch (err) {
      setError('Failed to load question');
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