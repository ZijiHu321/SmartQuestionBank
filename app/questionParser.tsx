'use client'

// utils/questionParser.ts

export interface Question {
  id: string;
  question: string;
  choices: string[];
  correctIndex: number;
  difficulty: number;
  unit: string;
  topics: string[];
  course: string;
}

interface ParseQuestionOptions {
  filename: string;
  questionIndex: number;
  course: string;
}

export const parseQuestionBlock = (
  block: string,
  options: ParseQuestionOptions
): Question | null => {
  // Add encoding here
  const encodedCourse = encodeURIComponent(options.course);
  const encodedFilename = encodeURIComponent(options.filename);
  const lines = block.split('\n');
  const questionData: Partial<Question> = { 
    choices: [],
    id: `${encodedCourse}_${encodedFilename}_${options.questionIndex + 1}`,
    course: options.course
  };

  let currentKey: string | null = null;
  let currentValue: string[] = [];

  const flushCurrentValue = () => {
    if (currentKey && currentValue.length > 0) {
      const value = currentValue.join('\n').trim();
      switch(currentKey.toLowerCase()) {
        case 'question':
          questionData.question = value.replace(/\n/g, '  \n');
          break;
        case 'choices':
          questionData.choices = value.split('\n')
            .filter(l => l.startsWith('-'))
            .map(l => l.substring(1).trim());
          break;
        case 'correct':
          questionData.correctIndex = parseInt(value, 10);
          break;
        case 'difficulty':
          questionData.difficulty = parseInt(value, 10);
          break;
        case 'unit':
          questionData.unit = value;
          break;
        case 'topics':
          questionData.topics = value.split(',').map(t => t.trim());
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

  if (questionData.choices?.length && 
      typeof questionData.correctIndex !== 'undefined' &&
      questionData.question &&
      questionData.difficulty !== undefined &&
      questionData.unit &&
      questionData.topics) {
    return {
      id: questionData.id!,
      question: questionData.question,
      choices: questionData.choices,
      correctIndex: questionData.correctIndex,
      difficulty: questionData.difficulty,
      unit: questionData.unit,
      topics: questionData.topics,
      course: options.course
    };
  }

  return null;
};

export const parseQuestionFile = (
  text: string,
  filename: string,
  course: string
): Question[] => {
  const questionBlocks = text.split(/^---$/m).filter(b => b.trim() !== '');
  
  return questionBlocks
    .map((block, index) => parseQuestionBlock(block, {
      filename,
      questionIndex: index,
      course
    }))
    .filter((q): q is Question => q !== null);
};