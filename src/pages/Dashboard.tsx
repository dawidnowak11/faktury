import React from 'react';
import { FileText, Users, AlertTriangle, DollarSign } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import Table from '../components/ui/Table';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { getDashboardStats, invoices } from '../data/mockData';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Invoice } from '../types';

const Dashboard: React.FC = () => {
  const stats = getDashboardStats();
  
  // Get recent invoices (last 5)
  const recentInvoices = [...invoices]
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 5);
  
  // Get overdue invoices
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');
  
  // Table columns for recent invoices
  const recentInvoiceColumns = [
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
      header: 'Amount', 
      accessor: (invoice: Invoice) => formatCurrency(invoice.total),
      className: 'text-right' 
    },
    { 
      header: 'Date', 
      accessor: (invoice: Invoice) => formatDate(invoice.issueDate)
    },
    { 
      header: 'Status', 
      accessor: (invoice: Invoice) => <StatusBadge status={invoice.status} />
    }
  ];
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      {/* Stats Cards */}
      <section>
        <h2 className="sr-only">Statistics Overview</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Invoices"
            value={stats.totalInvoices}
            icon={<FileText size={24} />}
            change={{ value: '12%', positive: true }}
          />
          
          <StatCard
            title="Unpaid Invoices"
            value={stats.unpaidInvoices}
            icon={<AlertTriangle size={24} />}
            change={{ value: '5%', positive: false }}
          />
          
          <StatCard
            title="Active Clients"
            value={stats.activeClients}
            icon={<Users size={24} />}
            change={{ value: '3%', positive: true }}
          />
          
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={<DollarSign size={24} />}
            change={{ value: '18%', positive: true }}
          />
        </div>
      </section>
      
      {/* Recent Invoices */}
      <Card title="Recent Invoices" subtitle="Last 5 invoices created">
        <Table
          columns={recentInvoiceColumns}
          data={recentInvoices}
          keyExtractor={(item) => item.id}
          onRowClick={() => {}}
          emptyMessage="No recent invoices"
        />
      </Card>
      
      {/* Overdue Invoices */}
      <Card 
        title="Overdue Invoices" 
        subtitle={`${overdueInvoices.length} invoices requiring attention`}
        className={overdueInvoices.length > 0 ? 'border-l-4 border-red-500' : ''}
      >
        {overdueInvoices.length > 0 ? (
          <Table
            columns={recentInvoiceColumns}
            data={overdueInvoices}
            keyExtractor={(item) => item.id}
            onRowClick={() => {}}
          />
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">No overdue invoices. Great job!</p>
        )}
      </Card>
    </div>
  );
};

export default Dashboard;