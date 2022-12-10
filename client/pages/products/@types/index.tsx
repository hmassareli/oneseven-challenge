export type CartProductProps = {
  id: number;
  name: string;
  img_url: string;
  value: number;
  product_id: number;
  quantity: number;
};

export type PostProductProps = {
  product_id: number;
  name: string;
  value: number;
  img_url: string;
  quantity: number;
};
