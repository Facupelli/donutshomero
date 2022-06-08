import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import s from "./OrderCard.module.scss";

export default function OrderCard({ order }) {
  const [showItems, setShowItems] = useState(false);

  console.log(order)

  return (
    <div className={s.container}>
      <div className={s.orders_card_container}>
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
          <FontAwesomeIcon
            icon={showItems ? faAngleUp : faAngleDown}
            className={s.angle_icon}
            onClick={() => setShowItems(!showItems)}
          />
        </div>
      </div>
    </div>
  );
}
