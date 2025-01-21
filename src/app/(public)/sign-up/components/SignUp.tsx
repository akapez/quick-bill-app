'use client';

import { useTransition } from 'react';
import Link from 'next/link';

import { register } from '@actions/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpSchema, signUpSchema } from '@lib/zod-schema/sign-up';
import { Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

const SignUp = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    startTransition(() => {
      register(data).then((data) => {
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
          id="sign-up-card-header"
        >
          Register
        </CardTitle>
        <CardDescription id="sign-up-card-description">
          Join the{' '}
          <Link
            href="/"
            className="cursor-pointer font-bold text-[#B771E5] hover:underline"
          >
            QuickBill
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              id="sign-up-btn"
              className="mt-4 w-full"
              type="submit"
            >
              {isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Please wait
                </>
              ) : (
                'Register'
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
        Already have an account?
        <Link href="/sign-in">
          <Button id="sign-in-btn" variant="link">
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
