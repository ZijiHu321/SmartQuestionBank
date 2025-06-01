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
    units: ['Limits_and_Continuity', 'Finding_Derivative', 'Properties_of_Curves','Application_of_Derivatives']
  },
  {
    course: 'IB Calculus',
    units: ['Limits', 'Derivative', 'PropertiesOfCurves','ApplicationofDerivatives','Integral','Kinematics','TaylorSeries','DifferentialEquations']
  },
  {
    course: 'IBstatistics',
    units: ['Probability', 'Statistics', 'DiscreteRandomVariables','ContinuousRandomVariables']
  }
];

const getFilePath = (course: string, unit: string): string => {
  return `MCquestion/${course}/${unit}.txt`;
};

export default function RandomQuestion() {
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [filePath, setFilePath] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value);
    setSelectedUnit('');
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCourse && selectedUnit) {
      const path = getFilePath(selectedCourse, selectedUnit);
      setFilePath(path);
      setIsSubmitted(true);
    }
  };

  const handleClear = () => {
    setSelectedCourse('');
    setSelectedUnit('');
    setFilePath('');
    setIsSubmitted(false);
  };

  const availableUnits = selectedCourse
    ? COURSE_UNITS.find(c => c.course === selectedCourse)?.units || []
    : [];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '40px 20px'
    }}>
      <h1 style={{
        marginTop: '100px',
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '40px',
        marginRight: '40vw'
      }}>
        Random Question Generator
      </h1>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ 
              display: 'flex', 
              gap: '20px', 
              marginBottom: '25px'
            }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#37474f',
                  fontWeight: '500'
                }}>
                  Course:
                </label>
                <select
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '2px solid #dee2e6',
                    backgroundColor: 'white',
                    fontSize: '1rem',
                    color: '#212529'
                  }}
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

              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  color: '#37474f',
                  fontWeight: '500'
                }}>
                  Unit:
                </label>
                <select
                  value={selectedUnit}
                  onChange={handleUnitChange}
                  disabled={!selectedCourse}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '2px solid #dee2e6',
                    backgroundColor: 'white',
                    fontSize: '1rem',
                    color: '#212529',
                    opacity: !selectedCourse ? 0.7 : 1
                  }}
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

            <div style={{ 
              display: 'flex', 
              gap: '15px',
              justifyContent: 'center'
            }}>
              <button
                type="submit"
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#37474f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  
                }}
                disabled={!selectedCourse || !selectedUnit}
              >
                Generate Question
              </button>

              <button
                type="button"
                onClick={handleClear}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f5f5f5',
                  color: '#37474f',
                  border: '2px solid #dee2e6',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  
                }}
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {isSubmitted && filePath && (
          <div style={{
            width: '100%',
            maxWidth: '800px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '30px'
          }}>
            <h2 style={{
              margin: '0 0 20px 0',
              color: '#37474f',
              fontSize: '1.8rem',
              fontWeight: '500'
            }}>
              {selectedCourse} - {selectedUnit}
            </h2>
            <RandomQuestionLoader filePath={filePath} />
          </div>
        )}
      </div>
    </div>
  );
}