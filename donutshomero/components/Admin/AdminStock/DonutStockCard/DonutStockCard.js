import s from "./DonutStockCard.module.scss";

export default function DonutStockCard({ donut, register }) {
  return (
    <div className={s.donut_stock_card}>
      <p className={s.donut_name}>{donut.name.toUpperCase()}</p>
      <p className={s.stock}>
        STOCK: <span>{donut.stock}</span>
      </p>
      <div className={s.form}>
        <label htmlFor="new-stock">
          Nuevo Stock <span>(total)</span>:
        </label>
        <input
          id="new-stock"
          type="text"
          {...register(`${donut.id}.newStock`)}
        />
        <div className={s.available}>
          <p>Disponible:</p>
          <select {...register(`${donut.id}.available`)}>
            <option value={true}>SI</option>
            <option value={false}>NO</option>
          </select>
        </div>
      </div>
    </div>
  );
}
