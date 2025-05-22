'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setTheme } from '../store/slices/themeSlice';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const toggleTheme = () => {
    const newTheme = mode === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <div className="flex items-center space-x-3">
      <span className="text-sm font-medium  ">
        <strong>Enable dark mode</strong>
      </span>
      <button
        aria-label="Toggle Dark Mode"
        onClick={toggleTheme}
        className={`relative inline-flex items-center h-8 w-16 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
          mode === 'dark' ? 'bg-gray-600' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            mode === 'dark' ? 'translate-x-8' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}