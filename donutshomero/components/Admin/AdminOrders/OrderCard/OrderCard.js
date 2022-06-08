import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import s from "./OrderCard.module.scss";

export default function OrderCard({ order }) {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.orders_card_container}>
        <p className={s.id}>{order.number}</p>
        <div>
          <p className={s.bold_500}>
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumSignificantDigits: 12,
            }).format(order.totalPrice)}
          </p>
          <div className={s.child_padding}>
            <p>{order.address}</p>
            <p>{order.addressNumber}</p>
          </div>
          <p className={s.child_padding}>
            {order.ubiLink ? order.ubiLink : "-"}
          </p>
          <p>{order.paymentMethod}</p>
          <p className={s.bold_500}>{order.paymentStatus}</p>
          <p className={s.bold_500}>{order.deliverStatus}</p>
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
          <FontAwesomeIcon
            icon={showItems ? faAngleUp : faAngleDown}
            className={s.angle_icon}
            onClick={() => setShowItems(!showItems)}
          />
        </div>
      </div>
      {showItems && (
        <div className={s.show_donuts_container}>
          {order.items.map((item, i) => (
            <div key={i} className={s.show_donuts}>
              <p className={s.donut_name}>
                {item.donutsQuantity
                  ? `Promo N° ${item.name} - ${item.donutsQuantity} Donas`
                  : item.name}
              </p>
              <p className={s.qty}>x{item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
