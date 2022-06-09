import { supabase } from "../../lib/supabase";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getSingleDonuts, getOrders } from "../../utils/admin";
import { setAdminUser } from "../../redux/features/adminUser/adminUserSlice";
import nookies from "nookies";

//COMPONENTS
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import StockByTotal from "../../components/Admin/AdminStock/StockByTotal/StockByTotal";
import StockByUnit from "../../components/Admin/AdminStock/StockByUnit/StockByUnit";
import Nav from "../../components/Nav/Nav";
import AdminOrders from "../../components/Admin/AdminOrders/AdminOrders";

import s from "./admin.module.scss";

export default function Admin() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPanel, setShowPanel] = useState({
    orders: true,
    stock: false,
    users: false,
  });
  const [donuts, setDonuts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getSingleDonuts(setDonuts);
    getOrders(setOrders);
  }, []);

  //escucho cambios en el stock
  useEffect(() => {
    const stockListener = supabase
      .from("Donut")
      .on("UPDATE", (payload) => {
        console.log("Change Received!", payload.new);
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
        console.log("Order change Received!", payload.new);
        getOrders(setOrders);
      })
      .on("INSERT", (payload) => {
        console.log("Order insert Received!", payload.new);
        getOrders(setOrders);
      })
      .subscribe();

    return () => {
      ordersListener.unsubscribe();
    };
  }, []);

  return (
    <div className={s.container}>
      <Nav route="admin" />
      <div className={s.main}>
        <AdminNav showPanel={showPanel} setShowPanel={setShowPanel} />
        {showPanel.stock && donuts.length > 0 && (
          <div className={s.cards_container}>
            <StockByUnit donuts={donuts} />
            <StockByTotal donuts={donuts} />
          </div>
        )}
        {showPanel.orders && <AdminOrders orders={orders} />}
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

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
      return { props: {} };
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
