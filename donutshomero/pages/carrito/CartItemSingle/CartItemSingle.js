import s from "./CartItemSingle.module.scss";

export default function CartItemSingle({ cartItem }) {
  return (
    <div key={cartItem.id} className={s.cart_item_single}>
      <p>{cartItem.name}</p>
      <p className={s.price}>${cartItem.price}</p>
      <div>
          
      </div>
    </div>
  );
}
