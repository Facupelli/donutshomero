import s from "./OrderModal.module.scss";

export default function OrderModal({ handleClick }) {
  return (
    <div className={s.modal_container}>
      <p className={s.title}>PEDIDO REALIZADO</p>
      <div>
        <p>Estamos preparando su pedido.</p>
        <p>Será enviado en los proximos minutos.</p>
        <p>Gracias!</p>
        <div className={s.btn_container}>
          <button type="button" onClick={handleClick}>
            TERMINADO
          </button>
        </div>
      </div>
    </div>
  );
}
