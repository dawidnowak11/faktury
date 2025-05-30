import { z } from 'zod';

export const clientSchema = z.object({
  name: z.string().min(1, { message: 'validation.required' }),
  email: z.string().email({ message: 'validation.email' }),
  phone: z.string().optional(),
  address: z.string().min(1, { message: 'validation.required' }),
  city: z.string().min(1, { message: 'validation.required' }),
  state: z.string().min(1, { message: 'validation.required' }),
  zipCode: z.string().min(1, { message: 'validation.required' }),
  country: z.string().min(1, { message: 'validation.required' })
});

export const invoiceItemSchema = z.object({
  description: z.string().min(1, { message: 'validation.required' }),
  quantity: z.number().positive({ message: 'validation.positive' }),
  unitPrice: z.number().positive({ message: 'validation.positive' }),
  amount: z.number().positive({ message: 'validation.positive' })
});

export const invoiceSchema = z.object({
  clientId: z.string().min(1, { message: 'validation.required' }),
  issueDate: z.date(),
  dueDate: z.date(),
  items: z.array(invoiceItemSchema).min(1, { message: 'validation.required' }),
  taxRate: z.number().min(0).max(1),
  notes: z.string().optional()
});

export type ClientFormData = z.infer<typeof clientSchema>;
export type InvoiceFormData = z.infer<typeof invoiceSchema>;