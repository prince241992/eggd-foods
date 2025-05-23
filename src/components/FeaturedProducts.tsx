
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import ProductCardAlternate from './ProductCardAlternate';

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'popular', name: 'Most Popular' },
  { id: 'new', name: 'New Arrivals' },
  { id: 'specialty', name: 'Specialty Items' },
];

const products = [
  {
    id: 1,
    name: 'Classic Shakshuka',
    description: 'Eggs poached in a spicy tomato sauce with bell peppers and herbs.',
    price: '₹12.99',
    image: 'https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
    category: 'breakfast',
    popular: true,
    nutritionInfo: {
      calories: '320 kcal',
      protein: '14g',
      carbs: '18g',
      fat: '22g',
    }
  },
  {
    id: 2,
    name: 'Eggs Benedict',
    description: 'Poached eggs, ham, and hollandaise sauce on English muffins.',
    price: '₹14.99',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80',
    category: 'breakfast',
    popular: true,
    nutritionInfo: {
      calories: '450 kcal',
      protein: '22g',
      carbs: '25g',
      fat: '28g',
    }
  },
  {
    id: 3,
    name: 'Egg Fried Rice',
    description: 'Fluffy rice with scrambled eggs, vegetables, and savory sauces.',
    price: '₹10.99',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80',
    category: 'lunch',
    popular: true,
    nutritionInfo: {
      calories: '380 kcal',
      protein: '12g',
      carbs: '55g',
      fat: '14g',
    }
  },
  {
    id: 4,
    name: 'Deviled Eggs',
    description: 'Halved hard-boiled eggs filled with creamy, seasoned yolk mixture.',
    price: '₹8.99',
    image: 'https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'specialty',
    nutritionInfo: {
      calories: '180 kcal',
      protein: '9g',
      carbs: '2g',
      fat: '15g',
    }
  },
  {
    id: 5,
    name: 'Egg Curry',
    description: 'Hard-boiled eggs simmered in a rich, aromatic curry sauce.',
    price: '₹13.99',
    image: 'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    category: 'lunch',
    popular: false,
    nutritionInfo: {
      calories: '410 kcal',
      protein: '18g',
      carbs: '28g',
      fat: '25g',
    }
  },
  {
    id: 6,
    name: 'Fluffy Omelette',
    description: 'Three-egg omelette with cheese, vegetables, and your choice of protein.',
    price: '₹11.99',
    image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1098&q=80',
    category: 'breakfast',
    nutritionInfo: {
      calories: '350 kcal',
      protein: '24g',
      carbs: '6g',
      fat: '26g',
    }
  },
  {
    id: 7,
    name: 'Egg Salad Sandwich',
    description: 'Creamy egg salad with herbs on freshly baked bread.',
    price: '₹9.99',
    image: 'https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=654&q=80',
    category: 'lunch',
    nutritionInfo: {
      calories: '420 kcal',
      protein: '16g',
      carbs: '35g',
      fat: '22g',
    }
  },
  {
    id: 8,
    name: 'Egg Breakfast Box',
    description: 'Assortment of our best egg breakfast items in a convenient box.',
    price: '₹16.99',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
    category: 'specialty',
    nutritionInfo: {
      calories: '580 kcal',
      protein: '28g',
      carbs: '45g',
      fat: '32g',
    }
  },
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  const handleViewMenu = () => {
    navigate('/menu');
  };

  return (
    <section className="py-16 bg-cream-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Our Delicious <span className="gradient-text">Menu</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of egg-based dishes, crafted with farm-fresh eggs and premium ingredients by our expert chefs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-sweet-600 text-white'
                    : 'bg-cream-100 text-gray-700 hover:bg-cream-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCardAlternate
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              popular={product.popular}
              showNutrition={false}
              nutritionInfo={product.nutritionInfo}
              className=""
              style="modern"
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-sweet-600 hover:bg-sweet-700" onClick={handleViewMenu}>View Full Menu</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
