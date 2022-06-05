import DonutPromo from "../Promos/DonutPromo/DonutPromo";
import Section from "../Section/Section";

// const six_donuts_promos = [
//   {
//     name: 1,
//     donuts: ["3 azucaradas", "3 glaseadas de limón"],
//     price: "700",
//   },
//   {
//     name: 2,
//     donuts: ["3 glaseadas de limón", "3 dulce de leche"],
//     price: "750",
//   },
//   {
//     name: 3,
//     donuts: ["1 azucarada", "2 oreo", "3 chocotorta"],
//     price: "850",
//   },
//   {
//     name: 4,
//     donuts: ["3 glaseadas de limón", "3 nutella"],
//     price: "900",
//   },
// ];

// const dozen_donuts_promos = [
//   {
//     name: 1,
//     donuts: [
//       "3 azucaradas",
//       "3 glaseadas de limón",
//       "3 chocolate rosado",
//       "3 chocolate negro",
//     ],
//     price: "1350",
//   },
//   {
//     name: 2,
//     donuts: ["4 azucaradas", "4 rellenas a elección", "4 oreo"],
//     price: "1500",
//   },
//   {
//     name: 3,
//     donuts: [
//       "6 chocolate rosado",
//       "2 oreo",
//       "2 kit kat",
//       "2 glaseadas de limón",
//     ],
//     price: "1600",
//   },
//   {
//     name: 4,
//     donuts: ["3 nutella", "3 chocolate rosado", "3 oreo", "3 azucaradas"],
//     price: "1750",
//   },
//   {
//     name: 5,
//     donuts: ["6 glaseadas de limón", "6 dulce de leche"],
//     price: "1300",
//   },
// ];

export default function Promos({ promosDivRef, donuts }) {

  const promoDonuts = JSON.parse(donuts);

  const six_donuts_promos = promoDonuts.filter(promo => promo.donutsQuantity === 6)
  const dozen_donuts_promos = promoDonuts.filter(promo => promo.donutsQuantity === 12)


  return (
    <Section title="PROMOCIONES">
      <div ref={promosDivRef}>
        <DonutPromo promo_type="6 DONAS" donuts={six_donuts_promos} />
        <DonutPromo promo_type="12 DONAS" donuts={dozen_donuts_promos} />
      </div>
    </Section>
  );
}
