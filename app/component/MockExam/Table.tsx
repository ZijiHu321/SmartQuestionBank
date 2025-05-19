'use client';

import React from 'react';

type PdfItem = {
  course: string;
  unit: string;
  examType: string;
  filename: string; 
};

const pdfData: PdfItem[] = [
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
];


const PdfTable = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Exam PDFs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={thStyle}>Course</th>
            <th style={thStyle}>Unit</th>
            <th style={thStyle}>Exam Type</th>
            <th style={thStyle}>PDF</th>
          </tr>
        </thead>
        <tbody>
          {pdfData.map((item, index) => (
            <tr key={index}>
              <td style={tdStyle}>{item.course}</td>
              <td style={tdStyle}>{item.unit}</td>
              <td style={tdStyle}>{item.examType}</td>
              <td style={tdStyle}>
                <a
                  href={`/pdfs/${item.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#007bff', textDecoration: 'none' }}
                >
                  View PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '12px',
  borderBottom: '2px solid #ccc',
};

const tdStyle: React.CSSProperties = {
  padding: '12px',
  borderBottom: '1px solid #ddd',
};

export default PdfTable;
