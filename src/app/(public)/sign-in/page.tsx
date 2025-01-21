import type { Metadata } from 'next';

import SignIn from './components/SignIn';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Welcome back to QuickBill! Sign in to your account to streamline your invoice process.',
};

export default function SignInPage() {
  return (
    <div className="grid min-h-screen w-full place-content-center bg-gradient-to-b from-blue-100 to-white">
      <SignIn />
    </div>
  );
}
