import { Invoice } from "@/types/billing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";

interface InvoiceCardProps {
  invoice: Invoice;
  onDownload?: (invoiceId: string) => void;
  onView?: (invoiceId: string) => void;
  compact?: boolean;
}

export const InvoiceCard = ({ 
  invoice, 
  onDownload, 
  onView, 
  compact = false 
}: InvoiceCardProps) => {
  const getStatusBadgeClass = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return 'status-badge-active';
      case 'pending':
        return 'status-badge-trial';
      case 'overdue':
        return 'status-badge-overdue';
      default:
        return 'status-badge-trial';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy');
  };

  if (compact) {
    return (
      <div className="invoice-row flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-medium">{invoice.number}</p>
            <p className="text-sm text-muted-foreground">
              {formatDate(invoice.issueDate)}
            </p>
          </div>
          <Badge className={getStatusBadgeClass(invoice.status)}>
            {invoice.status}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold">${invoice.amount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">
              Due {formatDate(invoice.dueDate)}
            </p>
          </div>
          
          <div className="flex gap-2">
            {onView && (
              <Button variant="outline" size="sm" onClick={() => onView(invoice.id)}>
                <Eye className="w-4 h-4" />
              </Button>
            )}
            {onDownload && (
              <Button variant="outline" size="sm" onClick={() => onDownload(invoice.id)}>
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="billing-card">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{invoice.number}</h3>
            <Badge className={getStatusBadgeClass(invoice.status)}>
              {invoice.status}
            </Badge>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">${invoice.amount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">{invoice.currency}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Issue Date</p>
              <p className="font-medium">{formatDate(invoice.issueDate)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Due Date</p>
              <p className="font-medium">{formatDate(invoice.dueDate)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Items</h4>
          {invoice.items.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-sm p-2 bg-muted/30 rounded">
              <span>{item.description}</span>
              <span className="font-medium">${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-2">
          {onView && (
            <Button variant="outline" onClick={() => onView(invoice.id)}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          )}
          {onDownload && (
            <Button onClick={() => onDownload(invoice.id)}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};