'use client';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  imageSrc?: string;
  path: string;
}

const CourseCard = ({ course, onClick }: { course: Course; onClick: (course: Course) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''}`}
      onClick={() => onClick(course)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {course.imageSrc && (
        <img 
          src={course.imageSrc}
          alt={course.title} 
          className="course-image"
        />
      )}
      <h2 className="course-title">{course.title}</h2>
      <style jsx>{`
        .course-card {
          width: 300px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: white;
          margin: 0 2.5rem;
          text-align: center;
        }
        .course-card.hovered {
          background-color: #f5f5f5;
          transform: translateY(-2px);
        }
        .course-image {
          width: 100%;
          height: auto;
          max-height: 230px;
          object-fit: contain;
          border-radius: 8px;
          margin-bottom: 15px;
          transition: filter 0.3s ease;
        }
        .course-card.hovered .course-image {
          filter: brightness(90%);
        }
        .course-title {
          margin: 0;
          text-align: center;
          font-size: 25px;
        }
        @media (max-width: 768px) {
          .course-card {
            width: 100%;
            max-width: 300px;
            margin: 0 auto 20px;
          }
          .course-image {
            max-height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default function ShowCourse() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleCourseClick = (course: Course) => {
    if (course.id === 'IBstat') {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 3000);
    } else {
      // Navigate to other courses normally
      window.location.href = course.path;
    }
  };

  const courses: Course[] = [
    {
      id: 'IBcal',
      title: 'IB Calculus',
      path: '/profile/statistics/IBcalculus',
      imageSrc: '/calculus2.png'
    },
    {
      id: 'IBstat',
      title: 'IB Statistics',
      path: '/profile/statistics/IBstatistics',
      imageSrc: '/IBstat.png'
    },
    {
      id: 'calc1',
      title: 'Calculus I',
      path: '/profile/statistics/calculus1',
      imageSrc: '/limit.png'
    },
  ];

  return (
    <div className="stats-container">
      <h1 className="stats-title">Which course report would you like to view:</h1>
      <div className="courses-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
        ))}
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
            IB Statistics reports are under development
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
        .stats-container {
          padding: 40px 20px;
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          margin-left: 10rem;
          margin-right: 10rem;
        }
        .stats-title {
          margin-top: 6vw;
          font-size: 2.5rem;
          color: #333;
        }
        .courses-list {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          margin-top: 2rem;
          margin-left: 2rem;
          gap: 2vw;
        }
        @media (max-width: 768px) {
          .stats-container {
            padding: 20px 10px;
            margin-left: 1rem;
            margin-right: 1rem;
            margin-top: 4rem
          }
          .stats-title {
            margin-top: 20px;
            font-size: 2rem;
            text-align: left;
          }
          .courses-list {
            flex-direction: column;
            align-items: center;
            margin-left: 0;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}