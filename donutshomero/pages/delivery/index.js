import prisma from "../../lib/prisma";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import SingleDonutCard from "../../components/Menu/SingleDonutCard/SingleDonutCard";
import Nav from "../../components/Nav/Nav";
import {
  addToCart,
  removeFromCart,
  incrementByAmount,
} from "../../redux/features/cart/cartSlice";

import s from "./index.module.scss";

export default function Delivery({ donuts }) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  console.log("donuts", donuts);
  console.log("cart", cart);

  return (
    <>
      <Head>
        <title>Delivery</title>
      </Head>
      <Nav route="delivery" />
      <div className={s.container}>
        <p>Agrega los productos que quieras al carrito</p>
      </div>
      <div>
        {donuts &&
          donuts.map((donut) => (
            <div key={donut.id}>
              <SingleDonutCard donut={donut.title} price={donut.price} />
              <div>
                <button onClick={() => dispatch(addToCart(donut))}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        {/* <p>{cart}</p> */}
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps = async () => {
  const donuts = await prisma.donut.findMany({});
  return { props: { donuts } };
};
