export interface Review {
  name: string;
  comment: string;
  stars: number;
  date: string;
}

export const gameReviews: Record<number, Review[]> = {
  2: [
    {
      name: 'FighterFan',
      comment: 'Los fatalities son las mejores animaciones que he visto en un juego de lucha. ¡Brutal!',
      stars: 5,
      date: '2023-04-10'
    },
    {
      name: 'KombatKing',
      comment: 'Gran historia, combos adictivos. Solo quisiera que mejoraran el matchmaking.',
      stars: 4,
      date: '2023-05-22'
    }
  ],
  4: [
    {
      name: 'GeraltFan',
      comment: 'Uno de los mejores RPG de todos los tiempos. Historia, música y jugabilidad impecables.',
      stars: 5,
      date: '2022-11-03'
    }
  ]
  // Puedes seguir agregando más juegos con sus respectivos ids
};