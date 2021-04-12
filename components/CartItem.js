import { useContext } from "react";
import { incrementCartItem, decrementCartItem } from "../store/Actions";
import { DataContext } from "../store/GlobalState";

const CartItem = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);

  const { cart } = state;

  const handleAdd = () => {
    dispatch(incrementCartItem(cart, product._id));
  };

  const handleRemove = () => {
    dispatch(decrementCartItem(cart, product._id));
  };

  return (
    <div className="flex justify-between items-center mt-6 pt-6 border-t">
      <div className="flex items-center">
        <img src={product.images[0].url} width="60" className="rounded" />
        <div className="flex flex-col ml-3">
          <span className="md:text-md font-medium">{product.title}</span>
          <span className="text-xs font-light text-gray-400">
            {product.inStock} left only !!!
          </span>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="pr-8 flex ">
          <button
            className="font-semibold cursor-pointer px-2"
            onClick={handleRemove}
            disabled={CartItem.quantity <= 1 ? true : false}
          >
            -
          </button>
          <input
            type="text"
            className="focus:outline-none bg-gray-100 border h-6 w-8 rounded text-sm px-2 mx-2"
            value={product.quantity}
            onChange={null}
          />
          <button
            className="font-semibold cursor-pointer px-2"
            onClick={handleAdd}
            disabled={CartItem.quantity >= CartItem.inStock ? true : false}
          >
            +
          </button>
        </div>
        <div className="pr-8 ">
          <span className="text-xs font-medium">
            ${product.price * product.quantity}
          </span>
        </div>
        <div>
          <i className="fa fa-close text-xs font-medium"></i>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
