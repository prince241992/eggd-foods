
export const standardAddOns = [
  { name: "Prepare with Oil", price: "₹0" },
  { name: "Prepare with Butter", price: "₹60" },
  { name: "Extra Cheese", price: "₹50" },
  { name: "Boiled Grated Egg", price: "₹20" }
];

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  addOns: { name: string; price: string; }[];
  popular?: boolean;
  nutritionInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: JSX.Element;
}

// Moved menuItems array here
export const menuItems: MenuItem[] = [
  // Omelettes
  {
    id: 1,
    name: "Simple Omelette",
    description: "Classic single egg omelette with basic spices and herbs.",
    price: "₹55",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: standardAddOns,
    popular: true
  },
  {
    id: 2,
    name: "Double Omelette",
    description: "Hearty two-egg omelette with aromatic spices.",
    price: "₹100",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: standardAddOns
  },
  {
    id: 3,
    name: "Crush Omelette",
    description: "Unique crushed style two-egg omelette with special seasoning.",
    price: "₹115",
    image: "https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: standardAddOns
  },
  {
    id: 4,
    name: "Cheese Omelette",
    description: "Two-egg omelette loaded with premium melted cheese.",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: standardAddOns
  },
  {
    id: 5,
    name: "Cheese Lapeti Omelette",
    description: "Special three-egg rolled omelette with generous cheese filling.",
    price: "₹230",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: standardAddOns
  },
  {
    id: 6,
    name: "Cheese Omelette Afghani",
    description: "Two-egg omelette with Afghani spices and melted cheese.",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=1064&q=80",
    category: "omelette",
    addOns: standardAddOns
  },
  // Starters
  {
    id: 7,
    name: "Egg Pakora",
    description: "Crispy fritters made with boiled eggs and spiced batter.",
    price: "₹120",
    category: "starter",
    image: "https://images.unsplash.com/photo-1635436338433-89747d0ca0ef?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 8,
    name: "Egg Chaat",
    description: "Tangy and spicy boiled eggs with chat masala.",
    price: "₹140",
    category: "starter",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 9,
    name: "Egg Cutlet",
    description: "Spiced egg patties coated with crispy breadcrumbs.",
    price: "₹160",
    category: "starter",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 10,
    name: "Egg 65",
    description: "Spicy and tangy deep-fried egg fritters.",
    price: "₹180",
    category: "starter",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 11,
    name: "Masala Egg Fry",
    description: "Pan-fried eggs with Indian spices and herbs.",
    price: "₹130",
    category: "starter",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 12,
    name: "Deviled Eggs",
    description: "Stuffed egg halves with spiced yolk mixture.",
    price: "₹150",
    category: "starter",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 13,
    name: "Egg Fingers",
    description: "Crispy breaded egg strips served with dipping sauce.",
    price: "₹170",
    category: "starter",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 14,
    name: "Egg Manchurian",
    description: "Indo-Chinese style eggs in spicy manchurian sauce.",
    price: "₹190",
    category: "starter",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  // Bhurji Section
  {
    id: 15,
    name: "Classic Egg Bhurji",
    description: "Traditional scrambled eggs with Indian spices.",
    price: "₹120",
    category: "bhurji",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 16,
    name: "Masala Bhurji",
    description: "Spicy scrambled eggs with onions and tomatoes.",
    price: "₹140",
    category: "bhurji",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 17,
    name: "Paneer Bhurji",
    description: "Scrambled eggs with cottage cheese and spices.",
    price: "₹160",
    category: "bhurji",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 18,
    name: "Cheese Bhurji",
    description: "Cheesy scrambled eggs with Indian spices.",
    price: "₹170",
    category: "bhurji",
    image: "https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 19,
    name: "Mushroom Bhurji",
    description: "Scrambled eggs with mushrooms and herbs.",
    price: "₹180",
    category: "bhurji",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 20,
    name: "Schezwan Bhurji",
    description: "Spicy Indo-Chinese style scrambled eggs.",
    price: "₹160",
    category: "bhurji",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 21,
    name: "Kheema Bhurji",
    description: "Scrambled eggs with minced meat and spices.",
    price: "₹190",
    category: "bhurji",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  // Main Course
  {
    id: 22,
    name: "Egg Curry",
    description: "Boiled eggs in rich aromatic curry sauce.",
    price: "₹180",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 23,
    name: "Butter Masala Egg",
    description: "Eggs in creamy tomato butter sauce.",
    price: "₹200",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 24,
    name: "Egg Kadai",
    description: "Spicy egg curry with bell peppers.",
    price: "₹190",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 25,
    name: "Egg Do Pyaza",
    description: "Eggs cooked with layers of onions.",
    price: "₹185",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 26,
    name: "Dhaba Style Egg Curry",
    description: "Rustic roadside-style egg curry.",
    price: "₹175",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 27,
    name: "Egg Korma",
    description: "Eggs in rich, creamy coconut curry.",
    price: "₹210",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 28,
    name: "Egg Vindaloo",
    description: "Spicy Goan-style egg curry.",
    price: "₹195",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 29,
    name: "Egg Mappas",
    description: "Kerala-style egg curry with coconut milk.",
    price: "₹200",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 30,
    name: "Achari Egg",
    description: "Pickle-flavored egg curry.",
    price: "₹185",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 31,
    name: "Egg Chettinad",
    description: "South Indian spicy egg curry.",
    price: "₹190",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 32,
    name: "Malai Egg Curry",
    description: "Creamy egg curry with cashew paste.",
    price: "₹205",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 33,
    name: "Railway Egg Curry",
    description: "Classic Indian railway-style egg curry.",
    price: "₹180",
    category: "maincourse",
    image: "https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  // Bread Section
  {
    id: 34,
    name: "Egg Paratha",
    description: "Whole wheat flatbread stuffed with spiced eggs.",
    price: "₹80",
    category: "bread",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 35,
    name: "Egg Chapati Roll",
    description: "Rolled chapati with egg filling.",
    price: "₹90",
    category: "bread",
    image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 36,
    name: "Egg Naan",
    description: "Tandoor-baked naan topped with egg.",
    price: "₹100",
    category: "bread",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  // Rice Section
  {
    id: 37,
    name: "Egg Fried Rice",
    description: "Chinese-style rice with scrambled eggs.",
    price: "₹160",
    category: "rice",
    image: "https://images.unsplash.com/photo-1564834744159-ff0ea41ba4b9?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 38,
    name: "Egg Biryani",
    description: "Aromatic rice with boiled eggs and spices.",
    price: "₹180",
    category: "rice",
    image: "https://images.unsplash.com/photo-1568727349530-1d15e2a3a762?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 39,
    name: "Schezwan Egg Rice",
    description: "Spicy Indo-Chinese egg rice.",
    price: "₹170",
    category: "rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 40,
    name: "Egg Pulao",
    description: "Indian-style rice with eggs and whole spices.",
    price: "₹165",
    category: "rice",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 41,
    name: "Singapore Egg Rice",
    description: "Singapore-style spicy egg rice.",
    price: "₹175",
    category: "rice",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  // Extras Section
  {
    id: 42,
    name: "Egg Salad",
    description: "Fresh salad with boiled eggs and dressing.",
    price: "₹120",
    category: "extras",
    image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 43,
    name: "Boiled Eggs",
    description: "Plain boiled eggs with seasonings.",
    price: "₹60",
    category: "extras",
    image: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 44,
    name: "Egg Sandwich",
    description: "Classic egg sandwich with mayo.",
    price: "₹100",
    category: "extras",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 45,
    name: "Masala Boiled Eggs",
    description: "Spiced boiled eggs.",
    price: "₹80",
    category: "extras",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  },
  {
    id: 46,
    name: "Egg Mayo Dip",
    description: "Creamy egg mayo dip with herbs.",
    price: "₹90",
    category: "extras",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1064&q=80",
    addOns: standardAddOns
  }
];
