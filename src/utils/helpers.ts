import { InvoiceStatus } from '../types';

// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 10);
};

// Get status color based on invoice status
export const getStatusColor = (status: InvoiceStatus): string => {
  const statusColors = {
    draft: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    sent: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    paid: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    overdue: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    cancelled: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  };
  
  return statusColors[status] || 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

// Sort invoices by different criteria
export const sortInvoices = <T extends { issueDate: Date; dueDate: Date; total: number; status: string }>(
  invoices: T[],
  sortBy: 'issueDate' | 'dueDate' | 'total' | 'status',
  sortOrder: 'asc' | 'desc'
): T[] => {
  return [...invoices].sort((a, b) => {
    if (sortBy === 'issueDate' || sortBy === 'dueDate') {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortBy === 'total') {
      return sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
    }
    
    // Sort by status
    const statusA = a.status.toLowerCase();
    const statusB = b.status.toLowerCase();
    return sortOrder === 'asc' 
      ? statusA.localeCompare(statusB) 
      : statusB.localeCompare(statusA);
  });
};

// Filter invoices by status
export const filterInvoicesByStatus = <T extends { status: string }>(
  invoices: T[],
  status: string | null
): T[] => {
  if (!status) return invoices;
  return invoices.filter(invoice => invoice.status.toLowerCase() === status.toLowerCase());
};

// Filter invoices by client
export const filterInvoicesByClient = <T extends { clientId: string }>(
  invoices: T[],
  clientId: string | null
): T[] => {
  if (!clientId) return invoices;
  return invoices.filter(invoice => invoice.clientId === clientId);
};

// Filter invoices by date range
export const filterInvoicesByDateRange = <T extends { issueDate: Date }>(
  invoices: T[],
  startDate: Date | null,
  endDate: Date | null
): T[] => {
  if (!startDate && !endDate) return invoices;
  
  return invoices.filter(invoice => {
    const date = new Date(invoice.issueDate).getTime();
    if (startDate && endDate) {
      return date >= startDate.getTime() && date <= endDate.getTime();
    }
    if (startDate) {
      return date >= startDate.getTime();
    }
    if (endDate) {
      return date <= endDate.getTime();
    }
    return true;
  });
};