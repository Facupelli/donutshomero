import OrderCard from "./OrderCard/OrderCard";
import { RaceBy } from "@uiball/loaders";

import s from "./AdminOrders.module.scss";

export default function AdminOrders({
  orders = [],
  totalOrders,
  handleClickNext,
  handleClickPrev,
  handleChangeTake,
  handleChangeDate,
  skip,
  take,
  loadingPage,
}) {
  if (loadingPage) {
    return (
      <div className={s.loader_container}>
        <RaceBy
          size={1200}
          lineWeight={1}
          speed={3}
          color="#0081bc"
          className={s.loader}
        />
      </div>
    );
  }

  return (
    <div>
      <div className={s.take_container}>
        <label htmlFor="take">MOSTRAR:</label>
        <select id="take" onChange={(e) => handleChangeTake(e)}>
          <option value={15}>15</option>
          <option value={20}>20</option>
          <option value={25}>25</option>
          <option value={30}>30</option>
        </select>
        <label htmlFor="date">FECHA:</label>
        <select id="date" onChange={(e) => handleChangeDate(e)}>
          <option value="all">Todas</option>
          <option value={new Date().toISOString().split("T")[0]}>Hoy</option>
        </select>
      </div>
      <div className={s.table_titles_container}>
        <p>ID</p>
        <div className={s.table_titles}>
          <p>PRECIO TOTAL</p>
          <p>DIRECCIÓN</p>
          <p>LINK</p>
          <p>PAGO</p>
          <p>ESTADO DEL PAGO</p>
          <p>ESTADO DE ENTREGA</p>
          <p>CELULAR</p>
        </div>
      </div>
      {orders.length > 0 &&
        orders.map((order) => <OrderCard key={order.id} order={order} />)}
      {orders.length > 0 && (
        <div className={s.pagination_container}>
          <button
            disabled={skip === 0 ? true : false}
            className={s.prev_btn}
            onClick={handleClickPrev}
          >
            ANTERIOR
          </button>
          <button
            disabled={skip + take >= totalOrders ? true : false}
            className={s.next_btn}
            onClick={handleClickNext}
          >
            SIGUIENTE
          </button>
        </div>
      )}
    </div>
  );
}
