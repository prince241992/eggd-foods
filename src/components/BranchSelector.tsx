
import { useState, useEffect } from "react";
import { MapPin, Clock, Store, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Sample branch data
const branchData = [
  {
    id: 1,
    name: "Downtown Location",
    address: "123 Main Street, Downtown",
    hours: "9:00 AM - 10:00 PM",
    isOpen: true,
    phone: "+1 (555) 123-4567",
    deliveryTime: "20-30 min"
  },
  {
    id: 2,
    name: "Eastside Branch",
    address: "456 Oak Avenue, Eastside",
    hours: "10:00 AM - 9:00 PM",
    isOpen: true,
    phone: "+1 (555) 987-6543",
    deliveryTime: "25-40 min"
  },
  {
    id: 3,
    name: "Westview Location",
    address: "789 Pine Road, Westview",
    hours: "11:00 AM - 8:00 PM",
    isOpen: false,
    phone: "+1 (555) 567-8901",
    deliveryTime: "30-45 min"
  }
];

interface BranchSelectorProps {
  onBranchSelect?: (branchId: number) => void;
  buttonVariant?: "subtle" | "prominent";
}

export default function BranchSelector({ 
  onBranchSelect,
  buttonVariant = "subtle" 
}: BranchSelectorProps) {
  const [selectedBranch, setSelectedBranch] = useState(branchData[0]);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleBranchSelect = (branchId: number) => {
    const branch = branchData.find(b => b.id === branchId);
    if (branch) {
      setSelectedBranch(branch);
      setOpen(false);
      
      if (onBranchSelect) {
        onBranchSelect(branchId);
      }
      
      toast({
        title: "Branch Selected",
        description: `You've selected ${branch.name}`,
        duration: 2000,
      });
    }
  };

  if (buttonVariant === "prominent") {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="border-sweet-500 text-sweet-600 hover:bg-sweet-50 w-full md:w-auto justify-start md:justify-center"
          >
            <Store className="mr-2" size={18} />
            <div className="flex flex-col items-start">
              <span className="text-xs text-gray-500">Ordering from:</span>
              <span className="font-medium">{selectedBranch.name}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Select Branch</h3>
            <RadioGroup 
              value={selectedBranch.id.toString()} 
              onValueChange={(value) => handleBranchSelect(parseInt(value))}
            >
              <div className="space-y-2">
                {branchData.map(branch => (
                  <div
                    key={branch.id}
                    className={`border rounded-md p-3 cursor-pointer transition-all ${
                      selectedBranch.id === branch.id 
                        ? "border-sweet-600 bg-sweet-50" 
                        : "hover:border-gray-400"
                    }`}
                    onClick={() => handleBranchSelect(branch.id)}
                  >
                    <div className="flex">
                      <RadioGroupItem 
                        value={branch.id.toString()} 
                        id={`branch-${branch.id}`} 
                        className="mt-1"
                      />
                      <div className="ml-2 flex-1">
                        <Label htmlFor={`branch-${branch.id}`} className="font-medium">
                          {branch.name}
                        </Label>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <MapPin size={14} className="mr-1" />
                          {branch.address}
                        </div>
                        <div className="flex justify-between mt-2 text-sm">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            {branch.hours}
                          </div>
                          <span 
                            className={`px-2 py-0.5 rounded-full text-xs ${
                              branch.isOpen 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {branch.isOpen ? "Open" : "Closed"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  // Subtle variant
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center">
          <MapPin size={16} className="mr-1 text-sweet-600" />
          <span>{selectedBranch.name}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-3">
          <h3 className="font-medium">Select Location</h3>
          {branchData.map(branch => (
            <Card 
              key={branch.id}
              className={`cursor-pointer transition-all hover:bg-cream-50 ${
                selectedBranch.id === branch.id ? "border-sweet-500" : ""
              }`}
              onClick={() => handleBranchSelect(branch.id)}
            >
              <CardContent className="p-3">
                <div className="flex justify-between">
                  <h4 className="font-medium">{branch.name}</h4>
                  {selectedBranch.id === branch.id && (
                    <CheckCircle2 size={16} className="text-sweet-600" />
                  )}
                </div>
                <div className="text-sm text-gray-500">{branch.address}</div>
                <div className="flex justify-between text-xs mt-2">
                  <span className="text-gray-500">{branch.hours}</span>
                  <span 
                    className={branch.isOpen ? "text-green-600" : "text-red-600"}
                  >
                    {branch.isOpen ? "Open Now" : "Closed"}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
