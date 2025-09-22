import { PaymentMethod } from "@/types/billing";
import { Button } from "@/components/ui/button";
import { CreditCard, Edit } from "lucide-react";

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod | null;
  onUpdate?: () => void;
  loading?: boolean;
}

export const PaymentMethodCard = ({ 
  paymentMethod, 
  onUpdate, 
  loading = false 
}: PaymentMethodCardProps) => {
  const getBrandIcon = (brand: string) => {
    return <CreditCard className="w-5 h-5" />;
  };

  const formatBrand = (brand: string) => {
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };

  return (
    <div className="billing-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Payment Method</h3>
          {onUpdate && (
            <Button variant="outline" size="sm" onClick={onUpdate} disabled={loading}>
              <Edit className="w-4 h-4 mr-2" />
              Update
            </Button>
          )}
        </div>

        {paymentMethod ? (
          <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
            <div className="p-2 bg-background rounded border">
              {getBrandIcon(paymentMethod.brand)}
            </div>
            <div className="flex-1">
              <p className="font-medium">
                {formatBrand(paymentMethod.brand)} •••• {paymentMethod.last4}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires {paymentMethod.expiryMonth.toString().padStart(2, '0')}/{paymentMethod.expiryYear}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-muted/30 rounded-lg text-center">
            <p className="text-muted-foreground">No payment method on file</p>
            {onUpdate && (
              <Button variant="outline" className="mt-2" onClick={onUpdate}>
                Add Payment Method
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};