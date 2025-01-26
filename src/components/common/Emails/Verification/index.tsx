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

interface VerificationEmailProps {
  name: string;
  token: string;
}

const baseUrl = process.env.VERCEL_URL;

export const VerificationEmail = ({ name, token }: VerificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Email verification QuickBill.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://res.cloudinary.com/dsoeni91r/image/upload/v1737701327/QB_ejkoih.png`}
          width="60"
          height="60"
          alt="QuickBill"
          style={logo}
        />
        <Text style={paragraph}>Hi {name},</Text>
        <Text style={paragraph}>
          Welcome to QuickBill, Streamline your invoicing process with ease.
          Create, send, and manage invoices in seconds with our user-friendly
          app.
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${baseUrl}/auth/new-verification?token=${token}`}
          >
            Verify Email Address
          </Button>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />
          The QuickBill team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>QuickBill © 2025</Text>
      </Container>
    </Body>
  </Html>
);

VerificationEmail.PreviewProps = {
  name: 'Alan',
  token: '123456',
} as VerificationEmailProps;

export default VerificationEmail;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
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

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
