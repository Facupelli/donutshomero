import Head from "next/head";
import Footer from "../../components/Footer/Footer";
import SingleDonutCard from "../../components/Menu/SingleDonutCard/SingleDonutCard";
import Nav from "../../components/Nav/Nav";
import s from "./index.module.scss";

export default function Delivery() {
  return (
    <>
      <Head>
        <title>Delivery</title>
      </Head>
      <Nav route="delivery" />
      <div className={s.container}>
        <p>Agrega los productos que quieras al carrito</p>
      </div>
      <div>
        {/* <SingleDonutCard
          key={donut.id}
          donut={donut.name}
          price={donut.price}
        /> */}
      </div>
      <Footer />
    </>
  );
}
