'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@components/ui/Alert';

interface ErrorMessageProps {
  title: string;
  description: string;
  variant: 'default' | 'destructive';
}

export default function ErrorMessage({
  title,
  description,
  variant,
}: ErrorMessageProps) {
  return (
    <Alert variant={variant} className="w-full max-w-6xl">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
