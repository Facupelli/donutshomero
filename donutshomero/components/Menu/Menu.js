import Section from '../Section/Section';
import SingleDonutCard from "./SingleDonutCard/SingleDonutCard";
import s from "./Menu.module.scss";

const dontus = [
  {
    id:1,
    name: "AZUCARADA",
    price: 130,
  },
  {
    id:2,
    name: "GLASEADA DE LIMÓN",
    price: 130,
  },
  {
    id:3,
    name: "CHOCOLATE ROSADO",
    price: 150,
  },
  {
    id:4,
    name: "CHOCOLATE NEGRO",
    price: 150,
  },
  {
    id:5,
    name: "RELLENA DULCE DE LECHE",
    price: 160,
  },
  {
    id:6,
    name: "RELLENA PASTELERA",
    price: 150,
  },
  {
    id:7,
    name: "OREO",
    price: 160,
  },
  {
    id:8,
    name: "KIT KAT",
    price: 160,
  },
  {
    id:9,
    name: "CHOCOTORTA",
    price: 150,
  },
  {
    id:10,
    name: "BON O BON",
    price: 180,
  },
  {
    id:11,
    name: "RELLENA NUTELLA",
    price: 200,
  },
];

export default function Menu({menuDivRef}) {
  return (
    <Section title="MENÚ" >
      <div className={s.menu} ref={menuDivRef}>
        {dontus.length > 0 &&
          dontus.map((donut) => (
            <SingleDonutCard key={donut.id} donut={donut.name} price={donut.price} />
          ))}
      </div>
    </Section>
  );
}
