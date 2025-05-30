export default {
  common: {
    actions: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      create: 'Create',
      back: 'Back'
    },
    status: {
      draft: 'Draft',
      sent: 'Sent',
      paid: 'Paid',
      overdue: 'Overdue',
      cancelled: 'Cancelled'
    }
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    number: 'Please enter a valid number',
    min: 'Value must be at least {{min}}',
    max: 'Value must be at most {{max}}',
    positive: 'Value must be positive'
  },
  header: {
    language: 'Language',
    theme: 'Theme'
  },
  nav: {
    dashboard: 'Dashboard',
    invoices: 'Invoices',
    clients: 'Clients',
    reports: 'Reports'
  },
  dashboard: {
    title: 'Dashboard',
    stats: {
      totalInvoices: 'Total Invoices',
      unpaidInvoices: 'Unpaid Invoices',
      activeClients: 'Active Clients',
      totalRevenue: 'Total Revenue'
    }
  },
  invoices: {
    title: 'Invoices',
    new: 'New Invoice',
    details: 'Invoice Details',
    fields: {
      number: 'Invoice Number',
      client: 'Client',
      issueDate: 'Issue Date',
      dueDate: 'Due Date',
      amount: 'Amount',
      status: 'Status',
      items: 'Items',
      subtotal: 'Subtotal',
      tax: 'Tax',
      total: 'Total',
      notes: 'Notes'
    }
  },
  clients: {
    title: 'Clients',
    new: 'New Client',
    fields: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code',
      country: 'Country'
    }
  }
};