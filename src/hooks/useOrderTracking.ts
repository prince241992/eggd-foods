
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface TrackingResult {
  id: string;
  customerName: string;
  status: "ordered" | "confirmed" | "preparing" | "picked" | "delivered";
  timeStamps: {
    ordered: string;
    confirmed: string;
    preparing: string;
    picked: string;
    delivered: null | string;
  };
  items: string[];
  deliveryAddress: string;
  branch: string;
  deliveryPerson?: {
    name: string;
    phone: string;
    photo: string;
  };
  estimatedDelivery: string;
}

export const useOrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<TrackingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleTrackOrder = () => {
    if (!orderNumber.trim()) {
      toast({
        title: "Order number required",
        description: "Please enter a valid order number.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (orderNumber.toLowerCase() === "egg-2025-0419-001") {
        setTrackingResult({
          id: "EGG-2025-0419-001",
          customerName: "Amit Kumar",
          status: "picked",
          timeStamps: {
            ordered: "2025-04-19T10:15:00",
            confirmed: "2025-04-19T10:18:00",
            preparing: "2025-04-19T10:25:00",
            picked: "2025-04-19T10:45:00",
            delivered: null,
          },
          items: ["Egg Curry", "Deviled Eggs", "Fluffy Omelette"],
          deliveryAddress: "123 Park Street, Sector 18, Noida",
          branch: "Central Kitchen",
          deliveryPerson: {
            name: "Rajesh S.",
            phone: "+91 98765 43210",
            photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3"
          },
          estimatedDelivery: "2025-04-19T11:15:00"
        });
      } else {
        setTrackingResult(null);
        toast({
          title: "Order not found",
          description: "We couldn't find an order with that number. Please check and try again.",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1500);
  };

  return {
    orderNumber,
    setOrderNumber,
    trackingResult,
    loading,
    handleTrackOrder
  };
};

