import s from "./Nav.module.scss";

export default function Nav() {
  return (
    <nav className={s.container}>
      <div>
        <div className={s.logo}>
          <p>
            <span>DONUTS</span> HOMERO
          </p>
        </div>
        <div className={s.links}>
          <p>DELIVERY</p>
          <p>MENÚ</p>
          <p>LOCALES</p>
          <p>NOSOTROS</p>
          <p>CONTACTO</p>
        </div>
      </div>
    </nav>
  );
}
