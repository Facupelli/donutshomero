import s from "./Section.module.scss";

export default function Section({children}) {
  return (
    <div className={s.container}>
      <p className={s.title}>MENÚ</p>
      {children}
    </div>
  );
}
