import type {Game} from '../admin/AdminGameModal'

export interface CartItem {
  game: Game;      // Objeto Game
  quantity: number; // Cantidad de ese juego
}

export interface Cart {
  userId: string;      // ID del usuario
  items: CartItem[];   // Lista de juegos con sus cantidades
  total: number;       // Total calculado del carrito
}