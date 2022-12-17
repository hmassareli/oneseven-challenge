import axios from "axios";
import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { CartProductProps } from "../../pages/products/@types";
import { priceFormatter } from "../../utils/formatter";
import { loadStripe } from "@stripe/stripe-js";
import {
  deleteProduct,
  getCheckoutSession,
  addUnitToProduct,
} from "../../services.api";
import { useRouter } from "next/router";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
//import exit icon from react-icons
import { FaTimes } from "react-icons/fa";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CartContent = ({
  data: cartProducts,
  refetch,
}: {
  data: CartProductProps[];
  refetch: () => void;
}) => {
  const router = useRouter();
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true);

      const checkout = await getCheckoutSession(cartProducts);
      const { url } = checkout;
      router.push(url);
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      console.log(`Error: ${error}`);
      alert(
        "An error occurred while trying to create a checkout session. Please try again later."
      );
    }
  };
  const handleAddOne = async (product: CartProductProps) => {
    const res = await addUnitToProduct(product.id, product.quantity + 1);
    refetch();
  };
  const handleRemoveOne = async (product: CartProductProps) => {
    if (product.quantity > 1) {
      const res = await addUnitToProduct(product.id, product.quantity - 1);
      refetch();
    }
  };

  const handleRemoveFromCart = async (product: CartProductProps) => {
    const res = await deleteProduct(product.id);
    refetch();
  };
  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.value * product.quantity;
  }, 0);
  const cartIsNotEmpty = cartProducts.length > 0;
  const cartQuantity = cartProducts.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  const formattedTotalPrice = priceFormatter(totalPrice);

  return (
    <div className=" flex flex-col gap-10 justify-between m-auto w-[600px] mt-10 rounded-lg p-10 min-h-[800px] bg-white">
      <div className=" flex flex-col gap-4">
        {cartIsNotEmpty ? (
          cartProducts.map((product) => (
            <div className=" flex justify-between" key={product.id}>
              <div className=" rounded-md overflow-hidden w-[150px] h-[150px] relative">
                <Image src={product.img_url} layout="fill" alt="" />
              </div>

              <div className="  flex flex-col ml-5 gap-2">
                <div>
                  <p className=" text-3xl text-gray-800 mt-2 font-medium">
                    {product.name}
                  </p>
                </div>
                <div className=" font-bold text-gray-900 text-3xl">
                  {priceFormatter(product.value)}
                </div>
                <div className=" flex items-center font-medium text-gray-700 text-xl">
                  <p className=" ">Brand:&nbsp;</p>
                  <p className=" ">{product.brand}</p>
                </div>

                <div className=" flex items-center">
                  <p className=" font-medium text-gray-700 text-xl">
                    Quantity:&nbsp;
                  </p>
                  <div className=" flex ml-4 items-center justify-center w-28">
                    <div className=" border flex hover: cursor-pointer rounded-full bg-slate-100 w-8 h-8 ">
                      <FaMinus
                        className="text-1 hover: cursor-pointer m-auto"
                        onClick={() => handleRemoveOne(product)}
                      />
                    </div>

                    <p className=" w-7 m-auto text-center font-bold text-xl">
                      {product.quantity}
                    </p>
                    <div className=" border flex hover: cursor-pointer rounded-full bg-slate-100 w-8 h-8">
                      <FaPlus
                        className="w-6 m-auto"
                        onClick={() => handleAddOne(product)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <FaTimes
                className=" text-zinc-900 text-2xl m-0 ml-auto font-medium mt-1 hover: cursor-pointer"
                onClick={(event) => handleRemoveFromCart(product)}
                aria-label="Remove product from cart"
              />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <div className=" w-full rounded-lg text-slate-800">
        <div className=" flex justify-between mb-2">
          <p className=" text-2xl font-bold">Quantity:</p>

          <p className=" font-medium text-xl">
            {cartQuantity} ite{cartQuantity > 1 ? "ms" : "m"}
          </p>
        </div>

        <div className=" flex justify-between mb-2">
          <p className=" text-2xl font-bold">Total:</p>

          <p className=" font-medium text-xl">{formattedTotalPrice}</p>
        </div>

        <button
          className=" w-full bg-zinc-900 text-white text-2xl font-bold py-4 rounded-lg mt-5"
          disabled={isCreatingCheckoutSession}
          onClick={handleBuyProduct}
          aria-label="Finish Purchase"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartContent;
