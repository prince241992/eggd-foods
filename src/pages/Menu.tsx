
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturedProducts from "@/components/FeaturedProducts";

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="py-16 bg-cream-50">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-center">
              Our <span className="gradient-text">Menu</span>
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Explore our wide range of delicious egg-based recipes, crafted with farm-fresh ingredients and culinary expertise.
            </p>
          </div>
        </div>
        
        <FeaturedProducts />
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
