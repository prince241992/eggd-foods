
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DeliveryOptionsProps {
  deliveryType: "delivery" | "pickup";
  onDeliveryTypeChange: (value: "delivery" | "pickup") => void;
}

const DeliveryOptions = ({ deliveryType, onDeliveryTypeChange }: DeliveryOptionsProps) => {
  const [zipCode, setZipCode] = useState("");
  const [zipCodeValid, setZipCodeValid] = useState<boolean | null>(null);
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
  const { toast } = useToast();

  const validateZipCode = () => {
    const validZipCodes = {
      "452001": 2.5,
      "452002": 3.8,
      "452003": 5.2,
      "452004": 7.1,
      "452005": 8.9,
      "452006": 4.3,
      "452007": 9.5
    };
    
    const isValid = zipCode in validZipCodes;
    setZipCodeValid(isValid);
    
    if (isValid) {
      const distance = validZipCodes[zipCode];
      setDeliveryDistance(distance);
      
      const fee = distance > 5 ? 85 : 60;
      toast({
        title: "Delivery Available",
        description: `We deliver to your location! (${distance} km, ₹${fee} delivery charge)`,
      });
    } else {
      setDeliveryDistance(null);
      toast({
        title: "Delivery Unavailable",
        description: "Sorry, we don't deliver to this ZIP code yet.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-medium mb-3 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
        Delivery Options
      </h3>
      <RadioGroup value={deliveryType} onValueChange={(value: "delivery" | "pickup") => onDeliveryTypeChange(value)}>
        <div className="flex items-center space-x-2 mb-2">
          <RadioGroupItem value="delivery" id="delivery" className="text-pink-500" />
          <Label htmlFor="delivery">Delivery</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="pickup" id="pickup" className="text-pink-500" />
          <Label htmlFor="pickup">Pickup</Label>
        </div>
      </RadioGroup>
      
      {deliveryType === "delivery" && (
        <div className="mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter ZIP code to check availability"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value);
                setZipCodeValid(null);
                setDeliveryDistance(null);
              }}
              className="w-full px-3 py-2 border rounded-l pr-10"
            />
            {zipCodeValid !== null && (
              <div className={`absolute right-12 top-1/2 transform -translate-y-1/2 ${
                zipCodeValid ? "text-green-500" : "text-red-500"
              }`}>
                {zipCodeValid ? <Check size={16} /> : <X size={16} />}
              </div>
            )}
            <Button 
              className="absolute right-0 top-0 h-full rounded-l-none bg-gradient-to-r from-purple-500 to-pink-500"
              onClick={validateZipCode}
            >
              Check
            </Button>
          </div>
          <p className="text-xs mt-1 text-gray-500">
            Enter your ZIP code to check if delivery is available in your area
          </p>
          {deliveryDistance !== null && (
            <div className="mt-2 text-xs">
              <p className="font-medium text-gray-700">Estimated distance: {deliveryDistance} km</p>
              <p className="text-gray-600">
                {deliveryDistance <= 5 
                  ? "Standard delivery charge: ₹60" 
                  : "Extended delivery charge: ₹85"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DeliveryOptions;
