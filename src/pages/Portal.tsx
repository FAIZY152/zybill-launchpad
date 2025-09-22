import { useState } from "react";
import { useCustomer, useInvoices, usePaymentMethod, usePlans } from "@/hooks/use-billing";
import { PlanCard } from "@/components/billing/PlanCard";
import { UsageMeter } from "@/components/billing/UsageMeter";
import { InvoiceCard } from "@/components/billing/InvoiceCard";
import { PaymentMethodCard } from "@/components/billing/PaymentMethodCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, FileText, TrendingUp, Settings, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Portal = () => {
  // Mock current customer ID - in real app this would come from auth
  const customerId = "cust_1";
  
  const { customer, loading: customerLoading } = useCustomer(customerId);
  const { invoices, loading: invoicesLoading } = useInvoices(customerId);
  const { paymentMethod, loading: paymentLoading, updatePaymentMethod } = usePaymentMethod();
  const { plans, loading: plansLoading } = usePlans();
  
  const [activeTab, setActiveTab] = useState("overview");

  const currentPlan = plans.find(plan => plan.id === customer?.subscription?.planId);

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download started",
      description: "Your invoice PDF is being prepared for download.",
    });
  };

  const handleViewInvoice = (invoiceId: string) => {
    toast({
      title: "Opening invoice",
      description: "Invoice details will open in a new tab.",
    });
  };

  const handleUpdatePaymentMethod = () => {
    toast({
      title: "Payment method",
      description: "Secure payment form will open.",
    });
  };

  if (customerLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid gap-6">
              <div className="h-48 bg-muted rounded"></div>
              <div className="h-32 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Customer not found</h1>
          <p className="text-muted-foreground">Please check your access credentials.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Zybill Portal</h1>
              <p className="text-muted-foreground">Welcome back, {customer.name}</p>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Invoices
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Payment
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Current Plan */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Current Plan</h2>
                {currentPlan && (
                  <PlanCard 
                    plan={currentPlan} 
                    subscription={customer.subscription}
                    isCurrentPlan={true}
                    showTrialBadge={customer.subscription?.status === 'trial'}
                  />
                )}
              </div>

              {/* Usage Meter */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Usage</h2>
                {customer.subscription && (
                  <UsageMeter usage={customer.subscription.usage} />
                )}
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Invoices</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("invoices")}>
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {invoices.slice(0, 2).map((invoice) => (
                  <InvoiceCard 
                    key={invoice.id}
                    invoice={invoice}
                    onDownload={handleDownloadInvoice}
                    onView={handleViewInvoice}
                    compact={true}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Invoices</h2>
            </div>
            
            {invoicesLoading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="billing-card animate-pulse">
                    <div className="h-20"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <InvoiceCard 
                    key={invoice.id}
                    invoice={invoice}
                    onDownload={handleDownloadInvoice}
                    onView={handleViewInvoice}
                    compact={true}
                  />
                ))}
                
                {invoices.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No invoices found.
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="payment" className="space-y-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <div className="max-w-md">
              <PaymentMethodCard 
                paymentMethod={paymentMethod}
                onUpdate={handleUpdatePaymentMethod}
                loading={paymentLoading}
              />
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-xl font-semibold">Account Settings</h2>
            <div className="space-y-6 max-w-2xl">
              <div className="billing-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Account Information</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Company Name</label>
                      <p className="font-medium">{customer.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p className="font-medium">{customer.email}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Member Since</label>
                      <p className="font-medium">{new Date(customer.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <Button variant="outline">
                    Update Information
                  </Button>
                </div>
              </div>

              <div className="billing-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Plan Management</h3>
                  <p className="text-muted-foreground">
                    Change your plan or cancel your subscription.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      Change Plan
                    </Button>
                    <Button variant="destructive">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portal;