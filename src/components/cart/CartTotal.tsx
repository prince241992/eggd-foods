
import { useCart } from '@/hooks/useCart';

const CartTotal = () => {
  const { items, getTotal } = useCart();
  const total = getTotal();

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Order Summary</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
