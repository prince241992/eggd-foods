import { useState } from "react";
import { 
  User, Home, ShoppingBag, CreditCard, Settings, Star, LogOut, Package, Heart, Gift 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import LoyaltyCard from "@/components/LoyaltyCard";
import OrderHistory from "@/components/OrderHistory";
import SubscriptionPlans from "@/components/SubscriptionPlans";

const Account = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { toast } = useToast();
  
  // Form states
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    address: "123 Main Street, Vijaynagar",
    city: "Indore",
    pincode: "452010",
    state: "Madhya Pradesh",
    country: "India"
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
      duration: 2000,
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
      duration: 2000,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <div className="flex items-center">
                  <Avatar className="h-16 w-16 border-2 border-white">
                    <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h2 className="font-bold text-lg">{profile.name}</h2>
                    <p className="opacity-80 text-sm">{profile.email}</p>
                  </div>
                </div>
                <div className="mt-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1" fill="currentColor" />
                    <span>Loyalty Points: 35</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <nav className="space-y-1">
                  {[
                    { id: "dashboard", icon: <Home className="h-4 w-4" />, label: "Dashboard" },
                    { id: "orders", icon: <Package className="h-4 w-4" />, label: "My Orders" },
                    { id: "favorites", icon: <Heart className="h-4 w-4" />, label: "Favorites" },
                    { id: "rewards", icon: <Gift className="h-4 w-4" />, label: "Rewards" },
                    { id: "subscription", icon: <Star className="h-4 w-4" />, label: "Subscription" },
                    { id: "profile", icon: <User className="h-4 w-4" />, label: "Profile" },
                    { id: "settings", icon: <Settings className="h-4 w-4" />, label: "Settings" }
                  ].map(item => (
                    <button
                      key={item.id}
                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                        activeTab === item.id 
                          ? "bg-purple-100 text-purple-900" 
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                  <Separator />
                  <button
                    className="flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Logout
                  </button>
                </nav>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-9">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <h1 className="text-2xl font-bold">Welcome back, {profile.name.split(" ")[0]}!</h1>
                
                <LoyaltyCard points={35} referrals={2} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: <ShoppingBag />, label: "Active Orders", value: "2" },
                    { icon: <Package />, label: "Past Orders", value: "12" },
                    { icon: <CreditCard />, label: "Total Spent", value: "₹3,245" },
                    { icon: <Star fill="currentColor" />, label: "Saved Items", value: "5" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="bg-purple-100 p-2 rounded-full">
                          <div className="text-purple-600">
                            {stat.icon}
                          </div>
                        </div>
                        <span className="text-2xl font-bold">{stat.value}</span>
                      </div>
                      <p className="text-gray-500 mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
                  <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                          <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {[
                          { id: "ORD-2025-0001", date: "15 Apr 2025", status: "Delivered", total: "₹349.99" },
                          { id: "ORD-2025-0002", date: "10 Apr 2025", status: "Delivered", total: "₹499.99" },
                          { id: "ORD-2025-0003", date: "05 Apr 2025", status: "Delivered", total: "₹649.99" },
                        ].map((order, i) => (
                          <tr key={i} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm font-medium">{order.id}</td>
                            <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium text-right">{order.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="p-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => setActiveTab("orders")}
                      >
                        View All Orders
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === "orders" && <OrderHistory />}
            
            {/* Subscription Tab */}
            {activeTab === "subscription" && <SubscriptionPlans />}
            
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Your Profile</h1>
                
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden p-6">
                  <form onSubmit={handleProfileUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          name="name"
                          value={profile.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <Input
                          name="phone"
                          value={profile.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <Input
                          name="address"
                          value={profile.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <Input
                          name="city"
                          value={profile.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode
                        </label>
                        <Input
                          name="pincode"
                          value={profile.pincode}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <Input
                          name="state"
                          value={profile.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <Input
                          name="country"
                          value={profile.country}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-purple-500 to-pink-500"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {/* Other tabs can be added similarly */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Settings</h1>
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden p-6">
                  <h2 className="text-lg font-medium mb-4">Notification Preferences</h2>
                  <div className="space-y-4">
                    {/* Settings options would go here */}
                    <p className="text-gray-500">Settings options coming soon...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
