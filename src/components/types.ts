export interface Game {
  id: number;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  rating: number;
  reviews: {
    name: string;
    comment: string;
    stars: number;
    date: string;
  }[];
}