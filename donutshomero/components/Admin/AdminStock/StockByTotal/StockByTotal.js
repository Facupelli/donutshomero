import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import LoadingButton from "../../../LoadingButton/LoadingButton";
import DonutStockCard from "./DonutStockCard/DonutStockCard";
import s from "./StockByTotal.module.scss";

export default function StockByTotal({ donuts }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setMessage("");
      setLoading(true);

      const mapedData = Object.keys(data).map((id) => ({
        id: [id][0],
        data: data[id],
      }));

      console.log(mapedData)

      const response = await axios.put(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/admin/stock/adminstock"
          : "http://localhost:3000/api/admin/stock/adminstock",
        mapedData
      );

      reset();
      setMessage(response?.data?.message);
      setLoading(false);
    } catch (e) {
      console.log({ onSubmitError: e });
      setMessage(e);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.loading_btn_container}>
        <p>STOCK EN TIEMPO REAL</p>
        <LoadingButton loading={loading} type="submit">
          SETEAR
        </LoadingButton>
      </div>
      {donuts.map((donut) => (
        <DonutStockCard key={donut.id} donut={donut} register={register} />
      ))}
    </form>
  );
}
