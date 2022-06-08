import OrderCard from "./OrderCard/OrderCard";
import s from "./AdminOrders.module.scss";

export default function AdminOrders({ orders }) {
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
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
