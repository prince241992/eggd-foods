
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight, Filter, SlidersHorizontal, Grid2X2, List, Plus, Check, ShoppingCart } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import ProductCardAlternate from "@/components/ProductCardAlternate";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cartItems } from "@/components/menu/ProductList";

const demoProducts = [
  {
    id: 1,
    name: "Classic Shakshuka",
    description: "Eggs poached in a spiced tomato and bell pepper sauce with onions and garlic.",
    price: "₹12.99",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    popular: true,
    addOns: [
      { name: "Extra cheese", price: "₹1.50" },
      { name: "Garlic bread", price: "₹2.00" },
    ],
    nutritionInfo: {
      calories: "385 kcal",
      protein: "15g",
      carbs: "12g",
      fat: "30g"
    }
  },
  {
    id: 2,
    name: "Deviled Eggs",
    description: "Hard-boiled eggs filled with creamy yolk mixture with mustard and paprika.",
    price: "₹8.99",
    image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    popular: false,
    addOns: [
      { name: "Bacon bits", price: "₹1.00" },
      { name: "Chives", price: "₹0.50" },
    ],
    nutritionInfo: {
      calories: "180 kcal",
      protein: "12g",
      carbs: "2g",
      fat: "12g"
    }
  },
  {
    id: 3,
    name: "Egg Fried Rice",
    description: "Fragrant rice stir-fried with eggs, vegetables, and soy sauce.",
    price: "₹10.99",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80",
    popular: true,
    addOns: [
      { name: "Extra egg", price: "₹1.50" },
      { name: "Chicken", price: "₹3.00" },
      { name: "Shrimp", price: "₹4.00" },
    ],
    nutritionInfo: {
      calories: "420 kcal",
      protein: "14g",
      carbs: "65g",
      fat: "12g"
    }
  },
  {
    id: 4,
    name: "Fluffy Omelette",
    description: "Light and airy omelette with cheese and fresh herbs.",
    price: "₹9.99",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
    popular: false,
    addOns: [
      { name: "Mushrooms", price: "₹1.50" },
      { name: "Spinach", price: "₹1.00" },
      { name: "Feta cheese", price: "₹1.50" },
    ],
    nutritionInfo: {
      calories: "320 kcal",
      protein: "22g",
      carbs: "3g",
      fat: "25g"
    }
  }
];

interface ProductGalleryProps {
  title?: string;
  description?: string;
  viewMode?: "grid" | "list";
  cardStyle?: "default" | "modern" | "minimal" | "detailed";
  initialProducts?: any[];
  showNutrition?: boolean;
}

