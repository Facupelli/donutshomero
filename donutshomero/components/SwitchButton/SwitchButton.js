import s from "./SwitchButton.module.scss";

export default function SwitchButton({ id, loading ,isOn, handleToggle }) {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={s.react_switch_checkbox}
        id={id}
        type="checkbox"
        disabled={loading ? true : false}
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className={s.react_switch_label}
        htmlFor={id}
      >
        <span className={s.react_switch_button} />
      </label>
    </>
  );
}
