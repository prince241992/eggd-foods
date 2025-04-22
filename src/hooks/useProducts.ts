
import { useState } from "react";
import { Product, AddOn } from "@/types/product";
import { useToast } from "@/hooks/use-toast";

export const useProducts = (initialProducts: Product[]) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<Record<number, string[]>>({});
  const { toast } = useToast();

  const productsPerPage = 8;
  const totalPages = Math.ceil(initialProducts.length / productsPerPage);
  
  const currentProducts = initialProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage(current => (current > 1 ? current - 1 : current));
  };

  const goToNextPage = () => {
    setCurrentPage(current => (current < totalPages ? current + 1 : current));
  };

  const handleAddOnToggle = (productId: number, addOnName: string) => {
    setSelectedAddOns(prev => {
      const currentAddOns = prev[productId] || [];
      return {
        ...prev,
        [productId]: currentAddOns.includes(addOnName)
          ? currentAddOns.filter(name => name !== addOnName)
          : [...currentAddOns, addOnName]
      };
    });
  };

  const getPriceFromString = (priceStr: string) => {
    return parseFloat(priceStr.replace('₹', ''));
  };

  return {
    currentPage,
    currentProducts,
    totalPages,
    selectedAddOns,
    goToPreviousPage,
    goToNextPage,
    handleAddOnToggle,
    getPriceFromString
  };
};
