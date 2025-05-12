'use client';
import 'bootstrap/dist/css/bootstrap.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
      className={`func-card ${isHovered ? 'hovered' : ''}`}
      onClick={() => router.push(func.path)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {func.imageSrc && (
        <img 
          src={func.imageSrc}
          alt={func.title} 
          className="func-image"
        />
      )}
      <h2 className="func-title">{func.title}</h2>
      <style jsx>{`
        .func-card {
          width: 300px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: white;
          margin: 0 3rem;
          text-align: center;
        }
        .func-card.hovered {
          background-color: #f5f5f5;
          transform: translateY(-2px);
        }
        .func-image {
          width: 100%;
          height: auto;
          max-height: 230px;
          object-fit: contain;
          border-radius: 8px;
          margin-bottom: 15px;
          transition: filter 0.3s ease;
        }
        .func-card.hovered .func-image {
          filter: brightness(90%);
        }
        .func-title {
          margin: 0;
          text-align: center;
          font-size: 25px;
        }
        @media (max-width: 768px) {
          .func-card {
            width: 100%;
            max-width: 300px;
            margin: 0 auto 20px;
          }
          .func-image {
            max-height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default function AllFunc() {
  const funcs: Func[] = [
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
  ];

  return (
    <div className="profile-container">
      <h1 className="profile-title">Welcome Warrior!</h1>
      <div className="funcs-list">
        {funcs.map((func) => (
          <FuncCard key={func.id} func={func} />
        ))}
      </div>
      <style jsx>{`
        .profile-container {
          padding: 40px 20px;
          min-height: 100vh;
          max-width: 1200px;
          margin: 0 auto;
          margin-left: 10rem;
          margin-right: 10rem;
        }
        .profile-title {
          margin-top: 6vw;
          font-size: 2.5rem;
          color: #333;
        }
        .funcs-list {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          margin-top: 4vw;
          margin-left: 0;
          gap: 2vw;
        }
        @media (max-width: 768px) {
          .profile-container {
            padding: 20px 10px;
            margin-left: 1rem;
            margin-right: 1rem;
            margin-top: 4rem
          }
          .profile-title {
            margin-top: 20px;
            font-size: 2rem;
          }
          .funcs-list {
            flex-direction: column;
            align-items: center;
            margin-top: 2rem;
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}