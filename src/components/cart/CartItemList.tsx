
import { Minus, Plus, X } from "lucide-react";
import { CartItem } from "@/types/cart";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const CartItemList = ({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 border-b bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg px-3 mb-2">
      <div className="flex items-center">
        <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover mr-2" />
        <div>
          <h3 className="text-sm font-medium">{item.name}</h3>
          <p className="text-xs text-gray-500">
            {item.addOns && Array.isArray(item.addOns) 
              ? item.addOns.map(addon => 
                  typeof addon === 'string' 
                    ? addon 
                    : addon && 'name' in addon && 'price' in addon
                      ? `${addon.name} (${addon.price})`
                      : ''
                ).join(', ')
              : ''}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4 text-sm">
          <button 
            onClick={() => onUpdateQuantity(Number(item.id), item.quantity - 1)} 
            className="text-gray-400 hover:text-black bg-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <Minus size={12} />
          </button>
          <span className="mx-2 w-4 text-center">{item.quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(Number(item.id), item.quantity + 1)} 
            className="text-gray-400 hover:text-black bg-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <Plus size={12} />
          </button>
        </div>
        <div className="flex items-center">
          <p className="font-medium text-sm mr-2">{item.price}</p>
          <button 
            onClick={() => onRemoveItem(Number(item.id))}
            className="text-gray-400 hover:text-red-500 bg-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            <X size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemList;
