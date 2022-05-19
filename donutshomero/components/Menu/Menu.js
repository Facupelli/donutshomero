import s from "./Menu.module.scss";
import SingleDonutCard from "./SingleDonutCard/SingleDonutCard";

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
    <div className={s.container}>
      <p className={s.title}>MENÚ</p>

      <div>
        {dontus.length > 0 &&
          dontus.map((donut) => (
            <SingleDonutCard donut={donut.name} price={donut.price} />
          ))}
      </div>
    </div>
  );
}
