'use client';
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Course {
  id: string;
  title: string;
  imageSrc?: string;
  path: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`course-card ${isHovered ? 'hovered' : ''}`}
      onClick={() => router.push(course.path)}
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
          text-align: center
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
            margin: 0 auto;
          }
          .course-image {
            max-height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default function Chapters() {
  const courses: Course[] = [
    {
      id: 'IBcal',
      title: 'IB Calculus',
      path: '/unit/IBcalculus',
      imageSrc: '/calculus2.png'
    },
    {
      id: 'IBstat',
      title: 'IB Statistics',
      path: '/unit/IBstatistics',
      imageSrc: '/IBstat.png'
    },
    {
      id: 'calc1',
      title: 'Calculus I',
      path: '/unit/calculus1',
      imageSrc: '/limit.png'
    },
  ];

  return (
    <div className="chapters-container">
      <h1 className="chapters-title">Currently Available Courses:</h1>
      <div className="courses-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <style jsx>{`
        .chapters-container {
          padding: 40px 20px;
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          margin-left: 10rem;
          margin-right: 10rem;
          margin-top: 0rem
        }
        .chapters-title {
          margin-top: 6vw;
          font-size: 3vw;
          color: #333;
        }
        .courses-list {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          margin-top: 4vw;
          margin-left: 2vw;
          gap: 2vw;
        }
        @media (max-width: 768px) {
          .chapters-container {
            padding: 20px 10px;
            margin-left: 1rem;
            margin-right: 1rem;
            margin-top: 5rem
          }
          .chapters-title {
            margin-top: 20px;
            font-size: 2rem;
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