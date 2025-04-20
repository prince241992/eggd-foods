
import { CrownIcon, Gift, Clock, BadgePercent } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LoyaltyCardProps {
  points?: number;
  referrals?: number;
  isSubscribed?: boolean;
  subscriptionTier?: string;
}

const LoyaltyCard = ({ 
  points = 35, 
  referrals = 0,
  isSubscribed = false,
  subscriptionTier = ''
}: LoyaltyCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const referralCode = "EGG-" + Math.random().toString(36).substring(2, 8).toUpperCase();
  
  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    
    toast({
      title: "Referral Code Copied!",
      description: "Share this code with your friends to earn points!",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  const pointsToNextReward = 100 - (points % 100);
  const progress = (points % 100);

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl overflow-hidden shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-display">
            Egg'd Rewards 🥚
          </h2>
          {isSubscribed && (
            <div className="flex items-center bg-gradient-to-r from-amber-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs">
              <CrownIcon size={14} className="mr-1" />
              <span>{subscriptionTier} Member</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Points Section */}
          <div className="flex-1">
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-gray-600">Your Points</span>
              <span className="text-sm font-medium">{points} points</span>
            </div>
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-xs text-gray-500 mb-4">
              {pointsToNextReward} more points for free delivery for a year!
            </p>
            
            <div className="bg-white rounded-lg p-3 shadow-sm mb-4">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg mr-3">
                  <Gift className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">How it works</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Earn 1 point for every ₹10 spent. Reach 100 points for 1 year of free delivery!
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Referral Section */}
          <div className="flex-1 border-t md:border-t-0 md:border-l border-pink-200 md:pl-8 pt-4 md:pt-0">
            <h3 className="font-medium text-sm mb-2">Your Referral Code</h3>
            <div className="relative">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="w-full bg-white border border-pink-200 rounded-lg px-3 py-2 text-sm"
              />
              <Button 
                size="sm" 
                variant={copied ? "default" : "outline"}
                className={`absolute right-1 top-1 h-6 text-xs ${copied ? "bg-green-500 hover:bg-green-600" : ""}`}
                onClick={copyReferralCode}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Share this code with friends and earn 20 points per referral!
            </p>
            <div className="mt-3">
              <div className="flex justify-between text-sm">
                <span>Total referrals</span>
                <span className="font-medium">{referrals}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span>Points earned</span>
                <span className="font-medium">{referrals * 20} points</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-pink-200 p-4 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <BadgePercent className="h-4 w-4 text-pink-500 mr-1" />
            <span className="text-sm font-medium">Current Rewards</span>
          </div>
          <Button size="sm" variant="outline" className="h-7 text-xs">
            View All Benefits
          </Button>
        </div>
        <div className="mt-2 space-y-2">
          {[
            { title: "Birthday Special", desc: "Free dessert on your birthday" },
            { title: "Welcome Bonus", desc: "10% off on your first 3 orders" },
          ].map((reward, i) => (
            <div key={i} className="flex items-center text-xs">
              <div className="bg-purple-100 p-1 rounded-full mr-2">
                <Clock className="h-3 w-3 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">{reward.title}</p>
                <p className="text-gray-500">{reward.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyCard;
