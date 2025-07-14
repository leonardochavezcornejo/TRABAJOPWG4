export interface Game {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  platform: string;
  releaseDate: string;
  onSale: boolean;
  images: string[];
  discount?: number; // Descuento opcional
}