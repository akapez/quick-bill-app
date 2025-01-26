'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import Stripe from 'stripe';

import { getInvoiceById } from './data';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const createPayment = async (id: string) => {
  const headerList = await headers();
  const origin = headerList.get('origin');
  let redirectUrl = '';
  try {
    const existingInvoice = await getInvoiceById(id);
    if (!existingInvoice) {
      return { error: 'Invoice not found!' };
    }
    const stripeAmount = Math.round(existingInvoice.amount * 100);
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product: 'prod_RdXwGBcrXuVZYk',
              unit_amount: stripeAmount,
            },
            quantity: 1,
          },
        ],
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${origin}/invoice/${existingInvoice.id}/payment?status=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/invoice/${existingInvoice.id}/payment?status=canceled&session_id={CHECKOUT_SESSION_ID}`,
      });
    if (!checkoutSession.url) {
      return { error: 'Invalid session!' };
    }
    redirectUrl = checkoutSession.url;
  } catch {
    return { error: 'Something went wrong!' };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
};

export const verifyPayment = async (
  sessionId: string
): Promise<Stripe.Checkout.Session> => {
  const result = await stripe.checkout.sessions.retrieve(sessionId);
  return result;
};
