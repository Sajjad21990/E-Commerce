export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_TO_CART: "ADD_TO_CART",
};

export const incrementCartItem = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });
  return { type: "ADD_TO_CART", payload: newData };
};

export const decrementCartItem = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });
  return { type: "ADD_TO_CART", payload: newData };
};

export const addToCart = (product, cart) => {
  if (product.inStock === 0)
    return { type: "NOTIFY", payload: { error: "Product out of stock." } };

  const check = cart.every((item) => {
    return item._id !== product._id;
  });
  console.log("check", check);
  if (!check) {
    return { type: "NOTIFY", payload: { error: "Product already in cart." } };
  }

  return {
    type: "ADD_TO_CART",
    payload: [...cart, { ...product, quantity: 1 }],
  };
};
