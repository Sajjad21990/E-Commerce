import { useState, useContext } from "react";
import { getData } from "../../helpers/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

const ProductDetail = (props) => {
  const [product] = useState(props.product);
  const [tab, setTab] = useState(0);

  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  const handleAddToCart = () => {
    dispatch(addToCart(product, cart));
  };

  const isActive = (index) => {
    if (tab === index) return "active";
    return "";
  };

  return (
    <div className="">
      <div className="img-container">
        <img
          src={product.images[tab].url}
          alt={product.images[tab].url}
          style={{ height: "500px", width: "500px" }}
        />
      </div>
      <div style={{ display: "flex" }}>
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.url}
            style={{
              height: "200px",
              width: "200px",
              margin: "5vh",
            }}
            onClick={() => setTab(index)}
            className={`img-thumbnail ${isActive(index)}`}
          />
        ))}
      </div>
      <div className="description">
        <h2>{product.title}</h2>
        <h2>{product.price}</h2>
        {product.inStock > 0 ? (
          <h5>In Stock: {product.inStock}</h5>
        ) : (
          <h5>Out Of Stock</h5>
        )}
        <h5>Sold: {product.sold}</h5>
        <h5>{product.description}</h5>
        <h5>{product.content}</h5>
        <button
          onClick={handleAddToCart}
          className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params: { id } }) => {
  const res = await getData(`product/${id}`);

  return {
    props: {
      product: res.product,
    },
  };
};

export default ProductDetail;
