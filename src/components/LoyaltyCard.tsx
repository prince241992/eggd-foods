
import { CreditCard, Gift, Crown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface LoyaltyCardProps {
  customerName: string;
  points: number;
  memberSince: string;
  tier: "Bronze" | "Silver" | "Gold";
}

const LoyaltyCard = ({ 
  customerName = "John Doe", 
  points = 250, 
  memberSince = "April 2025",
  tier = "Bronze"
}: LoyaltyCardProps) => {
  const maxPoints = 1000;
  const percentage = (points / maxPoints) * 100;
  
  const tierColors = {
    Bronze: {
      bg: "from-amber-200 to-amber-400",
      text: "text-amber-900",
      border: "border-amber-500"
    },
    Silver: {
      bg: "from-slate-300 to-slate-400",
      text: "text-slate-900",
      border: "border-slate-500"
    },
    Gold: {
      bg: "from-yellow-200 to-yellow-400",
      text: "text-yellow-900",
      border: "border-yellow-500"
    }
  };
  
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${tierColors[tier].bg} p-6 shadow-lg border ${tierColors[tier].border}`}>
      <div className="absolute top-0 right-0 p-2">
        <div className={`rounded-full ${tierColors[tier].text} font-bold flex items-center gap-1 px-3 py-1 bg-white bg-opacity-80`}>
          <Crown size={16} />
          <span>{tier}</span>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <CreditCard className="h-8 w-8 mr-3 text-white" />
        <div>
          <h3 className="font-bold text-xl text-white">Egg'd Loyalty</h3>
          <p className="text-sm text-white text-opacity-90">Member since {memberSince}</p>
        </div>
      </div>
      
      <p className="text-lg font-medium text-white mb-1">{customerName}</p>
      
      <div className="mt-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-white">Current Points</span>
          <span className="font-medium text-white">{points} / {maxPoints}</span>
        </div>
        <Progress value={percentage} className="h-2 bg-white bg-opacity-30" />
        <p className="text-xs mt-2 text-white">Earn 1 point for every ₹10 spent. Reach 1000 points for 1 year of free delivery!</p>
      </div>
      
      <div className="mt-4 flex items-center">
        <Gift className="h-4 w-4 mr-1 text-white" />
        <span className="text-sm text-white">Rewards available</span>
      </div>
    </div>
  );
};

export default LoyaltyCard;
