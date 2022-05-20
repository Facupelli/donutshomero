import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import s from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div>
        <div className={s.grid}>
          <div>
            <p className={s.title}>PRODUCTOS</p>
            <p>Donas</p>
            <p className={s.title}>PROMOCIONES</p>
            <p>Promociones</p>
          </div>

          <div>
            <p className={s.title}>SOBRE NOSOTROS</p>
            <p>Nuestras donas</p>
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
                <FontAwesomeIcon icon={faFacebook} width="25px" />
              </p>
              <p>
                <FontAwesomeIcon icon={faInstagram} width="25px" />
              </p>
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
            >
              Facundo Pellicer
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
