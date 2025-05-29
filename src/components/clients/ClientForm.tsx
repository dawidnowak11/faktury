import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Client } from '../../types';

interface ClientFormProps {
  initialData?: Partial<Client>;
  onSubmit: (client: Partial<Client>) => void;
  onCancel: () => void;
}

const ClientForm: React.FC<ClientFormProps> = ({
  initialData,
  onSubmit,
  onCancel
}) => {
  const [client, setClient] = useState<Partial<Client>>({
    id: initialData?.id || '',
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
    city: initialData?.city || '',
    state: initialData?.state || '',
    zipCode: initialData?.zipCode || '',
    country: initialData?.country || '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!client.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!client.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(client.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!client.address?.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!client.city?.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!client.state?.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!client.zipCode?.trim()) {
      newErrors.zipCode = 'ZIP Code is required';
    }
    
    if (!client.country?.trim()) {
      newErrors.country = 'Country is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(client);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient(prev => ({ ...prev, [name]: value }));
    
    // Clear the error for this field when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name"
        name="name"
        value={client.name}
        onChange={handleChange}
        error={errors.name}
        fullWidth
      />
      
      <Input
        label="Email"
        name="email"
        type="email"
        value={client.email}
        onChange={handleChange}
        error={errors.email}
        fullWidth
      />
      
      <Input
        label="Phone"
        name="phone"
        value={client.phone}
        onChange={handleChange}
        error={errors.phone}
        fullWidth
      />
      
      <Input
        label="Address"
        name="address"
        value={client.address}
        onChange={handleChange}
        error={errors.address}
        fullWidth
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          name="city"
          value={client.city}
          onChange={handleChange}
          error={errors.city}
          fullWidth
        />
        
        <Input
          label="State/Province"
          name="state"
          value={client.state}
          onChange={handleChange}
          error={errors.state}
          fullWidth
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="ZIP/Postal Code"
          name="zipCode"
          value={client.zipCode}
          onChange={handleChange}
          error={errors.zipCode}
          fullWidth
        />
        
        <Input
          label="Country"
          name="country"
          value={client.country}
          onChange={handleChange}
          error={errors.country}
          fullWidth
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData?.id ? 'Update Client' : 'Add Client'}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;