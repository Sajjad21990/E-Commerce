import { createContext, useReducer, useEffect } from "react";
import { getData } from "../helpers/fetchData";
import reducers from "./Reducers";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
  };

  const [state, dispatch] = useReducer(reducers, initialState);

  const { cart } = state;

  useEffect(() => {
    console.log("------>>> from global state <<<<--------");
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");

        dispatch({
          type: "AUTH",
          payload: {
            token: res.accessToken,
            user: res.user,
          },
        });
      });
    }
  }, []);

  useEffect(() => {
    const __ecommerce__cart__ = JSON.parse(
      localStorage.getItem("__ecommerce__cart__")
    );
    if (__ecommerce__cart__)
      dispatch({ type: "ADD_TO_CART", payload: __ecommerce__cart__ });
  }, []);

  useEffect(() => {
    localStorage.setItem("__ecommerce__cart__", JSON.stringify(cart));
  }, [cart]);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
