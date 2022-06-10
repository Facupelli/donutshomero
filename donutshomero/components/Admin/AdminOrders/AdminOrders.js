import { supabase } from "../../../lib/supabase";
import OrderCard from "./OrderCard/OrderCard";
import { useEffect } from "react";
import s from "./AdminOrders.module.scss";

export default function AdminOrders({
  orders = [],
  handleClickNext,
  handleClickPrev,
  handleChangeTake
}) {
  return (
    <div>
      <div className={s.take_container}>
        <label htmlFor="take">MOSTRAR:</label>
        <select id="take" onChange={(e) => handleChangeTake(e)}>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
        </select>
      </div>
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
      {orders.length > 0 && (
        <div className={s.pagination_container}>
          <button className={s.prev_btn} onClick={handleClickPrev}>ANTERIOR</button>
          <button className={s.next_btn} onClick={handleClickNext}>SIGUIENTE</button>
        </div>
      )}
    </div>
  );
}
