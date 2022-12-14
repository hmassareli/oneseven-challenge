import axios from "axios";
import { useState } from "react";
import { v4 } from "uuid";
import CartContent from "../../components/Cart";
import { getCartProducts } from "../../services.api";
import { CartProductProps } from "../products/@types";

const Cart = ({ data }: { data: CartProductProps[] }) => {
  const [cartProducts, setCartProducts] = useState(data);
  const refetchCartProducts = async () => {
    const newData = await getCartProducts();
    setCartProducts(newData);
  };
  return (
    <main className=" bg-slate-100 overflow-auto min-h-screen">
      <CartContent
        key={v4()}
        refetch={refetchCartProducts}
        data={cartProducts}
      />
    </main>
  );
};

export async function getServerSideProps() {
  const data = await getCartProducts();

  return { props: { data } };
}
export default Cart;
