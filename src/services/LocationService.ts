
import { useToast } from "@/hooks/use-toast";

export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  error?: string;
}

export const useLocation = () => {
  const { toast } = useToast();

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        toast({
          title: "Location Error",
          description: "Geolocation is not supported by your browser",
          variant: "destructive",
        });
        reject({
          error: "Geolocation is not supported by your browser"
        });
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // We would normally use reverse geocoding here with Google Maps API
            // For now, we'll just return the coordinates
            resolve({
              latitude,
              longitude,
              address: "Auto-detected location (coordinates only)",
              city: "Current city"
            });
          } catch (error) {
            resolve({
              latitude,
              longitude,
              error: "Could not get address details"
            });
          }
        },
        (error) => {
          let errorMessage = "Unknown error occurred";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for geolocation";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out";
              break;
          }
          
          toast({
            title: "Location Error",
            description: errorMessage,
            variant: "destructive",
          });
          
          reject({ error: errorMessage });
        }
      );
    });
  };
  
  const calculateDistance = (
    lat1: number, 
    lon1: number, 
    lat2: number, 
    lon2: number
  ): number => {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return parseFloat(distance.toFixed(2));
  };
  
  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };
  
  const calculateDeliveryCharge = (distance: number): number => {
    if (distance <= 5) {
      return 60; // ₹60 for up to 5km
    } else if (distance <= 10) {
      return 85; // ₹85 for 5-10km
    } else {
      return 85 + Math.ceil(distance - 10) * 10; // ₹85 + ₹10 per additional km
    }
  };

  return {
    getCurrentLocation,
    calculateDistance,
    calculateDeliveryCharge
  };
};
