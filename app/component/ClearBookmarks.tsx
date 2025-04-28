'use client';

import { useState, useEffect } from 'react';

interface ClearBookmarksProps {
  onClear: () => void; // Required callback to update parent state
}

const ClearBookmarks = ({ onClear }: ClearBookmarksProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isConfirmHovered, setIsConfirmHovered] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Load audio only after component mounts (client-side)
    setAudio(new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YUAAAAA...'));
    return () => audio?.pause();
  }, []);

  const handleClear = () => {
    audio?.play().catch(() => { /* Handle audio error silently */ });
    setShowConfirm(true);
  };

  const confirmClear = () => {
    localStorage.setItem('Bookmarks', '[]');
    setShowConfirm(false);
    onClear(); // Update parent state instead of refreshing
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
          backgroundColor: isHovered ? '#45a049' : '#4CAF50',
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
        {/* SVG icon */}
        Clear All Bookmarks
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
              Are you sure to clear all bookmarks? This step is not reversible.
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
                  backgroundColor: isConfirmHovered ? '#ff3333' : '#ff4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Yes, I&#39;m sure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClearBookmarks;