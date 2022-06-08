import axios from "axios";
import { supabase } from "../../lib/supabase";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

//COMPONENTS
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import DonutStockCard from "../../components/Admin/AdminStock/DonutStockCard/DonutStockCard";
import StockCounter from "../../components/Admin/AdminStock/StockCounter/StockCounter";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

import s from "./admin.module.scss";

export default function Admin() {
  const [showPanel, setShowPanel] = useState({
    pedidos: true,
    stock: false,
    users: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [donuts, setDonuts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [donutChange, setDonutChange] = useState("cl40ncyij0033isuwq1ahb129 ");

  const handleDonutChange = (e) => {
    setDonutChange(e.target.value);
  };

  const getSingleDonuts = async () => {
    const response = await axios.get(
      process.env.NODE_ENV === "production"
        ? "https://donutshomero.vercel.app/api/donuts/singledonuts"
        : "http://localhost:3000/api/donuts/singledonuts"
    );

    setDonuts(response.data);
  };

  useEffect(() => {
    getSingleDonuts();
  }, []);

  useEffect(() => {
    const stockListener = supabase
      .from("Donut")
      .on("UPDATE", (payload) => {
        console.log("Change Received!", payload.new);
        getSingleDonuts();
      })
      .subscribe();

    return () => {
      stockListener.unsubscribe();
    };
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleStockByUnit = async () => {
    const data = { cart: [{ id: donutChange, quantity }] };

    const response = await axios.put(
      process.env.NODE_ENV === "production"
        ? "https://donutshomero.vercel.app/api/stock"
        : "http://localhost:3000/api/stock",
      data
    );

    setMessage(response?.data?.message);
  };

  const onSubmit = async (data) => {
    try {
      setMessage("");
      setLoading(true);

      const mapedData = Object.keys(data).map((id) => ({
        id: [id][0],
        data: data[id],
      }));

      const response = await axios.put(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/stock/adminstock"
          : "http://localhost:3000/api/stock/adminstock",
        mapedData
      );

      setMessage(response?.data?.message);
      getSingleDonuts();
      setLoading(false);
      reset();
    } catch (e) {
      console.log({ onSubmitError: e });
      setMessage(e);
      setLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.main}>
        <AdminNav showPanel={showPanel} setShowPanel={setShowPanel} />
        {showPanel.stock && donuts.length > 0 && (
          <div className={s.cards_container}>
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s.loading_btn_container}>
                <p>STOCK EN TIEMPO REAL</p>
                <LoadingButton loading={loading} type="submit">
                  SETEAR
                </LoadingButton>
              </div>
              {donuts.map((donut) => (
                <DonutStockCard
                  key={donut.id}
                  donut={donut}
                  register={register}
                />
              ))}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// export const getStaticProps = async () => {
//   const donuts = await prisma.donut.findMany({
//     orderBy: {
//       name: "asc",
//     },
//   });

//   return {
//     props: {
//       donuts,
//     },
//   };
// };
