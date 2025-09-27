'use client';

import React from 'react';

interface PdfItem {
  course: string;
  unit: string;
  examType: string;
  filename: string;
}

interface PdfTableProps {
  List: PdfItem[];
}

const PdfTable: React.FC<PdfTableProps> = ({ List }) => {
  const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

  return (
    <div className="pdf-table-container">
      <h1 className="pdf-table-title">Exam PDFs</h1>

      <div className="table-wrapper">
        <table className="pdf-table">
          <thead>
            <tr className="table-header">
              <th className="table-header-cell">Course</th>
              <th className="table-header-cell">Unit</th>
              <th className="table-header-cell mobile-hidden">Exam Type</th>
              <th className="table-header-cell">PDF</th>
            </tr>
          </thead>
          <tbody>
            {List.map((item, index) => (
              <tr 
                key={index}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
                className={`table-row ${hoveredRow === index ? 'hovered' : ''}`}
              >
                <td className="table-cell course-cell">{item.course}</td>
                <td className="table-cell unit-cell">{item.unit}</td>
                <td className="table-cell mobile-hidden">{item.examType}</td>
                <td className="table-cell pdf-cell">
                  <a
                    href={`/pdfs/${item.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pdf-link ${hoveredRow === index ? 'hovered' : ''}`}
                  >
                    View PDF
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .pdf-table-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 40px 20px;
        }

        .pdf-table-title {
          margin-top: 100px;
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 40px;
        }

        .table-wrapper {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
          overflow-x: auto;
        }

        .pdf-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }

        .table-header {
          background-color: #37474f;
          color: white;
        }

        .table-header-cell {
          padding: 16px;
          text-align: left;
          font-weight: 500;
          font-size: 1.1rem;
          white-space: nowrap;
        }

        .table-row {
          background-color: white;
          transition: background-color 0.2s ease;
          border-bottom: 1px solid #e0e0e0;
          cursor: pointer;
        }

        .table-row.hovered {
          background-color: #f5f5f5;
        }

        .table-cell {
          padding: 16px;
          color: #212529;
        }

        .course-cell {
          font-weight: 500;
        }

        .unit-cell {
          max-width: 200px;
          word-wrap: break-word;
        }

        .pdf-cell {
          white-space: nowrap;
        }

        .pdf-link {
          color: #1976d2;
          text-decoration: none;
          font-weight: 500;
          display: inline-block;
          padding: 8px 16px;
          background-color: transparent;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .pdf-link.hovered {
          background-color: #e3f2fd;
        }

        .pdf-link:hover {
          background-color: #e3f2fd;
          transform: translateY(-1px);
        }

        .mobile-hidden {
          display: table-cell;
        }

        @media (max-width: 768px) {
          .pdf-table-title {
            font-size: 1.8rem;
            margin-top: 6rem;
            margin-bottom: 20px;
            text-align: left;
            margin-left: 2vw;
          }

          .pdf-table-container {
            padding: 20px 10px;
          }

          .table-wrapper {
            border-radius: 6px;
          }

          .table-header-cell {
            padding: 12px 8px;
            font-size: 1rem;
          }

          .table-cell {
            padding: 12px 8px;
            font-size: 0.9rem;
          }

          .mobile-hidden {
            display: none;
          }

          .unit-cell {
            max-width: 120px;
            font-size: 0.85rem;
          }

          .pdf-link {
            padding: 6px 12px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .pdf-table-container {
            padding: 15px 5px;
          }

          .table-header-cell {
            padding: 10px 6px;
            font-size: 0.9rem;
          }

          .table-cell {
            padding: 10px 6px;
            font-size: 0.8rem;
          }

          .unit-cell {
            max-width: 100px;
            font-size: 0.8rem;
          }

          .pdf-link {
            padding: 5px 10px;
            font-size: 0.8rem;
          }

          .course-cell {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PdfTable;