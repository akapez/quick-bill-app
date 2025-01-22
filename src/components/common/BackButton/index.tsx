'use client';

import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { Button } from '../../ui/Button';

interface BackButtonProps {
  href: string;
}

export default function BackButton({ href }: BackButtonProps) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={href}>
        <ChevronLeft />
      </Link>
    </Button>
  );
}
