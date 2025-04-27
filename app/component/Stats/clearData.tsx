'use client';

import { useState } from 'react';

interface ClearAllDataProps {
  onClear: () => void;
}

const ClearAllData = ({ onClear }: ClearAllDataProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfirmHovered, setIsConfirmHovered] = useState(false);

  const handleClear = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    // Clear all localStorage except Bookmarks
    const bookmarks = localStorage.getItem('Bookmarks');
    localStorage.clear();
    if (bookmarks) {
      localStorage.setItem('Bookmarks', bookmarks);
    }
    setShowConfirm(false);
    onClear();
  };

  return (
    <div style={{ 
      position: 'relative',
      margin: '-3rem 0 6rem 10rem',
      width: 'fit-content'
    }}>
      <button
        onClick={handleClear}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundColor: isHovered ? '#c62828' : '#d32f2f', // Red color scheme
          color: 'white',
          padding: '0.8rem 1rem',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.25rem',
          transition: 'all 0.2s ease',
        }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M3 6h18"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          <path d="M10 11v6"/>
          <path d="M14 11v6"/>
        </svg>
        Clear All Data
      </button>

      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'left',
            maxWidth: '400px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '20px' }}>
              Are you sure to clear all question data? This step is not reversible.
            </h3>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setShowConfirm(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: '#f0f0f0',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmClear}
                onMouseEnter={() => setIsConfirmHovered(true)}
                onMouseLeave={() => setIsConfirmHovered(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  backgroundColor: isConfirmHovered ? '#c62828' : '#d32f2f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClearAllData;