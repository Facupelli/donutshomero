import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp, faInstagram } from "@fortawesome/free-brands-svg-icons";

import s from "./index.module.scss";

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contacto</title>
      </Head>
      <Nav route="contacto" />
      <div className={s.info}>
        <div className={s.message}>
          <p className={s.title}>DEJANOS TU MENSAJE</p>
          <span>+54 264-4415016</span>
          <div>
            <a>
              <FontAwesomeIcon icon={faPhone} width="45px" />
            </a>
            <a
              href="https://wa.me/542644415016"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faWhatsapp} width="50px" />
            </a>
          </div>
        </div>
        <div className={s.networks}>
          <p className={s.title}>SEGUINOS EN LAS REDES</p>
          <a
            href="https://www.instagram.com/donuts_homero/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              width="50px"
              style={{ marginLeft: "2rem" }}
            />
          </a>
        </div>
      </div>
      <Footer route="contacto" />
    </div>
  );
}
