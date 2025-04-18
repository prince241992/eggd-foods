import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Egg, UtensilsCrossed, Flame, PanelTop, Cookie, Wheat, Plus } from "lucide-react";

const menuCategories = [
  { id: "all", name: "All Items", icon: <UtensilsCrossed size={18} /> },
  { id: "omelette", name: "Omelettes", icon: <Egg size={18} /> },
  { id: "starter", name: "Starters", icon: <UtensilsCrossed size={18} /> },
  { id: "bhurji", name: "Bhurji", icon: <Flame size={18} /> },
  { id: "maincourse", name: "Main Course", icon: <PanelTop size={18} /> },
  { id: "bread", name: "Bread", icon: <Cookie size={18} /> },
  { id: "rice", name: "Rice", icon: <Wheat size={18} /> },
  { id: "extras", name: "Extras", icon: <Plus size={18} /> },
];

const menuItems = [
  // Omelettes
  {
    id: 1,
    name: "Simple Omelette",
    description: "Classic single egg omelette with basic spices and herbs.",
    price: "₹55",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1098&q=80",
    category: "omelette",
    addOns: [
      { name: "Extra Cheese", price: "₹30" },
      { name: "Extra Vegetables", price: "₹20" },
      { name: "Extra Spices", price: "₹10" }
    ]
  },
  {
    id: 2,
    name: "Double Omelette",
    description: "Hearty two-egg omelette with aromatic spices.",
    price: "₹100",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: [
      { name: "Extra Cheese", price: "₹30" },
      { name: "Extra Vegetables", price: "₹20" },
      { name: "Extra Spices", price: "₹10" }
    ]
  },
  {
    id: 3,
    name: "Crush Omelette",
    description: "Unique crushed style two-egg omelette with special seasoning.",
    price: "₹115",
    image: "https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: [
      { name: "Extra Cheese", price: "₹30" },
      { name: "Extra Vegetables", price: "₹20" },
      { name: "Extra Spices", price: "₹10" }
    ]
  },
  {
    id: 4,
    name: "Cheese Omelette",
    description: "Two-egg omelette loaded with premium melted cheese.",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: [
      { name: "Extra Cheese", price: "₹30" },
      { name: "Extra Vegetables", price: "₹20" },
      { name: "Extra Spices", price: "₹10" }
    ]
  },
  {
    id: 5,
    name: "Cheese Lapeti Omelette",
    description: "Special three-egg rolled omelette with generous cheese filling.",
    price: "₹230",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: [
      { name: "Extra Cheese", price: "₹40" },
      { name: "Extra Vegetables", price: "₹25" },
      { name: "Extra Spices", price: "₹15" }
    ]
  },
  {
    id: 6,
    name: "Cheese Omelette Afghani",
    description: "Two-egg omelette with Afghani spices and melted cheese.",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: [
      { name: "Extra Cheese", price: "₹35" },
      { name: "Extra Vegetables", price: "₹25" },
      { name: "Extra Spices", price: "₹15" }
    ]
  },
  // Starters
  {
    id: 3,
    name: "Deviled Eggs",
    description: "Creamy yolk filling with paprika and herbs.",
    price: "$7.99",
    image: "https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "starter",
    popular: true,
  },
  {
    id: 4,
    name: "Egg Chaat",
    description: "Boiled eggs with tangy spices and herbs.",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=1064&q=80",
    category: "starter",
    popular: false,
  },
  // Bhurji
  {
    id: 5,
    name: "Classic Egg Bhurji",
    description: "Scrambled eggs with onions, tomatoes, and Indian spices.",
    price: "$9.99",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
    category: "bhurji",
    popular: true,
  },
  {
    id: 6,
    name: "Paneer Egg Bhurji",
    description: "Scrambled eggs with cottage cheese and aromatic spices.",
    price: "$10.99",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1064&q=80",
    category: "bhurji",
    popular: false,
  },
  // Main Course
  {
    id: 7,
    name: "Classic Shakshuka",
    description: "Eggs poached in a spicy tomato sauce with bell peppers and herbs.",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "maincourse",
    popular: true,
  },
  {
    id: 8,
    name: "Eggs Benedict",
    description: "Poached eggs, ham, and hollandaise sauce on English muffins.",
    price: "$14.99",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80",
    category: "maincourse",
    popular: true,
  },
  {
    id: 9,
    name: "Egg Curry",
    description: "Hard-boiled eggs simmered in a rich, aromatic curry sauce.",
    price: "$13.99",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    category: "maincourse",
    popular: false,
  },
  // Bread
  {
    id: 10,
    name: "Egg Paratha",
    description: "Whole wheat flatbread stuffed with spiced eggs.",
    price: "$6.99",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1064&q=80",
    category: "bread",
    popular: false,
  },
  {
    id: 11,
    name: "French Toast",
    description: "Brioche bread dipped in egg batter, grilled and topped with powdered sugar.",
    price: "$8.99",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1064&q=80",
    category: "bread",
    popular: true,
  },
  // Rice
  {
    id: 12,
    name: "Egg Fried Rice",
    description: "Fluffy rice with scrambled eggs, vegetables, and savory sauces.",
    price: "$10.99",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    category: "rice",
    popular: true,
  },
  {
    id: 13,
    name: "Egg Biryani",
    description: "Aromatic basmati rice cooked with hard-boiled eggs and authentic spices.",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1064&q=80",
    category: "rice",
    popular: false,
  },
  // Extras
  {
    id: 14,
    name: "Egg Salad",
    description: "Chopped hard-boiled eggs mixed with mayo, mustard, and fresh herbs.",
    price: "$5.99",
    image: "https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=654&q=80",
    category: "extras",
    popular: false,
  },
  {
    id: 15,
    name: "Egg Breakfast Box",
    description: "Assortment of our best egg breakfast items in a convenient box.",
    price: "$16.99",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    category: "extras",
    popular: true,
  },
];

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
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
            <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
              Explore our wide range of delicious egg-based recipes, crafted with farm-fresh ingredients and culinary expertise.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {menuCategories.map(category => (
                <button
                  key={category.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-sweet-600 text-white'
                      : 'bg-cream-100 text-gray-700 hover:bg-cream-200'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  popular={item.popular}
                  addOns={item.addOns}
                />
              ))}
            </div>
            
            {filteredItems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-600 text-lg">No items found in this category.</p>
              </div>
            )}
            
            <div className="text-center mt-12">
              <Button className="bg-sweet-600 hover:bg-sweet-700">Place an Order</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
