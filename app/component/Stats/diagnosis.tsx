'use client';
import { useEffect, useState } from 'react';
import calculatePerformanceIndex from './performance';

type PerformanceLevel = {
  level: string;
  color: string;
};

const interpolateColor = (color1: string, color2: string, ratio: number): string => {
  const r1 = parseInt(color1.substring(1, 3), 16);
  const g1 = parseInt(color1.substring(3, 5), 16);
  const b1 = parseInt(color1.substring(5, 7), 16);
  
  const r2 = parseInt(color2.substring(1, 3), 16);
  const g2 = parseInt(color2.substring(3, 5), 16);
  const b2 = parseInt(color2.substring(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

const getColorAtPercentage = (percentage: number): string => {
  if (percentage <= 50) return interpolateColor('#EF4444', '#F59E0B', percentage / 50);
  return interpolateColor('#F59E0B', '#10B981', (percentage - 50) / 50);
};

const getPerformanceLevel = (pi: number): PerformanceLevel => {
  if (pi >= 80) return { level: "very strong", color: "#10B981" };
  if (pi >= 70) return { level: "strong", color: "#3B82F6" };
  if (pi >= 50) return { level: "average", color: "#F59E0B" };
  if (pi >= 30) return { level: "weak", color: "#EF4444" };
  return { level: "very weak", color: "#DC2626" };
};

const Diagnosis = ({ courseName }: { courseName: string }) => {
  const [performanceIndex, setPerformanceIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loadPerformance = async () => {
      try {
        const pi: number = await calculatePerformanceIndex(courseName);
        setPerformanceIndex(pi);
      } catch (error) {
        console.error('Error calculating performance:', error);
        setPerformanceIndex(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadPerformance();
  }, [courseName]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50" >
      <div style={{ width: '1300px' }}>
        <div className="card shadow-sm h-100 border-0 mx-auto" style={{ width: '100%', marginTop:'-4rem' }}>
          <div className="card-header bg-secondary text-white rounded-top">
            <h3 className="mb-0 font-medium ps-3">Performance Index</h3>
          </div>
          <div className="card-body bg-white rounded-bottom d-flex flex-column align-items-center">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center flex-grow-1" style={{ minHeight: '200px' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : performanceIndex !== null ? (
              <>
                <div className="mb-4" style={{ 
                  position: 'relative', 
                  height: '30px', 
                  width: '100%',
                  maxWidth: '1000px',
                  margin: '0 auto'
                }}>
                  <div className="rounded-pill" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 50%, #10B981 100%)',
                    opacity: 0.1
                  }} />
                  <div className="rounded-pill" style={{
                    position: 'absolute',
                    width: `${performanceIndex}%`,
                    height: '100%',
                    background: performanceIndex <= 50 
                      ? `linear-gradient(90deg, #EF4444 0%, ${getColorAtPercentage(performanceIndex)} 100%)`
                      : `linear-gradient(90deg, #EF4444 0%, #F59E0B ${(50 / performanceIndex) * 100}%, ${getColorAtPercentage(performanceIndex)} 100%)`,
                    transition: 'width 0.5s ease, background 0.5s ease',
                    boxShadow: `0 0 8px ${getColorAtPercentage(performanceIndex)}33`
                  }}>
                    <div className="h-100 rounded-pill" style={{
                      position: 'absolute',
                      right: 0,
                      width: '4px',
                      backgroundColor: getColorAtPercentage(performanceIndex),
                      boxShadow: `0 0 8px ${getColorAtPercentage(performanceIndex)}`
                    }} />
                  </div>
                  <div className="position-absolute top-50 start-0 translate-middle-y ms-3 fw-bold" 
                    style={{ color: 'white' }}>
                    {Math.round(performanceIndex)}%
                  </div>
                </div>

                <div className="text-center mt-4 position-relative">
                  <h4 className="mb-2" style={{ fontWeight: 500 }}>
                    Scientific Diagnosis:
                    <span className="ms-2 cursor-help"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      onMouseMove={handleMouseMove}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                      </svg>
                    </span>
                  </h4>
                  {showTooltip && (
                    <div className="position-fixed bg-dark text-white p-2 rounded" style={{
                      left: `${tooltipPosition.x}px`,
                      top: `${tooltipPosition.y}px`,
                      zIndex: 1000,
                      fontSize: '0.8rem',
                      width: '240px'
                    }}>
                      Scientific diagnosis evaluates your course mastery using your practice performance. 
                      It considers question difficulty accuracy and practice volume. Results are estimates 
                      and should be used as guidance only.
                    </div>
                  )}
                  <div className="d-inline-block px-4 py-2 rounded-pill" style={{
                    backgroundColor: `${getColorAtPercentage(performanceIndex)}10`,
                    border: `1px solid ${getColorAtPercentage(performanceIndex)}`,
                    color: getColorAtPercentage(performanceIndex)
                  }}>
                    You are <strong>{getPerformanceLevel(performanceIndex).level}</strong> at this course
                  </div>
                  <div style={{color:'white'}}>
                     .
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;