'use client';
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

interface Func {
  id: string;
  title: string;
  imageSrc?: string;
  path: string;
}

const FuncCard = ({ func }: { func: Func }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
  
    return (
      <div
        onClick={() => router.push(func.path)}
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
        {func.imageSrc && (
          <img 
            src={func.imageSrc}
            alt={func.title} 
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
        <h2 style={{ margin: 0, textAlign: 'center', fontSize: '25px' }}>{func.title}</h2>
      </div>
    );
  };

function AllFunc() {
    const funcs: Func[]=[
        {
            id: 'Stats',
            title: 'Statistics',
            path: '/profile/statistics',
            imageSrc: '/stat.png'
        },
        {
            id: 'Books',
            title: 'Bookmarks',
            path: '/profile/bookmarks',
            imageSrc: '/bookmark.png'
        },
        {
            id: 'Aboutus',
            title: 'About Us',
            path: '/profile/aboutus',
            imageSrc: '/aboutus.png'
        },
    ]

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
            Welcome Warrior!
          </h1>
          
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: '4rem',
            marginLeft: '0rem'
          }}>
            {funcs.map((func) => (
              <FuncCard key={func.id} func={func} />
            ))}
          </div>
        </div>
      );
}

export default AllFunc;