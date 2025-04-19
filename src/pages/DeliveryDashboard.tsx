
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Package, MapPin, Clock, Check, Phone, AlertCircle, ChevronDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeliveryBranch {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
}

interface DeliveryOrder {
  id: string;
  customerName: string;
  address: string;
  items: string[];
  distance: number;
  estimatedEarning: number;
  status: "pending" | "picked" | "delivered";
  phone?: string;
  branchId: string;
  timestamp: string;
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
      status: "pending",
      phone: "+91 98765-43210",
      branchId: "branch-1",
      timestamp: "2025-04-19T10:15:00Z"
    },
    {
      id: "ORD-2025-0419-002",
      customerName: "Priya Sharma",
      address: "456 MG Road, Gurugram",
      items: ["Egg Fried Rice", "Egg Breakfast Box"],
      distance: 3.8,
      estimatedEarning: 3.8 * 6, // ₹6 per km
      status: "picked",
      phone: "+91 95432-10987",
      branchId: "branch-1",
      timestamp: "2025-04-19T09:30:00Z"
    },
    {
      id: "ORD-2025-0419-003",
      customerName: "Rahul Verma",
      address: "789 Andheri East, Mumbai",
      items: ["Deviled Eggs Deluxe", "Classic Shakshuka", "Coffee"],
      distance: 5.1,
      estimatedEarning: 5.1 * 6, // ₹6 per km
      status: "pending",
      phone: "+91 87654-32109",
      branchId: "branch-2",
      timestamp: "2025-04-19T11:05:00Z"
    }
  ]);

  const [branches, setBranches] = useState<DeliveryBranch[]>([
    { id: "branch-1", name: "Central Kitchen", address: "123 Main Street, Delhi", isActive: true },
    { id: "branch-2", name: "Mumbai Branch", address: "456 Marine Drive, Mumbai", isActive: true },
    { id: "branch-3", name: "Bangalore Branch", address: "789 MG Road, Bangalore", isActive: false }
  ]);

  const [selectedBranch, setSelectedBranch] = useState<string>("branch-1");
  const [newOrderAlert, setNewOrderAlert] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate a new order coming in after 10 seconds
    const timer = setTimeout(() => {
      const newOrder: DeliveryOrder = {
        id: "ORD-2025-0419-004",
        customerName: "Sandeep Singh",
        address: "101 Connaught Place, New Delhi",
        items: ["Classic Shakshuka", "Breakfast Platter", "Orange Juice"],
        distance: 3.4,
        estimatedEarning: 3.4 * 6,
        status: "pending",
        phone: "+91 77777-88888",
        branchId: "branch-1",
        timestamp: new Date().toISOString()
      };
      
      setNewOrderAlert(true);
      // Play notification sound
      const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
      audio.play();
      
      setActiveOrders(prevOrders => [newOrder, ...prevOrders]);
      
      toast({
        title: "New Order Received!",
        description: `${newOrder.id} from ${newOrder.customerName}`,
        duration: 5000,
      });
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const updateOrderStatus = (orderId: string, newStatus: "pending" | "picked" | "delivered") => {
    setActiveOrders(orders => 
      orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} is now ${newStatus}`,
      duration: 2000,
    });
  };
  
  const filteredOrders = activeOrders.filter(order => order.branchId === selectedBranch);
  const activeOrOrderedBranches = branches.filter(branch => branch.isActive);
  const selectedBranchName = branches.find(branch => branch.id === selectedBranch)?.name || "";
  
  // Calculate metrics for the selected branch
  const branchMetrics = {
    totalOrders: filteredOrders.length,
    pendingOrders: filteredOrders.filter(order => order.status === "pending").length,
    inDeliveryOrders: filteredOrders.filter(order => order.status === "picked").length,
    deliveredOrders: filteredOrders.filter(order => order.status === "delivered").length,
    totalEarnings: filteredOrders.reduce((sum, order) => sum + order.estimatedEarning, 0)
  };

  const handlePrintInvoice = (orderId: string) => {
    // In a real app, this would open a print dialog with the invoice
    toast({
      title: "Printing Invoice",
      description: `Preparing invoice for order ${orderId}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Delivery Dashboard</h1>
              <p className="text-gray-600">Manage deliveries and track earnings</p>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span>{selectedBranchName}</span>
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="space-y-2">
                  <h3 className="font-medium">Select Branch</h3>
                  <RadioGroup 
                    value={selectedBranch}
                    onValueChange={setSelectedBranch}
                    className="gap-2"
                  >
                    {activeOrOrderedBranches.map(branch => (
                      <div key={branch.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={branch.id} id={branch.id} />
                        <Label htmlFor={branch.id} className="flex flex-col">
                          <span>{branch.name}</span>
                          <span className="text-xs text-gray-500">{branch.address}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{branchMetrics.totalOrders}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-amber-600">{branchMetrics.pendingOrders}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">In Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">{branchMetrics.inDeliveryOrders}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Delivered</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{branchMetrics.deliveredOrders}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-sweet-600">₹{branchMetrics.totalEarnings.toFixed(2)}</p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-xl font-bold mb-4">Active Orders</h2>
          
          <div className="space-y-6">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <div key={order.id} className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${order.status === "pending" ? "border-amber-500" : order.status === "picked" ? "border-blue-500" : "border-green-500"}`}>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{order.customerName}</h3>
                          {newOrderAlert && order.id === "ORD-2025-0419-004" && (
                            <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-md animate-pulse">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">{order.id}</p>
                        <p className="text-gray-500 text-sm">
                          {new Date(order.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sweet-600">₹{order.estimatedEarning.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">{order.distance} km</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                          onClick={() => handlePrintInvoice(order.id)}
                        >
                          Print Invoice
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-start gap-2">
                      <MapPin className="text-gray-500 mt-0.5 flex-shrink-0" size={18} />
                      <p className="text-gray-700">{order.address}</p>
                    </div>
                    
                    {order.phone && (
                      <div className="mt-2 flex items-center gap-2">
                        <Phone className="text-gray-500" size={18} />
                        <p className="text-gray-700">{order.phone}</p>
                      </div>
                    )}
                    
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
                        <div className="space-x-2">
                          <Button 
                            className="bg-sweet-600 hover:bg-sweet-700"
                            onClick={() => updateOrderStatus(order.id, "picked")}
                          >
                            Start Delivery
                          </Button>
                        </div>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Check size={18} className="text-green-500 mr-2" />
                          <span className="text-green-500 font-medium">Delivered successfully</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Thank you for your service!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600 font-medium">No active orders for this branch.</p>
                <p className="text-sm text-gray-500 mt-1">Select a different branch or check back later.</p>
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
