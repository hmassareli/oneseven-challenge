import { ProductProps } from "../../components/Product/@types";
import { Product } from "../../components/Product";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { IoBagHandleSharp } from "react-icons/io5";
import Link from "next/link";
import axios from "axios";
import { getProductData } from "../../services.api";
const Products = ({ data }: { data: ProductProps[] }) => {
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState<ProductProps[]>([]);
  return (
    <div className=" bg-gray-100">
      <header className=" h-40 bg-slate-600 flex justify-between items-center px-20">
        <h1 className=" text-4xl text-white">Products</h1>
        <Link href="/cart">
          <IoBagHandleSharp className=" text-white w-20 h-20 ml-auto cursor-pointer" />
        </Link>
      </header>

      <div className=" h-full grid md:grid-cols-4 sm:grid-cols-2">
        {data.map((product) => {
          return <Product key={uuid()} product={product} />;
        })}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const data = await getProductData(12);

  return { props: { data } };
}
export default Products;
