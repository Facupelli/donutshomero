import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import DonutStockCard from "../../components/Admin/AdminStock/DonutStockCard/DonutStockCard";
import s from "./admin.module.scss";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import axios from "axios";

export default function Admin() {
  const [showPanel, setShowPanel] = useState({
    pedidos: true,
    stock: false,
    users: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [donuts, setDonuts] = useState();

  console.log(message)

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
            <div></div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={s.loading_btn_container}>
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
