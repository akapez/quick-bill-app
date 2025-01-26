'use client';

import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

export const ToasterProvider = () => {
  const { theme } = useTheme();
  const toasterTheme =
    theme === 'system' || theme === 'light' || theme === 'dark'
      ? theme
      : 'system';
  return (
    <Toaster
      theme={toasterTheme}
      icons={{
        success: <CircleCheck color="#16C47F" />,
        warning: <CircleAlert color="#FCC737" />,
        error: <CircleX color="#FF2929" />,
      }}
    />
  );
};
