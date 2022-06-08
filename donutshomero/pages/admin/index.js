import prisma from "../../lib/prisma";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import DonutStockCard from "../../components/Admin/AdminStock/DonutStockCard/DonutStockCard";
import s from "./admin.module.scss";
import LoadingButton from "../../components/LoadingButton/LoadingButton";

export default function Admin({ donuts }) {
  const [showPanel, setShowPanel] = useState({
    pedidos: true,
    stock: false,
    users: false,
  });
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (e) {
      console.log({ onSubmitError: e });
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

export const getStaticProps = async () => {
  const donuts = await prisma.donut.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return {
    props: {
      donuts,
    },
  };
};
