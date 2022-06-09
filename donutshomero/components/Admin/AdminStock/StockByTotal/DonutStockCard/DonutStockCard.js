import SwitchButton from "../../../../SwitchButton/SwitchButton";
import s from "./DonutStockCard.module.scss";

export default function DonutStockCard({ donut, watch, register, loading }) {
  const isAvailable = watch(`${donut.id}.available`, donut.available);

  return (
    <div className={s.donut_stock_card}>
      <p className={s.donut_name}>{donut.name.toUpperCase()}</p>
      <p className={s.stock}>
        STOCK:{" "}
        <span className={donut.stock < 10 ? s.color_red : null}>
          {donut.stock}
        </span>
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
          {/* <select defaultValue={donut.available} {...register(`${donut.id}.available`)}>
            <option value={true}>SI</option>
            <option value={false}>NO</option>
          </select> */}
          <SwitchButton
            reactHookForm
            id={donut.id}
            loading={loading}
            isOn={isAvailable}
            register={register}
          />
        </div>
      </div>
    </div>
  );
}
