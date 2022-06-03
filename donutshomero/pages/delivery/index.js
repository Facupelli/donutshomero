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
import PromoCard from "../../components/Promos/Card/PromoCard";

export default function Delivery({ donuts }) {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  console.log("donuts", donuts);
  console.log("cart", cart);

  return (
    <div className={s.container}>
      <Head>
        <title>Delivery</title>
      </Head>
      <Nav route="delivery" />
      <div className={s.main}>
        <div className={s.instructions}>
          <p>
            Agrega los productos que quieras al carrito y luego ajustas las
            cantidades!
          </p>
          <button>VER CARRITO</button>
        </div>
        <div className={s.products_container}>
          <p>SIMPLES</p>
          <p>PROMOS</p>
          <div className={s.single_donuts}>
            {donuts.donuts_single &&
              donuts.donuts_single.map((donut) => (
                <SingleDonutCard key={donut.id} donut={donut} delivery />
              ))}
          </div>
          <div className={s.single_donuts}>
            {donuts.donuts_promo &&
              donuts.donuts_promo.map((promo) => (
                <PromoCard key={promo.id} promo={promo} delivery />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const donuts_single = await prisma.donut.findMany({});
  const donuts_promo = await prisma.donutsPromo.findMany({});
  return { props: { donuts: { donuts_single, donuts_promo } } };
};
