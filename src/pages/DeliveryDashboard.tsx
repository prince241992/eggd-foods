
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Clock, Check } from "lucide-react";

interface DeliveryOrder {
  id: string;
  customerName: string;
  address: string;
  items: string[];
  distance: number;
  estimatedEarning: number;
  status: "pending" | "picked" | "delivered";
}

const DeliveryDashboard = () => {
  const [activeOrders, setActiveOrders] = useState<DeliveryOrder[]>([
    {
      id: "ORD-2025-0419-001",
      customerName: "Amit Kumar",
      address: "123 Park Street, Sector 18, Noida",
      items: ["Egg Curry", "Deviled Eggs", "Fluffy Omelette"],
      distance: 4.2,
      estimatedEarning: 4.2 * 6, // ₹6 per km
      status: "pending"
    },
    {
      id: "ORD-2025-0419-002",
      customerName: "Priya Sharma",
      address: "456 MG Road, Gurugram",
      items: ["Egg Fried Rice", "Egg Breakfast Box"],
      distance: 3.8,
      estimatedEarning: 3.8 * 6, // ₹6 per km
      status: "picked"
    }
  ]);

  const updateOrderStatus = (orderId: string, newStatus: "pending" | "picked" | "delivered") => {
    setActiveOrders(orders => 
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Delivery Dashboard</h1>
          <p className="text-gray-600 mb-8">Manage your deliveries and track your earnings</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-1">Today's Earnings</h3>
              <p className="text-3xl font-bold text-sweet-600">₹{(4.2 + 3.8) * 6}</p>
              <p className="text-sm text-gray-500">From 2 deliveries</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-1">Total Distance</h3>
              <p className="text-3xl font-bold text-sweet-600">8.0 km</p>
              <p className="text-sm text-gray-500">Traveled today</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-1">Incentive Rate</h3>
              <p className="text-3xl font-bold text-sweet-600">₹6/km</p>
              <p className="text-sm text-gray-500">Current rate</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Active Orders</h2>
          
          <div className="space-y-6">
            {activeOrders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{order.customerName}</h3>
                      <p className="text-gray-500 text-sm">{order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sweet-600">₹{order.estimatedEarning.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{order.distance} km</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-start gap-2">
                    <MapPin className="text-gray-500 mt-0.5" size={18} />
                    <p className="text-gray-700">{order.address}</p>
                  </div>
                  
                  <div className="mt-3">
                    <h4 className="font-medium text-sm text-gray-700 mb-1">Items:</h4>
                    <ul className="text-sm text-gray-600">
                      {order.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 border-t">
                  {order.status === "pending" && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Clock size={18} className="text-orange-500 mr-2" />
                        <span className="text-orange-500 font-medium">Waiting for pickup</span>
                      </div>
                      <Button 
                        className="bg-sweet-600 hover:bg-sweet-700"
                        onClick={() => updateOrderStatus(order.id, "picked")}
                      >
                        Start Delivery
                      </Button>
                    </div>
                  )}
                  
                  {order.status === "picked" && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Package size={18} className="text-blue-500 mr-2" />
                        <span className="text-blue-500 font-medium">Out for delivery</span>
                      </div>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => updateOrderStatus(order.id, "delivered")}
                      >
                        Mark as Delivered
                      </Button>
                    </div>
                  )}
                  
                  {order.status === "delivered" && (
                    <div className="flex items-center">
                      <Check size={18} className="text-green-500 mr-2" />
                      <span className="text-green-500 font-medium">Delivered successfully</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {activeOrders.length === 0 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <p className="text-gray-600">No active orders at the moment.</p>
                <p className="text-sm text-gray-500 mt-1">New orders will appear here when assigned to you.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DeliveryDashboard;
