# QuickBill Application (Invoice Management with AI Finance Assistant)

A **Next.js** application for invoice management, powered by **Gemini API** and **OpenAI (Vercel AI SDK)**. This AI-driven system analyzes financial data and provides insights for better financial management, as well as chats with AI assistants with interactive generative UI.

![Screenshot of a home page](https://raw.githubusercontent.com/akapez/quick-bill-app/refs/heads/main/screenshot.png)

https://github.com/user-attachments/assets/eb793c1d-db60-4396-9745-e0dc4306599c

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Features

- **Next.js**: A React framework for building server-side rendered and static web applications.
- **Gemini API** – Analyzes data and provides financial insights.
- **Vercel AI SDK (OpenAI Model)** - Chat with an AI assistant using an interactive generative UI.
- **Auth.js**: Authentication for Next.js applications.
- **React Hook Form / Zod**: Form handling and validation.
- **shadcn/ui**: A UI component library.
- **Stripe**: Integrate Stripe checkout for payment handling.
- **Resend**: Send authentications and invoice-related emails.
- **MongoDB with Prisma**: Prisma is used as the ORM for database operations.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/akapez/quick-bill-app.git
   cd quick-bill
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   AUTH_SECRET=
   DATABASE_URL=
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   RESEND_API_KEY=
   VERCEL_URL=http://localhost:3000
   STRIPE_SECRET_KEY=
   CLOUDINARY_CLOUD_NAME=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   GEMINI_API_KEY=
   MAIL=
   OPENAI_API_KEY=
   ```

## Usage

1. **Start the development server**:

   ```bash
   yarn dev
   ```

2. The application will start on `http://localhost:3000`.

3. This project uses `commitlint`. Please follow the convention below when committing your changes:

   ```bash
   git commit -m "subject: message"
   ```

4. **Run unit tests**:

   ```bash
   yarn test
   ```
