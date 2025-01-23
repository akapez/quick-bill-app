'use client';

import { CircleAlert, CircleCheck, CircleX } from 'lucide-react';
import { Toaster } from 'sonner';

export const ToasterProvider = () => {
  return (
    <Toaster
      icons={{
        success: <CircleCheck color="#16C47F" />,
        warning: <CircleAlert color="#FCC737" />,
        error: <CircleX color="#FF2929" />,
      }}
    />
  );
};
