
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, X, ChevronRight, Plus, Minus, Clock, CreditCard, MapPin, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

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
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [cartStyle, setCartStyle] = useState<"default" | "compact" | "detailed">("default");
  const [selectedOrderBumps, setSelectedOrderBumps] = useState<number[]>([]);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">("delivery");
  const [zipCode, setZipCode] = useState("");
  const [zipCodeValid, setZipCodeValid] = useState<boolean | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

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
  
  // Calculate order bump total
  const orderBumpTotal = selectedOrderBumps.reduce((sum, bumpId) => {
    const bump = orderBumpItems.find(item => item.id === bumpId);
    return bump ? sum + parseFloat(bump.price.replace('₹', '')) : sum;
  }, 0);
  
  // Check if minimum order amount is met
  const minimumOrderAmount = 10.00;
  const isMinimumMet = subtotal >= minimumOrderAmount;
  
  // Check if order qualifies for free shipping
  const freeShippingThreshold = 30.00;
  const qualifiesForFreeShipping = subtotal >= freeShippingThreshold;
  
  // Calculate shipping fee
  const standardShippingFee = 2.99;
  const shippingFee = qualifiesForFreeShipping || deliveryType === 'pickup' ? 0 : standardShippingFee;

  const toggleOrderBump = (id: number) => {
    if (selectedOrderBumps.includes(id)) {
      setSelectedOrderBumps(selectedOrderBumps.filter(bumpId => bumpId !== id));
    } else {
      setSelectedOrderBumps([...selectedOrderBumps, id]);
    }
  };
  
  const validateZipCode = () => {
    // Simulating ZIP code validation
    const validZipCodes = ["110001", "110002", "400001", "400002", "560001"];
    const isValid = validZipCodes.includes(zipCode);
    
    setZipCodeValid(isValid);
    
    if (isValid) {
      toast({
        title: "Delivery Available",
        description: "We deliver to your location!",
      });
    } else {
      toast({
        title: "Delivery Unavailable",
        description: "Sorry, we don't deliver to this ZIP code yet.",
        variant: "destructive",
      });
    }
  };

  const handleCheckout = () => {
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
      
      setCartItems(current => [...current, ...orderBumpsToAdd]);
    }
    
    setIsOpen(false);
    navigate('/checkout');
  };

  const renderCartItemDefault = (item: CartItem) => (
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
  );
  
  const renderCartItemCompact = (item: CartItem) => (
    <div key={item.id} className="flex items-center justify-between py-2 border-b">
      <div className="flex items-center">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-10 h-10 rounded object-cover mr-2" 
        />
        <div>
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-xs text-gray-500">
            {item.addOns.length > 0 ? `+ ${item.addOns.join(', ')}` : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 text-sm">
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-gray-400 hover:text-black">
            <Minus size={12} />
          </button>
          <span className="mx-2 w-4 text-center">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-gray-400 hover:text-black">
            <Plus size={12} />
          </button>
        </div>
        <div className="flex items-center">
          <p className="font-medium text-sm mr-2">{item.price}</p>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderCartItemDetailed = (item: CartItem) => (
    <Card key={item.id} className="mb-4 overflow-hidden">
      <div className="flex">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-24 h-24 object-cover" 
        />
        <div className="p-3 flex-1">
          <div className="flex justify-between mb-1">
            <h3 className="font-medium">{item.name}</h3>
            <button 
              onClick={() => removeItem(item.id)} 
              className="text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
          
          {item.addOns.length > 0 && (
            <div className="text-xs text-gray-600 mb-2">
              Add-ons: {item.addOns.join(', ')}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center border rounded">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 hover:bg-gray-100"
              >
                <Minus size={12} />
              </button>
              <span className="px-2 py-1 text-xs font-medium">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 hover:bg-gray-100"
              >
                <Plus size={12} />
              </button>
            </div>
            <p className="text-sweet-600 font-semibold">
              {item.price} × {item.quantity} = ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );

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
            
            <Tabs value={cartStyle} onValueChange={(value) => setCartStyle(value as "default" | "compact" | "detailed")}>
              <TabsList className="grid grid-cols-3 mb-2">
                <TabsTrigger value="default">Default</TabsTrigger>
                <TabsTrigger value="compact">Compact</TabsTrigger>
                <TabsTrigger value="detailed">Detailed</TabsTrigger>
              </TabsList>
            </Tabs>
          </DrawerHeader>
          
          <div className="flex-1 overflow-y-auto px-4">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map(item => {
                  if (cartStyle === "compact") {
                    return renderCartItemCompact(item);
                  } else if (cartStyle === "detailed") {
                    return renderCartItemDetailed(item);
                  } else {
                    return renderCartItemDefault(item);
                  }
                })}
                
                {/* Order Bumps Section */}
                {orderBumpItems.length > 0 && (
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-medium mb-3">Recommended Add-ons</h3>
                    <div className="space-y-3">
                      {orderBumpItems.map(bump => (
                        <div 
                          key={bump.id}
                          className={`border rounded-lg overflow-hidden transition-all ${
                            selectedOrderBumps.includes(bump.id) ? "border-sweet-500 shadow-md" : "border-gray-200"
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
                                  <p className="font-semibold text-sweet-600">{bump.price}</p>
                                  <span className="text-xs font-medium text-red-500">{bump.discount}</span>
                                </div>
                              </div>
                              <div className="mt-2">
                                <Button 
                                  size="sm" 
                                  variant={selectedOrderBumps.includes(bump.id) ? "default" : "outline"}
                                  className={selectedOrderBumps.includes(bump.id) ? "bg-sweet-600" : ""} 
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
                  <h3 className="font-medium mb-3">Delivery Options</h3>
                  <RadioGroup value={deliveryType} onValueChange={(value) => setDeliveryType(value as "delivery" | "pickup")}>
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
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
                          className="absolute right-0 top-0 h-full rounded-l-none"
                          onClick={validateZipCode}
                        >
                          Check
                        </Button>
                      </div>
                      <p className="text-xs mt-1 text-gray-500">
                        Enter your ZIP code to check if delivery is available in your area
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4 text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock size={16} />
                      <span>Estimated delivery/pickup time: 30-45 minutes</span>
                    </div>
                    {deliveryType === "delivery" && (
                      <div className="flex items-center gap-1 text-gray-600 mt-1">
                        <MapPin size={16} />
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
          
          {cartItems.length > 0 && (
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
                    <Clock size={14} />
                    Cash on Delivery available from 11 AM to 3 AM
                  </p>
                  <p className="flex items-center gap-1 mt-0.5">
                    <CreditCard size={14} />
                    We accept Credit Card, Debit Card, UPI, and Cash
                  </p>
                </div>
              </div>
              
              <Button 
                className="w-full bg-sweet-600 hover:bg-sweet-700 gap-1" 
                onClick={handleCheckout}
                disabled={!isMinimumMet || (deliveryType === "delivery" && zipCodeValid === false)}
              >
                Proceed to Checkout
                <ChevronRight size={16} />
              </Button>
              
              <div className="flex justify-between pt-2">
                <span className="text-xs text-gray-500">Free delivery on orders over ₹{freeShippingThreshold.toFixed(2)}</span>
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
