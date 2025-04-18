
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AddOn {
  name: string;
  price: string;
}

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  addOns?: AddOn[];
  className?: string;
}

const ProductCard = ({ name, description, price, image, popular, className }: ProductCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300",
      className
    )}>
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-60 object-cover"
        />
        {popular && (
          <span className="absolute top-3 right-3 bg-spice-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Popular
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          <span className="font-semibold text-sweet-600">{price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <Button variant="outline" className="w-full border-sweet-500 text-sweet-600 hover:bg-sweet-50">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

