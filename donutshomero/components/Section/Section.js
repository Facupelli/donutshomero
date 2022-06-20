import s from "./Section.module.scss";

export default function Section({children, title}) {
  return (
    <section className={s.container}>
      <h3 className={s.title}>{title}</h3>
      {children}
    </section>
  );
}
