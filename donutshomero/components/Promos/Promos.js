import DonutPromo from "../Promos/DonutPromo/DonutPromo";
import Section from "../Section/Section";
import s from "./Promos.module.scss";

const six_donuts_promos = [
  {
    id: 1,
    fisrt_donuts: "3 azucaradas",
    second_donuts: "3 glaseadas de limon",
    third_donuts: "",
    price: "700",
  },
  {
    id: 2,
    fisrt_donuts: "3 glaseadas de limon",
    second_donuts: "3 dulce de leche",
    third_donuts: "",
    price: "750",
  },
  {
    id: 3,
    fisrt_donuts: "1 azucarada",
    second_donuts: "2 oreo",
    third_donuts: "3 chocotorta",
    price: "850",
  },
  {
    id: 4,
    fisrt_donuts: "3 glaseada de limon",
    second_donuts: "3 nutella",
    third_donuts: "",
    price: "900",
  },
];

const dozen_donuts_promos = [
  {
    id: 1,
    fisrt_donuts: "3 azucaradas",
    second_donuts: "3 glaseadas de limon",
    third_donuts: "3 chocolate rosado",
    forth_donuts: "3 chocolate negro",
    price: "1350",
  },
  {
    id: 2,
    fisrt_donuts: "4 azucaradas",
    second_donuts: "4 rellenas a eleccion",
    third_donuts: "4 orer",
    forth_donuts: "",
    price: "1500",
  },
  {
    id: 3,
    fisrt_donuts: "6 chocolate rosado",
    second_donuts: "2 oreo",
    third_donuts: "2 kit kat",
    forth_donuts: "2 glaseadas de limon",
    price: "1600",
  },
  {
    id: 4,
    fisrt_donuts: "3 nutella",
    second_donuts: "3 chocolate rosado",
    third_donuts: "3 oreo",
    forth_donuts: "3 azucaradas",
    price: "1750",
  },
  {
    id: 5,
    fisrt_donuts: "6 glaseadas de limon",
    second_donuts: "6 dulce de leche",
    third_donuts: "",
    forth_donuts: "",
    price: "1300",
  },
];

export default function Promos({promosDivRef}) {
  return (
    <Section title="PROMOCIONES">
      <div ref={promosDivRef}>
        <DonutPromo promo_type="6 DONAS" donuts={six_donuts_promos} />
        <DonutPromo promo_type="12 DONAS" donuts={dozen_donuts_promos} />
      </div>
    </Section>
  );
}
