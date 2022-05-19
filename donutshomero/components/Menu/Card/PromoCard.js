import s from "./PromoCard.module.scss";

export default function PromoCard({fisrt_donuts, second_donuts,third_donut, price}) {
  return (
    <div className={s.promo}>
      <p>{fisrt_donuts}</p>
      <p>{second_donuts}</p>
      {third_donut && <p>{third_donut}</p>}
      <p className={s.price}>${price}</p>
    </div>
  );
}
