import { CartProductProps } from "../pages/products/@types";

import axios from "axios";

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/CartProducts/${id}`
  );
  return res.data;
};

export const getCheckoutSession = async (data: CartProductProps[]) => {
  const response = await axios
    .post(`/api/checkout_sessions`, {
      products: data,
    })
    .then((res) => res.data);
  return response;
};
export const getProductData = async (limit: number) => {
  const res = await axios.get(
    `${process.env.FAKE_STORE_API_URL}/api/v1/products?offset=0&limit=${limit}`
  );
  return res.data;
};
