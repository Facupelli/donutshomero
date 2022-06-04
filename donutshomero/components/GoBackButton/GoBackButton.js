import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./GoBackButton.module.scss";

export default function GoBackButton({ handleOnClick }) {
  return (
    <FontAwesomeIcon
      icon={faArrowLeft}
      className={s.go_back_icon}
      onClick={handleOnClick}
    />
  );
}
