'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadTheme } from '../store/slices/themeSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function ThemeLoader() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return null;
}
