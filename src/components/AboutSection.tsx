
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1516600164266-f3b8166ae679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
              alt="Our cloud kitchen" 
              className="rounded-lg shadow-xl w-full object-cover h-[500px]"
            />
            <div className="absolute -top-6 right-4 bg-white p-5 rounded-full shadow-lg hidden md:block">
              <span className="text-4xl">🍽️</span>
            </div>
            <div className="absolute -bottom-6 left-4 bg-white p-3 rounded-lg shadow-lg rotate-2 hidden md:flex">
              <span className="font-display font-bold text-sweet-600">Traditional Recipes</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-sweet-700 text-lg font-medium uppercase tracking-wider">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-bold font-display mt-2">
                Our Sweet <span className="text-spice-600">Story</span>
              </h3>
            </div>
            
            <p className="text-gray-600">
              SweetHub began with a simple mission: to bring authentic, high-quality Indian sweets and snacks to more people through the convenience of a cloud kitchen model.
            </p>
            <p className="text-gray-600">
              Our team of experienced chefs brings decades of expertise in traditional Indian sweet making, combining age-old recipes with modern food safety standards. Every item is prepared fresh daily in our state-of-the-art kitchen facility.
            </p>
            <p className="text-gray-600">
              We source only the finest ingredients and never compromise on quality. From the ghee we use to the nuts we select, every component is chosen with care to create sweets that are not just delicious, but also authentic to their traditional roots.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { title: "Fresh Ingredients", description: "We source premium quality ingredients daily" },
                { title: "Expert Chefs", description: "Our master chefs have over 25 years of experience" },
                { title: "Hygienic Preparation", description: "FSSAI certified clean kitchen environment" },
                { title: "Fast Delivery", description: "We ensure your sweets arrive fresh and on time" }
              ].map((item, index) => (
                <div key={index} className="border border-cream-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
            
            <Button className="bg-sweet-600 hover:bg-sweet-700">Learn More About Us</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
