import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

import s from "./StockCounter.module.scss";

export default function StockCounter({ counter, setCounter }) {
  const handleIncrement = () => {
    setCounter((prev) => (prev += 1));
  };

  const handleDecrement = () => {
    if (counter === 0) {
      return;
    }
    setCounter((prev) => (prev -= 1));
  };

  return (
    <div className={s.quantity_container}>
      <div className={s.qty_arrow_icon_container} onClick={handleDecrement}>
        <FontAwesomeIcon icon={faMinus} className={s.qty_arrow_icon} />
      </div>
      <div className={s.qty_arrow_icon_container} onClick={handleIncrement}>
        <FontAwesomeIcon icon={faPlus} className={s.qty_arrow_icon} />
      </div>
      <p className={s.qty_total}>{counter}</p>
    </div>
  );
}
