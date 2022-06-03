import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import s from "./Quantity.module.scss";

export default function Quantity() {
  return (
    <div className={s.quantity}>
      <FontAwesomeIcon icon={faArrowUp} className={s.qty_arrow_icon} />
      <FontAwesomeIcon icon={faArrowDown} className={s.qty_arrow_icon} />
      <input type="text" />
    </div>
  );
}
