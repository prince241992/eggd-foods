
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-cream-50 to-cream-100 py-16 md:py-24">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 max-w-lg">
          <span className="inline-block bg-sweet-100 text-sweet-800 px-4 py-1 rounded-full text-sm font-medium">Gourmet Egg Recipes</span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-tight">
            <span className="gradient-text">Egg-cellent Food</span> Delivered To Your Door
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the versatility of eggs with our chef-crafted recipes. Made fresh daily in our Egg'd Foods cloud kitchen, delivered straight to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-sweet-600 hover:bg-sweet-700 text-lg h-12 px-8">Order Now</Button>
            <Link to="/menu">
              <Button variant="outline" className="border-sweet-500 text-sweet-600 hover:bg-sweet-50 text-lg h-12 px-8">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
            alt="Delicious Egg Dishes" 
            className="rounded-xl shadow-2xl animate-float object-cover w-full max-h-[500px]"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg rotate-6 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 rounded-full w-3 h-3"></div>
              <span className="font-medium">Ready to Order</span>
            </div>
          </div>
          <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg -rotate-6 hidden md:block">
            <div className="text-amber-500 font-bold">★★★★★</div>
            <div className="text-sm text-gray-600">500+ Reviews</div>
          </div>
        </div>
      </div>
      
      <div className="container-custom mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Farm Fresh Eggs", value: "100%" },
            { label: "Made Fresh Daily", value: "Guaranteed" },
            { label: "Delivery Areas", value: "All City" },
            { label: "Satisfied Customers", value: "10,000+" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold font-display text-gray-800">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
