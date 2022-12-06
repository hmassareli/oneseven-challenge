import Image from "next/image";
import { ProductProps } from "./ProductProps";
const Product = ({ product }: { product: ProductProps }) => {
  return (
    <div>
      <Image src={product.image} alt="product image" width={200} height={200} />
      <p>{product.category}</p>
      <h1>{product.title}</h1>
      <p>$ {product.price}</p>
    </div>
  );
};
export default Product;
