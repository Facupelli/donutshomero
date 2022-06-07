import { useState } from "react";
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
      <nav className={s.nav}>
        <ul>
          <li
            className={showPanel.pedidos ? s.active : null}
            onClick={() =>
              setShowPanel({
                pedidos: true,
                stock: false,
                users: false,
              })
            }
          >
            PEDIDOS
          </li>
          <li
            className={showPanel.stock ? s.active : null}
            onClick={() =>
              setShowPanel({
                pedidos: false,
                stock: true,
                users: false,
              })
            }
          >
            STOCK
          </li>
          <li
            className={showPanel.users ? s.active : null}
            onClick={() =>
              setShowPanel({
                pedidos: false,
                stock: false,
                users: true,
              })
            }
          >
            USERS
          </li>
        </ul>
      </nav>
    </div>
  );
}
