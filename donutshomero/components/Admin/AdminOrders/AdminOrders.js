import { supabase } from "../../../lib/supabase";
import OrderCard from "./OrderCard/OrderCard";
import { useEffect, useState } from "react";
import { getOrders } from "../../../utils/admin";

import s from "./AdminOrders.module.scss";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders(setOrders);
  }, []);

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
      {orders.length > 0 &&
        orders.map((order) => <OrderCard key={order.id} order={order} />)}
    </div>
  );
}
