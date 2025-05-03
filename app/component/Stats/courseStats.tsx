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
        onClick={() => router.push(course.path)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '300px',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backgroundColor: isHovered ? '#f5f5f5' : 'white',
          transform: isHovered ? 'translateY(-2px)' : 'none',
          margin: '0 2.5rem',
          textAlign: 'center',
        }}
      >
        {course.imageSrc && (
          <img 
            src={course.imageSrc}
            alt={course.title} 
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '230px',
              objectFit: 'contain',
              borderRadius: '8px',
              marginBottom: '15px',
              filter: isHovered ? 'brightness(90%)' : 'none',
            }} 
          />
        )}
        <h2 style={{ margin: 0, textAlign: 'center', fontSize: '25px' }}>{course.title}</h2>
      </div>
  );
};

function ShowCourse() {
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
    <div style={{
      padding: '40px 20px',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      marginLeft: '10rem',
      marginRight: '10rem'
    }}>
      <h1 style={{ 
        marginTop: '100px', 
        fontSize: '2.5rem',
        color: '#333'
      }}>
        Which course report would you like to view:
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: '2rem',
        marginLeft: '2rem'
      }}>
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default ShowCourse;