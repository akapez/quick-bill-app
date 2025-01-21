'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { newVerification } from '@actions/new-verification';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';

import { Button } from '@components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';
import { Separator } from '@components/ui/Separator';

const Verification = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<{
    type: 'loading' | 'success' | 'error';
    message: string | undefined;
  }>({ type: 'loading', message: 'Verifying your email...' });

  const verifyEmail = useCallback(() => {
    if (!token) {
      setStatus({ type: 'error', message: 'Token not found.' });
      return;
    }
    newVerification(token)
      .then((data) => {
        if (data.error) {
          setStatus({ type: 'error', message: data.error });
        } else {
          setStatus({ type: 'success', message: data.success });
        }
      })
      .catch(() => {
        setStatus({ type: 'error', message: 'Something went wrong.' });
      });
  }, [token]);

  useEffect(() => {
    verifyEmail();
  }, [verifyEmail]);

  return (
    <Card className="w-[350px]">
      <CardHeader className="text-center">
        <CardTitle>Email Verification</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          {status.type === 'loading' && (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">{status.message}</p>
            </>
          )}
          {status.type === 'success' && (
            <>
              <CheckCircle className="h-8 w-8 text-green-500" />
              <p className="text-sm text-green-600">{status.message}</p>
            </>
          )}
          {status.type === 'error' && (
            <>
              <XCircle className="h-8 w-8 text-red-500" />
              <p className="text-sm text-red-600">{status.message}</p>
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <Button asChild>
          <Link href="/sign-in">Back to Sign In</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Verification;
