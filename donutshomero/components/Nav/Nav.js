import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";

import s from "./Nav.module.scss";

export default function Nav({ route, menuDivRef, localDivRef }) {
  const router = useRouter();
  const admin = useSelector((state) => state.admin.data);

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
    <nav className={route === 'admin' ? s.nav_admin : s.nav}>
      <div>
        <div className={s.logo}>
          <Link href="/">
            <p>
              <span>DONUTS</span> HOMERO
            </p>
          </Link>
        </div>
        <div className={s.ws}>
          <a href="https://wa.me/542644415016" target="_blank" rel="noreferrer">
            <div>
              <FontAwesomeIcon icon={faWhatsapp} width="20px" height="20px" />
            </div>
            <div>
              <p>pedi aquí </p>
              <p>Whatsapp</p>
            </div>
          </a>
        </div>
        <input type="checkbox" name="click" className={s.click} id="click" />
        <label htmlFor="click" className={s.icon_container}>
          <FontAwesomeIcon
            icon={faBars}
            width="25px"
            onClick={handleClickMenu}
          />
        </label>
        {admin.accessToken ? (
          <ul className={s.links}>
            <Link href="/admin">
              <li className={s.admin_link}>
                <FontAwesomeIcon icon={faUserTie} className={s.admin_icon} />
                ADMIN
              </li>
            </Link>
          </ul>
        ) : (
          <ul className={s.links}>
            <Link href="/delivery">
              <li>
                DELIVERY
                <ul className={s.proximamente}>
                  <li>PROXIMAMENTE</li>
                </ul>
              </li>
            </Link>
            <li onClick={() => hanldeScrollTo(menuDivRef)}> MENÚ</li>
            <li onClick={() => hanldeScrollTo(localDivRef)}>LOCALES</li>
            <Link href="/nosotros">
              <li className={route === "nosotros" ? s.active : ""}>NOSOTROS</li>
            </Link>
            <Link href="/contacto">
              <li className={route === "contacto" ? s.active : ""}>CONTACTO</li>
            </Link>
            <Link href="/carrito">
              <li>
                <FontAwesomeIcon icon={faCartShopping} width="20px" />
              </li>
            </Link>
          </ul>
        )}
      </div>
    </nav>
  );
  s;
}
