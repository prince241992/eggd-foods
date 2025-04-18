
import { UtensilsCrossed, Egg, Flame, PanelTop, Cookie, Wheat, Plus } from "lucide-react";

export const menuCategories = [
  { id: "all", name: "All Items", icon: <UtensilsCrossed size={18} /> },
  { id: "omelette", name: "Omelettes", icon: <Egg size={18} /> },
  { id: "starter", name: "Starters", icon: <UtensilsCrossed size={18} /> },
  { id: "bhurji", name: "Bhurji", icon: <Flame size={18} /> },
  { id: "maincourse", name: "Main Course", icon: <PanelTop size={18} /> },
  { id: "bread", name: "Bread", icon: <Cookie size={18} /> },
  { id: "rice", name: "Rice", icon: <Wheat size={18} /> },
  { id: "extras", name: "Extras", icon: <Plus size={18} /> },
];

interface MenuCategoriesProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const MenuCategories = ({ activeCategory, onCategoryChange }: MenuCategoriesProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {menuCategories.map(category => (
        <button
          key={category.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-sweet-600 text-white'
              : 'bg-cream-100 text-gray-700 hover:bg-cream-200'
          }`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.icon}
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default MenuCategories;

