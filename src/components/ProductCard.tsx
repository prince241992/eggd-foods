import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AddOn {
  name: string;
  price: string;
}

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  addOns?: AddOn[];
  className?: string;
}

const ProductCard = ({ name, description, price, image, popular, addOns, className }: ProductCardProps) => {
  const [showAddOns, setShowAddOns] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const { toast } = useToast();

  const toggleAddOn = (addon: AddOn) => {
    if (selectedAddOns.some(item => item.name === addon.name)) {
      setSelectedAddOns(selectedAddOns.filter(item => item.name !== addon.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const addToCart = () => {
    const currentHour = new Date().getHours();
    const isCodAvailable = currentHour >= 8 && currentHour < 18;
    
    toast({
      title: "Added to Cart! 🍳",
      description: `${name} with ${selectedAddOns.length} add-ons has been added to your cart${!isCodAvailable ? "\nNote: Cash on Delivery available only from 8 AM to 6 PM" : ""}`,
      duration: 3000,
    });
    
    console.log("Added to cart:", { name, price, selectedAddOns });
    setShowAddOns(false);
    setSelectedAddOns([]);
  };

  return (
    <div className={cn(
      "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
      "transform scale-85", // Increased size by 10% from previous 75%
      className
    )}>
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-45 object-cover" // Reduced height from h-60
        />
        {popular && (
          <span className="absolute top-3 right-3 bg-spice-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Popular
          </span>
        )}
      </div>
      <div className="p-4"> {/* Reduced padding */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-base font-bold text-gray-800">{name}</h3> {/* Reduced text size */}
          <span className="font-semibold text-sweet-600">{price}</span>
        </div>
        <p className="text-gray-600 text-xs mb-3">{description}</p> {/* Reduced text size and margin */}
        
        {showAddOns && addOns && addOns.length > 0 && (
          <div className="mb-3 border-t border-b py-2">
            <p className="text-xs font-medium mb-1">Customize:</p>
            <div className="space-y-1">
              {addOns.map((addon, index) => (
                <div key={index} className="flex items-center justify-between">
                  <label className="flex items-center text-xs">
                    <input 
                      type="checkbox" 
                      className="mr-1"
                      checked={selectedAddOns.some(item => item.name === addon.name)}
                      onChange={() => toggleAddOn(addon)}
                    />
                    {addon.name}
                  </label>
                  <span className="text-xs text-gray-600">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 border-sweet-500 text-sweet-600 hover:bg-sweet-50"
            onClick={() => setShowAddOns(!showAddOns)}
          >
            <Plus size={16} className="mr-1" /> Options
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-sweet-600 hover:bg-sweet-700"
            onClick={addToCart}
          >
            <ShoppingCart size={16} className="mr-1" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
