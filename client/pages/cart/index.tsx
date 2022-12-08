import CartContent from "../../components/Cart";
import { CartProductProps } from "../products/@types";

const Cart = ({ data }: { data: CartProductProps[] }) => {
  return (
    <div>
      <CartContent data={data} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/CartProducts`);
  const data = await res.json();

  return { props: { data } };
}
export default Cart;
