import type { Metadata } from 'next';

import Verification from './components/Verification';

export const metadata: Metadata = {
  title: 'Auth Verification',
};

export default function AuthVerificationPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <Verification />
    </div>
  );
}
