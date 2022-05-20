import Link from "next/link";

import s from "./Nav.module.scss";

export default function Nav({ route, menuDivRef, localDivRef }) {
  const hanldeScrollTo = (ref) => {
    ref.current.scrollIntoView({ bottom: 100, behavior: "smooth" });
  };

  return (
    <nav className={s.container}>
      <div>
        <div className={s.logo}>
          <Link href="/">
            <p>
              <span>DONUTS</span> HOMERO
            </p>
          </Link>
        </div>
        <div className={s.links}>
          <p>DELIVERY</p>
          <p onClick={() => hanldeScrollTo(menuDivRef)}>MENÚ</p>
          <p onClick={() => hanldeScrollTo(localDivRef)}>LOCALES</p>
          <Link href="/nosotros">
            <p className={route === "nosotros" ? s.active : ""}>NOSOTROS</p>
          </Link>
          <Link href="/contacto">
            <p className={route === "contacto" ? s.active : ""}>CONTACTO</p>
          </Link>
        </div>
      </div>
    </nav>
  );
}
