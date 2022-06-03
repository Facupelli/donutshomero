import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../../redux/features/cart/cartSlice";

import s from "./Quantity.module.scss";

export default function Quantity({ quantity, id }) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      return;
    }
    dispatch(decrementQuantity(id));
  };

  return (
    <div className={s.quantity}>
      <FontAwesomeIcon
        icon={faArrowDown}
        className={s.qty_arrow_icon}
        onClick={handleDecrement}
      />
      <FontAwesomeIcon
        icon={faArrowUp}
        className={s.qty_arrow_icon}
        onClick={handleIncrement}
      />
      <p>{quantity}</p>
    </div>
  );
}
