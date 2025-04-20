
import React, { useState } from 'react';
import ProductCard from "@/components/ProductCard";
import { MenuItem } from "@/data/menuData";
import { Card } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProductListProps {
  items: MenuItem[];
}

// Create a global cart context to share cart state across components
export const cartItems = new Map();

const ProductList = ({ items }: ProductListProps) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const { toast } = useToast();

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const addToCart = (item: MenuItem) => {
    // Check if item already exists in cart
    if (cartItems.has(item.id)) {
      // Increment quantity
      const existingItem = cartItems.get(item.id);
      existingItem.quantity += 1;
      cartItems.set(item.id, existingItem);
    } else {
      // Add new item
      cartItems.set(item.id, {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
        image: item.image,
        addOns: []
      });
    }
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
    
    // Force a re-render of the cart component
    window.dispatchEvent(new CustomEvent('cart-updated'));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {items.map(item => (
        <Card key={item.id} className="overflow-hidden">
          <div className="flex h-full">
            <div className="w-1/3 relative">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover"
              />
              {item.popular && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Popular
                </div>
              )}
            </div>
            
            <div className="w-2/3 p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Heart 
                    size={20} 
                    className={favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}
                  />
                </button>
              </div>
              
              <p className="text-gray-600 text-sm mt-1 mb-2">
                {item.description}
              </p>
              
              {item.nutritionInfo && (
                <div className="bg-gray-50 p-2 rounded-md text-sm mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>Calories: {item.nutritionInfo.calories}</div>
                    <div>Protein: {item.nutritionInfo.protein}</div>
                    <div>Carbs: {item.nutritionInfo.carbs}</div>
                    <div>Fat: {item.nutritionInfo.fat}</div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-end mt-auto">
                <span className="text-lg font-bold text-green-600">{item.price}</span>
                <Button 
                  size="sm"
                  className="bg-sweet-600 hover:bg-sweet-700"
                  onClick={() => addToCart(item)}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
      
      {items.length === 0 && (
        <div className="text-center py-10 col-span-full">
          <p className="text-gray-600 text-lg">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
