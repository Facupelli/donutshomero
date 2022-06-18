import s from "./ErrorModal.module.scss";

export default function ErrorModal({ errorMessage, setShowErrorModal }) {
  return (
    <div className={s.modal_container}>
      <p className={s.title}>LO SENTIMOS, HUBO UN ERROR</p>
      <div>
        <p>{errorMessage && errorMessage}</p>
        <p>Por favor vuelve a intentarlo más tarde o comunícate por whatsapp</p>
        <div className={s.btn_container}>
          <button type="button" onClick={() => setShowErrorModal(false)}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
