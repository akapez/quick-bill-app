type User = {
  id: string;
  name: string | null;
  email?: string | null;
  image?: string | null;
};

export type Status = 'OPEN' | 'PAID' | 'UNPAID' | 'REJECT';

export type Invoice = {
  id: string;
  senderId: string;
  receiverId: string;
  invoiceNumber: string;
  status: Status;
  amount: number;
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  sender: User;
  receiver: User;
};

export type Info = {
  id: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  createdAt?: Date;
  receiver?: {
    email: string | null;
    name: string | null;
  };
};

export type ChartInfo = {
  value: number;
  name: string;
  fill: string;
};
