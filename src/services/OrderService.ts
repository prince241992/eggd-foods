
import { supabase } from '@/integrations/supabase/client';
import { CartItem } from '@/types/cart';

export const OrderService = {
  async createOrder(items: CartItem[], userId: string) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: total,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return order;
  },

  async getUserOrders(userId: string) {
    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (*)
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return orders;
  }
};
