'use client';

import { useEffect } from 'react';

import { motion, useSpring, useTransform } from 'framer-motion';

import { Button } from '../../ui/Button';

interface StartButtonProps {
  children: React.ReactNode;
}

export default function StartButton({ children }: StartButtonProps) {
  const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 });
  const pulsingBg = useTransform(pulse, (r) => {
    return `blur(${r}px)`;
  });

  useEffect(() => {
    pulse.set(10);
  }, [pulse]);

  return (
    <div className="relative">
      <Button
        asChild
        size="lg"
        className="relative z-10 bg-[#1c1917] text-white transition-colors duration-200 hover:bg-[#3D3D3D] hover:text-white"
      >
        {children}
      </Button>
      <div
        className="absolute -inset-[0.2px] rounded-md"
        style={{
          background:
            'conic-gradient(#ff4545, #00ff99, #006aff, #ff0095, #ff4545)',
        }}
      />
      <motion.div
        className="absolute -inset-[0.5px] rounded-md opacity-50"
        style={{
          background:
            'conic-gradient(#ff4545, #00ff99, #006aff, #ff0095, #ff4545)',
          filter: pulsingBg,
        }}
      />
    </div>
  );
}
