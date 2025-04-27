'use client';
import 'bootstrap/dist/css/bootstrap.css';
import 'katex/dist/katex.min.css';
import NavBar from './component/NavBar';
import { ReactNode } from 'react';
import './globals.css';


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <div style={{ width: '100%' }}>
          {children}
        </div>
      </body>
    </html>
  );
}