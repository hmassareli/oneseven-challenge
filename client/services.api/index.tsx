import { CartProductProps, PostProductProps } from "../pages/products/@types";

import axios from "axios";

export const deleteProduct = async (id: number) => {
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/CartProducts/${id}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
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
export const postProduct = async (data: PostProductProps) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/CartProducts`,
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCartProducts = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/CartProducts`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addUnitToProduct = async (id: number, quantity: number) => {
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/CartProducts/${id}`,
      { quantity }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
