import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

import s from "./ConfirmOrder.module.scss";
import GoBackButton from "../GoBackButton/GoBackButton";
import LoadingButton from "../LoadingButton/LoadingButton";

// const FORM_ID = "payment-form";

export default function ConfirmOrder({ setConfirmOrder, setShowCustomerForm }) {
  const router = useRouter();

  const cart = useSelector((state) => state.cart.items);
  const single_donuts = useSelector((state) => state.donuts.single_donuts);
  const customerData = useSelector((state) => state.customerData.data);

  const [loading, setLoading] = useState(false);

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

  const handleGoBack = () => {
    setConfirmOrder(false);
    setShowCustomerForm(true);
  };

  const handleClickPedir = async () => {
    setLoading(true);

    try {
      const updateStock = async () => {
        const cartIds = cart.map((item) => item.id);
        const newCart = single_donuts.filter((donut) =>
          cartIds.includes(donut.id)
        );
        const data = {
          cart: newCart,
        };
        await axios.put(
          process.env.NODE_ENV === "production"
            ? "https://donutshomero.vercel.app/api/checkout"
            : "http://localhost:3000/api/stock",
          data
        );
      };

      updateStock();
    } catch (err) {
      console.log("unable to update stock:", err);
    }

    try {
      const data = {
        customerData,
        cart,
        totalPrice,
      };

      const res = await axios.post(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/checkout"
          : "http://localhost:3000/api/checkout",
        data
      );

      setLoading(false);

      const { id, init_point } = res.data;
      console.log(init_point);
      // setPreferenceId(id);
      window.open(init_point, "_blank");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className={s.container}>
      <GoBackButton handleOnClick={handleGoBack} />
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
          <LoadingButton
            loading={loading}
            text="PEDIR"
            handleClick={handleClickPedir}
            type="button"
          />
        </div>
      </div>
      {/* <form id={FORM_ID} method="GET" /> */}
    </div>
  );
}
