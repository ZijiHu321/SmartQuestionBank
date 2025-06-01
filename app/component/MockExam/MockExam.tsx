import React from 'react'
import { useState } from 'react'
import SearchItem from './SearchItem'
import PdfTable from './Table'

// type PdfItem = {
//   course: string;
//   unit: string;
//   examType: string;
//   filename: string; 
// };

const [List, setList] = useState([
  // cal1 course
  { course: 'cal1', unit: 'Limits and Continuity', examType: 'Unit Test', filename: 'cal1_Limits and Continuity.pdf' },
  { course: 'cal1', unit: 'Finding Derivative Functions', examType: 'Unit Test', filename: 'cal1_Finding Derivative Functions.pdf' },
  { course: 'cal1', unit: 'Properties of Curves', examType: 'Unit Test', filename: 'cal1_Properties of Curves.pdf' },
  { course: 'cal1', unit: 'Application of Derivatives', examType: 'Unit Test', filename: 'cal1_Application of Derivatives.pdf' },

  // ib_cal course
  { course: 'ib_cal', unit: 'Limits', examType: 'Unit Test', filename: 'ib_cal_Limits.pdf' },
  { course: 'ib_cal', unit: 'Finding Derivative Functions', examType: 'Unit Test', filename: 'ib_cal_Finding Derivative Functions.pdf' },
  { course: 'ib_cal', unit: 'Properties of Curves', examType: 'Unit Test', filename: 'ib_cal_Properties of Curves.pdf' },
  { course: 'ib_cal', unit: 'Application of Derivatives', examType: 'Unit Test', filename: 'ib_cal_Application of Derivatives.pdf' },
  { course: 'ib_cal', unit: 'Integral', examType: 'Unit Test', filename: 'ib_cal_Integral.pdf' },
  { course: 'ib_cal', unit: 'Kinematics', examType: 'Unit Test', filename: 'ib_cal_Kinematics.pdf' },
  { course: 'ib_cal', unit: 'Taylor Series', examType: 'Unit Test', filename: 'ib_cal_Taylor Series.pdf' },
  { course: 'ib_cal', unit: 'Differential Equations', examType: 'Unit Test', filename: 'ib_cal_Differential Equations.pdf' },

  // ib_stat course
  { course: 'ib_stat', unit: 'Probability', examType: 'Unit Test', filename: 'ib_stat_Probability.pdf' },
  { course: 'ib_stat', unit: 'Statistics', examType: 'Unit Test', filename: 'ib_stat_Statistics.pdf' },
  { course: 'ib_stat', unit: 'Discrete Random Variables', examType: 'Unit Test', filename: 'ib_stat_Discrete Random Variables.pdf' },
  { course: 'ib_stat', unit: 'Continuous Random Variables', examType: 'Unit Test', filename: 'ib_stat_Continuous Random Variables.pdf' },
]);

const [search, setSearch] = useState<string>('')

const MockExam = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <header style={{
        marginTop: '100px',
        textAlign: 'center',
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '40px',
        marginRight: '40vw'
      }}> 
        <h1>Mock Examinations</h1>
      </header>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <SearchItem
            search={search}
            setSearch={setSearch}
          />

          <PdfTable
            List={List.filter(item => (
              item.course.toLowerCase().includes(search.toLowerCase()) ||
              item.unit.toLowerCase().includes(search.toLowerCase()) ||
              item.examType.toLowerCase().includes(search.toLowerCase())
            ))}
            setList={setList}
          />
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          header h1 {
            font-size: 1.8rem;
            margin-right: 0;
            text-align: left;
            margin-top: 6rem;
            margin-left: 2vw;
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default MockExam