'use client';

import React, { useState } from 'react';
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
        className={`fixed top-0 w-full z-50 bg-white shadow-md transition-transform duration-300 ${
          isNavHidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Brand/Logo */}
          <a
            className="text-2xl font-bold text-gray-800"
            style={{ marginLeft: '2rem' }}
          >
            SmartQB
          </a>

          {/* Mobile Toggle Button */}
          <button
            className="lg:hidden text-gray-800 focus:outline-none"
            onClick={toggleNav}
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`lg:flex lg:items-center lg:space-x-6 ${
              isNavHidden ? 'hidden' : ''
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-6">
              <li>
                <Link
                  href="/unit"
                  className={`block px-4 py-2 text-lg ${
                    pathname === '/unit'
                      ? 'text-black font-semibold'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Chapters
                </Link>
              </li>
              <li>
                <Link
                  href="/mockexam"
                  className={`block px-4 py-2 text-lg ${
                    pathname === '/mockexam'
                      ? 'text-black font-semibold'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Mock Exam
                </Link>
              </li>
              <li>
                <Link
                  href="/link"
                  className={`block px-4 py-2 text-lg ${
                    pathname === '/link'
                      ? 'text-black font-semibold'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Random Question
                </Link>
              </li>
            </ul>

            {/* Profile Link */}
            <Link
              href="/profile"
              className={`block px-4 py-2 text-lg flex items-center ${
                pathname === '/profile'
                  ? 'text-black font-semibold'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <img
                src="/profile-user.png"
                alt="Profile"
                className={`w-10 h-10 rounded-full border-2 ${
                  pathname === '/profile'
                    ? 'border-black'
                    : 'border-transparent'
                }`}
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Toggle Button */}
      <button
        onClick={toggleNav}
        className="fixed top-4 right-4 z-50 bg-gray-100 border border-gray-300 rounded-md px-4 py-2 shadow-md text-gray-800 hover:bg-gray-200 transition-all"
        aria-label={isNavHidden ? 'Show navigation' : 'Hide navigation'}
      >
        {isNavHidden ? 'Show' : 'Hide'}
      </button>
    </>
  );
}

export default NavBar;