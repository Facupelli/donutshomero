import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import s from "./ConfirmOrder.module.scss";

const FORM_ID = "payment-form";

export default function ConfirmOrder() {
  const cart = useSelector((state) => state.cart.items);
  const customerData = useSelector((state) => state.customerData.data);

  //MERCADO PAGO BUTTON GENERATOR
  // const [preferenceId, setPreferenceId] = useState();

  // useEffect(() => {
  //   if (preferenceId) {
  //     const script = document.createElement("script");
  //     script.type = "text/javascript";
  //     script.src =
  //       "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
  //     script.setAttribute("data-preference-id", preferenceId);
  //     const form = document.getElementById(FORM_ID);
  //     form.appendChild(script);
  //   }
  // }, [preferenceId]);

  //---------------------------

  const totalPrice = cart.reduce((prev, acc, index, array) => {
    return prev + acc.price * acc.quantity;
  }, 0);

  const handleClickPedir = async () => {
    const data = {
      customerData,
      cart,
    };

    const res = await axios.post(
      process.env.NODE_ENV === "production"
        ? "https://donutshomero.vercel.app/api/checkout"
        : "http://localhost:3000/api/checkout",
      data
    );

    const { id, init_point } = res.data;
    // setPreferenceId(id);
    window.open(init_point, "_blank");
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
                {item.donutsQuantity
                  ? `Promo N° ${item.name} - ${item.donutsQuantity} Donas`
                  : item.name}
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
      {/* <form id={FORM_ID} method="GET" /> */}
    </div>
  );
}
