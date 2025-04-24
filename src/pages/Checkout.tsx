import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Clock, CreditCard, Truck, Store, Calendar, Info, ChevronRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import BranchSelector from "@/components/BranchSelector";
import OrderInvoice from "@/components/OrderInvoice";
import { useCart } from '@/hooks/useCart';

const deliveryTimeSlots = [
  { id: 1, time: "ASAP (30-45 min)" },
  { id: 2, time: "11:30 AM - 12:00 PM" },
  { id: 3, time: "12:00 PM - 12:30 PM" },
  { id: 4, time: "12:30 PM - 1:00 PM" },
  { id: 5, time: "1:00 PM - 1:30 PM" },
];

const Checkout = () => {
  const { items, getTotal } = useCart();
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedBranch, setSelectedBranch] = useState(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [showInvoice, setShowInvoice] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Form fields
  const [formFields, setFormFields] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipcode: "",
    instructions: ""
  });

  useEffect(() => {
    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Please add items before checkout.",
        variant: "destructive"
      });
      navigate('/menu');
    }
  }, [items.length, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };
  
  // Calculate order totals
  const subtotal = items.reduce((sum, item) => {
    const price = parseFloat(String(item.price));
    return sum + (price * item.quantity);
  }, 0);
  
  const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  const handleOrderTypeChange = (value: string) => {
    setOrderType(value as 'delivery' | 'pickup');
  };

  const handleBranchChange = (branchId: number) => {
    setSelectedBranch(branchId);
  };

  const handleContinue = () => {
    if (step === 1) {
      if (orderType === 'delivery' && (!formFields.address || !formFields.zipcode)) {
        toast({
          title: "Missing Information",
          description: "Please provide your delivery address",
          variant: "destructive"
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      // Place order
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #EGD${Math.floor(1000 + Math.random() * 9000)} has been placed.`,
      });
      setShowInvoice(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/menu');
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value as 'cod' | 'online');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-cream-50 py-10">
        <div className="container-custom">
          {!showInvoice ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Checkout</h1>
                <p className="text-gray-600">Complete your order in just a few steps</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-2/3">
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">
                        {step === 1 ? 'Delivery Details' : step === 2 ? 'Delivery Time' : 'Payment Method'}
                      </h2>
                      <div className="text-sm text-gray-500">
                        Step {step} of 3
                      </div>
                    </div>

                    {/* Step 1: Delivery Details */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <Tabs 
                          defaultValue={orderType} 
                          onValueChange={handleOrderTypeChange}
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="delivery" className="flex items-center gap-2">
                              <Truck size={18} /> Delivery
                            </TabsTrigger>
                            <TabsTrigger value="pickup" className="flex items-center gap-2">
                              <Store size={18} /> Pickup
                            </TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="delivery" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Full Name
                                </label>
                                <Input
                                  name="name"
                                  value={formFields.name}
                                  onChange={handleInputChange}
                                  placeholder="Your full name"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Email
                                </label>
                                <Input
                                  type="email"
                                  name="email"
                                  value={formFields.email}
                                  onChange={handleInputChange}
                                  placeholder="your@email.com"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Phone Number
                                </label>
                                <Input
                                  name="phone"
                                  value={formFields.phone}
                                  onChange={handleInputChange}
                                  placeholder="Your phone number"
                                  required
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Delivery Address
                                </label>
                                <Input
                                  name="address"
                                  value={formFields.address}
                                  onChange={handleInputChange}
                                  placeholder="Street address"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  City
                                </label>
                                <Input
                                  name="city"
                                  value={formFields.city}
                                  onChange={handleInputChange}
                                  placeholder="City"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  ZIP Code
                                </label>
                                <Input
                                  name="zipcode"
                                  value={formFields.zipcode}
                                  onChange={handleInputChange}
                                  placeholder="ZIP Code"
                                  required
                                />
                              </div>
                              <div className="col-span-2 mt-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Delivery Instructions (Optional)
                                </label>
                                <textarea
                                  name="instructions"
                                  value={formFields.instructions}
                                  onChange={handleInputChange}
                                  placeholder="Special instructions for delivery"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="pickup" className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Full Name
                                </label>
                                <Input
                                  name="name"
                                  value={formFields.name}
                                  onChange={handleInputChange}
                                  placeholder="Your full name"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Email
                                </label>
                                <Input
                                  type="email"
                                  name="email"
                                  value={formFields.email}
                                  onChange={handleInputChange}
                                  placeholder="your@email.com"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Phone Number
                                </label>
                                <Input
                                  name="phone"
                                  value={formFields.phone}
                                  onChange={handleInputChange}
                                  placeholder="Your phone number"
                                  required
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Select Branch for Pickup
                                </label>
                                <div className="mt-2">
                                  <BranchSelector 
                                    buttonVariant="prominent" 
                                    onBranchSelect={handleBranchChange} 
                                  />
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    {/* Step 2: Delivery Time */}
                    {step === 2 && (
                      <div>
                        <div className="flex items-center mb-4 text-gray-600">
                          <Calendar size={18} className="mr-2" />
                          <span>Select delivery time for {new Date().toLocaleDateString()}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          {deliveryTimeSlots.map(slot => (
                            <div 
                              key={slot.id}
                              className={`border rounded-md p-3 cursor-pointer transition-all ${
                                selectedTimeSlot === slot.id 
                                  ? "border-sweet-600 bg-sweet-50" 
                                  : "hover:border-gray-400"
                              }`}
                              onClick={() => setSelectedTimeSlot(slot.id)}
                            >
                              <div className="flex items-center">
                                <Clock size={16} className="mr-2 text-sweet-600" />
                                <span>{slot.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm flex items-start">
                          <Info size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Order Processing Times</p>
                            <p className="mt-1">
                              {orderType === 'delivery' 
                                ? "Delivery orders typically take 30-45 minutes to arrive after placement." 
                                : "Pickup orders are usually ready within 20-30 minutes of order confirmation."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment Method */}
                    {step === 3 && (
                      <div>
                        <Tabs 
                          defaultValue={paymentMethod} 
                          onValueChange={handlePaymentMethodChange} 
                          className="w-full"
                        >
                          <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="cod">Cash on Delivery</TabsTrigger>
                            <TabsTrigger value="online">Online Payment</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="cod" className="space-y-4">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                  <CreditCard className="mr-2 text-sweet-600" />
                                  <p className="font-medium">Cash on Delivery</p>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                  Pay with cash when your order arrives at your doorstep or during pickup.
                                </p>
                                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm">
                                  Please have the exact amount ready for a contactless delivery experience.
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                          
                          <TabsContent value="online" className="space-y-4">
                            <Card>
                              <CardContent className="pt-6">
                                <div className="flex items-center mb-4">
                                  <CreditCard className="mr-2 text-sweet-600" />
                                  <p className="font-medium">Online Payment</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                  <div className="border rounded-md p-3 flex items-center cursor-pointer hover:border-sweet-600">
                                    <div className="w-10 h-6 bg-blue-600 rounded mr-3"></div>
                                    Credit/Debit Card
                                  </div>
                                  <div className="border rounded-md p-3 flex items-center cursor-pointer hover:border-sweet-600">
                                    <div className="w-10 h-6 bg-green-600 rounded mr-3"></div>
                                    UPI
                                  </div>
                                  <div className="border rounded-md p-3 flex items-center cursor-pointer hover:border-sweet-600">
                                    <div className="w-10 h-6 bg-purple-600 rounded mr-3"></div>
                                    Mobile Wallet
                                  </div>
                                  <div className="border rounded-md p-3 flex items-center cursor-pointer hover:border-sweet-600">
                                    <div className="w-10 h-6 bg-gray-600 rounded mr-3"></div>
                                    Net Banking
                                  </div>
                                </div>
                                <div className="text-center text-gray-500 text-sm">
                                  (Payment options simulation - not implemented in this demo)
                                </div>
                              </CardContent>
                            </Card>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <Button variant="outline" onClick={handleBack}>
                        {step === 1 ? 'Back to Menu' : 'Back'}
                      </Button>
                      <Button className="bg-sweet-600 hover:bg-sweet-700" onClick={handleContinue}>
                        {step === 3 ? (
                          <>Place Order <ChevronRight size={16} className="ml-1" /></>
                        ) : (
                          <>Continue <ChevronRight size={16} className="ml-1" /></>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/3">
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                    
                    {items.map(item => (
                      <div key={item.id} className="flex mb-4 pb-4 border-b">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 rounded object-cover" 
                        />
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.name}</h4>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                          <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>₹{getTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {orderType === 'delivery' ? 'Delivery Fee' : 'Pickup Fee'}
                        </span>
                        <span>₹{deliveryFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-base font-bold pt-2 border-t mt-2">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <OrderInvoice
              orderNumber={`EGD${Math.floor(1000 + Math.random() * 9000)}`}
              date={new Date().toLocaleDateString()}
              items={items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                addOns: []
              }))}
              customerName={formFields.name}
              customerAddress={formFields.address}
              customerPhone={formFields.phone}
              deliveryFee={`₹${deliveryFee.toFixed(2)}`}
              subtotal={`₹${subtotal.toFixed(2)}`}
              total={`₹${total.toFixed(2)}`}
              paymentMethod={paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
              branch="Downtown Location"
              orderType={orderType === 'delivery' ? 'Delivery' : 'Pickup'}
              deliveryTime={deliveryTimeSlots.find(slot => slot.id === selectedTimeSlot)?.time}
              headerText="Thank you for your order at Egg'd Foods!"
              footerText="We appreciate your business. Please come again!"
            />
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
