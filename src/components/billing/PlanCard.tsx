import { Plan, Subscription } from "@/types/billing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  subscription?: Subscription;
  onSelectPlan?: (planId: string) => void;
  isCurrentPlan?: boolean;
  showTrialBadge?: boolean;
}

export const PlanCard = ({ 
  plan, 
  subscription, 
  onSelectPlan, 
  isCurrentPlan = false,
  showTrialBadge = false 
}: PlanCardProps) => {
  const isPopular = plan.id === "professional";
  
  return (
    <div className={`billing-card relative ${isCurrentPlan ? 'ring-2 ring-primary' : ''} ${isPopular ? 'border-primary' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground border-0">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}
      
      {showTrialBadge && plan.trialDays && (
        <div className="absolute -top-3 right-4">
          <Badge variant="secondary" className="status-badge-trial">
            {plan.trialDays} Day Trial
          </Badge>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{plan.name}</h3>
          <p className="text-muted-foreground text-sm mt-1">{plan.description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">${plan.price}</span>
          <span className="text-muted-foreground">/{plan.interval}</span>
        </div>

        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-success flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {onSelectPlan && (
          <Button 
            onClick={() => onSelectPlan(plan.id)}
            variant={isCurrentPlan ? "secondary" : "default"}
            className="w-full"
            disabled={isCurrentPlan}
          >
            {isCurrentPlan ? "Current Plan" : `Choose ${plan.name}`}
          </Button>
        )}

        {subscription && isCurrentPlan && (
          <div className="text-center pt-2">
            <Badge className="status-badge-active">
              Active
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};