
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useOrderTracking } from "@/hooks/useOrderTracking";
import { OrderTimeline } from "@/components/order/OrderTimeline";
import { OrderDetails } from "@/components/order/OrderDetails";
import { DeliveryInfo } from "@/components/order/DeliveryInfo";
import { formatDate } from "@/utils/dateFormat";

const OrderTracking = () => {
  const { orderNumber, setOrderNumber, trackingResult, loading, handleTrackOrder } = useOrderTracking();

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
                  <OrderTimeline trackingResult={trackingResult} />
                </TabsContent>
                
                <TabsContent value="details">
                  <OrderDetails trackingResult={trackingResult} />
                </TabsContent>
                
                <TabsContent value="delivery">
                  <DeliveryInfo trackingResult={trackingResult} />
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
