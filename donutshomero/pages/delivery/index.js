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
import { useRouter } from "next/router";

export default function Delivery({ donuts }) {
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const { donuts_single, donuts_promo } = donuts;

  // console.log("donuts", donuts);
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
          <button onClick={() => router.push("/carrito")}>VER CARRITO</button>
        </div>
        <div className={s.products_container}>
          <p>SIMPLES</p>
          <p>PROMOS</p>
          <div className={s.single_donuts}>
            {donuts_single &&
              donuts_single.map((donut) => (
                <SingleDonutCard key={donut.id} donut={donut} delivery />
              ))}
          </div>
          <div className={s.single_donuts}>
            <span>6 DONAS</span>
            {donuts_promo.six &&
              donuts_promo.six.map((promo) => (
                <PromoCard key={promo.id} promo={promo} delivery />
              ))}
            <span>12 DONAS</span>
            {donuts_promo.dozen &&
              donuts_promo.dozen.map((promo) => (
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
  return {
    props: {
      donuts: {
        donuts_single,
        donuts_promo: {
          six: donuts_promo.slice(0, 4),
          dozen: donuts_promo.slice(4),
        },
      },
    },
  };
};
