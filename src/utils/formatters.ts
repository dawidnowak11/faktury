// Format currency values
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format dates
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(new Date(date));
};

// Format status with proper capitalization
export const formatStatus = (status: string): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

// Generate a new invoice number
export const generateInvoiceNumber = (lastInvoiceNumber: string): string => {
  const parts = lastInvoiceNumber.split('-');
  const year = new Date().getFullYear();
  const number = parseInt(parts[2], 10);
  
  // If year changed, reset counter
  if (parts[1] !== year.toString()) {
    return `INV-${year}-001`;
  }
  
  // Otherwise increment
  return `INV-${year}-${String(number + 1).padStart(3, '0')}`;
};

// Calculate subtotal from invoice items
export const calculateSubtotal = (items: { quantity: number; unitPrice: number }[]): number => {
  return items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
};

// Calculate tax amount
export const calculateTaxAmount = (subtotal: number, taxRate: number): number => {
  return subtotal * taxRate;
};

// Calculate total
export const calculateTotal = (subtotal: number, taxAmount: number): number => {
  return subtotal + taxAmount;
};