import React, { useState } from 'react';
import { Plus, Users, Search } from 'lucide-react';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import EmptyState from '../components/ui/EmptyState';
import ClientForm from '../components/clients/ClientForm';
import { clients } from '../data/mockData';
import { formatDate } from '../utils/formatters';
import { formatPhoneNumber, generateId } from '../utils/helpers';
import { Client } from '../types';

const ClientsList: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [clientsList, setClientsList] = useState([...clients]);
  
  // Filter clients by search query
  const filteredClients = searchQuery
    ? clientsList.filter(client => 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : clientsList;
  
  // Table columns
  const columns = [
    { 
      header: 'Name', 
      accessor: 'name',
      className: 'font-medium' 
    },
    { 
      header: 'Email', 
      accessor: 'email'
    },
    { 
      header: 'Phone', 
      accessor: (client: Client) => client.phone ? formatPhoneNumber(client.phone) : '-'
    },
    { 
      header: 'Location', 
      accessor: (client: Client) => `${client.city}, ${client.state}`
    },
    { 
      header: 'Created', 
      accessor: (client: Client) => formatDate(client.createdAt)
    },
    { 
      header: 'Actions', 
      accessor: (client: Client) => (
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClient(client);
            }}
          >
            Edit
          </Button>
          <Button 
            size="sm" 
            variant="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClient(client.id);
            }}
          >
            Delete
          </Button>
        </div>
      )
    }
  ];
  
  // Open modal for creating a new client
  const handleCreateClient = () => {
    setEditingClient(null);
    setModalOpen(true);
  };
  
  // Open modal for editing an existing client
  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setModalOpen(true);
  };
  
  // Delete a client
  const handleDeleteClient = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setClientsList(prevClients => prevClients.filter(client => client.id !== id));
    }
  };
  
  // Handle form submission (create/update)
  const handleSubmit = (clientData: Partial<Client>) => {
    if (editingClient) {
      // Update existing client
      setClientsList(prevClients => 
        prevClients.map(client => 
          client.id === editingClient.id ? { ...client, ...clientData } : client
        )
      );
    } else {
      // Create new client
      const newClient: Client = {
        ...clientData as Omit<Client, 'id' | 'createdAt'>,
        id: generateId(),
        createdAt: new Date(),
      } as Client;
      
      setClientsList(prevClients => [...prevClients, newClient]);
    }
    
    setModalOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clients</h1>
        <Button 
          variant="primary"
          icon={<Plus size={16} />}
          onClick={handleCreateClient}
        >
          New Client
        </Button>
      </div>
      
      <Card>
        <div className="mb-4">
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search size={16} className="text-gray-400" />}
            fullWidth
          />
        </div>
        
        {clientsList.length === 0 ? (
          <EmptyState
            title="No clients yet"
            description="Add your first client to get started."
            icon={<Users size={48} />}
            action={{
              label: 'Add Client',
              onClick: handleCreateClient
            }}
          />
        ) : (
          <>
            <Table
              columns={columns}
              data={filteredClients}
              keyExtractor={(item) => item.id}
              onRowClick={(client) => handleEditClient(client)}
              emptyMessage="No clients match your search"
            />
            
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredClients.length} of {clientsList.length} clients
            </div>
          </>
        )}
      </Card>
      
      {/* Client Form Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingClient ? 'Edit Client' : 'Add New Client'}
        size="lg"
      >
        <ClientForm
          initialData={editingClient || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ClientsList;