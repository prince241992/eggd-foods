
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface OrderBump {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  discount: string;
}

interface OrderBumpItemProps {
  bump: OrderBump;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

const OrderBumpItem = ({ bump, isSelected, onToggle }: OrderBumpItemProps) => {
  return (
    <div 
      className={`border rounded-lg overflow-hidden transition-all ${
        isSelected ? "border-pink-500 shadow-md" : "border-gray-200"
      }`}
    >
      <div className="flex">
        <div className="w-1/4">
          <img 
            src={bump.image} 
            alt={bump.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="p-3 flex-1">
          <div className="flex justify-between">
            <div>
              <h4 className="font-medium">{bump.name}</h4>
              <p className="text-xs text-gray-600">{bump.description}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-pink-600">{bump.price}</p>
              <span className="text-xs font-medium text-red-500">{bump.discount}</span>
            </div>
          </div>
          <div className="mt-2">
            <Button 
              size="sm" 
              variant={isSelected ? "default" : "outline"}
              className={isSelected ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""} 
              onClick={() => onToggle(bump.id)}
            >
              {isSelected ? (
                <>
                  <Check size={14} className="mr-1" /> Added
                </>
              ) : "Add to Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBumpItem;
