import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import s from "./index.module.scss";

export default function Nosotros() {
  return (
    <div>
      <Head>
        <title>Nosotros</title>
      </Head>
      <Nav route="nosotros" />
      <div className={s.info}>
        <p>QUE HACEMOS</p>
        <p>
          Hacemos un gran helado, creamos buenos momentos! En el año 1998
          comienza nuestro camino con Portho Gelatto. Nuestro trabajo desde el
          comienzo se enfocó en la FELICIDAD de la gente. Si, hacemos nuestro
          mejor helado con excelentes ingredientes. Y si, nuestra pastelería y
          cafetería son maravillosas, pero todo es en nombre de poner una
          sonrisa en la cara de alguien. La SELECCIÓN es uno de nuestros
          secretos. Elegimos cuidadosamente todos los ingredientes buscando y
          trayendo los que caracterizan a cada lugar. La materia prima es el
          corazón de nuestro producto.
        </p>
        <p>MÁS QUE UNA HELADERÍA</p>
        <p>
          Contamos con varias unidades de negocio. La cafetería y pastelería se
          unen a la heladería, transformando a Portho en un lugar de encuentro.
          El salón de té en nuestros locales, y la presencia de nuestros
          productos en distintos acontecimientos sociales hacen de Portho
          Gelatto una experiencia única. Con los años Portho se ha convertido en
          un CLÁSICO sanjuanino y por sobre todo en un símbolo de CALIDAD.
        </p>
        <p>NUESTRA HISTORIA</p>
      </div>
      <Footer route="nosotros" />
    </div>
  );
}
