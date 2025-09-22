import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  icon?: React.ReactNode;
  formatValue?: (value: number) => string;
}

export const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon,
  formatValue 
}: MetricCardProps) => {
  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="w-4 h-4" />;
      case 'decrease':
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Minus className="w-4 h-4" />;
    }
  };

  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-success';
      case 'decrease':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDisplayValue = (val: string | number) => {
    if (formatValue && typeof val === 'number') {
      return formatValue(val);
    }
    return val;
  };

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{formatDisplayValue(value)}</p>
          
          {change && (
            <div className={`flex items-center gap-1 text-sm ${getChangeColor(change.type)}`}>
              {getChangeIcon(change.type)}
              <span>
                {change.value > 0 ? '+' : ''}{change.value}%
              </span>
              <span className="text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};