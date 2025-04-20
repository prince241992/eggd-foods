
import React, { useState } from 'react';
import { 
  Package, Clock, ChevronDown, ChevronUp, 
  MapPin, CreditCard, Calendar, Search, Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Sample order data
const sampleOrders = [
  {
    id: 'ORD-2025-0001',
    date: '2025-04-15',
    status: 'Delivered',
    total: 349.99,
    items: [
      { name: 'Classic Shakshuka', quantity: 1, price: 199.99 },
      { name: 'Butter Chicken Omelette', quantity: 1, price: 149.99 }
    ],
    paymentMethod: 'Cash on Delivery',
    deliveryAddress: '123 Main Street, Indore',
    deliveryTime: '30 mins'
  },
  {
    id: 'ORD-2025-0002',
    date: '2025-04-10',
    status: 'Delivered',
    total: 499.99,
    items: [
      { name: 'Egg Fried Rice', quantity: 2, price: 149.99 },
      { name: 'Paneer Bhurji', quantity: 1, price: 199.99 }
    ],
    paymentMethod: 'Online Payment',
    deliveryAddress: '123 Main Street, Indore',
    deliveryTime: '35 mins'
  },
  {
    id: 'ORD-2025-0003',
    date: '2025-04-05',
    status: 'Delivered',
    total: 649.99,
    items: [
      { name: 'Masala Omelette', quantity: 2, price: 129.99 },
      { name: 'Cheese Toast', quantity: 1, price: 99.99 },
      { name: 'Egg Curry', quantity: 1, price: 289.99 }
    ],
    paymentMethod: 'Cash on Delivery',
    deliveryAddress: '123 Main Street, Indore',
    deliveryTime: '28 mins'
  }
];

const OrderHistory = () => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const toggleOrderDetails = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };
  
  // Filter orders based on search query and status filter
  const filteredOrders = sampleOrders.filter(order => {
    // Filter by search query
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by status
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text font-display">
          Order History
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input 
              placeholder="Search orders..." 
              className="pl-9 w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[120px]">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 mx-auto text-gray-300" />
          <h3 className="mt-4 text-lg font-medium">No orders found</h3>
          <p className="text-sm text-gray-500 mt-1">
            {searchQuery ? "Try a different search term" : "You haven't placed any orders yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div 
              key={order.id}
              className="border rounded-lg overflow-hidden transition-all bg-white shadow-sm"
            >
              {/* Order Header */}
              <div 
                className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 cursor-pointer"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-full p-2 border">
                      <Package className="h-6 w-6 text-pink-500" />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium mr-2">{order.id}</h3>
                        <Badge variant={order.status === 'Delivered' ? 'default' : 'outline'}>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {order.date}
                        </div>
                        <div className="flex items-center">
                          <CreditCard className="h-3 w-3 mr-1" />
                          {order.paymentMethod}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">₹{order.total.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">{order.items.length} items</div>
                    </div>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details (expanded) */}
              {expandedOrder === order.id && (
                <div className="p-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Delivery Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex">
                          <MapPin className="h-4 w-4 text-pink-500 mr-2" />
                          <span>{order.deliveryAddress}</span>
                        </div>
                        <div className="flex">
                          <Clock className="h-4 w-4 text-pink-500 mr-2" />
                          <span>Delivery Time: {order.deliveryTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Payment Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex">
                          <CreditCard className="h-4 w-4 text-pink-500 mr-2" />
                          <span>{order.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Amount:</span>
                          <span className="font-medium">₹{order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Order Items
                  </h4>
                  <div className="bg-gray-50 rounded overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="text-left p-2">Item</th>
                          <th className="text-center p-2">Quantity</th>
                          <th className="text-right p-2">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, idx) => (
                          <tr key={idx} className="border-t border-gray-200">
                            <td className="p-2">{item.name}</td>
                            <td className="text-center p-2">{item.quantity}</td>
                            <td className="text-right p-2">₹{item.price.toFixed(2)}</td>
                          </tr>
                        ))}
                        <tr className="border-t border-gray-200 bg-gray-100">
                          <td colSpan={2} className="p-2 text-right font-medium">
                            Total:
                          </td>
                          <td className="p-2 text-right font-medium">
                            ₹{order.total.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm">
                      Need Help?
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-purple-500 to-pink-500" 
                      size="sm"
                    >
                      Reorder
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
