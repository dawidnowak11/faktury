import { Client, Invoice, InvoiceStatus } from '../types';

// Helper function to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

// Generate sample clients
export const clients: Client[] = [
  {
    id: 'client-001',
    name: 'Acme Corporation',
    email: 'billing@acmecorp.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'client-002',
    name: 'Globex Industries',
    email: 'accounts@globex.com',
    phone: '(555) 987-6543',
    address: '456 Market Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    createdAt: new Date('2023-02-22')
  },
  {
    id: 'client-003',
    name: 'Stark Enterprises',
    email: 'finance@stark.com',
    phone: '(555) 345-6789',
    address: '789 Tech Blvd',
    city: 'Boston',
    state: 'MA',
    zipCode: '02108',
    country: 'USA',
    createdAt: new Date('2023-03-10')
  },
  {
    id: 'client-004',
    name: 'Wayne Industries',
    email: 'payments@wayne.com',
    phone: '(555) 456-7890',
    address: '1007 Mountain Drive',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    country: 'USA',
    createdAt: new Date('2023-04-05')
  },
  {
    id: 'client-005',
    name: 'Oscorp Technologies',
    email: 'invoices@oscorp.com',
    phone: '(555) 567-8901',
    address: '888 Science Park',
    city: 'Seattle',
    state: 'WA',
    zipCode: '98101',
    country: 'USA',
    createdAt: new Date('2023-05-18')
  }
];

// Helper function to create an invoice with items
const createInvoice = (
  id: string, 
  clientId: string, 
  issueDate: Date, 
  dueDate: Date, 
  status: InvoiceStatus,
  items: { description: string; quantity: number; unitPrice: number }[]
): Invoice => {
  const client = clients.find(c => c.id === clientId)!;
  const invoiceItems = items.map(item => ({
    id: generateId(),
    description: item.description,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    amount: item.quantity * item.unitPrice
  }));
  
  const subtotal = invoiceItems.reduce((sum, item) => sum + item.amount, 0);
  const taxRate = 0.1; // 10% tax
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;
  
  return {
    id,
    client,
    clientId,
    issueDate,
    dueDate,
    items: invoiceItems,
    subtotal,
    taxRate,
    taxAmount,
    total,
    status,
    createdAt: new Date(issueDate.getTime() - 86400000), // 1 day before issue date
    notes: 'Thank you for your business!'
  };
};

// Generate sample invoices
export const invoices: Invoice[] = [
  createInvoice(
    'INV-2023-001',
    'client-001',
    new Date('2023-06-01'),
    new Date('2023-07-01'),
    'paid',
    [
      { description: 'Web Development Services', quantity: 1, unitPrice: 2000 },
      { description: 'Hosting (Annual)', quantity: 1, unitPrice: 300 }
    ]
  ),
  createInvoice(
    'INV-2023-002',
    'client-002',
    new Date('2023-06-15'),
    new Date('2023-07-15'),
    'paid',
    [
      { description: 'UI/UX Design', quantity: 1, unitPrice: 1500 },
      { description: 'Logo Design', quantity: 1, unitPrice: 500 }
    ]
  ),
  createInvoice(
    'INV-2023-003',
    'client-003',
    new Date('2023-07-01'),
    new Date('2023-08-01'),
    'sent',
    [
      { description: 'Mobile App Development', quantity: 1, unitPrice: 5000 },
      { description: 'QA Testing', quantity: 40, unitPrice: 50 }
    ]
  ),
  createInvoice(
    'INV-2023-004',
    'client-004',
    new Date('2023-07-15'),
    new Date('2023-08-15'),
    'overdue',
    [
      { description: 'SEO Consulting', quantity: 10, unitPrice: 150 },
      { description: 'Content Creation', quantity: 5, unitPrice: 200 }
    ]
  ),
  createInvoice(
    'INV-2023-005',
    'client-005',
    new Date('2023-08-01'),
    new Date('2023-09-01'),
    'draft',
    [
      { description: 'Server Maintenance', quantity: 1, unitPrice: 800 },
      { description: 'Security Audit', quantity: 1, unitPrice: 1200 }
    ]
  ),
  createInvoice(
    'INV-2023-006',
    'client-001',
    new Date('2023-08-15'),
    new Date('2023-09-15'),
    'sent',
    [
      { description: 'Database Optimization', quantity: 1, unitPrice: 1000 },
      { description: 'Performance Tuning', quantity: 1, unitPrice: 800 }
    ]
  ),
  createInvoice(
    'INV-2023-007',
    'client-003',
    new Date('2023-09-01'),
    new Date('2023-10-01'),
    'draft',
    [
      { description: 'API Integration', quantity: 1, unitPrice: 1500 },
      { description: 'Custom Development', quantity: 20, unitPrice: 100 }
    ]
  )
];

// Calculate dashboard stats
export const getDashboardStats = () => {
  const totalInvoices = invoices.length;
  const unpaidInvoices = invoices.filter(inv => inv.status === 'sent' || inv.status === 'overdue').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;
  const activeClients = new Set(invoices.map(inv => inv.clientId)).size;
  
  const totalRevenue = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.total, 0);
    
  const outstandingAmount = invoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.total, 0);
    
  return {
    totalInvoices,
    unpaidInvoices,
    overdueInvoices,
    activeClients,
    totalRevenue,
    outstandingAmount
  };
};