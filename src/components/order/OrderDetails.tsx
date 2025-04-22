
import { TrackingResult } from "@/hooks/useOrderTracking";

interface OrderDetailsProps {
  trackingResult: TrackingResult;
}

export const OrderDetails = ({ trackingResult }: OrderDetailsProps) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Items</h3>
      <ul className="list-disc pl-5 mb-4">
        {trackingResult.items.map((item, index) => (
          <li key={index} className="mb-1">{item}</li>
        ))}
      </ul>
      
      <div className="border-t pt-3 mt-3">
        <h3 className="font-medium mb-2">Branch Information</h3>
        <p className="text-gray-700">{trackingResult.branch}</p>
      </div>
    </div>
  );
};

