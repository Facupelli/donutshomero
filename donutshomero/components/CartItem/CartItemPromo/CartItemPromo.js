import {
  faAngleDown,
  faAngleUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/features/cart/cartSlice";
import Quantity from "../Quantity/Quantity";
import TotalPrice from "../TotalPrice/TotalPrice";

import s from "./CartItemPromo.module.scss";

export default function CartItemPromo({ cartItem }) {
  const dispatch = useDispatch();
  const [showDonuts, setShowDonuts] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.cart}>
        <div className={s.cart_item_promo}>
          <div className={s.flex}>
            <p>Promo N°</p>
            <p>{cartItem.title}</p>
          </div>
          <div className={s.flex}>
            <p>Donas:</p>
            <p>{cartItem.donutsQuantity}</p>
          </div>
          <button onClick={() => setShowDonuts(!showDonuts)} >
            <p>VER DONAS</p>
            <FontAwesomeIcon
              icon={showDonuts ? faAngleUp : faAngleDown}
              className={s.arrow_icon}
            />
          </button>
          <p className={s.price}>${cartItem.price}</p>
          <Quantity quantity={cartItem.quantity} id={cartItem.id} />
          <FontAwesomeIcon
            icon={faTrashCan}
            className={s.trash_icon}
            onClick={() => dispatch(removeFromCart(cartItem.id))}
          />
        </div>

        {showDonuts && (
          <div className={s.donuts_list}>
            {cartItem.donuts.map((donut) => (
              <p key={donut}>{donut}</p>
            ))}
          </div>
        )}
      </div>
      <TotalPrice price={cartItem.price} quantity={cartItem.quantity} />
    </div>
  );
}
