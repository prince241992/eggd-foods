
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  addOns?: string[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({ 
  id, 
  name, 
  price, 
  quantity, 
  image, 
  addOns, 
  onUpdateQuantity, 
  onRemove 
}: CartItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg px-3 mb-2">
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="w-10 h-10 rounded object-cover mr-2" 
        />
        <div>
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-xs text-gray-500">
            {addOns && addOns.length > 0 ? `+ ${addOns.join(', ')}` : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 text-sm">
          <button 
            onClick={() => onUpdateQuantity(id, quantity - 1)} 
            className="text-gray-400 hover:text-black bg-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <Minus size={12} />
          </button>
          <span className="mx-2 w-4 text-center">{quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(id, quantity + 1)} 
            className="text-gray-400 hover:text-black bg-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <Plus size={12} />
          </button>
        </div>
        <div className="flex items-center">
          <p className="font-medium text-sm mr-2">{price}</p>
          <button 
            onClick={() => onRemove(id)}
            className="text-gray-400 hover:text-red-500 bg-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
