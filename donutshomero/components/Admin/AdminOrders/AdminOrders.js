import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

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
        <div key={order.id} className={s.orders_card_container}>
          <p className={s.id}>{order.number}</p>
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
              <p>
                {new Date(order.createdAt)
                  .toDateString()
                  .split(" ")
                  .slice(1, 3)
                  .join(" ")}
              </p>
              <p>
                {new Date(order.createdAt)
                  .toLocaleTimeString()
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
              </p>
            </div>
            <FontAwesomeIcon icon={faAngleDown} className={s.angle_icon} />
          </div>
        </div>
      ))}
    </div>
  );
}
