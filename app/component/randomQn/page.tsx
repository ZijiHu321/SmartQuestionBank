'use client';
import { useState } from 'react';
import  RandomQuestionLoader  from './RandomQuestionLoader';

interface CourseUnit {
  course: string;
  units: string[];
}

const COURSE_UNITS: CourseUnit[] = [
  {
    course: 'Cal1',
    units: ['Limits_and_Continuity', 'Finding_Derivative_Functions', 'Properties_of_Curves','Application_of_Derivatives']
  },
  {
    course: 'IB Calculus',
    units: ['Limits', 'Derivative', 'Curve','ApplicationofDerivatives','Integral','Kinematics','TaylorSeries','DifferentialEquations']
  },
  {
    course: 'IBstatistics',
    units: ['Probability', 'Statistics', 'DiscreteRandomVariables','ContinuousRandomVariables']
  }
];

const getFilePath = (course: string, unit: string, questionType: 'MC' | 'LA'): string => {
  const folderName = questionType === 'MC' ? 'MCquestion' : 'LAquestion';
  return `${folderName}/${course}/${unit}.txt`;
};

export default function RandomQuestion() {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedQuestionType, setSelectedQuestionType] = useState<'MC' | 'LA'>('MC');
  const [filePath, setFilePath] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
    setSelectedUnit('');
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
  };

  const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuestionType(e.target.value as 'MC' | 'LA');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && selectedUnit && selectedQuestionType) {
      const path = getFilePath(selectedCourse, selectedUnit, selectedQuestionType);
      setFilePath(path);
      console.log(path);
      setIsSubmitted(true);
    }
  };

  const handleClear = () => {
    setSelectedCourse('');
    setSelectedUnit('');
    setSelectedQuestionType('MC');
    setFilePath('');
    setIsSubmitted(false);
  };

  const availableUnits = selectedCourse
    ? COURSE_UNITS.find(c => c.course === selectedCourse)?.units || []
    : [];

  return (
    <div className="random-question-container">
      <h1 className="page-title">Random Question Generator</h1>

      <div className="content-wrapper">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  Question Type:
                </label>
                <select
                  value={selectedQuestionType}
                  onChange={handleQuestionTypeChange}
                  className="form-select"
                  required
                >
                  <option value="MC">Multiple Choice</option>
                  <option value="LA">Long Answer</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Course:
                </label>
                <select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  className="form-select"
                  required
                >
                  <option value="">Select a course</option>
                  {COURSE_UNITS.map((course) => (
                    <option key={course.course} value={course.course}>
                      {course.course}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Unit:
                </label>
                <select
                  value={selectedUnit}
                  onChange={handleUnitChange}
                  disabled={!selectedCourse}
                  className={`form-select ${!selectedCourse ? 'disabled' : ''}`}
                  required
                >
                  <option value="">Select a unit</option>
                  {availableUnits.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="button-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!selectedCourse || !selectedUnit || !selectedQuestionType}
              >
                Generate {selectedQuestionType === 'MC' ? 'Multiple Choice' : 'Long Answer'} Question
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="btn btn-secondary"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {isSubmitted && filePath && (
          <div className="question-container">
            <h2 className="question-title">
              {selectedCourse} - {selectedUnit} ({selectedQuestionType === 'MC' ? 'Multiple Choice' : 'Long Answer'})
            </h2>
            <RandomQuestionLoader filePath={filePath} />
          </div>
        )}
      </div>

      <style jsx>{`
        .random-question-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 40px 20px;
        }

        .page-title {
          margin-top: 100px;
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 40px;
          margin-right: 40vw;
        }

        .content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
        }

        .form-container {
          width: 100%;
          max-width: 800px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 30px;
          margin-bottom: 30px;
        }

        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
        }

        .form-group {
          flex: 1;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #37474f;
          font-weight: 500;
        }

        .form-select {
          width: 100%;
          padding: 12px;
          border-radius: 6px;
          border: 2px solid #dee2e6;
          background-color: white;
          font-size: 1rem;
          color: #212529;
          transition: border-color 0.2s ease;
        }

        .form-select:focus {
          outline: none;
          border-color: #37474f;
          box-shadow: 0 0 0 3px rgba(55, 71, 79, 0.1);
        }

        .form-select.disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .button-group {
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-primary {
          background-color: #37474f;
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #2c3b41;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .btn-secondary {
          background-color: #f5f5f5;
          color: #37474f;
          border: 2px solid #dee2e6;
        }

        .btn-secondary:hover {
          background-color: #e9ecef;
          border-color: #adb5bd;
        }

        .question-container {
          width: 100%;
          max-width: 800px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          padding: 30px;
        }

        .question-title {
          margin: 0 0 20px 0;
          color: #37474f;
          font-size: 1.8rem;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 1.8rem;
            margin-right: 0;
            text-align: left;
            margin-top: 6rem;
            margin-left: 2vw;
            margin-bottom: 20px;
          }

          .random-question-container {
            padding: 20px 10px;
          }

          .content-wrapper {
            padding: 10px;
          }

          .form-container {
            padding: 20px;
            margin-bottom: 20px;
          }

          .form-row {
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
          }

          .form-select {
            padding: 10px;
            font-size: 0.9rem;
          }

          .button-group {
            flex-direction: column;
            gap: 10px;
          }

          .btn {
            padding: 10px 20px;
            font-size: 0.9rem;
            width: 100%;
          }

          .question-container {
            padding: 20px;
          }

          .question-title {
            font-size: 1.5rem;
            margin-bottom: 15px;
          }
        }

        @media (max-width: 480px) {
          .random-question-container {
            padding: 15px 5px;
          }

          .form-container {
            padding: 15px;
          }

          .form-select {
            padding: 8px;
            font-size: 0.85rem;
          }

          .btn {
            padding: 8px 16px;
            font-size: 0.85rem;
          }

          .question-container {
            padding: 15px;
          }

          .question-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}   