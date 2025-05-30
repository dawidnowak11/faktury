import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { Client } from '../../types';
import { clientSchema, ClientFormData } from '../../validation/schemas';

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
  const { t } = useTranslation();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zipCode: initialData?.zipCode || '',
      country: initialData?.country || '',
    }
  });

  const onFormSubmit = (data: ClientFormData) => {
    onSubmit({
      ...initialData,
      ...data
    });
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        label={t('clients.fields.name')}
        error={errors.name && t(errors.name.message as string)}
        {...register('name')}
        fullWidth
      />
      
      <Input
        label={t('clients.fields.email')}
        type="email"
        error={errors.email && t(errors.email.message as string)}
        {...register('email')}
        fullWidth
      />
      
      <Input
        label={t('clients.fields.phone')}
        error={errors.phone && t(errors.phone.message as string)}
        {...register('phone')}
        fullWidth
      />
      
      <Input
        label={t('clients.fields.address')}
        error={errors.address && t(errors.address.message as string)}
        {...register('address')}
        fullWidth
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('clients.fields.city')}
          error={errors.city && t(errors.city.message as string)}
          {...register('city')}
          fullWidth
        />
        
        <Input
          label={t('clients.fields.state')}
          error={errors.state && t(errors.state.message as string)}
          {...register('state')}
          fullWidth
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label={t('clients.fields.zipCode')}
          error={errors.zipCode && t(errors.zipCode.message as string)}
          {...register('zipCode')}
          fullWidth
        />
        
        <Input
          label={t('clients.fields.country')}
          error={errors.country && t(errors.country.message as string)}
          {...register('country')}
          fullWidth
        />
      </div>
      
      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('common.actions.cancel')}
        </Button>
        <Button type="submit" variant="primary">
          {initialData?.id ? t('common.actions.save') : t('common.actions.create')}
        </Button>
      </div>
    </form>
  );
};

export default ClientForm;