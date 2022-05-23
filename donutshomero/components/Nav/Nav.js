import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

import s from "./Nav.module.scss";
import { useState } from "react";

export default function Nav({ route, menuDivRef, localDivRef }) {
  const router = useRouter();

  const hanldeScrollTo = (ref) => {
    if (route === "nosotros" || route === "contacto") {
      router.push("/");
    } else {
      ref.current.scrollIntoView({ bottom: 100, behavior: "smooth" });
    }
  };

  const [showPhoneNav, setShowPhoneNav] = useState(false);

  const handleClickMenu = () => {
    setShowPhoneNav(!showPhoneNav);
  };

  return (
    <nav className={s.nav}>
      <div>
        <div className={s.logo}>
          <Link href="/">
            <p>
              <span>DONUTS</span> HOMERO
            </p>
          </Link>
        </div>
        <input type="checkbox" name="click" className={s.click} id="click" />
        <label htmlFor="click" className={s.icon_container}>
          <FontAwesomeIcon
            icon={faBars}
            width="25px"
            onClick={handleClickMenu}
          />
        </label>
        <ul className={s.links}>
          <li>
            DELIVERY
            <ul className={s.proximamente}>
              <li>PROXIMAMENTE</li>
            </ul>
          </li>
          <li onClick={() => hanldeScrollTo(menuDivRef)}> MENÚ</li>
          <li onClick={() => hanldeScrollTo(localDivRef)}>LOCALES</li>
          <Link href="/nosotros">
            <li className={route === "nosotros" ? s.active : ""}>NOSOTROS</li>
          </Link>
          <Link href="/contacto">
            <li className={route === "contacto" ? s.active : ""}>CONTACTO</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
  s;
}
