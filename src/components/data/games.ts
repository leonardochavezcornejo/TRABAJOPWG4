import type { Game } from '../types';
import { gameReviews } from './reviews';

export const games: Game[] = [
  {
    id: 1,
    title: "GTA VI",
    category: "Más vendidos",
    price: 59.99,
    description: "La última entrega de la famosa saga de Rockstar Games te sumerge en una ciudad abierta llena de posibilidades. Con gráficos revolucionarios y una historia llena de giros inesperados, GTA VI establece un nuevo estándar para los juegos de mundo abierto.",
    images: ["/img/game1.jpg", "/img/game1_1.jpg", "/img/game1_2.jpeg", "https://www.youtube.com/embed/QdBZY2fkU-0"],
    rating: 5,
    reviews: gameReviews[1] || []
  },
  {
    id: 2,
    title: "Mortal Kombat 11",
    category: "Mejor valorados",
    price: 49.99,
    description: "La entrega más sangrienta y espectacular de la saga de lucha. Con nuevos personajes, fatalities brutales y un modo historia cinematográfico, Mortal Kombat 11 ofrece la experiencia de lucha definitiva.",
    images: ["/img/game2.jpg", "/img/game2_1.jpg", "/img/game2_2.jpg"],
    rating: 4,
    reviews: gameReviews[2] || []
  },
  {
    id: 3,
    title: "Left 4 Dead 2",
    category: "Multijugador",
    price: 19.99,
    description: "Juego cooperativo de disparos en primera persona donde tú y tus amigos deberán sobrevivir a hordas de infectados. Con modos de juego variados y una IA director que adapta la experiencia.",
    images: ["/img/game3.jpeg", "/img/game3_1.jpg", "/img/game3_2.jpg"],
    rating: 4,
    reviews: gameReviews[3] || []
  },
  {
    id: 4,
    title: "The Witcher 3: Wild Hunt",
    category: "Mejor valorados",
    price: 39.99,
    description: "Como Geralt de Rivia, cazador de monstruos, viaja por un vasto mundo abierto para encontrar a tu ahijada Ciri y detener el avance de la Cacería Salvaje. Con decisiones que afectan la narrativa.",
    images: ["/img/game4.jpg", "/img/game4_1.jpg", "/img/game4_2.jpg"],
    rating: 5,
    reviews: gameReviews[4] || []
  },
  {
    id: 5,
    title: "Cyberpunk 2077",
    category: "Acceso anticipado",
    price: 49.99,
    description: "Sumérgete en Night City, una megalópolis obsesionada con el poder, la moda y las modificaciones corporales. Como V, un mercenario fuera de la ley, busca un implante único que concede la inmortalidad.",
    images: ["/img/game5.jpg", "/img/game5_1.jpg", "/img/game5_2.jpg"],
    rating: 4,
    reviews: gameReviews[5] || []
  },
  {
    id: 6,
    title: "Among Us",
    category: "Gratuitos",
    price: 0,
    description: "Juego de trabajo en equipo y traición para 4-15 jugadores. Prepárate tu nave espacial para despegar, pero cuidado con los impostores que quieren matar a todos.",
    images: ["/img/game6.jpg", "/img/game6_1.jpg", "/img/game6_2.jpg"],
    rating: 3,
    reviews: gameReviews[6] || []
  },
  {
    id: 7,
    title: "Call of Duty: Warzone",
    category: "Multijugador",
    price: 0,
    description: "El battle royale gratuito de Call of Duty. Salta a Verdansk con hasta 150 jugadores y lucha por ser el último equipo en pie en este intenso shooter.",
    images: ["/img/game7.jpg", "/img/game7_1.jpg", "/img/game7_2.jpg"],
    rating: 4,
    reviews: gameReviews[7] || []
  },
  {
    id: 8,
    title: "Baldur's Gate 3",
    category: "Mejor valorados",
    price: 59.99,
    description: "RPG basado en D&D donde tus decisiones dan forma a una historia de compañerismo y traición, supervivencia y sacrificio, y la atracción de un poder absoluto.",
    images: ["/img/game8.jpg", "/img/game8_1.jpg", "/img/game8_2.jpg"],
    rating: 5,
    reviews: gameReviews[8] || []
  },
  {
    id: 9,
    title: "Hades",
    category: "Más vendidos",
    price: 24.99,
    description: "Roguelike de acción donde desafías al dios de la muerte mientras luchas para escapar del Inframundo. Cada intento revela más historia y te acerca a la libertad.",
    images: ["/img/game9.jpg", "/img/game9_1.jpg", "/img/game9_2.jpg"],
    rating: 5,
    reviews: gameReviews[9] || []
  },
  {
    id: 10,
    title: "Stardew Valley",
    category: "Gratuitos",
    price: 14.99,
    description: "Hereda la vieja granja de tu abuelo y conviértela en un hogar próspero en este RPG de vida rural. Cultiva, pesca, mina, lucha contra monstruos y haz amigos con los aldeanos.",
    images: ["/img/game10.jpg", "/img/game10_1.jpg", "/img/game10_2.jpg"],
    rating: 5,
    reviews: gameReviews[10] || []
  },
  {
    id: 11,
    title: "R.E.P.O",
    category: "Más vendidos",
    price: 14.99,
    description: "Un juego de terror cooperativo en línea para hasta 6 jugadores. Localiza objetos valiosos, basados ​​completamente en la física, y manipúlalos con cuidado mientras los recuperas y los extraes para satisfacer los deseos de tu creador.",
    images: ["/img/game11.jpg", "/img/game11_1.jpg", "/img/game11_2.gif"],
    rating: 4,
    reviews: gameReviews[11] || []
  },
  {
    id: 12,
    title: "Dead by Daylight",
    category: "Mejor valorados",
    price: 39.99,
    description: "Dead by Daylight es un juego de horror de multijugador (4 contra 1) en el que un jugador representa el rol del asesino despiadado y los 4 restantes juegan como supervivientes que intentan escapar de él para evitar ser capturados y asesinados..",
    images: ["/img/game12.jpg", "/img/game12_1.jpg", "/img/game12_2.gif"],
    rating: 4,
    reviews: gameReviews[12] || []
  }
];

