
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const ProductPagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: ProductPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-10 space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrevious}
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
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <span className="mr-1">Next</span>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default ProductPagination;
