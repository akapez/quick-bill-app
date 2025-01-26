'use client';

import { useTheme } from 'next-themes';

import { Button } from '../../ui/Button';
import { MoonIcon } from './icons/moon.icon';
import { SunIcon } from './icons/sun.icon';

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  return (
    <Button variant="outline" size="icon" onClick={handleTheme}>
      {theme === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
