import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Filter, FileText, RefreshCw } from 'lucide-react';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import Select from '../components/ui/Select';
import EmptyState from '../components/ui/EmptyState';
import { invoices, clients } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';
import { filterInvoicesByStatus, filterInvoicesByClient, sortInvoices } from '../utils/helpers';
import { Invoice, InvoiceStatus } from '../types';

const InvoicesList: React.FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [clientFilter, setClientFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'issueDate' | 'dueDate' | 'total' | 'status'>('issueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Filter and sort invoices
  const filteredInvoices = filterInvoicesByClient(
    filterInvoicesByStatus(invoices, statusFilter),
    clientFilter
  );
  
  const sortedInvoices = sortInvoices(filteredInvoices, sortBy, sortOrder);
  
  // Table columns
  const columns = [
    { 
      header: 'Invoice #', 
      accessor: 'id',
      className: 'font-medium' 
    },
    { 
      header: 'Client', 
      accessor: (invoice: Invoice) => invoice.client.name
    },
    { 
      header: 'Issue Date', 
      accessor: (invoice: Invoice) => formatDate(invoice.issueDate)
    },
    { 
      header: 'Due Date', 
      accessor: (invoice: Invoice) => formatDate(invoice.dueDate)
    },
    { 
      header: 'Amount', 
      accessor: (invoice: Invoice) => formatCurrency(invoice.total),
      className: 'text-right' 
    },
    { 
      header: 'Status', 
      accessor: (invoice: Invoice) => <StatusBadge status={invoice.status} />
    }
  ];
  
  // Status options for filter
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'sent', label: 'Sent' },
    { value: 'paid', label: 'Paid' },
    { value: 'overdue', label: 'Overdue' },
    { value: 'cancelled', label: 'Cancelled' }
  ];
  
  // Client options for filter
  const clientOptions = [
    { value: '', label: 'All Clients' },
    ...clients.map(client => ({ value: client.id, label: client.name }))
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'issueDate', label: 'Issue Date' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'total', label: 'Amount' },
    { value: 'status', label: 'Status' }
  ];
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  // Reset filters
  const resetFilters = () => {
    setStatusFilter(null);
    setClientFilter(null);
    setSortBy('issueDate');
    setSortOrder('desc');
  };
  
  // Handle row click to view/edit invoice
  const handleRowClick = (invoice: Invoice) => {
    navigate(`/invoices/${invoice.id}`);
  };
  
  // Create new invoice
  const handleCreateInvoice = () => {
    navigate('/invoices/new');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
        <Button 
          variant="primary"
          icon={<Plus size={16} />}
          onClick={handleCreateInvoice}
        >
          New Invoice
        </Button>
      </div>
      
      <Card>
        <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
            <Filter size={16} />
            <span>Filters:</span>
          </div>
          
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
            <Select
              options={statusOptions}
              value={statusFilter || ''}
              onChange={setStatusFilter}
              className="min-w-40"
            />
            
            <Select
              options={clientOptions}
              value={clientFilter || ''}
              onChange={setClientFilter}
              className="min-w-40"
            />
            
            <div className="flex space-x-2">
              <Select
                options={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value as any)}
                className="min-w-32"
              />
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleSortOrder}
                className="px-2"
                aria-label={`Sort ${sortOrder === 'asc' ? 'ascending' : 'descending'}`}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetFilters}
                icon={<RefreshCw size={14} />}
                aria-label="Reset filters"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
        
        {invoices.length === 0 ? (
          <EmptyState
            title="No invoices yet"
            description="Create your first invoice to get started."
            icon={<FileText size={48} />}
            action={{
              label: 'Create Invoice',
              onClick: handleCreateInvoice
            }}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={sortedInvoices}
              keyExtractor={(item) => item.id}
              onRowClick={handleRowClick}
              emptyMessage="No invoices match your filters"
            />
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Showing {sortedInvoices.length} of {invoices.length} invoices
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default InvoicesList;