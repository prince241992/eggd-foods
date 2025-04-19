
import { useState } from "react";
import { ShoppingCart, X, ChevronRight, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";

// Sample cart items for demonstration
const initialCartItems = [
  {
    id: 1,
    name: "Classic Shakshuka",
    price: "₹12.99",
    quantity: 1,
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    addOns: ["Extra cheese"]
  },
  {
    id: 3,
    name: "Egg Fried Rice",
    price: "₹10.99",
    quantity: 2,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    addOns: []
  }
];

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  addOns: string[];
}

const CartButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const { toast } = useToast();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      duration: 2000,
    });
  };

  // Calculate total items and cost
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return sum + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "Your order is being processed",
      duration: 3000,
    });
    // Additional checkout logic can go here
    setIsOpen(false);
  };

  return (
    <>
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-sweet-600 hover:bg-sweet-700 shadow-lg z-50"
        onClick={() => {
          setIsOpen(true);
          console.log("Open cart");
        }}
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold flex items-center">
              <ShoppingCart className="mr-2" size={20} />
              Your Cart
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            </DrawerTitle>
            <DrawerClose className="absolute right-4 top-4">
              <X size={20} />
            </DrawerClose>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto px-4">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-3 border-b pb-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 rounded-md object-cover" 
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)} 
                          className="text-gray-400 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sweet-600 font-medium">{item.price}</p>
                      
                      {item.addOns.length > 0 && (
                        <div className="text-xs text-gray-600 mt-1">
                          {item.addOns.join(', ')}
                        </div>
                      )}
                      
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-7 w-7 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-7 w-7 rounded-full border flex items-center justify-center hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add items from our menu to get started</p>
              </div>
            )}
          </div>
          
          {cartItems.length > 0 && (
            <DrawerFooter className="border-t pt-4">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>₹2.99</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{(subtotal + 2.99).toFixed(2)}</span>
                </div>
                
                <div className="text-xs text-gray-500 mt-1">
                  <p>Cash on Delivery available from 11 AM to 3 AM</p>
                </div>
              </div>
              
              <Button className="w-full bg-sweet-600 hover:bg-sweet-700 gap-1" onClick={handleCheckout}>
                Proceed to Checkout
                <ChevronRight size={16} />
              </Button>
              
              <div className="flex justify-between pt-2">
                <span className="text-xs text-gray-500">Free delivery on orders over ₹30</span>
                <span className="text-xs text-gray-500">Min order: ₹10</span>
              </div>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartButton;
