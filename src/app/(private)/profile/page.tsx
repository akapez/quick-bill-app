import type { Metadata } from 'next';

import { auth } from '@lib/auth';

import BackButton from '@components/common/BackButton';

import Profile from './components/Profile';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function ProfilePage() {
  const session = await auth();
  return (
    <div className="mx-5 my-8 flex flex-col justify-center md:px-6 xl:px-36">
      <BackButton href="/dashboard" />
      <h1 className="my-4 text-left text-3xl font-bold">Profile Update</h1>
      <Profile userId={session?.user.id || ''} />
    </div>
  );
}
