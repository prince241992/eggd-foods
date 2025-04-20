import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Package, Check, ChevronRight, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) {
      toast({
        title: "Order number required",
        description: "Please enter a valid order number.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Demo order data
      if (orderNumber.toLowerCase() === "egg-2025-0419-001") {
        setTrackingResult({
          id: "EGG-2025-0419-001",
          customerName: "Amit Kumar",
          status: "picked",
          timeStamps: {
            ordered: "2025-04-19T10:15:00",
            confirmed: "2025-04-19T10:18:00",
            preparing: "2025-04-19T10:25:00",
            picked: "2025-04-19T10:45:00",
            delivered: null,
          },
          items: ["Egg Curry", "Deviled Eggs", "Fluffy Omelette"],
          deliveryAddress: "123 Park Street, Sector 18, Noida",
          branch: "Central Kitchen",
          deliveryPerson: {
            name: "Rajesh S.",
            phone: "+91 98765 43210",
            photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3"
          },
          estimatedDelivery: "2025-04-19T11:15:00"
        });
      } else {
        setTrackingResult(null);
        toast({
          title: "Order not found",
          description: "We couldn't find an order with that number. Please check and try again.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };
  
  const formatTime = (dateStr: string | null) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8 text-center">Track Your Order</h1>
          
          <div className="max-w-xl mx-auto mb-10">
            <div className="flex gap-3">
              <Input 
                type="text"
                placeholder="Enter your order number (e.g., EGG-2025-0419-001)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="flex-grow"
              />
              <Button 
                onClick={handleTrackOrder}
                disabled={loading}
                className="bg-sweet-600 hover:bg-sweet-700"
              >
                {loading ? "Searching..." : (
                  <>
                    <Search size={18} className="mr-1" /> Track
                  </>
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              You can find your order number in the confirmation email we sent you.
            </p>
          </div>
          
          {trackingResult && (
            <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{trackingResult.id}</h2>
                  <p className="text-gray-600">Order placed on {formatDate(trackingResult.timeStamps.ordered)}</p>
                </div>
                <div className="bg-sweet-50 border border-sweet-200 px-4 py-2 rounded-md">
                  <p className="font-medium text-sweet-700">
                    {trackingResult.status === "delivered" ? "Delivered" :
                     trackingResult.status === "picked" ? "Out for Delivery" :
                     trackingResult.status === "preparing" ? "Preparing" :
                     trackingResult.status === "confirmed" ? "Confirmed" : "Placed"}
                  </p>
                </div>
              </div>
              
              <Tabs defaultValue="tracking" className="mb-6">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                  <TabsTrigger value="details">Order Details</TabsTrigger>
                  <TabsTrigger value="delivery">Delivery Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="tracking">
                  <div className="relative">
                    <div className="absolute left-6 top-0 h-full w-1 bg-gray-200"></div>
                    
                    {/* Ordered Step */}
                    <div className="relative flex items-start mb-8">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.ordered ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                        <Check size={20} className={trackingResult.timeStamps.ordered ? 'text-green-500' : 'text-gray-400'} />
                      </div>
                      <div className="ml-4 mt-1">
                        <h3 className="font-medium">Order Placed</h3>
                        <p className="text-gray-500 text-sm">
                          {trackingResult.timeStamps.ordered ? formatTime(trackingResult.timeStamps.ordered) : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Confirmed Step */}
                    <div className="relative flex items-start mb-8">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.confirmed ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                        <Check size={20} className={trackingResult.timeStamps.confirmed ? 'text-green-500' : 'text-gray-400'} />
                      </div>
                      <div className="ml-4 mt-1">
                        <h3 className="font-medium">Order Confirmed</h3>
                        <p className="text-gray-500 text-sm">
                          {trackingResult.timeStamps.confirmed ? formatTime(trackingResult.timeStamps.confirmed) : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Preparing Step */}
                    <div className="relative flex items-start mb-8">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.preparing ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                        <Check size={20} className={trackingResult.timeStamps.preparing ? 'text-green-500' : 'text-gray-400'} />
                      </div>
                      <div className="ml-4 mt-1">
                        <h3 className="font-medium">Preparing Your Food</h3>
                        <p className="text-gray-500 text-sm">
                          {trackingResult.timeStamps.preparing ? formatTime(trackingResult.timeStamps.preparing) : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Out for delivery Step */}
                    <div className="relative flex items-start mb-8">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.picked ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                        <Check size={20} className={trackingResult.timeStamps.picked ? 'text-green-500' : 'text-gray-400'} />
                      </div>
                      <div className="ml-4 mt-1">
                        <h3 className="font-medium">Out for Delivery</h3>
                        <p className="text-gray-500 text-sm">
                          {trackingResult.timeStamps.picked ? formatTime(trackingResult.timeStamps.picked) : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Delivered Step */}
                    <div className="relative flex items-start">
                      <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.delivered ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
                        <Check size={20} className={trackingResult.timeStamps.delivered ? 'text-green-500' : 'text-gray-400'} />
                      </div>
                      <div className="ml-4 mt-1">
                        <h3 className="font-medium">Delivered</h3>
                        <p className="text-gray-500 text-sm">
                          {trackingResult.timeStamps.delivered ? formatTime(trackingResult.timeStamps.delivered) : 'Estimated: ' + formatTime(trackingResult.estimatedDelivery)}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div>
                    <h3 className="font-medium mb-2">Items</h3>
                    <ul className="list-disc pl-5 mb-4">
                      {trackingResult.items.map((item: string, index: number) => (
                        <li key={index} className="mb-1">{item}</li>
                      ))}
                    </ul>
                    
                    <div className="border-t pt-3 mt-3">
                      <h3 className="font-medium mb-2">Branch Information</h3>
                      <p className="text-gray-700">{trackingResult.branch}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="delivery">
                  {trackingResult.deliveryPerson && (
                    <div className="mb-6">
                      <h3 className="font-medium mb-3">Delivery Person</h3>
                      <div className="flex items-center">
                        <img 
                          src={trackingResult.deliveryPerson.photo} 
                          alt={trackingResult.deliveryPerson.name} 
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <p className="font-medium">{trackingResult.deliveryPerson.name}</p>
                          <p className="text-gray-600 text-sm">{trackingResult.deliveryPerson.phone}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-medium mb-2">Delivery Address</h3>
                    <div className="flex items-start">
                      <MapPin className="text-gray-500 mr-2 mt-1" size={18} />
                      <p className="text-gray-700">{trackingResult.deliveryAddress}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-medium mb-2">Estimated Delivery Time</h3>
                    <div className="flex items-start">
                      <Clock className="text-gray-500 mr-2 mt-1" size={18} />
                      <p className="text-gray-700">
                        {formatTime(trackingResult.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="border-t pt-4">
                <Button variant="outline" className="w-full flex justify-between items-center">
                  Need Help With Your Order?
                  <ChevronRight size={18} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderTracking;
