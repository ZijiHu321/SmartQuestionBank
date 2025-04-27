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
        margin: '15px 0',
        textAlign: 'center'
      }}
    >
      {course.imageSrc && (
        <img 
          src={course.imageSrc}
          alt={course.title} 
          style={{
            width: '250px',
            height: '230px',
            objectFit: 'cover',
            borderRadius: '8px',
            marginBottom: '15px',
            filter: isHovered ? 'brightness(90%)' : 'none'
          }} 
        />
      )}
      <h2 style={{ margin: 0, textAlign: 'center', fontSize: '25px' }}>{course.title}</h2>
    </div>
  );
};

export default function Chapters() {
  const courses: Course[] = [
    {
      id: 'calc1',
      title: 'Calculus I',
      path: '/unit/calculus1',
      imageSrc: '/limit.png'
    },
  ];

  return (
    <div style={{
      padding: '40px 20px',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      marginLeft: '15rem'
    }}>
      <h1 style={{ 
        marginTop: '100px', 
        fontSize: '2.5rem',
        color: '#333'
      }}>
        Currently Available Courses:
      </h1>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
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