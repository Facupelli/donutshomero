import Quantity from "../Quantity/Quantity";
import TotalPrice from "../TotalPrice/TotalPrice";

import s from "./CartItemSingle.module.scss";

export default function CartItemSingle({ cartItem }) {
  return (
    <div className={s.container}>
      <div key={cartItem.id} className={s.cart_item_single}>
        <p>{cartItem.name}</p>
        <p className={s.price}>${cartItem.price}</p>
        <Quantity quantity={cartItem.quantity} id={cartItem.id} />
      </div>
      <TotalPrice price={cartItem.price} quantity={cartItem.quantity} />
    </div>
  );
}
