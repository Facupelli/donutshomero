import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../../redux/features/cart/cartSlice";
import {
  decrementStock,
  incrementStock,
} from "../../../redux/features/donuts/donutsSlice";
import { handlePromoStock } from "../../../utils/handlePromoStock";

import s from "./Quantity.module.scss";

export default function Quantity({ quantity, id, promo, setStockMessage,setShowStockModal }) {
  const dispatch = useDispatch();
  const single_donuts = useSelector((state) => state.donuts.single_donuts);
  const cart = useSelector((state) => state.cart.items);

  const handleIncrement = () => {
    if (!!promo) {
      //si es una promo
      const donutPromo = cart.filter((item) => item.id === id)[0];

      const qty = donutPromo.donutsPromo.map((promo) => ({
        id: promo.donutId,
        qty: promo.donutQuantity,
      }));

      if (!handlePromoStock(qty, single_donuts, setStockMessage)) {
        setShowStockModal(true)
        return;
      }

      dispatch(incrementQuantity(id));
      qty.map((el) => dispatch(decrementStock(el)));
    } else {
      //si es una single
      const stock = single_donuts.filter((donut) => donut.id === id)[0].stock;
      if (stock <= 0) {
        console.log("NO HAY STOCK");
        setStockMessage("NO HAY MÁS STOCK :(");
        setShowStockModal(true)
        return;
      }
      dispatch(incrementQuantity(id));
      dispatch(decrementStock({ id, qty: 1 }));
    }
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      return;
    }
    if (!!promo) {
      const donutPromo = cart.filter((item) => item.id === id)[0];

      const qty = donutPromo.donutsPromo.map((promo) => ({
        id: promo.donutId,
        qty: promo.donutQuantity,
      }));

      dispatch(decrementQuantity(id));
      qty.map((el) => dispatch(incrementStock(el)));
    } else {
      dispatch(decrementQuantity(id));
      dispatch(incrementStock({ id, qty: 1 }));
    }
  };

  return (
    <div className={s.quantity}>
      <div className={s.qty_arrow_icon_container} onClick={handleDecrement}>
        <FontAwesomeIcon icon={faArrowDown} className={s.qty_arrow_icon} />
      </div>
      <div className={s.qty_arrow_icon_container} onClick={handleIncrement}>
        <FontAwesomeIcon icon={faArrowUp} className={s.qty_arrow_icon} />
      </div>
      <p className={s.qty_total}>{quantity}</p>
    </div>
  );
}
