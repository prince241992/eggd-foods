
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Plus, Minus } from 'lucide-react';

interface ProductListItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

const ProductListItem = ({ id, name, description, price, image }: ProductListItemProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addItem({ id, name, price, quantity: 1, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart`,
    });
  };

  return (
    <Card className="overflow-hidden">
      {image && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold">₹{price.toFixed(2)}</span>
          <Button onClick={handleAddToCart} className="bg-sweet-600">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductListItem;
