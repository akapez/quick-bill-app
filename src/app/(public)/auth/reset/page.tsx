import type { Metadata } from 'next';

import Reset from './components/Reset';

export const metadata: Metadata = {
  title: 'Reset Password',
};

export default function AuthPasswordResetPage() {
  return (
    <div className="grid min-h-screen w-full place-content-center bg-gradient-to-b from-blue-100 to-white">
      <Reset />
    </div>
  );
}
