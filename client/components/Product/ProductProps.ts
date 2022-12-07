export type ProductProps = {
  id: string;
  title: string;
  name: string;
  price: number;
  description: string;
  category: { name: string };
  images: string[];
};
