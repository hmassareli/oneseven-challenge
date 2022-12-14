export type ProductProps = {
  id: number;
  title: string;
  name: string;
  price: number;
  description: string;
  category: { name: string; image: string };
  images: string[];
};
