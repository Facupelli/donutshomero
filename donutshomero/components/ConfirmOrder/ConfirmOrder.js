import axios from "axios";
import { useSelector } from "react-redux";
import s from "./ConfirmOrder.module.scss";

export default function ConfirmOrder() {
  const cart = useSelector((state) => state.cart.items);
  const customerData = useSelector((state) => state.customerData.data);

  const totalPrice = cart.reduce((prev, acc, index, array) => {
    return prev + acc.price * acc.quantity;
  }, 0);


  const handleClickPedir = async () => {
    await axios.post("http://localhost:3000/api/checkout", cart);
  };

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
              Total:{" "}
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumSignificantDigits: 12,
              }).format(totalPrice)}
            </p>
          </div>
        </div>

        <div className={s.pedir_btn_container}>
          <button onClick={handleClickPedir}>PEDIR</button>
        </div>
      </div>
    </div>
  );
}
