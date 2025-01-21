import type { Metadata } from 'next';

import NewPassword from './components/NewPassword';

export const metadata: Metadata = {
  title: 'New Password',
};

export default function AuthPasswordResetPage() {
  return (
    <div className="grid min-h-screen w-full place-content-center bg-gradient-to-b from-blue-100 to-white">
      <NewPassword />
    </div>
  );
}
