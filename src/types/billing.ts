export interface Customer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'trial' | 'overdue' | 'cancelled';
  createdAt: string;
  subscription?: Subscription;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  usageLimit?: number;
  trialDays?: number;
}

export interface Subscription {
  id: string;
  customerId: string;
  planId: string;
  status: 'active' | 'trial' | 'past_due' | 'cancelled';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEnd?: string;
  usage: Usage;
}

export interface Usage {
  current: number;
  limit: number;
  period: string;
  percentage: number;
}

export interface Invoice {
  id: string;
  customerId: string;
  number: string;
  status: 'paid' | 'pending' | 'overdue';
  amount: number;
  currency: string;
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
}

export interface DashboardMetrics {
  activeSubscriptions: number;
  monthlyRecurringRevenue: number;
  pastDueAmount: number;
  totalCustomers: number;
}