import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import { getData, postData } from "../helpers/fetchData";
import Head from "next/head";

const cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const result = cart.reduce((prev, next) => {
        return prev + next.price * next.quantity;
      }, 0);

      setTotal(result);
    };
    getTotal();
  }, [cart]);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("__ecommerce__cart__"));

    if (localCart && localCart.length > 0) {
      let newCartArr = [];
      const updateCart = async () => {
        for (const item of localCart) {
          const response = await getData(`product/${item._id}`);

          const { _id, title, images, price, inStock } = response.product;
          if (inStock > 0) {
            newCartArr.push({
              _id,
              title,
              images,
              price,
              inStock,

              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispatch({ type: "ADD_TO_CART", payload: newCartArr });
      };
      updateCart();
    }
  }, []);

  const initializePayment = async () => {
    if (!window.Razorpay) {
      alert("Network Error");
      return;
    }

    const result = await postData("payments/acceptpayment", { total: 1000 });

    console.log(result);
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result;

    const options = {
      key: process.env.RAZORPAY_PUBLIC_KEY, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Nextjs Ecommerce Test.",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await postData("payments/success", data);

        alert(result.data.msg);
      },
      prefill: {
        name: "Sajjad Test",
        email: "sajjadhaider2199@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <Head>
        <title>Cart Page</title>
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>

      <div className="h-screen bg-gray-300">
        <div className="py-12">
          <div className="max-w-md mx-auto bg-gray-100 shadow-lg rounded-lg md:max-w-5xl">
            <div className="md:flex ">
              <div className="w-full p-4 px-5 py-5">
                {cart.length === 0 ? (
                  <>
                    <h1>Hello</h1>
                  </>
                ) : (
                  <>
                    <div className="md:grid md:grid-cols-3 gap-2 ">
                      <div className="col-span-2 p-5">
                        <h1 className="text-xl font-medium ">Shopping Cart</h1>
                        {cart.map((prod) => (
                          <CartItem key={prod._id} product={prod} />
                        ))}

                        <div className="flex justify-between items-center mt-6 pt-6 border-t">
                          <div className="flex items-center">
                            <i className="fa fa-arrow-left text-sm pr-2"></i>
                            <Link href="/">
                              <span className="text-md font-medium text-blue-500 cursor-pointer">
                                Continue Shopping
                              </span>
                            </Link>
                          </div>
                          <div className="flex justify-center items-end">
                            <span className="text-sm font-medium text-gray-400 mr-1">
                              Subtotal:
                            </span>
                            {console.log(cart)}
                            <span className="text-lg font-bold text-gray-800 ">
                              ${total}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className=" p-5 bg-gray-800 rounded overflow-visible">
                        <span className="text-xl font-medium text-gray-100 block pb-3">
                          Shipping Details
                        </span>
                        <span className="text-xs text-gray-400 ">
                          Card Type
                        </span>
                        {/* <div className="overflow-visible flex justify-between items-center mt-2">
                      <div className="rounded w-52 h-28 bg-gray-500 py-2 px-4 relative right-10">
                        <span className="italic text-lg font-medium text-gray-200 underline">
                          VISA
                        </span>
                        <div className="flex justify-between items-center pt-4 ">
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                          <span className="text-xs text-gray-200 font-medium">
                            ****
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-200">
                            Giga Tamarashvili
                          </span>
                          <span className="text-xs text-gray-200">12/18</span>
                        </div>
                      </div>
                      <div className="flex justify-center items-center flex-col">
                        <img
                          src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
                          width="40"
                          className="relative right-5"
                        />
                        <span className="text-xs font-medium text-gray-200 bottom-2 relative right-5">
                          mastercard.
                        </span>
                      </div>
                    </div> */}
                        <div className="flex justify-center flex-col pt-3">
                          <label className="text-xs text-gray-400 ">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                            placeholder="Giga Tamarashvili"
                          />
                        </div>
                        <div className="flex justify-center flex-col pt-3">
                          <label className="text-xs text-gray-400 ">
                            Card Number
                          </label>
                          <input
                            type="text"
                            className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                            placeholder="**** **** **** ****"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
                          <div className="col-span-2 ">
                            <label className="text-xs text-gray-400">
                              Expiration Date
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <input
                                type="text"
                                className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                                placeholder="mm"
                              />
                              <input
                                type="text"
                                className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                                placeholder="yyyy"
                              />
                            </div>
                          </div>
                          <div className="">
                            <label className="text-xs text-gray-400">CVV</label>
                            <input
                              type="text"
                              className="focus:outline-none w-full h-6 bg-gray-800 text-white placeholder-gray-300 text-sm border-b border-gray-600 py-4"
                              placeholder="XXX"
                            />
                          </div>
                        </div>
                        <button
                          className="h-12 w-full bg-blue-500 rounded focus:outline-none text-white hover:bg-blue-600"
                          onClick={initializePayment}
                        >
                          Check Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default cart;
