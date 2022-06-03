import s from "./TotalPrice.module.scss";

export default function TotalPrice({ price, quantity }) {
  return (
    <div className={s.total}>
      <p>${price * quantity}</p>
    </div>
  );
}
