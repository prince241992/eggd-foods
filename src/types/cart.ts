
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  addOns?: Array<string | {name: string; price: string | number}>;
}

export interface OrderItem extends CartItem {
  orderId: string;
}
