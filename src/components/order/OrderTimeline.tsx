
import { Check } from "lucide-react";
import { formatTime } from "@/utils/dateFormat";
import { TrackingResult } from "@/hooks/useOrderTracking";

interface OrderTimelineProps {
  trackingResult: TrackingResult;
}

export const OrderTimeline = ({ trackingResult }: OrderTimelineProps) => {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 h-full w-1 bg-gray-200"></div>
      
      {/* Ordered Step */}
      <div className="relative flex items-start mb-8">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.ordered ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
          <Check size={20} className={trackingResult.timeStamps.ordered ? 'text-green-500' : 'text-gray-400'} />
        </div>
        <div className="ml-4 mt-1">
          <h3 className="font-medium">Order Placed</h3>
          <p className="text-gray-500 text-sm">
            {trackingResult.timeStamps.ordered ? formatTime(trackingResult.timeStamps.ordered) : 'Pending'}
          </p>
        </div>
      </div>
      
      {/* Confirmed Step */}
      <div className="relative flex items-start mb-8">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.confirmed ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
          <Check size={20} className={trackingResult.timeStamps.confirmed ? 'text-green-500' : 'text-gray-400'} />
        </div>
        <div className="ml-4 mt-1">
          <h3 className="font-medium">Order Confirmed</h3>
          <p className="text-gray-500 text-sm">
            {trackingResult.timeStamps.confirmed ? formatTime(trackingResult.timeStamps.confirmed) : 'Pending'}
          </p>
        </div>
      </div>
      
      {/* Preparing Step */}
      <div className="relative flex items-start mb-8">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.preparing ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
          <Check size={20} className={trackingResult.timeStamps.preparing ? 'text-green-500' : 'text-gray-400'} />
        </div>
        <div className="ml-4 mt-1">
          <h3 className="font-medium">Preparing Your Food</h3>
          <p className="text-gray-500 text-sm">
            {trackingResult.timeStamps.preparing ? formatTime(trackingResult.timeStamps.preparing) : 'Pending'}
          </p>
        </div>
      </div>
      
      {/* Out for delivery Step */}
      <div className="relative flex items-start mb-8">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.picked ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
          <Check size={20} className={trackingResult.timeStamps.picked ? 'text-green-500' : 'text-gray-400'} />
        </div>
        <div className="ml-4 mt-1">
          <h3 className="font-medium">Out for Delivery</h3>
          <p className="text-gray-500 text-sm">
            {trackingResult.timeStamps.picked ? formatTime(trackingResult.timeStamps.picked) : 'Pending'}
          </p>
        </div>
      </div>
      
      {/* Delivered Step */}
      <div className="relative flex items-start">
        <div className={`h-12 w-12 rounded-full flex items-center justify-center z-10 border-2 ${trackingResult.timeStamps.delivered ? 'bg-green-100 border-green-500' : 'bg-gray-100 border-gray-300'}`}>
          <Check size={20} className={trackingResult.timeStamps.delivered ? 'text-green-500' : 'text-gray-400'} />
        </div>
        <div className="ml-4 mt-1">
          <h3 className="font-medium">Delivered</h3>
          <p className="text-gray-500 text-sm">
            {trackingResult.timeStamps.delivered ? formatTime(trackingResult.timeStamps.delivered) : 'Estimated: ' + formatTime(trackingResult.estimatedDelivery)}
          </p>
        </div>
      </div>
    </div>
  );
};

