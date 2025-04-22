
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AddOn } from "@/types/product";

interface ProductAddOnsProps {
  productId: number;
  addOns: AddOn[];
  selectedAddOns: Record<number, string[]>;
  onAddOnToggle: (productId: number, addOnName: string) => void;
}

const ProductAddOns = ({
  productId,
  addOns,
  selectedAddOns,
  onAddOnToggle,
}: ProductAddOnsProps) => {
  return (
    <div className="mt-2 mb-4">
      <p className="font-medium text-sm mb-1">Add-ons:</p>
      <div className="space-y-2">
        {addOns.map((addOn, idx) => (
          <div key={idx} className="flex items-center space-x-2">
            <Checkbox 
              id={`${productId}-${idx}`} 
              checked={selectedAddOns[productId]?.includes(addOn.name)}
              onCheckedChange={() => onAddOnToggle(productId, addOn.name)}
            />
            <Label htmlFor={`${productId}-${idx}`} className="flex justify-between w-full text-sm">
              <span>{addOn.name}</span>
              <span className="text-gray-600">{addOn.price}</span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAddOns;
