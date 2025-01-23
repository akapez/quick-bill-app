type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

export type Status = 'OPEN' | 'PAID' | 'VOID' | 'UNCOLLECTIBLE';

export type Invoice = {
  id: string;
  senderId: string;
  receiverId: string;
  invoiceNumber: string;
  status: Status;
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  sender: User;
  receiver: User;
};
