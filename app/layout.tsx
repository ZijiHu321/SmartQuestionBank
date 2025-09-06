'use client';
import 'bootstrap/dist/css/bootstrap.css';
import 'katex/dist/katex.min.css';
import NavBar from './component/NavBar';
import { ReactNode } from 'react';
import React, { useState, useEffect } from "react";
import './globals.css';


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <html lang="en">
      <body>
        <NavBar onHeightChange={setNavHeight} />
        <div
          style={{
            paddingTop: `${navHeight}px`,
            transition: "padding-top 0.3s ease-in-out", // must be a string
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}

