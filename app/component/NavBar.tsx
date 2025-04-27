'use client';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavBar() {
  const pathname = usePathname();
  const [isNavHidden, setIsNavHidden] = useState(false);

  const toggleNav = () => {
    setIsNavHidden(!isNavHidden);
  };

  return (
    <>
      <nav 
        className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" 
        style={{ 
          borderBottom: '3px solid #e0e0e0',
          transform: isNavHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease-in-out',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1000
        }}
      >
        <div className="container-fluid">
          {/* Brand/Logo */}
          <a className="navbar-brand fw-bold" style={{ 
            color: '#333', 
            fontSize: '2rem',
            marginBottom: '0.5rem',
            marginTop: '0rem',
            marginLeft: '2rem'
          }}>
            SmartQB
          </a>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links - Left aligned */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item mx-2">
                <Link 
                  href="/unit" 
                  className={`nav-link ${pathname === '/unit' ? 'active' : ''}`}
                  style={{
                    fontSize: '1.5rem',
                    color: pathname === '/unit' ? '#000' : '#333',
                    transition: 'all 0.3s ease',
                    marginLeft: '3rem'
                  }}
                >
                  Chapters
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link 
                  href="/mockexam" 
                  className={`nav-link ${pathname === '/mockexam' ? 'active' : ''}`}
                  style={{
                    fontSize: '1.5rem',
                    color: pathname === '/mockexam' ? '#000' : '#333',
                    transition: 'all 0.3s ease',
                    marginLeft: '1.5rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Mock Exam
                </Link>
              </li>

              <li className="nav-item mx-2">
                <Link 
                  href="/link" 
                  className={`nav-link ${pathname === '/link' ? 'active' : ''}`}
                  style={{
                    fontSize: '1.5rem',
                    color: pathname === '/link' ? '#000' : '#333',
                    transition: 'all 0.3s ease',
                    marginLeft: '1.5rem',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Random Question
                </Link>
              </li>

              <li className="nav-item" style={{ marginLeft: 'auto' }}>
                <Link 
                  href="/profile" 
                  className={`nav-link ${pathname === '/profile' ? 'active' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    marginLeft: '44rem',
                    marginTop: '0.3rem'
                  }}
                >
                  <img 
                    src="/profile-user.png"
                    alt="Profile" 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: pathname === '/profile' ? '2px solid #000' : '2px solid transparent',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </Link>
              </li>

            </ul>
          </div>
        </div>

        {/* Custom CSS */}
        <style>{`
          .navbar-nav .nav-link {
            position: relative;
            padding: 0.8rem 1.2rem;
            border-radius: 4px;
          }
          
          .navbar-nav .nav-link:hover {
            background-color: rgba(0, 0, 0, 0.08) !important;
            color: #000 !important;
          }
          
          .navbar-nav .nav-link.active {
            background-color: rgba(0, 0, 0, 0.1);
          }
          
          .nav-item:hover {
            transform: translateY(-1px);
            transition: transform 0.2s ease;
          }
        `}</style>
      </nav>

      {/* Toggle Button */}
      <button 
        onClick={toggleNav}
        style={{
          position: 'fixed',
          top: isNavHidden ? '0' : '22px',
          right: '20px',
          zIndex: 1001,
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
        aria-label={isNavHidden ? 'Show navigation' : 'Hide navigation'}
      >
        {isNavHidden ? 'Show' : 'Hide'}
      </button>
    </>
  );
}

export default NavBar;