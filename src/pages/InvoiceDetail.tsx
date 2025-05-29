import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Printer, Send, CreditCard, Copy } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import Modal from '../components/ui/Modal';
import InvoiceForm from '../components/invoices/InvoiceForm';
import { invoices, clients } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Invoice, InvoiceStatus } from '../types';

const InvoiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the invoice by ID
  const invoice = invoices.find(inv => inv.id === id);
  
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | undefined>(invoice);
  
  if (!currentInvoice) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-bold mb-2">Invoice Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">The invoice you're looking for doesn't exist or has been deleted.</p>
        <Button variant="primary" onClick={() => navigate('/invoices')}>
          Back to Invoices
        </Button>
      </div>
    );
  }
  
  // Update invoice status
  const updateStatus = (newStatus: InvoiceStatus) => {
    setCurrentInvoice(prev => {
      if (!prev) return prev;
      return { ...prev, status: newStatus };
    });
  };
  
  // Handle form submission (update invoice)
  const handleUpdateInvoice = (invoiceData: Partial<Invoice>) => {
    setCurrentInvoice(prev => {
      if (!prev) return prev;
      return { ...prev, ...invoiceData };
    });
    setEditModalOpen(false);
  };
  
  // Get status actions based on current status
  const getStatusActions = () => {
    switch (currentInvoice.status) {
      case 'draft':
        return (
          <Button 
            variant="primary"
            icon={<Send size={16} />}
            onClick={() => updateStatus('sent')}
          >
            Send Invoice
          </Button>
        );
      case 'sent':
        return (
          <div className="flex space-x-2">
            <Button 
              variant="success"
              icon={<CreditCard size={16} />}
              onClick={() => updateStatus('paid')}
            >
              Mark as Paid
            </Button>
            <Button 
              variant="danger"
              onClick={() => updateStatus('overdue')}
            >
              Mark as Overdue
            </Button>
          </div>
        );
      case 'overdue':
        return (
          <Button 
            variant="success"
            icon={<CreditCard size={16} />}
            onClick={() => updateStatus('paid')}
          >
            Mark as Paid
          </Button>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            icon={<ArrowLeft size={16} />}
            onClick={() => navigate('/invoices')}
          >
            Back
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Invoice {currentInvoice.id}
          </h1>
          <StatusBadge status={currentInvoice.status} />
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            icon={<Copy size={16} />}
            onClick={() => {/* Functionality to duplicate */}}
          >
            Duplicate
          </Button>
          <Button 
            variant="outline"
            icon={<Printer size={16} />}
            onClick={() => {/* Functionality to print */}}
          >
            Print
          </Button>
          <Button 
            variant="primary"
            icon={<Edit size={16} />}
            onClick={() => setEditModalOpen(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      
      {/* Status Actions */}
      {getStatusActions() && (
        <div className="flex justify-end">
          {getStatusActions()}
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Invoice Details */}
        <Card className="md:col-span-2">
          <div className="flex justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Invoice Details</h2>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Issue Date</p>
              <p className="font-medium">{formatDate(currentInvoice.issueDate)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Due Date</p>
              <p className="font-medium">{formatDate(currentInvoice.dueDate)}</p>
            </div>
          </div>
          
          {/* Line Items */}
          <div className="mt-4">
            <h3 className="font-medium mb-2">Items</h3>
            <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentInvoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                        {item.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right">
                        {formatCurrency(item.unitPrice)}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 text-right font-medium">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Totals */}
          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="flex justify-between py-1">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span>{formatCurrency(currentInvoice.subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600 dark:text-gray-400">Tax ({(currentInvoice.taxRate * 100).toFixed(1)}%)</span>
              <span>{formatCurrency(currentInvoice.taxAmount)}</span>
            </div>
            <div className="flex justify-between py-1 font-bold text-lg border-t border-gray-200 dark:border-gray-700 mt-2 pt-2">
              <span>Total</span>
              <span>{formatCurrency(currentInvoice.total)}</span>
            </div>
          </div>
          
          {/* Notes */}
          {currentInvoice.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2">Notes</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{currentInvoice.notes}</p>
            </div>
          )}
        </Card>
        
        {/* Client Info */}
        <Card title="Client Information">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">{currentInvoice.client.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{currentInvoice.client.email}</p>
              {currentInvoice.client.phone && (
                <p className="text-gray-600 dark:text-gray-400">{currentInvoice.client.phone}</p>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Billing Address</h4>
              <div className="text-gray-900 dark:text-gray-100">
                <p>{currentInvoice.client.address}</p>
                <p>{currentInvoice.client.city}, {currentInvoice.client.state} {currentInvoice.client.zipCode}</p>
                <p>{currentInvoice.client.country}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Edit Invoice Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Invoice"
        size="xl"
      >
        <InvoiceForm
          clients={clients}
          initialData={currentInvoice}
          onSubmit={handleUpdateInvoice}
          onCancel={() => setEditModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default InvoiceDetail;