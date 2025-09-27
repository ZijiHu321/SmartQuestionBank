'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function NavBar() {
  const pathname = usePathname();
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  const toggleNav = () => setIsNavHidden(!isNavHidden);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close menu on pathname change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Measure nav height and update on resize
  useEffect(() => {
  const updateNavHeight = () => {
    if (typeof window !== 'undefined') {
      const nav = document.querySelector('nav');
      if (nav) setNavHeight(nav.offsetHeight);
    }
  };

  updateNavHeight();
  window.addEventListener('resize', updateNavHeight);
  return () => window.removeEventListener('resize', updateNavHeight);
}, []); // Empty dependency array

  return (
    <>
      <nav
        style={{
          borderBottom: '3px solid #e0e0e0',
          transform: isNavHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.3s ease-in-out',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 2rem',
            width: '100%',
            maxWidth: '100%',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Brand */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className="brand" style={{ cursor: 'pointer' }}>SmartQB</div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            style={{
              background: 'transparent',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '0.5rem',
            }}
            className="mobile-menu-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          {/* Navigation Links */}
          <div className={`menu-container ${isMenuOpen ? 'open' : ''}`}>
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                margin: 0,
                padding: 0,
                alignItems: 'center',
                marginLeft: 'clamp(1rem, 5vw, 5rem)',
                flexWrap: 'wrap',
                gap: 'clamp(0.5rem, 2vw, 1rem)',
              }}
            >
              {['/unit', '/mockexam', '/link'].map((path) => (
                <li key={path} style={{ margin: '0 0vw' }}>
                  <Link
                    href={path}
                    style={{
                      fontSize: 'clamp(0.9rem, 3vw, 1.5rem)',
                      color: pathname === path ? '#000' : '#333',
                      transition: 'all 0.3s ease',
                      padding: 'clamp(0.5rem, 1vw, 0.8rem) clamp(0.8rem, 2vw, 1.2rem)',
                      borderRadius: '4px',
                      position: 'relative',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      backgroundColor: pathname === path ? 'rgba(0,0,0,0.1)' : 'transparent',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = pathname === path ? 'rgba(0,0,0,0.1)' : 'transparent')
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {path === '/unit' && 'Chapters'}
                    {path === '/mockexam' && 'Mock Exam'}
                    {path === '/link' && 'Random Question'}
                  </Link>
                </li>
              ))}

              {/* Profile Link */}
              <li style={{ marginLeft: 'auto', paddingRight: 'clamp(0.33rem, 1.67vw, 1rem)' }}>
                <Link
                  href="/profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem 1rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  className="profile-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    src="/profile-user.png"
                    alt="Profile"
                    style={{
                      width: 'clamp(30px, 3vw, 50px)',
                      height: 'clamp(30px, 3vw, 50px)',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: pathname === '/profile' ? '2px solid #000' : '2px solid transparent',
                    }}
                  />
                  <span className="profile-label">Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <style jsx>{`
          .brand {
            color: #333;
            font-size: 2.5vw;
            font-weight: 700;
            margin: 0.5rem 0 0.5rem 2rem;
            margin-bottom: 1rem;
          }

          .mobile-menu-button {
            display: none;
          }

          .menu-container {
            flex-grow: 1;
          }

          .profile-label {
            display: none;
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
              zIndex: 999;
            }

            .menu-container.open {
              display: block;
            }

            .menu-container ul {
              flex-direction: column;
              alignItems: flex-start;
              width: 100%;
            }

            .menu-container li {
              margin: 0.5rem 0 !important;
              width: 100%;
            }

            .menu-container a {
              font-size: 1.2rem;
              padding: 0.75rem 1rem;
              width: 100%;
              text-align: left;
              display: block;
            }

            .brand {
              font-size: 2rem;
              margin-left: 1rem;
            }

            .profile-link {
              display: flex;
              alignItems: center;
              width: 100%;
            }

            .profile-label {
              display: inline;
              margin-left: 0.5rem;
              font-size: 1rem;
              color: #333;
            }
          }
        `}</style>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={toggleNav}
        style={{
          position: 'fixed',
          top: isNavHidden ? '0' : `${navHeight}px`,
          right: '1rem',
          zIndex: 1001,
          padding: '0.35rem 0.7rem',
          backgroundColor: 'rgba(248, 249, 250, 0.9)',
          border: '1px solid rgba(222, 226, 230, 0.7)',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          fontSize: '0.8rem',
          fontWeight: '500',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        {isNavHidden ? '▼ Show Nav' : '▲ Hide Nav'}
      </button>
    </>
  );
}

export default NavBar;