
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const DeliveryAgentSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add authentication logic here
    toast({
      title: "Login Successful",
      description: "Welcome back to Egg'd Foods Delivery!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-yellow-600">
      <div className="container-custom py-16">
        <div className="max-w-md mx-auto bg-black/90 p-8 rounded-lg shadow-xl">
          <h1 className="text-3xl font-bold text-yellow-400 text-center mb-8">
            Delivery Agent Login
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-yellow-400 block mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-yellow-400 text-white"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label className="text-yellow-400 block mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-yellow-400 text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
            >
              Sign In
            </Button>
          </form>
          
          <p className="text-yellow-400 text-sm text-center mt-6">
            Contact your supervisor if you're having trouble logging in.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAgentSignIn;
