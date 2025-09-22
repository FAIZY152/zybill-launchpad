import { useState, useEffect } from "react";
import { Customer, Plan, Invoice, DashboardMetrics, PaymentMethod } from "@/types/billing";
import { mockCustomers, mockPlans, mockInvoices, mockDashboardMetrics, mockPaymentMethod } from "@/lib/mock-data";
import { toast } from "@/hooks/use-toast";

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomers = async () => {
      await delay(300);
      setCustomers(mockCustomers);
      setLoading(false);
    };
    loadCustomers();
  }, []);

  return { customers, loading };
};

export const useCustomer = (customerId: string) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCustomer = async () => {
      await delay(200);
      const found = mockCustomers.find(c => c.id === customerId);
      setCustomer(found || null);
      setLoading(false);
    };
    loadCustomer();
  }, [customerId]);

  return { customer, loading };
};

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      await delay(200);
      setPlans(mockPlans);
      setLoading(false);
    };
    loadPlans();
  }, []);

  return { plans, loading };
};

export const useInvoices = (customerId?: string) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      await delay(250);
      const filtered = customerId 
        ? mockInvoices.filter(inv => inv.customerId === customerId)
        : mockInvoices;
      setInvoices(filtered);
      setLoading(false);
    };
    loadInvoices();
  }, [customerId]);

  return { invoices, loading };
};

export const usePaymentMethod = () => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPaymentMethod = async () => {
      await delay(150);
      setPaymentMethod(mockPaymentMethod);
      setLoading(false);
    };
    loadPaymentMethod();
  }, []);

  const updatePaymentMethod = async (data: Partial<PaymentMethod>) => {
    await delay(500);
    setPaymentMethod(prev => prev ? { ...prev, ...data } : null);
    toast({
      title: "Payment method updated",
      description: "Your payment method has been successfully updated.",
    });
  };

  return { paymentMethod, loading, updatePaymentMethod };
};

export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      await delay(300);
      setMetrics(mockDashboardMetrics);
      setLoading(false);
    };
    loadMetrics();
  }, []);

  return { metrics, loading };
};

export const useAddCustomer = () => {
  const [loading, setLoading] = useState(false);

  const addCustomer = async (customerData: { name: string; email: string }) => {
    setLoading(true);
    await delay(800);
    
    toast({
      title: "Customer created",
      description: `${customerData.name} has been added successfully.`,
    });
    
    setLoading(false);
    return { id: `cust_${Date.now()}`, ...customerData };
  };

  return { addCustomer, loading };
};

export const useStartSubscription = () => {
  const [loading, setLoading] = useState(false);

  const startSubscription = async (data: { customerId: string; planId: string }) => {
    setLoading(true);
    await delay(1000);
    
    toast({
      title: "Subscription started",
      description: "The subscription has been activated successfully.",
    });
    
    setLoading(false);
    return { success: true };
  };

  return { startSubscription, loading };
};

export const useRecordUsage = () => {
  const [loading, setLoading] = useState(false);

  const recordUsage = async (data: { customerId: string; units: number }) => {
    setLoading(true);
    await delay(400);
    
    toast({
      title: "Usage recorded",
      description: `${data.units} units have been recorded.`,
    });
    
    setLoading(false);
    return { success: true };
  };

  return { recordUsage, loading };
};