import axios from "axios";
import { supabase } from "../../lib/supabase";
import { useEffect, useState } from "react";
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import StockByTotal from "../../components/Admin/AdminStock/StockByTotal/StockByTotal";
import StockByUnit from "../../components/Admin/AdminStock/StockByUnit/StockByUnit";
import Nav from '../../components/Nav/Nav'

import s from "./admin.module.scss";

export default function Admin() {
  const [showPanel, setShowPanel] = useState({
    pedidos: true,
    stock: false,
    users: false,
  });

  const [donuts, setDonuts] = useState([]);

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

  return (
    <div className={s.container}>
      <Nav route="admin"/>
      <div className={s.main}>
        <AdminNav showPanel={showPanel} setShowPanel={setShowPanel} />
        {showPanel.stock && donuts.length > 0 && (
          <div className={s.cards_container}>
            <StockByUnit donuts={donuts} />
            <StockByTotal donuts={donuts} />
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
