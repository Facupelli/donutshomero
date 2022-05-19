import PromoCard from "./Card/PromoCard";
import s from "./Menu.module.scss";

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

export default function Menu() {
  return (
    <div className={s.container}>
      <p className={s.title}>MENÚ</p>

      <div>
        <p>6 DONAS</p>

        <div className={s.six_donuts_promo}>
          {six_donuts_promos.length > 0 &&
            six_donuts_promos.map((promo) => (
              <PromoCard
                key={promo.id}
                id={promo.id}
                fisrt_donuts={promo.fisrt_donuts}
                second_donuts={promo.second_donuts}
                third_donut={promo.third_donuts}
                price={promo.price}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

// por unidad

// azucarada 130
// glaseada de limon 130
// chocolate rosado 150
// chocolate negro 150
// rellena de dulce de leche 160
// rellena pastelera 150
// oreo 160
// kit kat 160
// chocotorta 150
// bon o bon 180
// rellena nutella 200

// promos de 6 donas

// promo 12 donas

// 1
// 3 azucaradas
// 3glaseadas de limon
// 3 chocoloare rosado
// 3 choicolate negro
// 1350

// 2
// 4azucaradas
// 4 rellenas a eleccion
// 4 oreo
// 1500

// 3
// 6chocolate rosado
// 2 oreo
// 2 kit kat
// 2 glaseadas de limon
// 1600

// 4
// 3 nutella
// 3 chocolate rosado
// 3 oreo
// 3 azucaradas
// 1750

// 5
// 6 glaseaas de limon
// 6 dulce de leche
// 1300
