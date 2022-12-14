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
    const res = await addUnitToProduct(product.id, product.quantity - 1);
    refetch();
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
    <div className=" flex flex-col m-auto w-[500px] mt-10 p-10 h-[800px] bg-white">
      <div className=" flex flex-col gap-2">
        {cartIsNotEmpty ? (
          cartProducts.map((product) => (
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

                <div className=" flex items-center">
                  <FaMinus
                    className="text-2 hover: cursor-pointer"
                    onClick={() => handleRemoveOne(product)}
                  />
                  <p className=" w-7 text-center font-bold text-xl">
                    {product.quantity}
                  </p>
                  <FaPlus
                    className="text-2 hover: cursor-pointer"
                    onClick={() => handleAddOne(product)}
                  />
                </div>
                <button
                  className=" mr-auto mb-4 text-red-700 text-2xl font-medium"
                  onClick={(event) => handleRemoveFromCart(product)}
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
