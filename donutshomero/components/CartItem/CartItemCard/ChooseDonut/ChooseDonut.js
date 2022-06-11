import ChooseDonutQty from "./ChooseDonutQty/ChooseDonutQty";

import s from "./ChooseDonut.module.scss";

export default function ChooseDonut({ single_donuts, cartItem }) {
  return (
    <div className={s.choose_rellena_card_container}>
      {single_donuts
        .filter((donut) => donut.name.toLowerCase().includes("rellena"))
        .map((item) => (
          <div key={item.id} className={s.choose_rellena_card}>
            <p>{item.name}</p>
            <ChooseDonutQty item={item} cartItem={cartItem} single_donuts={single_donuts}/>
          </div>
        ))}
    </div>
  );
}
