import * as React from 'react';

import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ReminderEmailProps {
  invoiceId: string;
  invoiceNumber: string;
  billingName: string;
}

const baseUrl = process.env.VERCEL_URL;

export const ReminderEmail = ({
  invoiceId,
  invoiceNumber,
  billingName,
}: ReminderEmailProps) => (
  <Html>
    <Head />
    <Preview>Your payment receipt!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Img
            src="https://res.cloudinary.com/dsoeni91r/image/upload/v1737701327/QB_ejkoih.png"
            width="60"
            height="60"
            alt="QuickBill"
          />
          <Hr style={hr} />
          <Text style={heading}>Invoice #{invoiceNumber}</Text>
          <Text style={paragraph}>
            Hi {`${billingName}`}, This is a friendly reminder that your invoice
            is due. You can view your payments, manage your invoices, and access
            a variety of information about your account directly from your
            dashboard.
          </Text>
          <Button
            style={button}
            href={`${baseUrl}/invoice/${invoiceId}/payment`}
          >
            Pay Now
          </Button>
          <Hr style={hr} />
          <Hr style={hr} />
          <Text style={footer}>QuickBill © 2025</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

ReminderEmail.PreviewProps = {
  invoiceId: '001',
  invoiceNumber: 'INV001',
  billingName: 'Sam Smith',
} as ReminderEmailProps;

export default ReminderEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const box = {
  padding: '0 48px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#484848',
};

const paragraph = {
  color: '#525f7f',

  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};

const button = {
  backgroundColor: '#18181b',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '10px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};
