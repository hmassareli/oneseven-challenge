import axios from "axios";
import Image from "next/image";
import Router from "next/router";
import { MouseEvent, useState } from "react";
import { CartProductProps } from "../../pages/products/@types";
import { priceFormatter } from "../../utils/formatter";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CartContent = ({ data }: { data: CartProductProps[] }) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false);

  const removeFromCart = (product: CartProductProps) => {
    const newCart = data.filter((item) => item.id !== product.id);
  };

  const handleBuyProduct = async () => {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios
        .post(`/api/checkout_sessions`, {
          products: data,
        })
        .then((res) => res.data);
      const { url } = response;
      // go to checkout page
      window.location.href = url;
    } catch (error) {
      setIsCreatingCheckoutSession(false);
      console.log(`Error: ${error}`);
      alert(
        "An error occurred while trying to create a checkout session. Please try again later."
      );
    }
  };

  const handleRemoveFromCart = async (
    event: MouseEvent<HTMLButtonElement>,
    product: CartProductProps
  ) => {
    event.preventDefault();

    removeFromCart(product);
  };
  const totalPrice = data.reduce((acc, product) => {
    return acc + product.value * product.quantity;
  }, 0);
  const cartIsNotEmpty = data.length > 0;
  const cartQuantity = data.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
  const formattedTotalPrice = priceFormatter(totalPrice);

  return (
    <div className=" flex flex-col m-auto w-[500px] mt-10 p-10 h-[800px] bg-gray-200">
      <div className=" flex flex-col gap-2">
        {cartIsNotEmpty ? (
          data.map((product) => (
            <div className=" flex " key={product.id}>
              <div className=" rounded-md overflow-hidden w-[150px] h-[150px] relative">
                <Image src={product.img_url} layout="fill" alt="" />
              </div>

              <div className="  flex flex-col ml-5 justify-between">
                <div>
                  <p className=" text-3xl mt-4 font-medium">{product.name}</p>
                  <div className=" text-green-700 font-bold text-4xl">
                    {priceFormatter(product.value)}
                  </div>
                </div>
                <button
                  className=" mr-auto mb-4 text-red-700 text-2xl font-medium"
                  onClick={(event) => handleRemoveFromCart(event, product)}
                  aria-label="Remove product from cart"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <div>
        <table>
          <tbody>
            <tr>
              <td>Quantity</td>
              <td>
                {cartQuantity} ite{cartQuantity > 1 ? "ms" : "m"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{formattedTotalPrice}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          disabled={isCreatingCheckoutSession}
          onClick={handleBuyProduct}
          aria-label="Finish Purchase"
        >
          Finish purchase
        </button>
      </div>
    </div>
  );
};

export default CartContent;
