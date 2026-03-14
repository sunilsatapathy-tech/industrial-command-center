'use client';

import { useEffect, useState } from 'react';

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('icc-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldEnable = savedTheme ? savedTheme === 'dark' : prefersDark;

    setDarkMode(shouldEnable);
    document.documentElement.dataset.theme = shouldEnable ? 'dark' : 'light';
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('icc-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <button
      type="button"
      onClick={() => setDarkMode((value) => !value)}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--panel)] text-[var(--text)] transition hover:border-[var(--accent)]"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2.2" />
          <path d="M12 19.3v2.2" />
          <path d="M4.9 4.9l1.6 1.6" />
          <path d="M17.5 17.5l1.6 1.6" />
          <path d="M2.5 12h2.2" />
          <path d="M19.3 12h2.2" />
          <path d="M4.9 19.1l1.6-1.6" />
          <path d="M17.5 6.5l1.6-1.6" />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M21 12.8A9 9 0 0 1 11.2 3a.75.75 0 0 0-.9-.9A10 10 0 1 0 21.9 13.7a.75.75 0 0 0-.9-.9Z" />
        </svg>
      )}
    </button>
  );
}
