'use client';

import { useTransition } from 'react';

import { createPayment } from '@actions/stripe';
import { CreditCard, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@components/ui/Button';

interface PaymentButtonProps {
  invoiceId: string;
}

export default function PaymentButton({ invoiceId }: PaymentButtonProps) {
  const [isPending, startTransition] = useTransition();

  const paymentHandler = async () => {
    startTransition(() => {
      createPayment(invoiceId).then((data) => {
        if (data) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <Button
      onClick={paymentHandler}
      disabled={isPending}
      className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
    >
      {isPending ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait
        </>
      ) : (
        <>
          <CreditCard /> Pay
        </>
      )}
    </Button>
  );
}
