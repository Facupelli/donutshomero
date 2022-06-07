import { useState } from "react";
import AdminNav from "../../components/Admin/AdminNav/AdminNav";
import s from "./admin.module.scss";

export default function Admin() {
  const [showPanel, setShowPanel] = useState({
    pedidos: true,
    stock: false,
    users: false,
  });

  return (
    <div className={s.container}>
      <p>PANEL ADMIN</p>
      <AdminNav showPanel={showPanel} setShowPanel={setShowPanel}/>
    </div>
  );
}
