import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  addPromoChosenDonuts,
  decrementPromoChosenQuantity,
  incrementPromoChosenQuantity,
  removePromoChosenDonuts,
} from "../../../../../redux/features/cart/cartSlice";
import {
  decrementStock,
  incrementStock,
} from "../../../../../redux/features/donuts/donutsSlice";

import s from "./ChooseDonutQty.module.scss";

export default function ChooseDonutQty({ item, cartItem, single_donuts }) {
  const dispatch = useDispatch();
  const [stockMessage, setStockMessage] = useState("");
  const [showStockModal, setShowStockModal] = useState(false);

  const handleRemoveChosen = (donut) => {
    if (
      cartItem.donutsPromo.filter((item) => item.donutId === donut.id).length === 0
    ) {
      //si no esta en el carrito no hago nada
      return;
    }

    if (
      cartItem.donutsPromo.filter((item) => item.donutId === donut.id)[0]
        .donutQuantity === 1
    ) {
      //si queda una la elimino
      dispatch(
        removePromoChosenDonuts({ promoId: cartItem.id, chosenDonut: donut })
      );
      dispatch(incrementStock({ id: donut.id, qty: 1 }));
      return;
    }
    //sino resto cantidad
    dispatch(
      decrementPromoChosenQuantity({
        promoId: cartItem.id,
        donutId: donut.id,
      })
    );
    dispatch(incrementStock({ id: donut.id, qty: 1 }));
  };

  const handleAddChosen = (donut) => {
    const rellenas = [
      "cl40ncyij0039isuwsg8es48m",
      "cl40ncyik0041isuw2zpgilga",
      "cl40ncyik0051isuwl707iv9s",
    ];
    //chequeo stock
    const stock = single_donuts.filter((el) => el.id === donut.id)[0].stock;
    if (stock <= 0) {
      console.log("NO HAY STOCK");
      setStockMessage("NO QUEDA STOCK");
      setShowStockModal(true);
      return;
    }
    //suma de las rellenas
    const rellenasTotal = cartItem.donutsPromo
      .filter((el) => rellenas.includes(el.donutId))
      .reduce((prev, acc) => {
        return prev + acc.donutQuantity;
      }, 0);
    if (rellenasTotal < 4 * cartItem.quantity) {
      if (
        cartItem.donutsPromo.filter((el) => el.donutId === donut.id).length > 0
      ) {
        //si esta en el carrito aumento cantidad
        dispatch(
          incrementPromoChosenQuantity({
            promoId: cartItem.id,
            donutId: donut.id,
          })
        );
        dispatch(decrementStock({ id: donut.id, qty: 1 }));
        return;
      }
      //si no esta la promo la agrego
      dispatch(
        addPromoChosenDonuts({ promoId: cartItem.id, chosenDonut: donut })
      );
      dispatch(decrementStock({ id: donut.id, qty: 1 }));
    } else {
      setStockMessage("YA ELEGISTE LA CANTIDAD DE DONAS CORRESPONDIENTES!");
      setShowStockModal(true);
    }
    return;
  };

  useEffect(() => {
    const handler = () => {
      setShowStockModal(false);
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={s.modal_available}>
      {showStockModal && stockMessage && (
        <div
          className={
            stockMessage === "NO QUEDA STOCK"
              ? s.stock_modal_single
              : s.stock_modal_chosen
          }
        >
          <p className={s.no_stock}>{stockMessage}</p>
        </div>
      )}
      <div className={s.counter_container}>
        <div
          className={s.qty_arrow_icon_container}
          onClick={() => handleRemoveChosen(item)}
        >
          <FontAwesomeIcon icon={faArrowDown} className={s.qty_arrow_icon} />
        </div>
        <div
          className={s.qty_arrow_icon_container}
          onClick={() => handleAddChosen(item)}
        >
          <FontAwesomeIcon icon={faArrowUp} className={s.qty_arrow_icon} />
        </div>
        <p className={s.qty_total}>
          {cartItem.donutsPromo.filter((donut) => donut.donutId === item.id)[0]
            ? cartItem.donutsPromo.filter(
                (donut) => donut.donutId === item.id
              )[0].donutQuantity
            : 0}
        </p>
      </div>
    </div>
  );
}
