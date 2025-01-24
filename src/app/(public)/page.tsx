import Link from 'next/link';

import { auth } from '@lib/auth';

import { Button } from '@components/ui/Button';

export default async function Home() {
  const session = await auth();
  return (
    <section className="grid min-h-screen w-full place-content-center bg-gradient-to-b from-blue-100 to-white">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-[#B771E5]">QuickBill</h1>
            <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl/none">
              Simplify Your Invoicing Process
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
              Streamline your billing, get paid faster, and manage your
              finances.
            </p>
          </div>
          <div className="space-x-4">
            <Button
              asChild
              className="bg-[#1c1917] text-white hover:bg-[#3D3D3D] hover:text-white"
            >
              {session?.user.id ? (
                <Link href="/dashboard">Dashboard</Link>
              ) : (
                <Link href="/sign-in">Get Started</Link>
              )}
            </Button>
            <Button
              variant="outline"
              className="border-[#E5E1DA] bg-[#FBFBFB] text-black hover:bg-[#FDF7F4] hover:text-black"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
