'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function IBcalculusPage() {
  const router = useRouter();
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  const units = [
    { title: 'Limits', path: '/unit/IBcalculus/Limits' },
    { title: 'Finding Derivative Functions', path: '/unit/IBcalculus/Derivative' },
    { title: 'Properties of Curves', path: '/unit/IBcalculus/PropertiesOfCurves' },
    { title: 'Application of Derivatives', path: '/unit/IBcalculus/ApplicationofDerivatives' },
    { title: 'Integral', path: '/unit/IBcalculus/Integral' },
    { title: 'Kinematics', path: '/unit/IBcalculus/Kinematics' },
    { title: 'Taylor Series', path: '/unit/IBcalculus/TaylorSeries' },
    { title: 'Differential Equations', path: '/unit/IBcalculus/DifferentialEquations' },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px'
    }}>
      <h1 className="units-title">IB Calculus Units</h1>

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
    </div>
  );
}

export default IBcalculusPage;