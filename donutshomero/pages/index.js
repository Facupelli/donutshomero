import prisma from "../lib/prisma";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { verify } from "jsonwebtoken";
import Head from "next/head";
import {
  setSingleDonuts,
  setPromos,
} from "../redux/features/donuts/donutsSlice";
import { setAdminUser } from "../redux/features/adminUser/adminUserSlice";

//COMPONENTS
import Portrait from "../components/Portrait/Portrait";
import Nav from "../components/Nav/Nav";
import Menu from "../components/Menu/Menu";
import Promos from "../components/Promos/Promos";
import Local from "../components/Local/Local";
import Footer from "../components/Footer/Footer";
import WsButton from "../components/WsButton/WsButton";
import OrderModal from "../components/OrderModal/OrderModal";

import s from "../styles/index.module.scss";

export default function Home({ donuts, modal }) {
  const dispatch = useDispatch();
  const donutsState = useSelector((state) => state.donuts);
  const [showModal, setShowModal] = useState(modal === "true" ? true : false);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   try {
  //     const tokenVerifyed = verify(token, process.env.TOKEN_SECRET_WORD);
  //     if (tokenVerifyed) {
  //       dispatch(setAdminUser({ accessToken: token }));
  //     }
  //   } catch (e) {
  //     console.log("unauthorized");
  //   }
  // }, []);

  useEffect(() => {
    if (
      donutsState.single_donuts.length === 0 &&
      donutsState.promos.length === 0
    ) {
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
    <div className={s.relative}>
      {showModal && <OrderModal handleClick={() => setShowModal(false)} />}
      <Head>
        <title>Donuts Homero</title>
        <meta
          name="description"
          content="Donuts Homero, las mejores donas de San Juan. Compra tus donas y te las llevamos a domicilio. Delivery de donas. Local calle Jujuy entre Laprida y av. Libertador."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Nav menuDivRef={menuDivRef} localDivRef={localDivRef} />
        <div className={s.portrait}>
          <Portrait />
        </div>
      </header>
      <main className={s.main}>
        <div className={s.promos}>
          <Promos promosDivRef={promosDivRef} donuts={donuts.promos} />
          <Menu menuDivRef={menuDivRef} donuts={donuts.single} />
          <Local localDivRef={localDivRef} />
        </div>
        <WsButton scrollY={scrollY} />
      </main>
      <Footer menuDivRef={menuDivRef} promosDivRef={promosDivRef} />
    </div>
  );
}

export const getServerSideProps = async ({ query }) => {
  const modal = query.ordersuccess;

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
      modal: modal ? modal : null,
    },
  };
};
