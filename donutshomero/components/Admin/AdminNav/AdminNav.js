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
              stats: false,
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
              stats: false,
            })
          }
        >
          STOCK
        </li>
        <li
          className={showPanel.stats ? s.active : null}
          onClick={() =>
            setShowPanel({
              orders: false,
              stock: false,
              stats: true,
            })
          }
        >
          STATS
        </li>
      </ul>
    </nav>
  );
}
