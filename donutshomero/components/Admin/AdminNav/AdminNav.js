import s from "./AdminNav.module.scss";

export default function AdminNav({ showPanel, setShowPanel }) {
  return (
    <nav className={s.nav}>
      <ul>
        <li
          className={showPanel.orders ? s.active : null}
          onClick={() =>
            setShowPanel({
              orders: true,
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
              orders: false,
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
              orders: false,
              stock: false,
              users: true,
            })
          }
        >
          USERS
        </li>
      </ul>
    </nav>
  );
}
