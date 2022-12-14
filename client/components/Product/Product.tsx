import Image from "next/image";
import { CartProductProps } from "../../pages/products/@types";
import { postProduct } from "../../services.api";
import { ProductProps } from "./@types";
import { MouseEvent } from "react";
const Product = ({
  product,
  cartProducts,
  updateCartProducts,
}: {
  product: ProductProps;
  cartProducts: CartProductProps[];
  updateCartProducts: () => void;
}) => {
  const handleAddToCart = async (product: ProductProps) => {
    await postProduct({
      product_id: product.id,
      name: product.title,
      value: product.price,
      img_url: product.images[0],
      quantity: 1,
    });
    updateCartProducts();
  };

  const isProductOnCart = !!cartProducts.find(
    (cartProduct) => cartProduct.product_id === product.id
  );
  return (
    <div className=" bg-white flex max-w-[300px] min-w-[250px] md:min-w-[300px] flex-col items-center m-auto my-10 px-5 pt-5 rounded-lg">
      <div className=" h-[250px] w-full relative overflow-hidden mb-2">
        <Image
          src={product.images[0]}
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
          {isProductOnCart ? (
            <button className="w-full mb-5">
              <p className=" text-white text-2xl bg-slate-600 p-3 mt-auto">
                Added to cart
              </p>
            </button>
          ) : (
            <button
              className="w-full mb-5"
              onClick={(event) => handleAddToCart(product)}
            >
              <p className=" text-white text-2xl bg-black p-3 mt-auto hover:bg-gray-800">
                Add to cart
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Product;
