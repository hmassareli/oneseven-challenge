import { ProductProps } from "../../components/Product/ProductProps";
import { Product } from "../../components/Product";
import { uuid } from "uuidv4";
import { useState } from "react";
const Products = ({ data }: { data: ProductProps[] }) => {
  const [page, setPage] = useState(1);
  console.log(data);
  return (
    <div className=" bg-gray-100">
      <h1>Products</h1>
      <div className=" h-full grid md:grid-cols-4 sm:grid-cols-2">
        {data.map((product) => {
          return <Product key={uuid()} product={product} />;
        })}
      </div>
    </div>
  );
};
export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.FAKE_STORE_API_URL}/api/v1/products?offset=0&limit=10`
  );
  const data = await res.json();

  return { props: { data } };
}
export default Products;
