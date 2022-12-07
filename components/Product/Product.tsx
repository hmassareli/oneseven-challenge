import Image from "next/image";
import { ProductProps } from "./ProductProps";
const Product = ({ product }: { product: ProductProps }) => {
  return (
    <div className=" bg-white flex flex-col items-center m-10">
      <div className=" h-[250px] w-[230px] relative overflow-hidden">
        <Image
          src={product.images[1]}
          className="object-cover"
          alt="product image"
          layout="fill"
        />
      </div>
      <div className="[&>*]:w-full w-full p-2">
        <p className=" text-gray-400">{product.category.name}</p>
        <h1 className=" text-2xl">{product.title}</h1>
        <p className=" text-green-500 font-semibold text-2xl mb-2">
          ${product.price}
        </p>
        <button>
          <p className=" text-white bg-black p-2">Add to cart</p>
        </button>
      </div>
    </div>
  );
};
export default Product;
