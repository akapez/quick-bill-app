'use client';

import { useTransition } from 'react';
import Link from 'next/link';

import { login } from '@actions/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@hooks/useToast';
import { SignInSchema, signInSchema } from '@lib/zod-schema/sign-in';
import { Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import GoogleButton from '@components/common/GoogleButton';
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
import { Separator } from '@components/ui/Separator';

const SignIn = () => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
    startTransition(() => {
      login(data).then((data) => {
        if (data.success) {
          toast({
            title: data.success,
          });
        } else {
          toast({
            variant: 'destructive',
            title: data.error,
          });
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
          Sign In
        </CardTitle>
        <CardDescription id="sign-in-card-description">
          Welcome back to{' '}
          <span className="font-bold text-[#B771E5]">QuickBill</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
              className="w-full"
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Form>
        <div className="flex items-center gap-4">
          <Separator className="flex-1" />
          <span className="text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>
        <GoogleButton />
      </CardContent>
      <CardFooter
        id="sign-up-card-footer"
        className="flex justify-center text-sm"
      >
        Don&apos;t have an account?
        <Link href="/sign-up">
          <Button id="sign-up-btn" variant="link">
            Register
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
