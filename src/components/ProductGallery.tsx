
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types/product";
import ProductCard from "./products/ProductCard";
import ProductPagination from "./products/ProductPagination";
import { useProducts } from "@/hooks/useProducts";

interface ProductGalleryProps {
  title?: string;
  description?: string;
  initialProducts?: Product[];
  showNutrition?: boolean;
  cardStyle?: "default" | "modern" | "minimal" | "detailed";
}

const ProductGallery = ({
  title = "Our Products",
  description,
  initialProducts = [],
  showNutrition = false,
  cardStyle = "default",
}: ProductGalleryProps) => {
  const {
    currentProducts,
    currentPage,
    totalPages,
    selectedAddOns,
    goToPreviousPage,
    goToNextPage,
    handleAddOnToggle,
  } = useProducts(initialProducts);
  
  return (
    <div className="container-custom py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          {title && <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>}
          {description && <p className="text-gray-600">{description}</p>}
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

        <div className="flex flex-wrap -mx-3">
          {currentProducts.map((product) => (
            <div key={product.id} className="sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
              <ProductCard
                product={product}
                selectedAddOns={selectedAddOns}
                onAddOnToggle={handleAddOnToggle}
                showNutrition={showNutrition}
                cardStyle={cardStyle}
              />
            </div>
          ))}
        </div>
        
        <ProductPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={goToPreviousPage}
          onNext={goToNextPage}
        />
      </div>
    </div>
  );
};

export default ProductGallery;
