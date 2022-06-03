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
          donuts.map((promo) => (
            <PromoCard
              key={promo.title}
              promo={promo}
              cart={[]}
            />
          ))}
      </div>
    </div>
  );
}
