
import { MapPin, Clock } from "lucide-react";
import { TrackingResult } from "@/hooks/useOrderTracking";
import { formatTime } from "@/utils/dateFormat";

interface DeliveryInfoProps {
  trackingResult: TrackingResult;
}

export const DeliveryInfo = ({ trackingResult }: DeliveryInfoProps) => {
  return (
    <div>
      {trackingResult.deliveryPerson && (
        <div className="mb-6">
          <h3 className="font-medium mb-3">Delivery Person</h3>
          <div className="flex items-center">
            <img 
              src={trackingResult.deliveryPerson.photo} 
              alt={trackingResult.deliveryPerson.name} 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <p className="font-medium">{trackingResult.deliveryPerson.name}</p>
              <p className="text-gray-600 text-sm">{trackingResult.deliveryPerson.phone}</p>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <h3 className="font-medium mb-2">Delivery Address</h3>
        <div className="flex items-start">
          <MapPin className="text-gray-500 mr-2 mt-1" size={18} />
          <p className="text-gray-700">{trackingResult.deliveryAddress}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-medium mb-2">Estimated Delivery Time</h3>
        <div className="flex items-start">
          <Clock className="text-gray-500 mr-2 mt-1" size={18} />
          <p className="text-gray-700">
            {formatTime(trackingResult.estimatedDelivery)}
          </p>
        </div>
      </div>
    </div>
  );
};

