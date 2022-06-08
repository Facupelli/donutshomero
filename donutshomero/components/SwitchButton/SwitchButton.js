import s from "./SwitchButton.module.scss";

export default function SwitchButton({ isOn, handleToggle }) {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className={s.react_switch_checkbox}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ background: isOn && "#06D6A0" }}
        className={s.react_switch_label}
        htmlFor={`react-switch-new`}
      >
        <span className={s.react_switch_button} />
      </label>
    </>
  );
}
