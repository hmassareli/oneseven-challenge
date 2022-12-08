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
    <div className="CartContentContainer">
      <div className="CartProduct">
        {cartIsNotEmpty ? (
          data.map((product) => (
            <div className="product" key={product.id}>
              <div className="product_image">
                <Image src={product.img_url} width={100} height={100} alt="" />
              </div>

              <div className="product-info">
                <span>
                  <p>{product.name}</p>
                  <strong>{product.value}</strong>
                </span>
                <button
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
