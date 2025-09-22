import { Usage } from "@/types/billing";
import { AlertTriangle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UsageMeterProps {
  usage: Usage;
  showDetails?: boolean;
}

export const UsageMeter = ({ usage, showDetails = true }: UsageMeterProps) => {
  const isWarning = usage.percentage >= 80;
  const isNearLimit = usage.percentage >= 90;
  
  return (
    <div className="billing-card">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Usage This Period</h3>
          {isWarning && (
            <Badge className={isNearLimit ? "status-badge-overdue" : "status-badge-trial"}>
              {isNearLimit && <AlertTriangle className="w-3 h-3 mr-1" />}
              {isNearLimit ? "Near Limit" : "High Usage"}
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{usage.period}</span>
            <span className="font-medium">
              {usage.current.toLocaleString()} / {usage.limit === 999999 ? "Unlimited" : usage.limit.toLocaleString()}
            </span>
          </div>
          
          {usage.limit !== 999999 && (
            <div className="usage-progress-bg h-3">
              <div 
                className="usage-progress-fill h-full animate-progress-fill"
                style={{ 
                  width: `${Math.min(usage.percentage, 100)}%`,
                  '--progress-width': `${Math.min(usage.percentage, 100)}%`
                } as React.CSSProperties}
              />
            </div>
          )}
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {usage.percentage.toFixed(1)}% used
            </span>
            {showDetails && (
              <div className="flex items-center gap-1 text-success">
                <TrendingUp className="w-3 h-3" />
                <span>On track</span>
              </div>
            )}
          </div>
        </div>

        {showDetails && isWarning && (
          <div className="mt-4 p-3 bg-warning-muted border border-warning/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-warning">Usage Warning</p>
                <p className="text-warning/80">
                  You're approaching your usage limit. Consider upgrading your plan to avoid service interruption.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};