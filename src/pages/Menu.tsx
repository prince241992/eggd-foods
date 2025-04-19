
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import MenuCategories from "@/components/menu/MenuCategories";
import ProductList from "@/components/menu/ProductList";
import { menuItems } from "@/data/menuData";
import ProductGallery from "@/components/ProductGallery";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showGalleryView, setShowGalleryView] = useState(false);
  const [cardStyle, setCardStyle] = useState<"default" | "modern" | "minimal" | "detailed">("minimal");
  
  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="py-16 bg-cream-50">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-center">
              Our <span className="gradient-text">Menu</span>
            </h1>
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
              Explore our wide range of delicious egg-based recipes, crafted with farm-fresh ingredients and culinary expertise.
            </p>
            
            <div className="flex justify-center mb-4">
              <div className="inline-flex rounded-md border">
                <Button 
                  variant={!showGalleryView ? "default" : "outline"} 
                  onClick={() => setShowGalleryView(false)}
                  className="rounded-r-none"
                >
                  Classic View
                </Button>
                <Button 
                  variant={showGalleryView ? "default" : "outline"} 
                  onClick={() => setShowGalleryView(true)}
                  className="rounded-l-none"
                >
                  Gallery View
                </Button>
              </div>
            </div>
            
            <MenuCategories 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            {showGalleryView ? (
              <ProductGallery 
                title="" 
                initialProducts={filteredItems}
                showNutrition={true}
                cardStyle={cardStyle}
              />
            ) : (
              <>
                <ProductList items={filteredItems} />
                
                <div className="text-center mt-12">
                  <Button className="bg-sweet-600 hover:bg-sweet-700">Place an Order</Button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
