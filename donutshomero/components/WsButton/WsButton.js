import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import s from "./WsButton.module.scss";

export default function WsButton({ scrollY }) {
  const handleClick = () => {
    window.open("https://wa.me/542644415016", "_blank");
  };

  return (
    <div className={scrollY > 62 ? s.wsDesktop : s.ws}>
      <button aria-label="wschat" onClick={handleClick}>
        <FontAwesomeIcon
          icon={faWhatsapp}
          width="40px"
          height="40px"
          // onClick={handleClickMenu}
        />
      </button>
    </div>
  );
}
