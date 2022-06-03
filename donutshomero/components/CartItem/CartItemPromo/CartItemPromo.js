import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Quantity from "../Quantity/Quantity";

import s from "./CartItemPromo.module.scss";

export default function CartItemPromo({ cartItem }) {
  return (
    <div className={s.cart_item_promo}>
      <div className={s.flex}>
        <p>Promo N°</p>
        <p>{cartItem.title}</p>
      </div>
      <div className={s.flex}>
        <p>Cantidad de donas:</p>
        <p>{cartItem.donutsQuantity}</p>
      </div>
      <button>
        <p>VER DONAS</p>
        <FontAwesomeIcon icon={faAngleDown} className={s.arrow_icon} />
      </button>
      <p className={s.price}>${cartItem.price}</p>
      <Quantity />
    </div>
  );
}
