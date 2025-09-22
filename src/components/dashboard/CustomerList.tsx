import { useState } from "react";
import { Customer } from "@/types/billing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Mail } from "lucide-react";

interface CustomerListProps {
  customers: Customer[];
  loading?: boolean;
  onViewCustomer?: (customerId: string) => void;
}

export const CustomerList = ({ 
  customers, 
  loading = false, 
  onViewCustomer 
}: CustomerListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status: Customer['status']) => {
    switch (status) {
      case 'active':
        return 'status-badge-active';
      case 'trial':
        return 'status-badge-trial';
      case 'overdue':
        return 'status-badge-overdue';
      default:
        return 'status-badge-trial';
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="billing-card animate-pulse">
            <div className="h-4 bg-muted rounded w-1/3 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-2">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="billing-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="font-semibold">{customer.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span>{customer.email}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={getStatusBadgeClass(customer.status)}>
                    {customer.status}
                  </Badge>
                  
                  {customer.subscription && (
                    <Badge variant="outline" className="text-xs">
                      {customer.subscription.usage.current.toLocaleString()} / {
                        customer.subscription.usage.limit === 999999 
                          ? "∞" 
                          : customer.subscription.usage.limit.toLocaleString()
                      }
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="text-right text-sm">
                  <p className="text-muted-foreground">
                    Member since {new Date(customer.createdAt).toLocaleDateString()}
                  </p>
                  {customer.subscription && (
                    <p className="font-medium">
                      ${customer.subscription.planId === 'starter' ? '29' : 
                        customer.subscription.planId === 'professional' ? '99' : '299'}/mo
                    </p>
                  )}
                </div>
                
                {onViewCustomer && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onViewCustomer(customer.id)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            {searchTerm ? 'No customers found matching your search.' : 'No customers yet.'}
          </div>
        )}
      </div>
    </div>
  );
};