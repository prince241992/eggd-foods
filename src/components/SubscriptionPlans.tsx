
import { useState } from "react";
import { Check, Star, ArrowRight, Crown, ShieldCheck, Gift, Truck, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SubscriptionPlans = () => {
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleSubscribe = (plan: string) => {
    setActivePlan(plan);
    toast({
      title: `Subscribed to ${plan}!`,
      description: "Thank you for subscribing to our service.",
    });
  };
  
  const plans = [
    {
      id: "micro",
      name: "Micro Plan",
      price: "₹99",
      period: "/month",
      description: "Perfect for occasional orders",
      features: [
        "Free delivery on all orders",
        "Priority delivery",
        "Monthly lucky draw entry",
        "Early access to new items"
      ],
      highlight: false,
      color: "from-purple-500 to-pink-500",
      icon: <Truck className="h-5 w-5 text-white" />
    },
    {
      id: "gold",
      name: "Egg'd Gold",
      price: "₹399",
      period: "/year",
      description: "The ultimate Egg'd experience",
      features: [
        "All Micro Plan benefits",
        "Loyalty points multiplier (x2)",
        "Exclusive seasonal promotions",
        "Free add-ons on your birthday",
        "Dedicated customer support"
      ],
      highlight: true,
      color: "from-amber-400 to-amber-600",
      icon: <Crown className="h-5 w-5 text-white" />
    }
  ];
  
  return (
    <div className="py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold font-display mb-4 text-center">
          <span className="gradient-text">Subscription</span> Plans
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Become a premium member and enjoy exclusive benefits with our subscription plans.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`overflow-hidden transition-all ${
              plan.highlight 
                ? "border-2 border-amber-500 shadow-xl" 
                : "border border-gray-200"
            }`}
          >
            {plan.highlight && (
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 text-white text-center py-1 text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-display">
                    {plan.name}
                  </h3>
                  <div className="mt-1 flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 text-sm ml-1">{plan.period}</span>
                  </div>
                </div>
                <div className={`rounded-full p-3 bg-gradient-to-r ${plan.color}`}>
                  {plan.icon}
                </div>
              </div>
              
              <p className="mt-4 text-gray-600 text-sm">{plan.description}</p>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">What's included:</h4>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mr-2" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                className={`w-full mt-8 ${
                  plan.highlight 
                    ? "bg-gradient-to-r from-amber-400 to-amber-600" 
                    : "bg-gradient-to-r from-purple-500 to-pink-500"
                }`}
                onClick={() => handleSubscribe(plan.name)}
              >
                Subscribe Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-gray-500 mt-2 text-center">
                Cancel anytime. No hidden fees.
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
