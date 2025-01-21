'use client';

import { useTransition } from 'react';
import Link from 'next/link';

import { reset } from '@actions/reset-password';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  PasswordResetSchema,
  passwordResetSchema,
} from '@lib/zod-schema/password-reset';
import { Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form';
import { Input } from '@components/ui/Input';

const Reset = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<PasswordResetSchema> = async (data) => {
    startTransition(() => {
      reset(data).then((data) => {
        if (!data) return;
        if (data.success) {
          toast.success(data.success);
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <Card className="mx-auto w-80 md:w-96">
      <CardHeader className="space-y-1">
        <CardTitle
          className="text-2xl font-bold"
          role="heading"
          id="sign-in-card-header"
        >
          Reset Password
        </CardTitle>
        <CardDescription id="sign-in-card-description">
          Forgot your password? No worries! Enter your email to reset your{' '}
          <Link
            href="/"
            className="cursor-pointer font-bold text-[#B771E5] hover:underline"
          >
            QuickBill
          </Link>{' '}
          password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isPending}
              id="sign-in-btn"
              className="mt-4 w-full"
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                'Send Reset Email'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter id="sign-up-card-footer" className="flex justify-center">
        <Link href="/sign-in">
          <Button id="sign-up-btn" variant="link">
            Back to Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Reset;
