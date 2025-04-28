
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

interface OrderBumpsProps {
  orderBumpItems: OrderBump[];
  selectedOrderBumps: number[];
  onToggleOrderBump: (id: number) => void;
}

const OrderBumps = ({ orderBumpItems, selectedOrderBumps, onToggleOrderBump }: OrderBumpsProps) => {
  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="font-medium mb-3 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
        Recommended Add-ons
      </h3>
      <div className="space-y-3">
        {orderBumpItems.map(bump => (
          <div 
            key={bump.id}
            className={`border rounded-lg overflow-hidden transition-all ${
              selectedOrderBumps.includes(bump.id) ? "border-pink-500 shadow-md" : "border-gray-200"
            }`}
          >
            <div className="flex">
              <div className="w-1/4">
                <img src={bump.image} alt={bump.name} className="w-full h-full object-cover" />
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
                    variant={selectedOrderBumps.includes(bump.id) ? "default" : "outline"}
                    className={selectedOrderBumps.includes(bump.id) ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""} 
                    onClick={() => onToggleOrderBump(bump.id)}
                  >
                    {selectedOrderBumps.includes(bump.id) ? (
                      <>
                        <Check size={14} className="mr-1" /> Added
                      </>
                    ) : "Add to Order"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBumps;
