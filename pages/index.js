import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getData } from "../helpers/fetchData";
import ProductItem from "../components/ProductItem";

export default function Home(props) {
  const [products, setProducts] = useState(props.product);

  return (
    <div>
      <Head>
        <title> Next E-Commerce App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="p-5 md:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20">
        {products.length === 0 ? (
          <h2>No Product</h2>
        ) : (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
        {products.length === 0 ? (
          <h2>No Product</h2>
        ) : (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await getData("product");

  return {
    props: {
      product: res.products,
      result: res.result,
    },
  };
};
