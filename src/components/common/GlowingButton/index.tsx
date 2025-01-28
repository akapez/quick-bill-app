'use client';

import { useEffect } from 'react';

import { motion, useSpring, useTransform } from 'framer-motion';

import { Button } from '../../ui/Button';

interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  size: 'default' | 'sm' | 'lg' | 'icon';
  variant:
    | 'default'
    | 'link'
    | 'outline'
    | 'destructive'
    | 'secondary'
    | 'ghost';
}

export default function GlowingButton({
  children,
  className,
  size,
  variant,
}: GlowingButtonProps) {
  const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 });
  const pulsingBg = useTransform(pulse, (r) => {
    return `blur(${r}px)`;
  });

  useEffect(() => {
    pulse.set(10);
  }, [pulse]);

  return (
    <div className="relative">
      <Button asChild size={size} className={className} variant={variant}>
        {children}
      </Button>
      <div
        className="absolute -inset-[0.2px] rounded-lg"
        style={{
          background: 'conic-gradient(#A100FFFF, #119CFDFF)',
        }}
      />
      <motion.div
        className="absolute -inset-[0.7px] rounded-lg opacity-50"
        style={{
          background: 'conic-gradient(#A100FFFF, #119CFDFF)',
          filter: pulsingBg,
        }}
      />
    </div>
  );
}
