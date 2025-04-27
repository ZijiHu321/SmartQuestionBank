'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function Calculus1Page() {
  const router = useRouter();
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  const units = [
    { title: 'Limits and Continuity', path: '/unit/calculus1/LimitsandContinuity' },
    { title: 'Finding Derivative Functions', path: '/unit/calculus1/FindingDerivative' },
    { title: 'Properties of Curves', path: '/unit/calculus1/PropertiesOfCurves' },
    { title: 'Application of Derivatives', path: '/unit/calculus1/ApplicationofDerivatives' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <h1 style={{ 
        marginTop: '100px', 
        fontSize: '2.5rem',
        color: '#333',
        marginBottom: '40px',
        marginRight: '40rem'
      }}>
        Calculus I Units:
      </h1>

      <div style={{
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
      }}>
        {units.map((unit) => (
          <div
            key={unit.path}
            onClick={() => router.push(unit.path)}
            onMouseEnter={() => setHoveredUnit(unit.path)}
            onMouseLeave={() => setHoveredUnit(null)}
            style={{
              backgroundColor: hoveredUnit === unit.path ? '#e9ecef' : 'white',
              border: '2px solid #dee2e6',
              borderRadius: '8px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: hoveredUnit === unit.path ? 'translateX(10px)' : 'none',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
            role="button"
            tabIndex={0}
          >
            <div style={{
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
              {units.indexOf(unit) + 1}
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
  );
}

export default Calculus1Page;