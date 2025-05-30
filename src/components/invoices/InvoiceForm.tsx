import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { Client, Invoice, InvoiceItem, InvoiceStatus } from '../../types';
import { generateId } from '../../utils/helpers';
import { formatCurrency, calculateSubtotal, calculateTaxAmount, calculateTotal } from '../../utils/formatters';

interface InvoiceFormProps {
  clients: Client[];
  initialData?: Partial<Invoice>;
  onSubmit: (invoice: Partial<Invoice>) => void;
  onCancel: () => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  clients,
  initialData,
  onSubmit,
  onCancel
}) => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({
    id: initialData?.id || '',
    clientId: initialData?.clientId || '',
    issueDate: initialData?.issueDate || new Date(),
    dueDate: initialData?.dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    items: initialData?.items || [{ id: generateId(), description: '', quantity: 1, unitPrice: 0, amount: 0 }],
    subtotal: initialData?.subtotal || 0,
    taxRate: initialData?.taxRate || 0.1, // Default 10%
    taxAmount: initialData?.taxAmount || 0,
    total: initialData?.total || 0,
    notes: initialData?.notes || '',
    status: initialData?.status || 'draft',
  });

  // Update line item
  const updateLineItem = (index: number, field: keyof InvoiceItem, value: any) => {
    const updatedItems = [...(invoice.items || [])];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };

    // Recalculate amount
    if (field === 'quantity' || field === 'unitPrice') {
      updatedItems[index].amount = updatedItems[index].quantity * updatedItems[index].unitPrice;
    }

    // Recalculate totals
    const subtotal = calculateSubtotal(updatedItems);
    const taxAmount = calculateTaxAmount(subtotal, invoice.taxRate || 0.1);
    const total = calculateTotal(subtotal, taxAmount);

    setInvoice({
      ...invoice,
      items: updatedItems,
      subtotal,
      taxAmount,
      total
    });
  };

  // Add new line item
  const addLineItem = () => {
    const newItem: InvoiceItem = {
      id: generateId(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      amount: 0
    };

    setInvoice({
      ...invoice,
      items: [...(invoice.items || []), newItem]
    });
  };

  // Remove line item
  const removeLineItem = (index: number) => {
    if ((invoice.items || []).length <= 1) {
      return; // Keep at least one item
    }

    const updatedItems = [...(invoice.items || [])];
    updatedItems.splice(index, 1);

    // Recalculate totals
    const subtotal = calculateSubtotal(updatedItems);
    const taxAmount = calculateTaxAmount(subtotal, invoice.taxRate || 0.1);
    const total = calculateTotal(subtotal, taxAmount);

    setInvoice({
      ...invoice,
      items: updatedItems,
      subtotal,
      taxAmount,
      total
    });
  };

  // Update tax rate
  const updateTaxRate = (value: number) => {
    const taxRate = value / 100; // Convert percentage to decimal
    const subtotal = invoice.subtotal || 0;
    const taxAmount = calculateTaxAmount(subtotal, taxRate);
    const total = calculateTotal(subtotal, taxAmount);

    setInvoice({
      ...invoice,
      taxRate,
      taxAmount,
      total
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoice);
  };

  // Format dates for input fields
  const formatDateForInput = (date: Date) => {
    return date instanceof Date
      ? date.toISOString().split('T')[0]
      : '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Invoice Information</h3>
          
          <Input
            label="Invoice Number"
            value={invoice.id}
            onChange={(e) => setInvoice({ ...invoice, id: e.target.value })}
            disabled={!!initialData?.id}
            fullWidth
          />

          <Select
            label="Client"
            options={clients.map(client => ({ value: client.id, label: client.name }))}
            value={invoice.clientId}
            onChange={(value) => setInvoice({ ...invoice, clientId: value })}
            fullWidth
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Issue Date"
              type="date"
              value={formatDateForInput(invoice.issueDate as Date)}
              onChange={(e) => setInvoice({ ...invoice, issueDate: new Date(e.target.value) })}
              fullWidth
            />
            
            <Input
              label="Due Date"
              type="date"
              value={formatDateForInput(invoice.dueDate as Date)}
              onChange={(e) => setInvoice({ ...invoice, dueDate: new Date(e.target.value) })}
              fullWidth
            />
          </div>
          
          <Select
            label="Status"
            options={[
              { value: 'draft', label: 'Draft' },
              { value: 'sent', label: 'Sent' },
              { value: 'paid', label: 'Paid' },
              { value: 'overdue', label: 'Overdue' },
              { value: 'cancelled', label: 'Cancelled' }
            ]}
            value={invoice.status as string}
            onChange={(value) => setInvoice({ ...invoice, status: value as InvoiceStatus })}
            fullWidth
          />
          
          <div className="mb-4">
            <label 
              htmlFor="notes" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={4}
              value={invoice.notes || ''}
              onChange={(e) => setInvoice({ ...invoice, notes: e.target.value })}
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Line Items</h3>
          
          <div className="space-y-4">
            {(invoice.items || []).map((item, index) => (
              <div key={item.id} className="flex flex-col space-y-2 p-3 border border-gray-200 dark:border-gray-700 rounded-md">
                <div className="flex justify-between">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Item #{index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeLineItem(index)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                
                <Input
                  label="Description"
                  value={item.description}
                  onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                  fullWidth
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <Input
                    label="Quantity"
                    type="number"
                    min="1"
                    value={item.quantity.toString()}
                    onChange={(e) => updateLineItem(index, 'quantity', parseInt(e.target.value, 10))}
                    fullWidth
                  />
                  
                  <Input
                    label="Unit Price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice.toString()}
                    onChange={(e) => updateLineItem(index, 'unitPrice', parseFloat(e.target.value))}
                    fullWidth
                  />
                  
                  <Input
                    label="Amount"
                    value={formatCurrency(item.amount)}
                    disabled
                    fullWidth
                  />
                </div>
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addLineItem}
              className="w-full"
              icon={<Plus size={16} />}
            >
              Add Item
            </Button>
          </div>
          
          <div className="mt-6 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">Subtotal:</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(invoice.subtotal || 0)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Tax Rate:</span>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={(invoice.taxRate || 0) * 100}
                  onChange={(e) => updateTaxRate(parseFloat(e.target.value))}
                  className="w-16 px-2 py-1 text-sm"
                />
                <span className="ml-1 text-gray-900 dark:text-white">%</span>
              </div>
              <span className="text-gray-900 dark:text-white">{formatCurrency(invoice.taxAmount || 0)}</span>
            </div>
            
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-2 font-semibold">
              <span className="text-gray-900 dark:text-white">Total:</span>
              <span className="text-gray-900 dark:text-white">{formatCurrency(invoice.total || 0)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          Save Invoice
        </Button>
      </div>
    </form>
  );
};

export default InvoiceForm;