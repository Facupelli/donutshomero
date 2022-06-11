import DonutPromo from "../Promos/DonutPromo/DonutPromo";
import Section from "../Section/Section";

export default function Promos({ promosDivRef, donuts }) {
  const promoDonuts = JSON.parse(donuts);

  const six_donuts_promos = promoDonuts.filter(
    (promo) => promo.donutsQuantity === 6
  );
  const dozen_donuts_promos = promoDonuts.filter(
    (promo) => promo.donutsQuantity === 12
  );

  return (
    <Section title="PROMOCIONES">
      <div ref={promosDivRef}>
        <DonutPromo promo_type="6 DONAS" donuts={six_donuts_promos} />
        <DonutPromo promo_type="12 DONAS" donuts={dozen_donuts_promos} />
      </div>
    </Section>
  );
}
