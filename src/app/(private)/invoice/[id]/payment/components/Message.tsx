'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert';

interface MessageProps {
  title: string;
  description: string;
  variant: 'default' | 'destructive';
}

export default function Message({ title, description, variant }: MessageProps) {
  return (
    <Alert variant={variant} className="w-full max-w-6xl">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
