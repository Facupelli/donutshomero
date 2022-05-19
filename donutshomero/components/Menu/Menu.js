import Section from '../Section/Section';
import SingleDonutCard from "./SingleDonutCard/SingleDonutCard";
import s from "./Menu.module.scss";

const dontus = [
  {
    name: "AZUCARADA",
    price: 130,
  },
  {
    name: "GLASEADA DE LIMON",
    price: 130,
  },
  {
    name: "CHOCOLATE ROSADO",
    price: 150,
  },
  {
    name: "CHOCOLATE NEGRO",
    price: 150,
  },
  {
    name: "RELLENA DULCE DE LECHE",
    price: 160,
  },
  {
    name: "RELLENA PASTELERA",
    price: 150,
  },
  {
    name: "OREO",
    price: 160,
  },
  {
    name: "KIT KAT",
    price: 160,
  },
  {
    name: "CHOCOTORTA",
    price: 150,
  },
  {
    name: "BON O BON",
    price: 180,
  },
  {
    name: "RELLENA NUTELLA",
    price: 200,
  },
];

export default function Menu() {
  return (
    <Section title="MENÚ">
      <div className={s.menu}>
        {dontus.length > 0 &&
          dontus.map((donut) => (
            <SingleDonutCard donut={donut.name} price={donut.price} />
          ))}
      </div>
    </Section>
  );
}
