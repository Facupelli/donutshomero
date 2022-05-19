import PromoCard from "../Card/PromoCard";
import s from "./DonutPromo.module.scss";

export default function DonutPromo({ promo_type, donuts }) {
  return (
    <div className={s.container}>
      <div className={s.donuts_quantity_promo}>
        <p>{promo_type}</p>
      </div>

      <div className={s.six_donuts_promo}>
        {donuts.length > 0 &&
          donuts.map((donut) => (
            <PromoCard
              key={donut.id}
              id={donut.id}
              fisrt_donuts={donut.fisrt_donuts}
              second_donuts={donut.second_donuts}
              third_donuts={donut.third_donuts}
              forth_donuts={donut.forth_donuts}
              price={donut.price}
            />
          ))}
      </div>
    </div>
  );
}
