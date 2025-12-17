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


const MockExam = () => {
  const List= [
  // cal1 course
  { course: 'IB math HL', unit: 'Counting', examType: 'Unit Test Paper 1', filename: 'countingP1.pdf' },
  { course: 'IB math HL', unit: 'Derivatives', examType: 'Unit Test Paper 1', filename: 'Derivatives P1.pdf' },
  { course: 'IB math HL', unit: 'Derivatives', examType: 'Unit Test Paper 1 Answer', filename: 'Derivatives P1 (ANS).pdf' },
  { course: 'IB math HL', unit: 'Derivatives', examType: 'Unit Test Paper 2', filename: 'Derivatives P2.pdf' },
  { course: 'IB physics HL', unit: 'Thermal Physics', examType: 'Unit Test Paper 2', filename: 'Thermal Physics P2.pdf' },
  { course: 'IB physics HL', unit: 'Thermal Physics', examType: 'Unit Test Paper 2 Answer', filename: 'Thermal Physics P2 (ANS).pdf' },
];

const [search, setSearch] = useState<string>('')

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <h1 className="mock-exam-title">Mock Examinations</h1>

      <style jsx>{`
        .mock-exam-title {
          margin-top: 100px;
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 40px;
          margin-right: 40vw;
        }

        @media (max-width: 768px) {
          .mock-exam-title {
            font-size: 1.8rem;
            margin-right: 0;
            text-align: left;
            margin-top: 6rem;
            margin-left: 2vw;
            margin-bottom: 20px;
          }
        }
      `}</style>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '-10rem'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
          gap: '-0px'
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
            
          />
        </div>
      </div>
    </div>
  );
}

export default MockExam