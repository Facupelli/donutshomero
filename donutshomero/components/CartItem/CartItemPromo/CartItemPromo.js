import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Quantity from "../Quantity/Quantity";

import s from "./CartItemPromo.module.scss";

export default function CartItemPromo({ cartItem }) {
  const [showDonuts, setShowDonuts] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.cart_item_promo}>
        <div className={s.flex}>
          <p>Promo N°</p>
          <p>{cartItem.title}</p>
        </div>
        <div className={s.flex}>
          <p>Cantidad de donas:</p>
          <p>{cartItem.donutsQuantity}</p>
        </div>
        <button onClick={() => setShowDonuts(!showDonuts)}>
          <p>VER DONAS</p>
          <FontAwesomeIcon icon={showDonuts ? faAngleUp : faAngleDown} className={s.arrow_icon} />
        </button>
        <p className={s.price}>${cartItem.price}</p>
        <Quantity />
      </div>
      {showDonuts && (
        <div className={s.donuts_list}>
          {cartItem.donuts.map((donut) => (
            <p>{donut}</p>
          ))}
        </div>
      )}
    </div>
  );
}
