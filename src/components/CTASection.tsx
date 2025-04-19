
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CTASection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleOrderNow = () => {
    toast({
      title: "Starting your order",
      description: "Taking you to our menu page",
      duration: 2000,
    });
    navigate('/menu');
  };
  
  const handleViewMenu = () => {
    navigate('/menu');
  };
  
  return (
    <section className="py-16 bg-gradient-to-r from-sweet-600 to-spice-600 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
              Ready to Try Our Egg-cellent Creations?
            </h2>
            <p className="text-white/90 mb-8 text-lg">
              Order now and get your favorite egg dishes delivered straight to your doorstep. Fresh, delicious, and nutritious - prepared by our expert chefs!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-sweet-600 hover:bg-cream-100 h-12 px-8"
                onClick={handleOrderNow}
              >
                Order Now
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-sweet-700/50 h-12 px-8"
                onClick={handleViewMenu}
              >
                View Menu
              </Button>
            </div>
            
            <div className="mt-6 bg-white/10 p-4 rounded-lg">
              <p className="text-white/90 text-sm">
                <span className="font-bold">Business Hours:</span> Monday to Sunday, 11AM to 3AM
              </p>
              <p className="text-white/90 text-sm mt-1">
                <span className="font-bold">Now serving:</span> INDORE, VADODARA (Coming soon to DELHI NCR)
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex justify-end">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1661606875122-33788cddc606?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
                alt="Delicious egg dish" 
                className="rounded-lg shadow-lg w-[350px] h-[350px] object-cover"
              />
              <div className="absolute -top-4 -left-4 bg-white p-3 rounded-md shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-800">Same Day Delivery</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-md shadow-md">
                <div className="text-gray-800 font-medium">Use Code: <span className="text-sweet-600">EGG10</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
