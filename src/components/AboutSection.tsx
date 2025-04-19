
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
              alt="Our kitchen" 
              className="rounded-lg shadow-xl w-full object-cover h-[500px]"
            />
            <div className="absolute -top-6 right-4 bg-white p-5 rounded-full shadow-lg hidden md:block">
              <span className="text-4xl">🍳</span>
            </div>
            <div className="absolute -bottom-6 left-4 bg-[#FFB700] bg-opacity-90 p-3 rounded-lg shadow-lg rotate-2 hidden md:flex">
              <span className="font-display font-bold text-white">Fresh & Nutritious</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-[#FFB700] text-lg font-medium uppercase tracking-wider">Our Story</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-display mt-2">
                Revolutionizing <span className="text-[#FFB700]">Egg Cuisine 🥚</span>
              </h3>
            </div>
            
            <p className="text-gray-600">
              It all started with a simple observation: eggs, despite being a nutritional powerhouse, were often overlooked or prepared without much creativity. As a passionate food enthusiast, I saw an opportunity to revolutionize how people think about and enjoy eggs.
            </p>
            <p className="text-gray-600">
              Growing up in a family where cooking was an expression of love, I learned that eggs weren't just breakfast food - they were a canvas for culinary creativity. This inspired me to start Egg'd Foods, turning my passion for innovative egg dishes into a mission to bring exciting, nutritious, and delicious egg-based meals to everyone.
            </p>
            <p className="text-gray-600">
              Every recipe we create is a perfect blend of health and taste. Eggs are packed with protein, vitamins, and minerals, making them the perfect foundation for a nutritious meal. We've spent countless hours perfecting our recipes, sourcing the freshest ingredients, and creating dishes that surprise and delight.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { title: "Premium Quality", description: "Farm-fresh eggs & premium ingredients" },
                { title: "Health First", description: "Protein-rich, nutritious recipes" },
                { title: "Innovation", description: "Creative & unique egg preparations" },
                { title: "Fast Delivery", description: "Hot & fresh to your doorstep" }
              ].map((item, index) => (
                <div key={index} className="border border-[#FFB700] border-opacity-20 p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-white">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <Link to="/about">
              <Button className="bg-[#FFB700] hover:bg-[#E6A500]">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
