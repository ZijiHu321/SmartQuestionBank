import React from 'react';

interface DifficultyProps {
  difficulty: number; // Value between 0-10
  className?: string;
}

const Difficulty: React.FC<DifficultyProps> = ({ difficulty, className }) => {
  // Clamp value between 0-10
  const clampedDifficulty = Math.min(10, Math.max(0, difficulty));
  const percentage = (clampedDifficulty / 10) * 100;
  
  // Calculate color gradient from green (0) to red (10)
  const hue = 120 - (clampedDifficulty * 12); // 120 is green, 0 is red in HSL
  const barColor = `hsl(${hue}, 100%, 40%)`;

  return (
    <div className={className} style={{ width: '80px' }}>
      {/* Difficulty bar container */}
      <div style={{
        position: 'relative',
        height: '8px',
        borderRadius: '4px',
        backgroundColor: '#e0e0e0',
        overflow: 'hidden'
      }}>
        {/* Colored difficulty bar */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${percentage}%`,
            backgroundColor: barColor,
            borderRadius: '4px',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      {/* Difficulty text */}
      <div style={{ 
        marginTop: '4px',
        fontSize: '0.9rem',
        color: barColor,
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <span>Difficulty:&nbsp; </span>
        <span>{clampedDifficulty}/10</span>
      </div>
    </div>
  );
};

export default Difficulty;