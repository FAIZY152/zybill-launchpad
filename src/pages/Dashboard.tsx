import { useState } from "react";
import { useCustomers, useDashboardMetrics } from "@/hooks/use-billing";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CustomerList } from "@/components/dashboard/CustomerList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, DollarSign, AlertTriangle, TrendingUp, Plus, BarChart3 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { customers, loading: customersLoading } = useCustomers();
  const { metrics, loading: metricsLoading } = useDashboardMetrics();
  const [activeTab, setActiveTab] = useState("overview");

  const handleViewCustomer = (customerId: string) => {
    toast({
      title: "Customer details",
      description: "Opening customer detail view.",
    });
  };

  const handleAddCustomer = () => {
    toast({
      title: "Add customer",
      description: "Customer creation form will open.",
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Zybill Dashboard</h1>
              <p className="text-muted-foreground">Manage your billing and customers</p>
            </div>
            <Button onClick={handleAddCustomer}>
              <Plus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {metricsLoading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="metric-card animate-pulse">
                    <div className="h-20"></div>
                  </div>
                ))
              ) : metrics ? (
                <>
                  <MetricCard
                    title="Active Subscriptions"
                    value={metrics.activeSubscriptions}
                    change={{ value: 12, type: 'increase' }}
                    icon={<Users className="w-5 h-5" />}
                  />
                  <MetricCard
                    title="Monthly Recurring Revenue"
                    value={metrics.monthlyRecurringRevenue}
                    formatValue={formatCurrency}
                    change={{ value: 8, type: 'increase' }}
                    icon={<DollarSign className="w-5 h-5" />}
                  />
                  <MetricCard
                    title="Past Due Amount"
                    value={metrics.pastDueAmount}
                    formatValue={formatCurrency}
                    change={{ value: -5, type: 'decrease' }}
                    icon={<AlertTriangle className="w-5 h-5" />}
                  />
                  <MetricCard
                    title="Total Customers"
                    value={metrics.totalCustomers}
                    change={{ value: 15, type: 'increase' }}
                    icon={<TrendingUp className="w-5 h-5" />}
                  />
                </>
              ) : null}
            </div>

            {/* Recent Customer Activity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Recent Customer Activity</h2>
                <Button variant="outline" size="sm" onClick={() => setActiveTab("customers")}>
                  View All Customers
                </Button>
              </div>
              
              <CustomerList 
                customers={customers.slice(0, 5)} 
                loading={customersLoading}
                onViewCustomer={handleViewCustomer}
              />
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">All Customers</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  Export
                </Button>
                <Button onClick={handleAddCustomer}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Customer
                </Button>
              </div>
            </div>
            
            <CustomerList 
              customers={customers} 
              loading={customersLoading}
              onViewCustomer={handleViewCustomer}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold">Analytics & Reports</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="billing-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Revenue Trends</h3>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Revenue chart would go here</p>
                  </div>
                </div>
              </div>
              
              <div className="billing-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Customer Growth</h3>
                  <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Growth chart would go here</p>
                  </div>
                </div>
              </div>
              
              <div className="billing-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Plan Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Professional</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="usage-progress-bg h-2">
                      <div className="usage-progress-fill h-full" style={{ width: '45%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Starter</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="usage-progress-bg h-2">
                      <div className="usage-progress-fill h-full" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Enterprise</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="usage-progress-bg h-2">
                      <div className="usage-progress-fill h-full" style={{ width: '20%' }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="billing-card">
                <div className="space-y-4">
                  <h3 className="font-semibold">Usage Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg API calls/customer</span>
                      <span className="font-medium">3,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Peak usage day</span>
                      <span className="font-medium">Monday</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total API calls</span>
                      <span className="font-medium">847,329</span>
                    </div>
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

export default Dashboard;