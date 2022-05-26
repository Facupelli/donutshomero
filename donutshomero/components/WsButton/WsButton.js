import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import s from "./WsButton.module.scss";

export default function WsButton() {
  return (
    <div className={s.ws}>
      <a href="https://wa.me/542644415016" target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          icon={faWhatsapp}
          width="60px"
          height="60px"
          // onClick={handleClickMenu}
        />
      </a>
    </div>
  );
}
