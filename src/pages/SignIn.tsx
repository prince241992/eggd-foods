
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [userType, setUserType] = useState<"customer" | "delivery">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // This is a mock authentication - would be replaced with actual auth
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: `${userType.charAt(0).toUpperCase() + userType.slice(1)} signed in!`,
        description: `Welcome back! ${userType === 'delivery' ? 'Your delivery dashboard is ready.' : 'Enjoy your food ordering experience.'}`,
        duration: 3000,
      });
      
      // Redirect based on user type
      if (userType === "delivery") {
        navigate("/delivery-dashboard");
      } else {
        navigate("/menu");
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-cream-50 py-16">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              Welcome to <span className="text-sweet-600">Egg'd Foods</span>
            </h1>
            
            <Tabs defaultValue="customer" onValueChange={(value) => setUserType(value as "customer" | "delivery")}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="customer">Customer Sign In</TabsTrigger>
                <TabsTrigger value="delivery">Delivery Partner</TabsTrigger>
              </TabsList>
              
              <TabsContent value="customer">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="youremail@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-sweet-600 hover:bg-sweet-700"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                  
                  <div className="text-center text-sm text-gray-600">
                    <p>Don't have an account? <a href="#" className="text-sweet-600 hover:underline">Sign Up</a></p>
                    <p className="mt-1"><a href="#" className="text-sweet-600 hover:underline">Forgot password?</a></p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="delivery">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="delivery-phone">Phone Number</Label>
                    <Input 
                      id="delivery-phone" 
                      type="tel" 
                      placeholder="Your registered phone number" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="delivery-password">Password</Label>
                    <Input 
                      id="delivery-password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-sweet-600 hover:bg-sweet-700"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <h3 className="font-medium text-gray-800">Delivery Partner Benefits:</h3>
                    <ul className="text-sm text-gray-600 list-disc pl-5 mt-2">
                      <li>₹6 per kilometer incentive</li>
                      <li>Real-time delivery tracking</li>
                      <li>Flexible working hours</li>
                      <li>Weekly payments</li>
                    </ul>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SignIn;
