export type ProductProps = {
  id: number;
  title: string;
  name: string;
  price: number;
  description: string;
  category: { name: string };
  images: string[];
};
