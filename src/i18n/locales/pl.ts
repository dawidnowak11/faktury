export default {
  common: {
    actions: {
      save: 'Zapisz',
      cancel: 'Anuluj',
      edit: 'Edytuj',
      delete: 'Usuń',
      create: 'Utwórz',
      back: 'Wstecz'
    },
    status: {
      draft: 'Szkic',
      sent: 'Wysłano',
      paid: 'Opłacono',
      overdue: 'Zaległa',
      cancelled: 'Anulowano'
    }
  },
  validation: {
    required: 'To pole jest wymagane',
    email: 'Wprowadź poprawny adres email',
    phone: 'Wprowadź poprawny numer telefonu',
    number: 'Wprowadź poprawną liczbę',
    min: 'Wartość musi być co najmniej {{min}}',
    max: 'Wartość musi być co najwyżej {{max}}',
    positive: 'Wartość musi być dodatnia'
  },
  header: {
    language: 'Język',
    theme: 'Motyw'
  },
  nav: {
    dashboard: 'Panel',
    invoices: 'Faktury',
    clients: 'Klienci',
    reports: 'Raporty'
  },
  dashboard: {
    title: 'Panel',
    stats: {
      totalInvoices: 'Wszystkie faktury',
      unpaidInvoices: 'Nieopłacone faktury',
      activeClients: 'Aktywni klienci',
      totalRevenue: 'Całkowity przychód'
    }
  },
  invoices: {
    title: 'Faktury',
    new: 'Nowa faktura',
    details: 'Szczegóły faktury',
    fields: {
      number: 'Numer faktury',
      client: 'Klient',
      issueDate: 'Data wystawienia',
      dueDate: 'Termin płatności',
      amount: 'Kwota',
      status: 'Status',
      items: 'Pozycje',
      subtotal: 'Suma częściowa',
      tax: 'Podatek',
      total: 'Suma',
      notes: 'Uwagi'
    }
  },
  clients: {
    title: 'Klienci',
    new: 'Nowy klient',
    fields: {
      name: 'Nazwa',
      email: 'Email',
      phone: 'Telefon',
      address: 'Adres',
      city: 'Miasto',
      state: 'Województwo',
      zipCode: 'Kod pocztowy',
      country: 'Kraj'
    }
  }
};