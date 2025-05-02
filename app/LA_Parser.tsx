'use client'

// utils/LA_Parser.tsx

export interface LAQuestion {
  id: string;
  question: string;
  solution: string;
  difficulty: number;
  unit: string;
  topics: string[];
  tags: string[];
  course: string;
}

interface ParseLAQuestionOptions {
  filename: string;
  questionIndex: number;
  course: string;
}

export const parseLAQuestionBlock = (
  block: string,
  options: ParseLAQuestionOptions
): LAQuestion | null => {
  const encodedCourse = encodeURIComponent(options.course);
  const encodedFilename = encodeURIComponent(options.filename);
  const lines = block.split('\n');
  const questionData: Partial<LAQuestion> = { 
    id: `${encodedCourse}_LA_${encodedFilename}_${options.questionIndex + 1}`,
    course: options.course,
    tags: [],
    topics: []
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
        case 'solution':
          questionData.solution = value.replace(/\n/g, '  \n');
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
        case 'tags':
          questionData.tags = value.split(',').map(t => t.trim());
          break;
      }
      currentValue = [];
    }
  };

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const keyMatch = trimmedLine.match(/^(question|solution|difficulty|unit|topics|tags):/i);
    if (keyMatch) {
      flushCurrentValue();
      currentKey = keyMatch[1].toLowerCase();
      currentValue.push(trimmedLine.replace(/^.*?:/, '').trim());
    } else if (currentKey) {
      currentValue.push(trimmedLine);
    }
  });

  flushCurrentValue();

  // Type-safe validation with proper checks
  if (questionData.question &&
      questionData.solution &&
      typeof questionData.difficulty === 'number' &&
      questionData.unit &&
      questionData.topics && 
      questionData.topics.length > 0 &&
      questionData.tags && 
      questionData.tags.length > 0) {
    return {
      id: questionData.id!,
      question: questionData.question,
      solution: questionData.solution,
      difficulty: questionData.difficulty,
      unit: questionData.unit,
      topics: questionData.topics,
      tags: questionData.tags,
      course: options.course
    };
  }

  return null;
};

export const parseLAQuestionFile = (
  text: string,
  filename: string,
  course: string
): LAQuestion[] => {
  const questionBlocks = text.split(/^---$/m).filter(b => b.trim() !== '');
  
  return questionBlocks
    .map((block, index) => parseLAQuestionBlock(block, {
      filename,
      questionIndex: index,
      course
    }))
    .filter((q): q is LAQuestion => q !== null);
};