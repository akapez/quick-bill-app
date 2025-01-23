type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

export type Invoice = {
  id: string;
  senderId: string;
  receiverId: string;
  invoiceNumber: string;
  status: 'OPEN' | 'PAID' | 'VOID' | 'UNCOLLECTIBLE';
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  sender: User;
  receiver: User;
};
