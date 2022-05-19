import s from "./Menu.module.scss";

export default function Menu() {
  return (
    <div className={s.container}>
      <p className={s.title}>MENÚ</p>

      <div>
        <p>6 DONAS</p>

        <div className={s.promo}>
          <p>3 azucaradas</p>
          <p>3 glaseadas de limon </p>
          <p>$700</p>
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

// 1
// 3 azucaradas
// 3 glaseadas de limon
// 700

// 2
// 3glaseadas de limon
// 3 dulce de leche
// 750

// 3
// 1 azucaradas
// 2 oreo
// 3 chocotorta
// 850

// 4
// 3 glaseada de limon
// 3 nutella
// 900

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
