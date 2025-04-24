import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, X, ChevronRight, Plus, Minus, Clock, CreditCard, MapPin, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cartItems } from "@/components/menu/ProductList";
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { OrderService } from '@/services/OrderService';

// Sample order bump items for demonstration
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
    image: "https://images.unsplash.com/photo-1619535860434-eb11adcd3a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    discount: "Add to order"
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

interface OrderBump {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  discount: string;
}

const CartButton = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [currentCartItems, setCurrentCartItems] = useState<CartItem[]>([]);
  const [selectedOrderBumps, setSelectedOrderBumps] = useState<number[]>([]);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeValid, setZipCodeValid] = useState<boolean | null>(null);
  const [deliveryDistance, setDeliveryDistance] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Update local cart state from global cartItems
  const updateCartFromGlobal = () => {
    const items: CartItem[] = [];
    cartItems.forEach((item) => {
      items.push(item);
    });
    setCurrentCartItems(items);
  };

  // Listen for cart updates
  useEffect(() => {
    updateCartFromGlobal();
    
    const handleCartUpdate = () => {
      updateCartFromGlobal();
    };
    
    window.addEventListener('cart-updated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('cart-updated', handleCartUpdate);
    };
  }, []);

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

  const updateQuantityOld = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    if (cartItems.has(id)) {
      const item = cartItems.get(id);
      item.quantity = newQuantity;
      cartItems.set(id, item);
      updateCartFromGlobal();
    }
  };

  const removeItemOld = (id: number) => {
    cartItems.delete(id);
    updateCartFromGlobal();
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
      duration: 2000,
    });
  };

  // Calculate total items and cost
  const totalItems = currentCartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = currentCartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return sum + (price * item.quantity);
  }, 0);
  
  // Calculate order bump total
  const orderBumpTotal = selectedOrderBumps.reduce((sum, bumpId) => {
    const bump = orderBumpItems.find(item => item.id === bumpId);
    return bump ? sum + parseFloat(bump.price.replace('₹', '')) : sum;
  }, 0);
  
  // Check if minimum order amount is met
  const minimumOrderAmount = 150.00;
  const isMinimumMet = subtotal >= minimumOrderAmount;
  
  // Calculate delivery fee based on distance
  const calculateDeliveryFee = () => {
    if (deliveryType === 'pickup') return 0;
    
    // Default delivery fee for within 5km
    let deliveryFee = 60;
    
    // If we know the distance and it's between 5-10km
    if (deliveryDistance !== null && deliveryDistance > 5 && deliveryDistance <= 10) {
      deliveryFee = 85;
    }
    
    return deliveryFee;
  };
  
  const shippingFee = calculateDeliveryFee();

  const toggleOrderBump = (id: number) => {
    if (selectedOrderBumps.includes(id)) {
      setSelectedOrderBumps(selectedOrderBumps.filter(bumpId => bumpId !== id));
    } else {
      setSelectedOrderBumps([...selectedOrderBumps, id]);
    }
  };
  
  const validateZipCode = () => {
    // Simulating ZIP code validation with distance estimation
    const validZipCodes = {
      "452001": 2.5, // 2.5 km from restaurant
      "452002": 3.8, // 3.8 km from restaurant
      "452003": 5.2, // 5.2 km from restaurant
      "452004": 7.1, // 7.1 km from restaurant
      "452005": 8.9, // 8.9 km from restaurant
      "452006": 4.3, // 4.3 km from restaurant
      "452007": 9.5  // 9.5 km from restaurant
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

  const handleCheckoutOld = () => {
    // Add any order bumps to cart before checkout
    if (selectedOrderBumps.length > 0) {
      const orderBumpsToAdd = orderBumpItems
        .filter(bump => selectedOrderBumps.includes(bump.id))
        .map(bump => ({
          id: bump.id,
          name: bump.name,
          price: bump.price,
          quantity: 1,
          image: bump.image,
          addOns: []
        }));
      
      orderBumpsToAdd.forEach(item => {
        cartItems.set(item.id, item);
      });
      
      updateCartFromGlobal();
    }
    
    setIsOpen(false);
    navigate('/checkout');
  };

  const renderCartItemCompact = (item: CartItem) => (
    <div key={item.id} className="flex items-center justify-between py-2 border-b bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg px-3 mb-2">
      <div className="flex items-center">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-10 h-10 rounded object-cover mr-2" 
        />
        <div>
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-xs text-gray-500">
            {item.addOns && item.addOns.length > 0 ? `+ ${item.addOns.join(', ')}` : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 text-sm">
          <button onClick={() => updateQuantityOld(item.id, item.quantity - 1)} className="text-gray-400 hover:text-black bg-white rounded-full w-5 h-5 flex items-center justify-center">
            <Minus size={12} />
          </button>
          <span className="mx-2 w-4 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantityOld(item.id, item.quantity + 1)} className="text-gray-400 hover:text-black bg-white rounded-full w-5 h-5 flex items-center justify-center">
            <Plus size={12} />
          </button>
        </div>
        <div className="flex items-center">
          <p className="font-medium text-sm mr-2">{item.price}</p>
          <button 
            onClick={() => removeItemOld(item.id)}
            className="text-gray-400 hover:text-red-500 bg-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Button 
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 shadow-lg z-50 animate-pulse"
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
                {currentCartItems.map(item => renderCartItemCompact(item))}
                
                {/* Order Bumps Section */}
                {orderBumpItems.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-medium mb-3 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">Recommended Add-ons</h3>
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
                                  variant={selectedOrderBumps.includes(bump.id) ? "default" : "outline"}
                                  className={selectedOrderBumps.includes(bump.id) ? "bg-gradient-to-r from-purple-500 to-pink-500" : ""} 
                                  onClick={() => toggleOrderBump(bump.id)}
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
                )}
                
                {/* Delivery Type Selection */}
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium mb-3 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">Delivery Options</h3>
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
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {selectedOrderBumps.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Add-ons</span>
                    <span>₹{orderBumpTotal.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>{deliveryType === "delivery" ? "Delivery Fee" : "Pickup Fee"}</span>
                  <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{(subtotal + orderBumpTotal + shippingFee).toFixed(2)}</span>
                </div>
                
                {!isMinimumMet && (
                  <div className="bg-amber-50 border border-amber-200 rounded p-2 text-xs flex items-start gap-2">
                    <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={14} />
                    <div>
                      <p className="text-amber-800">Minimum order amount not met</p>
                      <p className="text-amber-700">Add ₹{(minimumOrderAmount - subtotal).toFixed(2)} more to proceed.</p>
                    </div>
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-1">
                  <p className="flex items-center gap-1">
                    <Clock size={14} className="text-pink-500" />
                    Cash on Delivery available from 11 AM to 3 AM
                  </p>
                  <p className="flex items-center gap-1 mt-0.5">
                    <CreditCard size={14} className="text-pink-500" />
                    We accept Credit Card, Debit Card, UPI, and Cash
                  </p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 gap-1" 
                onClick={handleCheckout}
                disabled={!isMinimumMet || (deliveryType === "delivery" && zipCodeValid === false)}
              >
                Proceed to Checkout
                <ChevronRight size={16} />
              </Button>
              
              <div className="flex justify-between pt-2">
                <span className="text-xs text-gray-500">Loyalty: 1 point per ₹10 spent</span>
                <span className="text-xs text-gray-500">Min order: ₹{minimumOrderAmount.toFixed(2)}</span>
              </div>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartButton;
