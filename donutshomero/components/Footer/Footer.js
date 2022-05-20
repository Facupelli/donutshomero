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
            <p>Face</p>
            <p>Insta</p>
            <p>Twitter</p>
          </div>
        </div>
        <div className={s.facupelli}>
          <p>made with Love by <a href="https://www.linkedin.com/in/facundopellicer/" target="_blank">Facundo Pellicer</a></p>
        </div>
      </div>
    </footer>
  );
}
