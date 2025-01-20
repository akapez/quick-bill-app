import type { Metadata } from 'next';

import SignUp from './components/SignUp';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Create a QuickBill account to streamline your invoice process. Sign up today!',
};

const SignUpPage = () => {
  return (
    <div className="grid min-h-screen w-full place-content-center bg-gradient-to-b from-blue-100 to-white">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
