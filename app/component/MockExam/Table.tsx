'use client';
import { useState } from 'react';

import React from 'react';



interface PdfItem {
  course: string;
  unit: string;
  examType: string;
  filename: string;
}

interface PdfTableProps {
  List: PdfItem[];
  setList: React.Dispatch<React.SetStateAction<PdfItem[]>>;
}

const PdfTable: React.FC<PdfTableProps> = ({ List, setList }) => {
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

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
        marginBottom: '40px'
      }}>
        Exam PDFs
      </h1>

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#37474f',
              color: 'white'
            }}>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '500',
                fontSize: '1.1rem'
              }}>Course</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '500',
                fontSize: '1.1rem'
              }}>Unit</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '500',
                fontSize: '1.1rem'
              }}>Exam Type</th>
              <th style={{
                padding: '16px',
                textAlign: 'left',
                fontWeight: '500',
                fontSize: '1.1rem'
              }}>PDF</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => (
              <tr 
                key={index}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  backgroundColor: hoveredRow === index ? '#f5f5f5' : 'white',
                  transition: 'background-color 0.2s ease',
                  borderBottom: '1px solid #e0e0e0',
                  cursor: 'pointer'
                }}
              >
                <td style={{
                  padding: '16px',
                  color: '#212529',
                  fontWeight: '500'
                }}>{item.course}</td>
                <td style={{
                  padding: '16px',
                  color: '#212529'
                }}>{item.unit}</td>
                <td style={{
                  padding: '16px',
                  color: '#212529'
                }}>{item.examType}</td>
                <td style={{
                  padding: '16px'
                }}>
                  <a
                    href={`/pdfs/${item.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1976d2',
                      textDecoration: 'none',
                      fontWeight: '500',
                      display: 'inline-block',
                      padding: '8px 16px',
                      backgroundColor: hoveredRow === index ? '#e3f2fd' : 'transparent',
                      borderRadius: '4px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default PdfTable;