import Link from "next/link";
import { useContext } from "react";
import { addToCart } from "../store/Actions";
import { DataContext } from "../store/GlobalState";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);

  const { cart } = state;

  const handleAddToCart = () => {
    dispatch(addToCart(product, cart));
  };

  return (
    <div className="flex flex-col rounded overflow-hidden shadow-lg">
      <div className="h-3/5">
        <img
          className="w-full h-full object-cover"
          src={product.images[0].url}
          alt={product.title}
        />
      </div>
      <div className="px-6 py-4 flex-1 flex flex-col justify-between">
        <h1 className="text-gray-900 font-bold text-2xl">{product.title}</h1>

        <p className="mt-2 text-gray-600 text-sm">{product.description}</p>

        <div className="flex item-center mt-2">
          <svg
            className="w-5 h-5 fill-current text-gray-700"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
          <svg
            className="w-5 h-5 fill-current text-gray-700"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
          <svg
            className="w-5 h-5 fill-current text-gray-700"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
          <svg
            className="w-5 h-5 fill-current text-gray-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
          <svg
            className="w-5 h-5 fill-current text-gray-500"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
          </svg>
        </div>
        <div className="flex item-center justify-between mt-3">
          <h1 className="text-gray-700 font-bold text-xl">$220</h1>
          {product.inStock > 0 ? (
            <h1 className="text-gray-700 font-bold text-xl">
              In Stock: {product.inStock}
            </h1>
          ) : (
            <h1 className="text-gray-700 font-bold text-xl">out of stock</h1>
          )}
        </div>
        <div className="flex item-center justify-between mt-3">
          <Link href={`/product/${product._id}`}>
            <a className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded cursor-pointer">
              View Product
            </a>
          </Link>
          <button
            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
            disabled={product.inStock === 0 ? true : false}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
        <div className=" pt-4">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
