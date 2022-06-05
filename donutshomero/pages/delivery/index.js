import prisma from "../../lib/prisma";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import SingleDonutCard from "../../components/Menu/SingleDonutCard/SingleDonutCard";
import Nav from "../../components/Nav/Nav";

import s from "./index.module.scss";
import PromoCard from "../../components/Promos/Card/PromoCard";
import { useRouter } from "next/router";

export default function Delivery({ donuts = [] }) {
  const router = useRouter();
  const cart = useSelector((state) => state.cart.items);

  const donuts_single = donuts.filter((donut) => donut.type === "SINGLE");

  const donutsPromoSix = donuts.filter(
    (donut) => donut.type === "PROMO" && donut.donutsQuantity === 6
  );
  const donutsPromoDozen = donuts.filter(
    (donut) => donut.type === "PROMO" && donut.donutsQuantity === 12
  );

  // console.log(cart);

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
          <p>PROMOS</p>
          <p className={s.promos_title_pc}>SIMPLES</p>
          <div className={s.single_donuts}>
            <span>6 DONAS</span>
            {donutsPromoSix.length > 0 &&
              donutsPromoSix.map((promo) => (
                <PromoCard
                  key={promo.id}
                  promo={promo}
                  delivery
                  cart={cart.filter(
                    (cartItem) => cartItem.donuts !== undefined
                  )}
                />
              ))}
            <span>12 DONAS</span>
            {donutsPromoDozen.length > 0 &&
              donutsPromoDozen.map((promo) => (
                <PromoCard
                  key={promo.id}
                  promo={promo}
                  delivery
                  cart={cart.filter(
                    (cartItem) => cartItem.donuts !== undefined
                  )}
                />
              ))}
          </div>
          <p className={s.promos_title_mobile}>SIMPLES</p>
          <div className={s.single_donuts}>
            {donuts_single.length > 0 &&
              donuts_single.map((donut) => (
                <SingleDonutCard
                  key={donut.id}
                  donut={donut}
                  delivery
                  cart={cart.filter((item) => item.type === "SINGLE")}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const donuts = await prisma.donut.findMany({});
  return {
    props: {
      donuts,
    },
  };
};
