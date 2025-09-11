'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function IBstatisticsPage() {
  const router = useRouter();
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleUnitClick = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 3000);
  };

  const units = [
    { title: 'Probability' },
    { title: 'Statistics' },
    { title: 'Discrete Random Variables' },
    { title: 'Continuous Random Variables'  },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <h1 className="units-title">IB Statistics Units</h1>

      <style jsx>{`
        .units-title {
          margin-top: 100px;
          text-align: center;
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 40px;
          margin-right: 40vw;
        }

        @media (max-width: 768px) {
          .units-title {
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
        padding: '20px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          {units.map((unit, index) => (
            <div
              key={unit.title}
              onClick={handleUnitClick}
              onMouseEnter={() => setHoveredUnit(unit.title)}
              onMouseLeave={() => setHoveredUnit(null)}
              style={{
                backgroundColor: hoveredUnit === unit.title ? '#e9ecef' : 'white',
                border: '2px solid #dee2e6',
                borderRadius: '8px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hoveredUnit === unit.title ? 'translateX(10px)' : 'none',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}
              role="button"
              tabIndex={0}
            >
              <div style={{
                minWidth: '40px',
                minHeight: '40px',
                width: '40px',
                height: '40px',
                borderRadius: '6px',
                backgroundColor: '#37474f',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                {index + 1}
              </div>
              <h2 style={{
                margin: 0,
                color: '#212529',
                fontSize: '1.4rem',
                fontWeight: 500
              }}>
                {unit.title}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Coming Soon Notification */}
      {showComingSoon && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#ffffff',
          border: '2px solid #007bff',
          borderRadius: '12px',
          padding: '30px 40px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          zIndex: 1000,
          textAlign: 'center',
          minWidth: '300px',
          animation: 'fadeInOut 3s ease-in-out'
        }}>
          <div style={{
            fontSize: '2rem',
            marginBottom: '10px'
          }}>
            🚧
          </div>
          <h3 style={{
            margin: '0 0 10px 0',
            color: '#007bff',
            fontSize: '1.3rem',
            fontWeight: '600'
          }}>
            Coming Soon!
          </h3>
          <p style={{
            margin: 0,
            color: '#666',
            fontSize: '1rem'
          }}>
            This unit is under development
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          15% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          85% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
      `}</style>
    </div>
  );
}

export default IBstatisticsPage;