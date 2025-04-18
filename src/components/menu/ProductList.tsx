
import ProductCard from "@/components/ProductCard";
import { MenuItem } from "@/data/menuData";

interface ProductListProps {
  items: MenuItem[];
}

const ProductList = ({ items }: ProductListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
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
      
      {items.length === 0 && (
        <div className="text-center py-10 col-span-full">
          <p className="text-gray-600 text-lg">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;

