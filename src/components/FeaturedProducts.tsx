
import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'sweets', name: 'Sweets' },
  { id: 'snacks', name: 'Snacks' },
  { id: 'gifting', name: 'Gift Boxes' },
];

const products = [
  {
    id: 1,
    name: 'Kaju Katli',
    description: 'Diamond-shaped sweet made from cashew nuts and sugar.',
    price: '$12.99',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'sweets',
    popular: true,
  },
  {
    id: 2,
    name: 'Gulab Jamun',
    description: 'Soft milk solids balls soaked in rose flavored sugar syrup.',
    price: '$9.99',
    image: 'https://images.unsplash.com/photo-1605197168184-271150704935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'sweets',
    popular: true,
  },
  {
    id: 3,
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas.',
    price: '$7.99',
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'snacks',
    popular: true,
  },
  {
    id: 4,
    name: 'Jalebi',
    description: 'Spiral-shaped deep-fried sweet soaked in sugar syrup.',
    price: '$8.99',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'sweets',
  },
  {
    id: 5,
    name: 'Festive Gift Box',
    description: 'Assorted sweets arranged beautifully in a gift box.',
    price: '$24.99',
    image: 'https://images.unsplash.com/photo-1607104200749-c6d7cec99394?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'gifting',
    popular: false,
  },
  {
    id: 6,
    name: 'Pani Puri',
    description: 'Hollow crisp fried dough balls filled with flavored water.',
    price: '$10.99',
    image: 'https://images.unsplash.com/photo-1626084712003-c99a2ecce31c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'snacks',
  },
  {
    id: 7,
    name: 'Rasgulla',
    description: 'Soft spongy milk balls soaked in light sugar syrup.',
    price: '$11.99',
    image: 'https://images.unsplash.com/photo-1590417943044-d3396132b41e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    category: 'sweets',
  },
  {
    id: 8,
    name: 'Premium Gift Box',
    description: 'Luxury assortment of our finest sweets in an elegant box.',
    price: '$34.99',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'gifting',
  },
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);
  
  return (
    <section className="py-16 bg-cream-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Our Delicious <span className="gradient-text">Menu</span></h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of authentic Indian sweets and snacks, crafted with traditional recipes and premium ingredients.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
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
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              popular={product.popular}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-sweet-600 hover:bg-sweet-700">View Full Menu</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
