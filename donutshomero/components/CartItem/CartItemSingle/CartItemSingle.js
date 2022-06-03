import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Quantity from "../Quantity/Quantity";
import TotalPrice from "../TotalPrice/TotalPrice";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../redux/features/cart/cartSlice";

import s from "./CartItemSingle.module.scss";

export default function CartItemSingle({ cartItem }) {
  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <div key={cartItem.id} className={s.cart_item_single}>
        <p>{cartItem.name}</p>
        <p className={s.price}>${cartItem.price}</p>
        <Quantity quantity={cartItem.quantity} id={cartItem.id} />
        <FontAwesomeIcon
          icon={faTrashCan}
          className={s.trash_icon}
          onClick={() => dispatch(removeFromCart(cartItem.id))}
        />
      </div>
      <TotalPrice price={cartItem.price} quantity={cartItem.quantity} />
    </div>
  );
}
