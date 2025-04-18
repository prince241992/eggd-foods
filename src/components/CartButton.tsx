
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const CartButton = () => {
  return (
    <Button 
      className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-sweet-600 hover:bg-sweet-700 shadow-lg z-50"
      onClick={() => console.log("Open cart")}
    >
      <ShoppingCart className="h-6 w-6" />
    </Button>
  );
};

export default CartButton;
