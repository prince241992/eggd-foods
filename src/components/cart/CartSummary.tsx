
import { AlertCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartSummaryProps {
  subtotal: number;
  orderBumpTotal: number;
  shippingFee: number;
  minimumOrderAmount: number;
  isMinimumMet: boolean;
  onCheckout: () => void;
  disabled: boolean;
}

const CartSummary = ({
  subtotal,
  orderBumpTotal,
  shippingFee,
  minimumOrderAmount,
  isMinimumMet,
  onCheckout,
  disabled
}: CartSummaryProps) => {
  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>
      {orderBumpTotal > 0 && (
        <div className="flex justify-between text-sm">
          <span>Add-ons</span>
          <span>₹{orderBumpTotal.toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between text-sm">
        <span>Delivery Fee</span>
        <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between font-bold text-lg pt-2 border-t">
        <span>Total</span>
        <span>₹{(subtotal + orderBumpTotal + shippingFee).toFixed(2)}</span>
      </div>
      
      {!isMinimumMet && (
        <div className="bg-amber-50 border border-amber-200 rounded p-2 text-xs flex items-start gap-2">
          <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={14} />
          <div>
            <p className="text-amber-800">Minimum order amount not met</p>
            <p className="text-amber-700">
              Add ₹{(minimumOrderAmount - subtotal).toFixed(2)} more to proceed.
            </p>
          </div>
        </div>
      )}
      
      <div className="text-xs text-gray-500 mt-1">
        <p className="flex items-center gap-1">
          <CreditCard size={14} className="text-pink-500" />
          We accept Credit Card, Debit Card, UPI, and Cash
        </p>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600" 
        onClick={onCheckout}
        disabled={disabled}
      >
        Proceed to Checkout
      </Button>
      
      <div className="flex justify-between pt-2">
        <span className="text-xs text-gray-500">Loyalty: 1 point per ₹10 spent</span>
        <span className="text-xs text-gray-500">Min order: ₹{minimumOrderAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;
