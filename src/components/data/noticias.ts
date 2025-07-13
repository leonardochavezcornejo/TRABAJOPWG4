export interface Noticia {
  id: string;
  title: string;
  content: string;
  fecha: string;
  estado: string;
}

export const noticiasIniciales: Noticia[] = [
  {
    id: '1',
    title: 'Nuevo lanzamiento de GTA VI',
    content: 'Contenido de la noticia sobre el nuevo juego.',
    fecha: '10/5/2025',
    estado: 'Publicada',
    imagen: '/img/game1.jpg'
  },
  {
    id: '2',
    title: 'Descuentos de verano',
    content: 'Contenido de la noticia de descuentos de verano.',
    fecha: '01/5/2025',
    estado: 'Publicada'
  },
  {
    id: '3',
    title: '¡Descuento especial en The Witcher 3: Wild Hunt!',
    content: 'Aprovecha el gran descuento en The Witcher 3: Wild Hunt por tiempo limitado.',
    fecha: '12/7/2025',
    estado: 'Publicada',
    imagen: '/img/game4.jpg'
  }
];