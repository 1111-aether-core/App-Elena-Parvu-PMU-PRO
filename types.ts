export enum ProductCategory {
  PMU = 'Prodotti PMU',
  PIERCING = 'Piercing Professionali',
  TATTOO = 'Forniture Tattoo',
  AFTERCARE = 'Cura e Aftercare'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  image: string;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  image: string;
}

export interface Course {
  id: string;
  title: string;
  level: 'Principiante' | 'Avanzato' | 'Masterclass';
  price: number;
  image: string;
  description: string;
  modules: number;
  duration: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}