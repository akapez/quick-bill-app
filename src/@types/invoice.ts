export type Invoice = {
  id: string;
  senderId: string;
  receiverId: string;
  invoiceNumber: string;
  billingName: string;
  billingEmail: string;
  status: 'OPEN' | 'PAID' | 'VOID' | 'UNCOLLECTIBLE';
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};
