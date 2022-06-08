import axios from "axios";
import { useState } from "react";
import LoadingButton from "../../../LoadingButton/LoadingButton";
import StockCounter from "./StockCounter/StockCounter";
import s from "./StockByUnit.module.scss";

export default function StockByUnit({ donuts }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [quantity, setQuantity] = useState(0);
  const [donutChange, setDonutChange] = useState("cl40ncyij0033isuwq1ahb129");

  const handleDonutChange = (e) => {
    setDonutChange(e.target.value);
  };

  const handleStockByUnit = async () => {
    try {
      setLoading(true);
      const data = { cart: [{ id: donutChange, quantity }] };

      console.log(data)
      const response = await axios.put(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/stock"
          : "http://localhost:3000/api/stock",
        data
      );

      setQuantity(0)
      setMessage(response?.data?.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className={s.stock_by_unit}>
      <div className={s.loading_btn_container}>
        <p>STOCK POR UNIDAD</p>
        <LoadingButton
          loading={loading}
          type="button"
          handleClick={handleStockByUnit}
        >
          SETEAR
        </LoadingButton>
      </div>
      <select onChange={handleDonutChange}>
        {donuts.map((donut) => (
          <option key={donut.id} value={donut.id}>
            {donut.name}
          </option>
        ))}
      </select>
      <StockCounter counter={quantity} setCounter={setQuantity} />
    </div>
  );
}
