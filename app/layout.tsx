'use client';
import 'bootstrap/dist/css/bootstrap.css';
import 'katex/dist/katex.min.css';
import NavBar from './component/NavBar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <NavBar/>
        <div
        >
          {children}
        </div>
      </body>
    </html>
  );
}
