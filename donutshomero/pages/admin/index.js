import { supabase } from "../../lib/supabase";
import { verify } from "jsonwebtoken";
import { useEffect, useState } from "react";
import { getSingleDonuts, getOrders } from "../../utils/admin";
import Head from "next/head";

//COMPONENTS
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import StockByTotal from "../../components/Admin/AdminStock/StockByTotal/StockByTotal";
import StockByUnit from "../../components/Admin/AdminStock/StockByUnit/StockByUnit";
import Nav from "../../components/Nav/Nav";
import AdminOrders from "../../components/Admin/AdminOrders/AdminOrders";
import AdminStats from "../../components/Admin/AdminStats/AdminStats";

import s from "./admin.module.scss";

export default function Admin({ admin }) {
  const [showPanel, setShowPanel] = useState({
    orders: true,
    stock: false,
    stats: false,
  });
  const [donuts, setDonuts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [date, setDate] = useState("all");
  //pagination
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(15);
  const [loadingPage, setLoadingPage] = useState(false);

  const handleChangeTake = (e) => {
    setTake(e.target.value);
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleClickNext = () => {
    if (skip + take >= orders.totalOrders) return;
    setLoadingPage(true);
    setSkip((prev) => prev + take);
  };

  const handleClickPrev = () => {
    if (skip === 0 || skip - take < 0) return;
    setLoadingPage(true);
    setSkip((prev) => prev - take);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [skip]);

  useEffect(() => {
    getOrders(setOrders, skip, take, date, setLoadingPage);
  }, [skip, take, date]);

  useEffect(() => {
    getSingleDonuts(setDonuts);
    getOrders(setOrders, skip, take, date);
  }, []);

  //escucho cambios en el stock
  useEffect(() => {
    const stockListener = supabase
      .from("Donut")
      .on("UPDATE", (payload) => {
        getSingleDonuts(setDonuts);
      })
      .subscribe();

    return () => {
      stockListener.unsubscribe();
    };
  }, []);

  //escucho cambios en las ordenes/pedidos
  useEffect(() => {
    const ordersListener = supabase
      .from("orders")
      .on("UPDATE", (payload) => {
        getOrders(setOrders, skip, take, date);
      })
      .on("INSERT", (payload) => {
        getOrders(setOrders, skip, take, date);
      })
      .subscribe();

    return () => {
      ordersListener.unsubscribe();
    };
  }, []);

  return (
    <div className={s.container}>
      <Head>
        <title>Homero Admin</title>
        <meta name="description" content="Donuts Homero admin panel" />
      </Head>
      <header>
        <Nav admin={admin} route="admin" />
      </header>
      <main className={s.main}>
        <AdminNav showPanel={showPanel} setShowPanel={setShowPanel} />
        {showPanel.stock && donuts.length > 0 && (
          <section className={s.cards_container}>
            <StockByUnit donuts={donuts} />
            <StockByTotal donuts={donuts} />
          </section>
        )}
        {showPanel.orders && (
          <AdminOrders
            orders={orders.orders}
            totalOrders={orders.totalOrders}
            handleClickNext={handleClickNext}
            handleClickPrev={handleClickPrev}
            handleChangeTake={handleChangeTake}
            handleChangeDate={handleChangeDate}
            skip={skip}
            take={take}
            loadingPage={loadingPage}
          />
        )}
        {showPanel.stats && <AdminStats orders={orders} />}
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ req }) => {
  // const token = req.headers.cookie.json();
  const { cookies } = req;

  const token = cookies.auth;

  if (token) {
    let tokenVerifyed;
    try {
      tokenVerifyed = verify(token, process.env.TOKEN_SECRET_WORD);
    } catch (e) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }
    if (tokenVerifyed) {
      return { props: { admin: true } };
    }
  }
  return {
    redirect: {
      permanent: false,
      destination: "/login",
    },
    props: {},
  };
};
