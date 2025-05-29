import React from 'react';
import { BarChart2, TrendingUp, DollarSign } from 'lucide-react';
import Card from '../components/ui/Card';
import { invoices } from '../data/mockData';
import { formatCurrency } from '../utils/formatters';

const Reports: React.FC = () => {
  // Calculate monthly revenue data
  const getMonthlyRevenue = () => {
    const monthlyData: Record<string, number> = {};
    
    invoices.forEach(invoice => {
      if (invoice.status === 'paid') {
        const month = new Date(invoice.issueDate).toLocaleString('default', { month: 'long' });
        monthlyData[month] = (monthlyData[month] || 0) + invoice.total;
      }
    });
    
    return monthlyData;
  };
  
  // Calculate revenue by client
  const getRevenueByClient = () => {
    const clientData: Record<string, number> = {};
    
    invoices.forEach(invoice => {
      if (invoice.status === 'paid') {
        clientData[invoice.client.name] = (clientData[invoice.client.name] || 0) + invoice.total;
      }
    });
    
    return Object.entries(clientData)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };
  
  // Calculate payment status distribution
  const getPaymentStatusDistribution = () => {
    const statusCount: Record<string, number> = {
      paid: 0,
      pending: 0,
      overdue: 0
    };
    
    invoices.forEach(invoice => {
      if (invoice.status === 'paid') statusCount.paid++;
      else if (invoice.status === 'sent') statusCount.pending++;
      else if (invoice.status === 'overdue') statusCount.overdue++;
    });
    
    return statusCount;
  };
  
  const monthlyRevenue = getMonthlyRevenue();
  const topClients = getRevenueByClient();
  const statusDistribution = getPaymentStatusDistribution();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Monthly Revenue */}
        <Card title="Monthly Revenue">
          <div className="space-y-4">
            {Object.entries(monthlyRevenue).map(([month, amount]) => (
              <div key={month} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{month}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Top Clients by Revenue */}
        <Card title="Top Clients by Revenue">
          <div className="space-y-4">
            {topClients.map(([client, revenue]) => (
              <div key={client} className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">{client}</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{formatCurrency(revenue)}</span>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Payment Status Distribution */}
        <Card title="Payment Status Distribution">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Paid</span>
              <span className="font-medium text-green-600 dark:text-green-400">{statusDistribution.paid} invoices</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pending</span>
              <span className="font-medium text-yellow-600 dark:text-yellow-400">{statusDistribution.pending} invoices</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Overdue</span>
              <span className="font-medium text-red-600 dark:text-red-400">{statusDistribution.overdue} invoices</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;