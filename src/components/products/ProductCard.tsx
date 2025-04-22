
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types/product";
import ProductAddOns from "./ProductAddOns";
import { cartItems } from "@/components/menu/ProductList";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  selectedAddOns: Record<number, string[]>;
  onAddOnToggle: (productId: number, addOnName: string) => void;
  showNutrition?: boolean;
  cardStyle?: "default" | "modern" | "minimal" | "detailed";
}

const ProductCard = ({
  product,
  selectedAddOns,
  onAddOnToggle,
  showNutrition = false,
  cardStyle = "detailed"
}: ProductCardProps) => {
  const { toast } = useToast();

  const addToCart = () => {
    const productAddOns = selectedAddOns[product.id] || [];
    const addOnsList = [];
    let totalPrice = parseFloat(product.price.replace('₹', ''));
    
    if (productAddOns.length > 0 && product.addOns) {
      product.addOns
        .filter(addOn => productAddOns.includes(addOn.name))
        .forEach(addOn => {
          totalPrice += parseFloat(addOn.price.replace('₹', ''));
          addOnsList.push({
            name: addOn.name,
            price: addOn.price
          });
        });
    }
    
    if (cartItems.has(product.id)) {
      const existingItem = cartItems.get(product.id);
      existingItem.quantity += 1;
      existingItem.addOns = [...existingItem.addOns, ...addOnsList];
      cartItems.set(product.id, existingItem);
    } else {
      cartItems.set(product.id, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        addOns: addOnsList
      });
    }
    
    toast({
      title: "Added to cart",
      description: `${product.name} ${productAddOns.length > 0 ? 'with add-ons' : ''} has been added to your cart.`,
      duration: 2000,
    });
    
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="h-48 w-full object-cover"
        />
        {product.popular && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Popular
          </div>
        )}
      </div>
      
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        </div>
        
        <div className="mt-2 mb-3">
          <div className="text-purple-600 font-bold text-lg">{product.price}</div>
        </div>
        
        {showNutrition && product.nutritionInfo && (
          <div className="bg-gray-50 p-2 rounded text-xs mb-3 grid grid-cols-2 gap-y-1">
            <div>Calories: {product.nutritionInfo.calories}</div>
            <div>Protein: {product.nutritionInfo.protein}</div>
            <div>Carbs: {product.nutritionInfo.carbs}</div>
            <div>Fat: {product.nutritionInfo.fat}</div>
          </div>
        )}
        
        {product.addOns && product.addOns.length > 0 && (
          <ProductAddOns
            productId={product.id}
            addOns={product.addOns}
            selectedAddOns={selectedAddOns}
            onAddOnToggle={onAddOnToggle}
          />
        )}
        
        <Button 
          onClick={addToCart} 
          className="mt-auto w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
        >
          <ShoppingCart size={18} className="mr-2" /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
