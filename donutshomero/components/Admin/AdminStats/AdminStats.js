import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "./Chart/Chart";

import s from "./AdminStats.module.scss";

export default function AdminStats() {
  const [donuts, setDonuts] = useState();
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("all");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  console.log(date);

  const getDonuts = async () => {
    const res = await axios.get(
      process.env.NODE_ENV === "production"
        ? `https://donutshomero.vercel.app/api/admin/orders/stats?date=${date}`
        : `http://localhost:3000/api/admin/orders/stats?date=${date}`
    );
    return res.data;
  };

  useEffect(() => {
    setLoading(true);
    getDonuts().then((res) => {
      setDonuts(res);
      setLoading(false);
    });
  }, [date]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <section className={s.container}>
      <article className={s.intro}>
        <div className={s.select_wrapper}>
          <label>mostrar estadistícas de:</label>
          <select onChange={(e) => handleDateChange(e)}>
            <option value="all">TODOS LOS TIEMPOS</option>
            <option value={new Date().toISOString().split("T")[0]}>HOY</option>
            <option value="last month">ULTIMO MES</option>
          </select>
        </div>
        <div className={s.total_earnings}>
          <p>TOTAL GANADO:</p>
          <p className={s.price}>
            {donuts &&
              new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumSignificantDigits: 12,
              }).format(donuts.totalEarnings._sum.totalPrice)}
          </p>
        </div>
      </article>

      {donuts && (
        <article className={s.donuts_article}>
          <div className={s.chart_container}>
            <p>Donas singulares en promos más vendidas:</p>
            <Chart data={donuts.withPromo} />
          </div>
          <div className={s.chart_container}>
            <p>Donas singulares más vendidas:</p>
            <Chart data={donuts.withOutPromo} />
          </div>
          <div className={s.chart_container}>
            <p>Promos más vendidas</p>
            <Chart data={donuts.promos} />
          </div>
        </article>
      )}
    </section>
  );
}
