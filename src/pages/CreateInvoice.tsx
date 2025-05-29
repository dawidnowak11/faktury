import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InvoiceForm from '../components/invoices/InvoiceForm';
import { clients, invoices } from '../data/mockData';
import { generateId } from '../utils/helpers';
import { generateInvoiceNumber } from '../utils/formatters';
import { Invoice } from '../types';

const CreateInvoice: React.FC = () => {
  const navigate = useNavigate();
  
  // Get the last invoice number to generate a new one
  const lastInvoiceNumber = invoices.length > 0 
    ? invoices.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].id
    : 'INV-2023-000';
  
  const newInvoiceNumber = generateInvoiceNumber(lastInvoiceNumber);
  
  // Handle form submission
  const handleSubmit = (invoiceData: Partial<Invoice>) => {
    // In a real app, we would save this to the database
    console.log('New invoice:', invoiceData);
    
    // Navigate to the invoices list
    navigate('/invoices');
  };
  
  return (
    <div className="space-y-6">
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
          Create New Invoice
        </h1>
      </div>
      
      <Card>
        <InvoiceForm
          clients={clients}
          initialData={{ id: newInvoiceNumber }}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/invoices')}
        />
      </Card>
    </div>
  );
};

export default CreateInvoice;