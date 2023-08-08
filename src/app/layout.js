"use client"
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hello ',
  description: 'Developers',
}

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    const isDark = localStorage.getItem('dark') === 'true';
    if (isDark) {
      setTheme('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const isDark = theme === 'dark';
    if (isDark) {
      setTheme('');
      localStorage.setItem('dark', 'false');
    } else {
      setTheme('dark');
      localStorage.setItem('dark', 'true');
    }
  };
  return (
    <html lang="en">

      <body className={inter.className}>
        <div className={theme}>
          <button className="fixed top-4 right-4 p-2 rounded-full bg-blue-500" onClick={toggleDarkMode}>
            {theme === 'dark'?'🌙':'☀️'}
          </button>
          {children}
        </div>
      </body>
    </html>
  )
}
