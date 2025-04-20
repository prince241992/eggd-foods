
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuCategories from "@/components/menu/MenuCategories";
import { menuItems } from "@/data/menuData";
import ProductGallery from "@/components/ProductGallery";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cardStyle, setCardStyle] = useState<"default" | "modern" | "minimal" | "detailed">("detailed");
  
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="py-16 bg-gradient-to-br from-purple-100 to-pink-100">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-center">
              Our <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-transparent bg-clip-text">Menu</span>
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
              Explore our wide range of delicious egg-based recipes, crafted with farm-fresh ingredients and culinary expertise.
            </p>
            
            <MenuCategories 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <ProductGallery 
              title="" 
              initialProducts={filteredItems}
              showNutrition={true}
              cardStyle={cardStyle}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
