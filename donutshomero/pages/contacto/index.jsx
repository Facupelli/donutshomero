import Head from "next/head";
import Nav from "../../components/Nav/Nav";
import s from "./index.module.scss";

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contacto</title>
      </Head>
      <Nav route="contacto" />
      <div className={s.info}>
        <p>DEJANOS TU MENSAJE</p>
        <p>SEGUINOS EN LAS REDES</p>
      </div>
    </div>
  );
}
