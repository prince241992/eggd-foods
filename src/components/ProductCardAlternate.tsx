
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Minus, ShoppingCart, Check, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface AddOn {
  name: string;
  price: string;
}

interface ProductCardAlternateProps {
  name: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  addOns?: AddOn[];
  className?: string;
  style?: "modern" | "minimal" | "detailed";
  showNutrition?: boolean;
  nutritionInfo?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fat?: string;
  };
}

const ProductCardAlternate = ({
  name,
  description,
  price,
  image,
  popular,
  addOns,
  className,
  style = "modern",
  showNutrition = false,
  nutritionInfo,
}: ProductCardAlternateProps) => {
  const [showAddOns, setShowAddOns] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const toggleAddOn = (addon: AddOn) => {
    if (selectedAddOns.some(item => item.name === addon.name)) {
      setSelectedAddOns(selectedAddOns.filter(item => item.name !== addon.name));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const addToCart = () => {
    setAddingToCart(true);
    
    // Simulate API call or state update
    setTimeout(() => {
      toast({
        title: "Added to Cart! 🍳",
        description: `${quantity}x ${name} with ${selectedAddOns.length} add-ons has been added to your cart`,
        duration: 3000,
      });
      
      console.log("Added to cart:", { name, price, selectedAddOns, quantity });
      setShowAddOns(false);
      setQuantity(1);
      setAddingToCart(false);
    }, 600);
  };

  // Convert price string from $ to ₹ if needed
  const formattedPrice = price.startsWith("$") ? `₹${price.substring(1)}` : price;

  if (style === "minimal") {
    return (
      <Card className={cn("overflow-hidden h-full transition-all hover:shadow-md", className)}>
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform hover:scale-105" 
          />
          {popular && (
            <span className="absolute top-3 right-3 bg-sweet-600 text-white px-2 py-1 rounded-full text-xs font-medium">
              Popular
            </span>
          )}
          <button 
            onClick={() => setIsFavorite(!isFavorite)} 
            className="absolute top-3 left-3 bg-white rounded-full p-1.5 shadow-md"
          >
            <Heart 
              size={20} 
              className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
            />
          </button>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{name}</h3>
            <span className="font-bold text-sweet-600">{formattedPrice}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={addToCart} 
            className="w-full bg-sweet-600 hover:bg-sweet-700"
            disabled={addingToCart}
          >
            {addingToCart ? (
              <>
                <Check size={18} className="mr-1" /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={18} className="mr-1" /> Add to Cart
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (style === "detailed") {
    return (
      <Card className={cn("overflow-hidden h-full", className)}>
        <div className="aspect-square relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover" 
          />
          {popular && (
            <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
              POPULAR CHOICE
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-xl">{name}</h3>
            <span className="font-bold text-xl text-sweet-600">{formattedPrice}</span>
          </div>
          <p className="text-gray-600 mb-4">{description}</p>
          
          {showNutrition && nutritionInfo && (
            <div className="bg-cream-50 p-3 rounded-md mb-4">
              <h4 className="text-sm font-semibold mb-2">Nutrition Information</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {nutritionInfo.calories && (
                  <div>
                    <span className="font-medium">Calories:</span> {nutritionInfo.calories}
                  </div>
                )}
                {nutritionInfo.protein && (
                  <div>
                    <span className="font-medium">Protein:</span> {nutritionInfo.protein}
                  </div>
                )}
                {nutritionInfo.carbs && (
                  <div>
                    <span className="font-medium">Carbs:</span> {nutritionInfo.carbs}
                  </div>
                )}
                {nutritionInfo.fat && (
                  <div>
                    <span className="font-medium">Fat:</span> {nutritionInfo.fat}
                  </div>
                )}
              </div>
            </div>
          )}
          
          {addOns && addOns.length > 0 && (
            <div className="mb-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowAddOns(!showAddOns)}
                className="mb-2 border-sweet-500 text-sweet-600 hover:bg-sweet-50 w-full"
              >
                {showAddOns ? "Hide Add-ons" : "Customize Order"}
              </Button>
              
              {showAddOns && (
                <div className="space-y-2 border rounded-md p-3 bg-cream-50">
                  {addOns.map((addon, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2 accent-sweet-600"
                          checked={selectedAddOns.some(item => item.name === addon.name)}
                          onChange={() => toggleAddOn(addon)}
                        />
                        {addon.name}
                      </label>
                      <span className="text-sm text-gray-600">
                        {addon.price.startsWith("$") ? `₹${addon.price.substring(1)}` : addon.price}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center border rounded-md">
              <button 
                onClick={decreaseQuantity}
                className="px-3 py-1 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 font-medium">{quantity}</span>
              <button 
                onClick={increaseQuantity}
                className="px-3 py-1 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <Button 
              onClick={addToCart} 
              className="bg-sweet-600 hover:bg-sweet-700"
              disabled={addingToCart}
            >
              {addingToCart ? "Adding..." : "Add to Cart"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default modern style
  return (
    <Card className={cn("overflow-hidden h-full transition-all duration-300 hover:shadow-lg", className)}>
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
        {popular && (
          <div className="absolute top-0 right-0 bg-gradient-to-l from-sweet-600 to-sweet-500 text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
            Popular
          </div>
        )}
        <button 
          onClick={() => setIsFavorite(!isFavorite)} 
          className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md transition-transform hover:scale-110"
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"} 
          />
        </button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg tracking-tight mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg text-sweet-600">{formattedPrice}</span>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              className="border-sweet-500 text-sweet-600 hover:bg-sweet-50"
              onClick={() => setShowAddOns(!showAddOns)}
            >
              <Plus size={16} />
            </Button>
            <Button 
              size="sm" 
              className="bg-sweet-600 hover:bg-sweet-700"
              onClick={addToCart}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <Check size={16} />
              ) : (
                <ShoppingCart size={16} />
              )}
            </Button>
          </div>
        </div>
        
        {showAddOns && addOns && addOns.length > 0 && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-xs font-medium mb-2">Add extras:</p>
            <div className="space-y-1">
              {addOns.map((addon, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <label className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="mr-2 accent-sweet-600"
                      checked={selectedAddOns.some(item => item.name === addon.name)}
                      onChange={() => toggleAddOn(addon)}
                    />
                    {addon.name}
                  </label>
                  <span className="text-gray-600">
                    {addon.price.startsWith("$") ? `₹${addon.price.substring(1)}` : addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCardAlternate;
