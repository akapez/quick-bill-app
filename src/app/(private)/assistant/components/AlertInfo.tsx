'use client';

import { Alert, AlertDescription } from '@components/ui/Alert';

interface AlertInfoProps {
  title: string;
  children?: React.ReactNode;
}

export default function AlertInfo({ title, children }: AlertInfoProps) {
  return (
    <Alert className="w-full max-w-6xl">
      <AlertDescription className="flex flex-row items-center justify-between space-x-3">
        {title}
        {children}
      </AlertDescription>
    </Alert>
  );
}
