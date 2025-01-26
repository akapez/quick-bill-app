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

interface PasswordEmailProps {
  name: string;
  token: string;
}

const baseUrl = process.env.VERCEL_URL;

export const PasswordEmail = ({ name, token }: PasswordEmailProps) => (
  <Html>
    <Head />
    <Preview>Password reset QuickBill.</Preview>
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
          Someone recently requested a password change for your QuickBill
          account. If this was you, you can set a new password here:
        </Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={`${baseUrl}/auth/new-password?token=${token}`}
          >
            Reset Password
          </Button>
        </Section>
        <Text style={paragraph}>
          If you don&apos;t want to change your password or didn&apos;t request
          this, just ignore and delete this message.
        </Text>
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

PasswordEmail.PreviewProps = {
  name: 'Alan',
  token: '123456',
} as PasswordEmailProps;

export default PasswordEmail;

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
