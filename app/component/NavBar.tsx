'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavBar() {
  const pathname = usePathname();
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleNav = () => setIsNavHidden(!isNavHidden);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <nav style={{ 
        borderBottom: '3px solid #e0e0e0',
        transform: isNavHidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s ease-in-out',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 1000,
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem',
          width: '100%',
          maxWidth: '100%',
          margin: '0 auto'
        }}>
          {/* Brand */}
          <div style={{ 
            color: '#333',
            fontSize: '2.5rem',
            fontWeight: '700',
            margin: '0.5rem 0 0.5rem 2rem',
            marginBottom: '1rem'
          }}>SmartQB</div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            style={{
              display: 'none',
              background: 'transparent',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '0.5rem'
            }}
            className="mobile-menu-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>

          {/* Navigation Links */}
          <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              alignItems: 'center',
              marginLeft: '5rem'
            }}>
              {['/unit', '/mockexam', '/link'].map((path) => (
                <li key={path} style={{ margin: '0 0.5rem' }}>
                  <Link
                    href={path}
                    style={{
                      fontSize: '1.5rem',
                      color: pathname === path ? '#000' : '#333',
                      transition: 'all 0.3s ease',
                      padding: '0.8rem 1.2rem',
                      borderRadius: '4px',
                      position: 'relative',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      backgroundColor: pathname === path ? 'rgba(0,0,0,0.1)' : 'transparent'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = pathname === path ? 'rgba(0,0,0,0.1)' : 'transparent'}
                  >
                    {path === '/unit' && 'Chapters'}
                    {path === '/mockexam' && 'Mock Exam'}
                    {path === '/link' && 'Random Question'}
                  </Link>
                </li>
              ))}

              {/* Profile Link */}
              <li style={{ position: 'fixed', right: '200px', marginTop: '0.3rem' }}>
                <Link
                  href="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
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
                      border: pathname === '/profile' ? '2px solid #000' : '2px solid transparent'
                    }}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .mobile-menu-button {
            display: none;
          }

          .menu-container {
            flex-grow: 1;
          }

          @media (max-width: 991px) {
            .mobile-menu-button {
              display: block;
            }

            .menu-container {
              display: none;
              position: absolute;
              top: 100%;
              left: 0;
              right: 0;
              background: white;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              padding: 1rem;
            }

            .menu-container.open {
              display: block;
            }

            .menu-container ul {
              flex-direction: column;
              align-items: flex-start;
            }

            .menu-container li {
              margin: 0.5rem 0 !important;
            }

            .menu-container li:last-child {
              margin-left: 0 !important;
              margin-top: 1rem;
            }
          }
        `}</style>
      </nav>

      {/* Toggle Button */}
      <button 
        onClick={toggleNav}
        style={{
          position: 'fixed',
          top: isNavHidden ? '0' : '22px',
          right: '50px',
          zIndex: 1001,
          padding: '8px 16px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {isNavHidden ? 'Show' : 'Hide'}
      </button>
    </>
  );
}

export default NavBar;