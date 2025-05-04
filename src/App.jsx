
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import axios from "axios";
import CartButton from "./components/CartButton";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import Checkout from "./pages/Checkout";
import Account from "./pages/Account";
import DeliveryDashboard from "./pages/DeliveryDashboard";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import DeliveryAgentSignIn from "./pages/DeliveryAgentSignIn";
import Products from "./pages/Products";

// Configure axios defaults
axios.defaults.baseURL = 'https://api.example.com';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Create axios instances for different API endpoints
export const authAPI = axios.create({
  baseURL: 'https://api.example.com/auth',
  timeout: 10000,
});

export const orderAPI = axios.create({
  baseURL: 'https://api.example.com/orders',
  timeout: 10000,
});

export const productAPI = axios.create({
  baseURL: 'https://api.example.com/products',
  timeout: 10000,
});

// HTTP request interceptor
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// HTTP response interceptor
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/delivery-signin" element={<DeliveryAgentSignIn />} />
            <Route path="/delivery-dashboard" element={<DeliveryDashboard />} />
            <Route path="/track-order" element={<OrderTracking />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CartButton />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
