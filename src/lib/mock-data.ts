import { Customer, Plan, Invoice, DashboardMetrics, PaymentMethod } from "@/types/billing";

export const mockPlans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: 29,
    interval: "month",
    features: ["Up to 1,000 API calls", "Basic support", "Dashboard access"],
    usageLimit: 1000,
    trialDays: 14,
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing businesses",
    price: 99,
    interval: "month",
    features: ["Up to 10,000 API calls", "Priority support", "Advanced analytics", "Custom integrations"],
    usageLimit: 10000,
    trialDays: 14,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large-scale operations",
    price: 299,
    interval: "month",
    features: ["Unlimited API calls", "24/7 dedicated support", "Custom SLA", "On-premise deployment"],
    trialDays: 30,
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "cust_1",
    name: "Acme Corporation",
    email: "billing@acme.com",
    status: "active",
    createdAt: "2024-01-15T00:00:00Z",
    subscription: {
      id: "sub_1",
      customerId: "cust_1",
      planId: "professional",
      status: "active",
      currentPeriodStart: "2024-08-01T00:00:00Z",
      currentPeriodEnd: "2024-09-01T00:00:00Z",
      usage: {
        current: 7524,
        limit: 10000,
        period: "August 2024",
        percentage: 75.24,
      },
    },
  },
  {
    id: "cust_2",
    name: "TechStart Inc",
    email: "admin@techstart.io",
    status: "trial",
    createdAt: "2024-08-10T00:00:00Z",
    subscription: {
      id: "sub_2",
      customerId: "cust_2",
      planId: "starter",
      status: "trial",
      currentPeriodStart: "2024-08-10T00:00:00Z",
      currentPeriodEnd: "2024-09-10T00:00:00Z",
      trialEnd: "2024-08-24T00:00:00Z",
      usage: {
        current: 234,
        limit: 1000,
        period: "August 2024",
        percentage: 23.4,
      },
    },
  },
  {
    id: "cust_3",
    name: "Global Solutions Ltd",
    email: "finance@globalsolutions.com",
    status: "overdue",
    createdAt: "2023-11-03T00:00:00Z",
    subscription: {
      id: "sub_3",
      customerId: "cust_3",
      planId: "enterprise",
      status: "past_due",
      currentPeriodStart: "2024-07-01T00:00:00Z",
      currentPeriodEnd: "2024-08-01T00:00:00Z",
      usage: {
        current: 45230,
        limit: 999999,
        period: "July 2024",
        percentage: 4.52,
      },
    },
  },
];

export const mockInvoices: Invoice[] = [
  {
    id: "inv_1",
    customerId: "cust_1",
    number: "ZB-2024-0001",
    status: "paid",
    amount: 99.00,
    currency: "USD",
    issueDate: "2024-08-01T00:00:00Z",
    dueDate: "2024-08-15T00:00:00Z",
    paidAt: "2024-08-03T00:00:00Z",
    items: [
      {
        description: "Professional Plan - August 2024",
        quantity: 1,
        unitPrice: 99.00,
        amount: 99.00,
      },
    ],
  },
  {
    id: "inv_2",
    customerId: "cust_1",
    number: "ZB-2024-0002",
    status: "paid",
    amount: 99.00,
    currency: "USD",
    issueDate: "2024-07-01T00:00:00Z",
    dueDate: "2024-07-15T00:00:00Z",
    paidAt: "2024-07-02T00:00:00Z",
    items: [
      {
        description: "Professional Plan - July 2024",
        quantity: 1,
        unitPrice: 99.00,
        amount: 99.00,
      },
    ],
  },
  {
    id: "inv_3",
    customerId: "cust_3",
    number: "ZB-2024-0003",
    status: "overdue",
    amount: 299.00,
    currency: "USD",
    issueDate: "2024-07-01T00:00:00Z",
    dueDate: "2024-07-15T00:00:00Z",
    items: [
      {
        description: "Enterprise Plan - July 2024",
        quantity: 1,
        unitPrice: 299.00,
        amount: 299.00,
      },
    ],
  },
];

export const mockPaymentMethod: PaymentMethod = {
  id: "pm_1",
  type: "card",
  last4: "4242",
  brand: "visa",
  expiryMonth: 12,
  expiryYear: 2027,
};

export const mockDashboardMetrics: DashboardMetrics = {
  activeSubscriptions: 156,
  monthlyRecurringRevenue: 24650,
  pastDueAmount: 1847,
  totalCustomers: 203,
};