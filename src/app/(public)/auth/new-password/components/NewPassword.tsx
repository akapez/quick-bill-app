'use client';

import { useTransition } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { newPassword } from '@actions/new-password';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  NewPasswordSchema,
  newPasswordSchema,
} from '@lib/zod-schema/new-password';
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

const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isPending, startTransition] = useTransition();
  const form = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<NewPasswordSchema> = async (data) => {
    startTransition(() => {
      newPassword(data, token).then((data) => {
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
          Enter New Password
        </CardTitle>
        <CardDescription id="sign-in-card-description">
          Enter your new password to access your{' '}
          <Link
            href="/"
            className="cursor-pointer font-bold text-[#B771E5] hover:underline"
          >
            QuickBill
          </Link>{' '}
          account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
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
                'Reset Password'
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

export default NewPassword;
