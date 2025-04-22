
export interface AddOn {
  name: string;
  price: string;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  popular?: boolean;
  addOns?: AddOn[];
  nutritionInfo?: NutritionInfo;
}
