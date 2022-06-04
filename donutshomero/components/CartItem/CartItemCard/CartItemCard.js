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

export default function CartItemCard({ cartItem }) {
  const dispatch = useDispatch();
  const [showDonuts, setShowDonuts] = useState(false);

  return (
    <div className={s.container}>
      <div className={s.cart}>
        <div className={s.cart_flex}>
          {cartItem.donutsQuantity ? (
            <div className={s.cart_item_promo}>
              <div className={s.flex}>
                <p>Promo N°</p>
                <p>{cartItem.name}</p>
              </div>
              <div className={s.flex}>
                <p>Donas:</p>
                <p>{cartItem.donutsQuantity}</p>
              </div>
              <button onClick={() => setShowDonuts(!showDonuts)}>
                <p>VER DONAS</p>
                <p className={s.donas_mobile}>DONAS</p>
                <FontAwesomeIcon
                  icon={showDonuts ? faAngleUp : faAngleDown}
                  className={s.arrow_icon}
                />
              </button>
              <p className={s.promo_price}>${cartItem.price}</p>
              <p className={s.promo_total_price}>
                ${cartItem.price * cartItem.quantity}
              </p>
            </div>
          ) : (
            <div key={cartItem.id} className={s.cart_item_single}>
              <p>{cartItem.name}</p>
              <p className={s.single_price}>${cartItem.price}</p>
              <p className={s.single_total_price}>
                ${cartItem.price * cartItem.quantity}
              </p>
            </div>
          )}
          <div className={s.qty_and_trash}>
            <Quantity quantity={cartItem.quantity} id={cartItem.id} />
            <FontAwesomeIcon
              icon={faTrashCan}
              className={s.trash_icon}
              onClick={() => dispatch(removeFromCart(cartItem.id))}
            />
          </div>
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
