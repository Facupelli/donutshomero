import { useSelector } from "react-redux";
import s from "./ConfirmOrder.module.scss";

export default function ConfirmOrder() {
  const cart = useSelector((state) => state.cart.items);
  const customerData = useSelector((state) => state.customerData.data);

  return (
    <div className={s.container}>
      <p>CONFRIMACIÓN DE PEDIDO</p>
      <div className={s.info}>
        <div className={s.customerData}>
          <p className={s.title}>TUS DATOS:</p>
          <p>
            <span>Nombre:</span> {customerData.fullName}
          </p>
          <p>
            <span>Celular:</span> {customerData.phone}
          </p>
          <p>
            <span>Dirección:</span> {customerData.address}
          </p>
          <p>
            <span>Número:</span> {customerData.number}
          </p>
          <p>
            <span>Ubicación:</span> {customerData.addressLink}
          </p>
          <p>
            <span>Pago:</span> {customerData.paymentMethod}
          </p>
        </div>
        
        <div className={s.donas}>
          <p className={s.title}>DONAS:</p>
          {cart.map((item) => (
            <div className={s.donuts_list} key={item.id}>
              <p>
                {item.name
                  ? item.name
                  : `Promo N° ${item.title} - ${item.donutsQuantity} Donas`}
              </p>
              <p>x{item.quantity}</p>
            </div>
          ))}
          <div className={s.total}>
            <p>
              Total: $
              {cart.reduce((prev, acc, index, array) => {
                return prev + acc.price * acc.quantity;
              }, 0)}
            </p>
          </div>
        </div>

        <div className={s.pedir_btn_container}>
          <button>PEDIR</button>
        </div>
      </div>
    </div>
  );
}
