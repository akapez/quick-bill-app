'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '../../ui/Button';

export default function ToggleTheme() {
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else setTheme('dark');
  };

  return (
    <div>
      <Button variant="outline" size="icon" onClick={handleTheme}>
        {theme === 'light' ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
