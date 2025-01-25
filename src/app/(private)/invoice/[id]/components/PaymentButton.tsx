'use client';

import Link from 'next/link';

import { CreditCard } from 'lucide-react';

import { Button } from '@components/ui/Button';

interface PaymentButtonProps {
  id: string;
}

export default function PaymentButton({ id }: PaymentButtonProps) {
  return (
    <Button variant="outline" size="icon" asChild>
      <Link href={`/invoice/${id}/payment`}>
        <CreditCard />
      </Link>
    </Button>
  );
}