const ProductGallery = ({
  title = "Our Products",
  description,
  viewMode: initialViewMode = "grid",
  cardStyle: initialCardStyle = "default",
  initialProducts = demoProducts,
  showNutrition = false
}: ProductGalleryProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cardStyle, setCardStyle] = useState<"default" | "modern" | "minimal" | "detailed">(initialCardStyle);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<number, string[]>>({});
  const { toast } = useToast();
  
  const productsPerPage = 8;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  
  const goToPreviousPage = () => {
    setCurrentPage(current => (current > 1 ? current - 1 : current));
  };
  
  const goToNextPage = () => {
    setCurrentPage(current => (current < totalPages ? current + 1 : current));
  };
  
  const toggleViewMode = () => {
    setViewMode(current => (current === "grid" ? "list" : "grid"));
  };

  const cardSizeClasses = viewMode === "grid" 
    ? "sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3" 
    : "w-full mb-4";
    
  const handleAddOnToggle = (productId: number, addOnName: string) => {
    setSelectedAddOns(prev => {
      const currentAddOns = prev[productId] || [];
      
      if (currentAddOns.includes(addOnName)) {
        return {
          ...prev,
          [productId]: currentAddOns.filter(name => name !== addOnName)
        };
      } else {
        return {
          ...prev,
          [productId]: [...currentAddOns, addOnName]
        };
      }
    });
  };
  
  const getPriceFromString = (priceStr: string) => {
    return parseFloat(priceStr.replace('₹', ''));
  };
  
  const addToCart = (product: any) => {
    const productAddOns = selectedAddOns[product.id] || [];
    let addOnsList = [];
    let totalPrice = getPriceFromString(product.price);
    
    if (productAddOns.length > 0 && product.addOns) {
      addOnsList = product.addOns
        .filter(addOn => productAddOns.includes(addOn.name))
        .map(addOn => {
          totalPrice += getPriceFromString(addOn.price);
          return {
            name: addOn.name,
            price: addOn.price
          };
        });
    }
    
    // Check if item already exists in cart
    if (cartItems.has(product.id)) {
      // Increment quantity
      const existingItem = cartItems.get(product.id);
      existingItem.quantity += 1;
      existingItem.addOns = [...existingItem.addOns, ...addOnsList];
      cartItems.set(product.id, existingItem);
    } else {
      // Add new item
      cartItems.set(product.id, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        addOns: addOnsList
      });
    }
    
    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.name} ${productAddOns.length > 0 ? 'with add-ons' : ''} has been added to your cart.`,
      duration: 2000,
    });
    
    // Force a re-render of the cart component
    window.dispatchEvent(new CustomEvent('cart-updated'));
    
    // Reset selected add-ons for this product
    setSelectedAddOns(prev => ({
      ...prev,
      [product.id]: []
    }));
  };
  
  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <SlidersHorizontal size={18} className="mr-1" /> Style
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="space-y-2">
                <h4 className="font-medium text-sm mb-2">Card Style</h4>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={cardStyle === "default" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCardStyle("default")}
                  >
                    Default
                  </Button>
                  <Button
                    variant={cardStyle === "modern" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCardStyle("modern")}
                  >
                    Modern
                  </Button>
                  <Button
                    variant={cardStyle === "minimal" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCardStyle("minimal")}
                  >
                    Minimal
                  </Button>
                  <Button
                    variant={cardStyle === "detailed" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCardStyle("detailed")}
                  >
                    Detailed
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <div className="relative">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className={`flex flex-wrap -mx-3 ${viewMode === "list" ? "flex-col" : ""}`}>
          {currentProducts.map((product) => (
            <div key={product.id} className={cardSizeClasses}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="h-48 w-full object-cover"
                  />
                  {product.popular && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4 flex-grow flex flex-col">
                  <div className="mb-2">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                  
                  <div className="mt-2 mb-3">
                    <div className="text-purple-600 font-bold text-lg">{product.price}</div>
                  </div>
                  
                  {showNutrition && product.nutritionInfo && (
                    <div className="bg-gray-50 p-2 rounded text-xs mb-3 grid grid-cols-2 gap-y-1">
                      <div>Calories: {product.nutritionInfo.calories}</div>
                      <div>Protein: {product.nutritionInfo.protein}</div>
                      <div>Carbs: {product.nutritionInfo.carbs}</div>
                      <div>Fat: {product.nutritionInfo.fat}</div>
                    </div>
                  )}
                  
                  {product.addOns && product.addOns.length > 0 && (
                    <div className="mt-2 mb-4">
                      <p className="font-medium text-sm mb-1">Add-ons:</p>
                      <div className="space-y-2">
                        {product.addOns.map((addOn, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${product.id}-${idx}`} 
                              checked={selectedAddOns[product.id]?.includes(addOn.name)}
                              onCheckedChange={() => handleAddOnToggle(product.id, addOn.name)}
                            />
                            <Label htmlFor={`${product.id}-${idx}`} className="flex justify-between w-full text-sm">
                              <span>{addOn.name}</span>
                              <span className="text-gray-600">{addOn.price}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => addToCart(product)} 
                    className="mt-auto w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                  >
                    <ShoppingCart size={18} className="mr-2" /> Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
              <span className="ml-1">Previous</span>
            </Button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              <span className="mr-1">Next</span>
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
