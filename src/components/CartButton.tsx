
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, X, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cartItems } from "@/components/menu/ProductList";
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { OrderService } from '@/services/OrderService';
import CartItemList from "./cart/CartItemList";
import CartSummary from "./cart/CartSummary";
import OrderBumps from "./cart/OrderBumps";
import { calculateDeliveryFee, calculateItemTotal, validateZipCode } from "@/utils/cartCalculations";

const orderBumpItems = [
  {
    id: 101,
    name: "Special Combo Offer",
    description: "Get a Fluffy Omelette and Orange Juice at special price!",
    price: "₹14.99",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
    discount: "20% OFF"
  },
  {
    id: 102,
    name: "Garlic Bread Side",
    description: "Perfect accompaniment to your meal",
    price: "₹3.99",
    image: "https://images.unsplash.com/photo-1619535860434-eb11adcd3a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&format&fit=crop&w=1471&q=80",
    discount: "Add to order"
  }
];

const CartButton = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentCartItems, setCurrentCartItems] = useState([]);
  const [selectedOrderBumps, setSelectedOrderBumps] = useState<number[]>([]);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeValid, setZipCodeValid] = useState<boolean | null>(null);
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
  const [orderBumpTotal, setOrderBumpTotal] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const minimumOrderAmount = 299.00;

  useEffect(() => {
    const handleCartUpdate = () => {
      const items = Array.from(cartItems.values());
      setCurrentCartItems(items);
    };
    
    handleCartUpdate();
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  useEffect(() => {
    if (selectedOrderBumps.length > 0) {
      const total = selectedOrderBumps.reduce((sum, bumpId) => {
        const bump = orderBumpItems.find(item => item.id === bumpId);
        if (bump) {
          return sum + parseFloat(bump.price.replace('₹', ''));
        }
        return sum;
      }, 0);
      setOrderBumpTotal(total);
    } else {
      setOrderBumpTotal(0);
    }
  }, [selectedOrderBumps]);

  const handleCheckZipCode = () => {
    const result = validateZipCode(zipCode);
    setZipCodeValid(result.isValid);
    setDeliveryDistance(result.distance);
    
    toast({
      title: result.isValid ? "Delivery Available" : "Delivery Unavailable",
      description: result.isValid 
        ? `We deliver to your location! (${result.distance} km, ₹${result.fee} delivery charge)`
        : "Sorry, we don't deliver to this ZIP code yet.",
      variant: result.isValid ? "default" : "destructive",
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to checkout",
        variant: "destructive"
      });
      navigate('/signin');
      return;
    }

    try {
      const order = await OrderService.createOrder(items, user.id);
      clearCart();
      toast({
        title: "Order placed successfully",
        description: "Thank you for your order!",
      });
      navigate('/account');
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not place your order. Please try again.",
        variant: "destructive"
      });
    }
  };

  const totalItems = currentCartItems.length;
  const subtotal = currentCartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const shippingFee = calculateDeliveryFee(deliveryType, deliveryDistance);
  const isMinimumMet = subtotal >= minimumOrderAmount;

  return (
    <>
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg z-50 animate-pulse"
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-6 w-6" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="max-h-[90vh] bg-gradient-to-br from-purple-50 to-pink-50">
          <DrawerHeader>
            <DrawerTitle className="text-2xl font-bold flex items-center bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              <ShoppingCart className="mr-2 text-pink-500" size={20} />
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
            {currentCartItems.length > 0 ? (
              <div className="space-y-4">
                {currentCartItems.map(item => (
                  <CartItemList
                    key={item.id}
                    item={item}
                    onUpdateQuantity={(id, quantity) => updateQuantity(id.toString(), quantity)}
                    onRemoveItem={id => removeItem(id.toString())}
                  />
                ))}
                
                <OrderBumps
                  orderBumpItems={orderBumpItems}
                  selectedOrderBumps={selectedOrderBumps}
                  onToggleOrderBump={(id) => {
                    setSelectedOrderBumps(prev =>
                      prev.includes(id) ? prev.filter(bumpId => bumpId !== id) : [...prev, id]
                    );
                  }}
                />
                
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium mb-3 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
                    Delivery Options
                  </h3>
                  <RadioGroup value={deliveryType} onValueChange={(value) => setDeliveryType(value as "delivery" | "pickup")}>
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
                        <Button 
                          className="absolute right-0 top-0 h-full rounded-l-none bg-gradient-to-r from-purple-500 to-pink-500"
                          onClick={handleCheckZipCode}
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
                  
                  <div className="mt-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock size={16} className="text-pink-500" />
                      <span>Estimated delivery/pickup time: 30-45 minutes</span>
                    </div>
                    {deliveryType === "delivery" && (
                      <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <MapPin size={16} className="text-pink-500" />
                        <span>Delivery radius: 10km</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400 mt-1">Add items from our menu to get started</p>
              </div>
            )}
          </div>
          
          {currentCartItems.length > 0 && (
            <DrawerFooter className="border-t pt-4">
              <CartSummary
                subtotal={subtotal}
                orderBumpTotal={orderBumpTotal}
                shippingFee={shippingFee}
                minimumOrderAmount={minimumOrderAmount}
                isMinimumMet={isMinimumMet}
                onCheckout={handleCheckout}
                disabled={!isMinimumMet || (deliveryType === "delivery" && zipCodeValid === false)}
              />
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartButton;
