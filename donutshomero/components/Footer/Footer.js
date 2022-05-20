import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import s from "./Footer.module.scss";
import Link from "next/link";

export default function Footer({ menuDivRef, promosDivRef }) {
  const hanldeScrollTo = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className={s.footer}>
      <div>
        <div className={s.grid}>
          <div className={s.first_column}>
            <div>
              <p className={s.title}>PRODUCTOS</p>
              <p onClick={() => hanldeScrollTo(menuDivRef)}>Donas</p>
            </div>
            <div>
              <p className={s.title}>PROMOCIONES</p>
              <p onClick={() => hanldeScrollTo(promosDivRef)}>Promociones</p>
            </div>
            <div>
              <p className={s.title}>EVENTOS</p>
              <p>Festeja con Donuts Homero</p>
            </div>
          </div>

          <div>
            <p className={s.title}>SOBRE NOSOTROS</p>
            <Link href="/nosotros">
              <p>Nuestras donas</p>
            </Link>
          </div>

          <div>
            <p className={s.title}>FORMAS DE PAGO</p>
            <p>Mercado Pago</p>
            <p>Efectivo</p>
          </div>

          <div>
            <p className={s.title}>SIGUENOS EN</p>
            <div className={s.networks}>
              <p>
                <FontAwesomeIcon icon={faFacebook} width="25px"  />
              </p>
              <a
                href="https://www.instagram.com/donuts_homero/"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} width="25px" />
              </a>
              <p>
                <FontAwesomeIcon icon={faTwitter} width="25px" />
              </p>
            </div>
          </div>
        </div>
        <div className={s.facupelli}>
          <p>
            made with <FontAwesomeIcon icon={faHeart} width="15px" /> by{" "}
            <a
              href="https://www.linkedin.com/in/facundopellicer/"
              target="_blank"
              rel="noreferrer"
            >
              Facundo Pellicer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
