
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
              alt="Our cloud kitchen" 
              className="rounded-lg shadow-xl w-full object-cover h-[500px]"
            />
            <div className="absolute -top-6 right-4 bg-white p-5 rounded-full shadow-lg hidden md:block">
              <span className="text-4xl">🍳</span>
            </div>
            <div className="absolute -bottom-6 left-4 bg-white p-3 rounded-lg shadow-lg rotate-2 hidden md:flex">
              <span className="font-display font-bold text-sweet-600">Farm Fresh Eggs</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-sweet-700 text-lg font-medium uppercase tracking-wider">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-display mt-2">
                Our Egg-citing <span className="text-spice-600">Journey</span>
              </h3>
            </div>
            
            <p className="text-gray-600">
              Egg'd Foods began with a simple mission: to showcase the incredible versatility of eggs through delicious, chef-crafted recipes delivered straight to your door.
            </p>
            <p className="text-gray-600">
              Our team of culinary experts brings decades of experience in creating exceptional egg-based dishes, combining classic techniques with innovative flavors. Every meal is prepared fresh daily in our state-of-the-art cloud kitchen.
            </p>
            <p className="text-gray-600">
              We source only the finest ingredients, starting with farm-fresh, free-range eggs. From the seasonal produce we select to the artisanal breads we bake, every component is chosen with care to create dishes that are nutritious, delicious, and satisfying.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { title: "Farm-Fresh Eggs", description: "We source premium quality eggs daily from local farms" },
                { title: "Expert Chefs", description: "Our culinary team specializes in egg-based cuisine" },
                { title: "Sustainable Practices", description: "Eco-friendly packaging and responsible sourcing" },
                { title: "Fast Delivery", description: "We ensure your food arrives hot and fresh" }
              ].map((item, index) => (
                <div key={index} className="border border-cream-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <Link to="/about">
              <Button className="bg-sweet-600 hover:bg-sweet-700">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
