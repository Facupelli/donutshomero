import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  addPromoChosenDonuts,
  decrementPromoChosenQuantity,
  incrementPromoChosenQuantity,
  removePromoChosenDonuts,
} from "../../../../redux/features/cart/cartSlice";

import s from "./ChooseDonut.module.scss";

export default function ChooseDonut({ single_donuts, cartItem }) {
  const dispatch = useDispatch();

  const handleRemoveChosen = (donut) => {
    if (
      cartItem.donutsPromo.filter((el) => el.donutId === donut.id).length === 0
    ) {
      return;
    }

    if (
      cartItem.donutsPromo.filter((el) => el.donutId === donut.id)[0]
        .donutQuantity === 1
    ) {
      //si queda una la elimino
      dispatch(
        removePromoChosenDonuts({ promoId: cartItem.id, chosenDonut: donut })
      );
      return;
    }
    dispatch(
      decrementPromoChosenQuantity({
        promoId: cartItem.id,
        donutId: donut.id,
      })
    );
  };

  const handleAddChosen = (donut) => {
    if (
      cartItem.donutsPromo.filter((el) => el.donutId === donut.id).length > 0
    ) {
      //id donas rellenas
      const rellenas = [
        "cl40ncyij0039isuwsg8es48m",
        "cl40ncyik0041isuw2zpgilga",
        "cl40ncyik0051isuwl707iv9s",
      ];
      //suma de las rellenas
      const rellenasTotal = cartItem.donutsPromo
        .filter((el) => rellenas.includes(el.donutId))
        .reduce((prev, acc) => {
          return prev + acc.donutQuantity;
        }, 0);
      if (rellenasTotal < 4 * cartItem.quantity) {
        dispatch(
          incrementPromoChosenQuantity({
            promoId: cartItem.id,
            donutId: donut.id,
          })
        );
      }
      return;
    }
    //si no esta la promo la agrego
    dispatch(
      addPromoChosenDonuts({ promoId: cartItem.id, chosenDonut: donut })
    );
  };

  return (
    <div className={s.choose_rellena_card_container}>
      {single_donuts
        .filter((donut) => donut.name.toLowerCase().includes("rellena"))
        .map((item) => (
          <div key={item.id} className={s.choose_rellena_card}>
            <p>{item.name}</p>
            <div>
              <div
                className={s.qty_arrow_icon_container}
                onClick={() => handleRemoveChosen(item)}
              >
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className={s.qty_arrow_icon}
                />
              </div>
              <div
                className={s.qty_arrow_icon_container}
                onClick={() => handleAddChosen(item)}
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className={s.qty_arrow_icon}
                />
              </div>
              <p className={s.qty_total}>
                {cartItem.donutsPromo.filter(
                  (donut) => donut.donutId === item.id
                )[0]
                  ? cartItem.donutsPromo.filter(
                      (donut) => donut.donutId === item.id
                    )[0].donutQuantity
                  : 0}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
