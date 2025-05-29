// Define core data types for the application

export type Client = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  createdAt: Date;
};

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
};

export type Invoice = {
  id: string;
  client: Client;
  clientId: string;
  issueDate: Date;
  dueDate: Date;
  items: InvoiceItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes?: string;
  status: InvoiceStatus;
  createdAt: Date;
};

export type DashboardStats = {
  totalInvoices: number;
  unpaidInvoices: number;
  overdueInvoices: number;
  activeClients: number;
  totalRevenue: number;
  outstandingAmount: number;
};