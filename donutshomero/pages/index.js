import prisma from "../lib/prisma";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import {
  setSingleDonuts,
  setPromos,
} from "../redux/features/donuts/donutsSlice";

//COMPONENTS
import Portrait from "../components/Portrait/Portrait";
import Nav from "../components/Nav/Nav";
import Menu from "../components/Menu/Menu";
import Promos from "../components/Promos/Promos";
import Local from "../components/Local/Local";
import Footer from "../components/Footer/Footer";
import WsButton from "../components/WsButton/WsButton";

import s from "../styles/index.module.scss";

export default function Home({ donuts }) {
  const dispatch = useDispatch();
  const donutsState = useSelector((state) => state.donuts);

  useEffect(() => {
    if (
      donutsState.single_donuts.length === 0 &&
      donutsState.promos.length === 0
    ) {
      console.log('NO HAY REDUX STATE')
      dispatch(setSingleDonuts(donuts.single));
      dispatch(setPromos(JSON.parse(donuts.promos)));
    }
  }, []);

  const menuDivRef = useRef(null);
  const promosDivRef = useRef(null);
  const localDivRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   window.onscroll = function (e) {
  //     setScrollY(window.scrollY); // Value of scroll Y in px
  //   };
  // }, []);

  return (
    <div>
      <Head>
        <title>Donuts Homero</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={s.main}>
        <Nav menuDivRef={menuDivRef} localDivRef={localDivRef} />
        <div className={s.portrait}>
          <Portrait />
        </div>
        <div className={s.promos}>
          <Promos promosDivRef={promosDivRef} donuts={donuts.promos} />
          <Menu menuDivRef={menuDivRef} donuts={donuts.single} />
          <Local localDivRef={localDivRef} />
        </div>
        <WsButton scrollY={scrollY} />
        <Footer menuDivRef={menuDivRef} promosDivRef={promosDivRef} />
      </main>

      <footer></footer>
    </div>
  );
}

export const getStaticProps = async () => {
  const single = await prisma.donut.findMany({
    orderBy: {
      price: "asc",
    },
  });

  const promos = await prisma.promo.findMany({
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
