import axios from "axios";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSingleDonuts, getOrders } from "../../utils/admin";

//COMPONENTS
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import StockByTotal from "../../components/Admin/AdminStock/StockByTotal/StockByTotal";
import StockByUnit from "../../components/Admin/AdminStock/StockByUnit/StockByUnit";
import Nav from "../../components/Nav/Nav";
import AdminOrders from "../../components/Admin/AdminOrders/AdminOrders";

import s from "./admin.module.scss";


export default function Admin() {
  const router = useRouter();
  const [showPanel, setShowPanel] = useState({
    orders: true,
    stock: false,
    users: false,
  });
  const admin = useSelector((state) => state.admin.data);
  const [donuts, setDonuts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!admin.accessToken) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    getSingleDonuts(setDonuts);
    getOrders(setOrders);
  }, []);

  useEffect(() => {
    const stockListener = supabase
      .from("Donut")
      .on("UPDATE", (payload) => {
        console.log("Change Received!", payload.new);
        getSingleDonuts();
      })
      .subscribe();

    return () => {
      stockListener.unsubscribe();
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
        {showPanel.orders && orders.length > 0 && (
          <AdminOrders orders={orders} />
        )}
      </div>
    </div>
  );
}

// export const getStaticProps = async () => {
//   const donuts = await prisma.donut.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });

//   return {
//     props: {
//       donuts,
//     },
//   };
// };
