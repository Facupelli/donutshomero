import s from "./Section.module.scss";

export default function Section({children, title}) {
  return (
    <div className={s.container}>
      <p className={s.title}>{title}</p>
      {children}
    </div>
  );
}
