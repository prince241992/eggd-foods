
import { CartItem } from '@/types/cart';

export const calculateDeliveryFee = (deliveryType: 'delivery' | 'pickup', distance: number | null) => {
  if (deliveryType === 'pickup') return 0;
  
  let deliveryFee = 60;
  if (distance !== null && distance > 5 && distance <= 10) {
    deliveryFee = 85;
  }
  return deliveryFee;
};

export const calculateItemTotal = (item: CartItem, addOns: any[] = []) => {
  let total = parseFloat(item.price.toString().replace('₹', ''));
  
  addOns.forEach(addon => {
    if (typeof addon === 'object' && addon !== null && 'price' in addon) {
      total += parseFloat(addon.price.toString().replace('₹', ''));
    }
  });
  
  return total * item.quantity;
};

export const validateZipCode = (zipCode: string): { 
  isValid: boolean; 
  distance: number | null;
  fee: number 
} => {
  const validZipCodes: Record<string, number> = {
    "452001": 2.5,
    "452002": 3.8,
    "452003": 5.2,
    "452004": 7.1,
    "452005": 8.9,
    "452006": 4.3,
    "452007": 9.5
  };
  
  const isValid = zipCode in validZipCodes;
  const distance = isValid ? validZipCodes[zipCode] : null;
  const fee = distance && distance > 5 ? 85 : 60;
  
  return { isValid, distance, fee };
};
