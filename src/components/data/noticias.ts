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
    title: '¡Nuevo juego lanzado!',
    content: 'Contenido de la noticia sobre el nuevo juego.',
    fecha: '10/5/2025',
    estado: 'Publicada'
  },
  {
    id: '2',
    title: 'Descuentos de verano',
    content: 'Contenido de la noticia de descuentos de verano.',
    fecha: '01/5/2025',
    estado: 'Publicada'
  }
];