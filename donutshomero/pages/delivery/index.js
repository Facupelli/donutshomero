import prisma from "../../lib/prisma";

import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  setPromos,
  setSingleDonuts,
} from "../../redux/features/donuts/donutsSlice";
import { useEffect } from "react";

//COMPONENTS
import Footer from "../../components/Footer/Footer";
import SingleDonutCard from "../../components/Menu/SingleDonutCard/SingleDonutCard";
import Nav from "../../components/Nav/Nav";
import PromoCard from "../../components/Promos/Card/PromoCard";

import s from "./index.module.scss";

export default function Delivery({ donuts = [] }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.items);
  const donutsState = useSelector((state) => state.donuts);

  const { single, promos } = donuts;
  const promoDonuts = JSON.parse(promos);

  const donutsPromoSix = promoDonuts.filter(
    (donut) => donut.donutsQuantity === 6
  );
  const donutsPromoDozen = promoDonuts.filter(
    (donut) => donut.donutsQuantity === 12
  );

  useEffect(() => {
    if (
      donutsState.single_donuts.length === 0 &&
      donutsState.promos.length === 0
    ) {
      dispatch(setSingleDonuts(single));
      dispatch(setPromos(promoDonuts));
    }
  }, []);

  return (
    <div className={s.container}>
      <Head>
        <title>Delivery</title>
        <meta
          name="description"
          content="Delivery de donas, las mejores de San Juan. Te las llevamos a tu casa!"
        />
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
                    (cartItem) => cartItem.donutsQuantity === 6
                  )}
                  single_donuts={single}
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
                    (cartItem) => cartItem.donutsQuantity === 12
                  )}
                  single_donuts={single}
                />
              ))}
          </div>
          <p className={s.promos_title_mobile}>SIMPLES</p>
          <div className={`${s.single_donuts} ${s.margin_top}`}>
            {single.length > 0 &&
              single.map((donut) => (
                <SingleDonutCard
                  key={donut.id}
                  donut={donut}
                  delivery
                  cart={cart}
                />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps = async () => {
  const single = await prisma.donut.findMany({
    orderBy: {
      price: "asc",
    },
    where: {
      available: true,
    },
  });

  const promos = await prisma.promo.findMany({
    orderBy: {
      price: "asc",
    },
    where: {
      available: true,
    },
    include: {
      donutsPromo: {
        include: {
          donut: true,
        },
      },
    },
  });

  return {
    props: {
      donuts: {
        single,
        promos: JSON.stringify(promos),
      },
    },
  };
};
