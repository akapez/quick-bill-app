import Image from 'next/image';
import Link from 'next/link';

import sketch from '@assets/mall-sketch.png';
import { auth } from '@lib/auth';

import GlowingButton from '@components/common/GlowingButton';

export default async function Home() {
  const session = await auth();
  return (
    <section className="relative grid min-h-screen w-full place-content-center bg-gradient-to-b from-blue-100 to-white">
      <Image
        src={sketch}
        alt="Background"
        fill
        quality={100}
        priority
        className="object-cover opacity-5"
      />
      <div className="absolute inset-0" aria-hidden="true" />
      <div className="z-50 px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-[#B771E5]">QuickBill</h1>
            <h2 className="text-3xl font-bold tracking-tighter text-black sm:text-4xl md:text-5xl lg:text-6xl/none">
              Simplify Your Invoicing Process
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-lg">
              Streamline billing for your small business, get paid faster, and
              improve your financial management with an AI-powered assistant.
            </p>
          </div>
          <GlowingButton
            className="relative z-10 bg-[#1c1917] text-white transition-colors duration-200 hover:bg-[#3D3D3D] hover:text-white"
            size="lg"
            variant="default"
          >
            {session?.user.id ? (
              <Link href="/dashboard">Dashboard</Link>
            ) : (
              <Link href="/sign-in">Get Started</Link>
            )}
          </GlowingButton>
        </div>
      </div>
    </section>
  );
}
