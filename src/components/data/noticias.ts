export interface Noticia {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  image: string; // URL de la imagen
}