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
          <div>
            <div className={s.table_titles_container}>
              <p>ID</p>
              <div className={s.table_titles}>
                <p>PRECIO TOTAL</p>
                <p>DIRECCIÓN</p>
                <p>LINK</p>
                <p>PAGO</p>
                <p>ESTADO DEL PAGO</p>
                <p>ESTADO DE ENTREGA</p>
                <p>FECHA</p>
              </div>
            </div>
            {orders.map((order) => (
              <div key={order.id} className={s.orders_card_container}>
                <p>{order.number}</p>
                <div>
                  <p>{order.totalPrice}</p>
                  <div>
                    <p>{order.address}</p>
                    <p>{order.addressNumber}</p>
                  </div>
                  <p>{order.ubiLink ? order.ubiLink : "-"}</p>
                  <p>{order.paymentMethod}</p>
                  <p>{order.paymentStatus}</p>
                  <p>{order.deliverStatus}</p>
                  <div className={s.date}>
                    <p>{new Date(order.createdAt).toDateString()}</p>
                    <p>{new Date(order.createdAt).toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
