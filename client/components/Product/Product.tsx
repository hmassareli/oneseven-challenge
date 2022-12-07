import Image from "next/image";
import { ProductProps } from "./ProductProps";
const Product = ({ product }: { product: ProductProps }) => {
  return (
    <div className=" bg-white flex max-w-[300px] min-w-[200px] flex-col items-center m-10 px-5 pt-5 rounded-lg">
      <div className=" h-[250px] w-full relative overflow-hidden mb-2">
        <Image
          src={
            // uses a random image from unsplash when there is not image
            product.images[0]
              ? product.images[0]
              : `https://api.lorem.space/image/furniture?w=640&h=480&r=${Math.floor(
                  Math.random() * 1000
                )}`
          }
          className="object-cover"
          alt="product image"
          layout="fill"
        />
      </div>
      <div className="[&>*]:w-full w-full flex-grow flex justify-between flex-col">
        <div>
          <p className=" text-gray-400">{product.category.name}</p>
          <h1 className=" text-2xl">{product.title}</h1>
          <p className=" text-green-500 font-semibold text-2xl mb-2">
            ${product.price}
          </p>
        </div>
        <div>
          <button className="w-full mb-5">
            <p className=" text-white text-2xl bg-black p-3 mt-auto hover:bg-gray-800">
              Add to cart
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Product;
