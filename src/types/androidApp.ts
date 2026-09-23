export interface Product {
  id: number;
  nameAr: string;
  nameEn: string;
  category: string;
  categoryNameAr: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  rating: number;
  reviewsCount: number;
  descriptionAr: string;
  descriptionEn: string;
  inStock: boolean;
  calories?: string;
  origin?: string;
  isBestSeller?: boolean;
  isDailyDeal?: boolean;
}

export interface Category {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
  itemsCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'credit_card' | 'apple_pay';
  status: 'confirmed' | 'packing' | 'on_the_way' | 'delivered';
  deliveryAddress: string;
  estimatedDelivery: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  isGuest?: boolean;
}
