import Nav from "../../components/Nav/Nav";
import s from "./index.module.scss";

export default function Contact() {
  return (
    <div>
      <Nav route="contacto" />
      <div className={s.info}>
        <p>DEJANOS TU MENSAJE</p>
        <p>SEGUINOS EN LAS REDES</p>
      </div>
    </div>
  );
}
