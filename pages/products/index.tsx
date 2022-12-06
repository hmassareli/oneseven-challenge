import { ProductProps } from "../../components/Product/ProductProps";
import { Product } from "../../components/Product";
import { uuid } from "uuidv4";
const Products = ({ data }: { data: ProductProps[] }) => {
  return (
    <>
      <h1>Products</h1>
      {data.map((product) => {
        return <Product key={uuid()} product={product} />;
      })}
    </>
  );
};
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(process.env.FAKE_STORE_API_URL + "/products");
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
export default Products;
