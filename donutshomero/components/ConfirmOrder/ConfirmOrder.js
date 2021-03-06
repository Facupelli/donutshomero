import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { updateDbStock } from "../../utils/updateDbStock";
import { cleanCart } from "../../redux/features/cart/cartSlice";

//COMPONENTS
import GoBackButton from "../GoBackButton/GoBackButton";
import LoadingButton from "../LoadingButton/LoadingButton";
import OrderModal from "../OrderModal/OrderModal";

import s from "./ConfirmOrder.module.scss";
import ErrorModal from "../ErrorModal/ErrorModal";

const FORM_ID = "payment-form";

export default function ConfirmOrder({ setConfirmOrder, setShowCustomerForm }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.items);
  const customerData = useSelector((state) => state.customerData.data);

  const [loading, setLoading] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //MERCADO PAGO BUTTON GENERATOR
  const [preferenceId, setPreferenceId] = useState();

  useEffect(() => {
    if (preferenceId) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
      script.setAttribute("data-preference-id", preferenceId);
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);

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
    const cartIds = updateDbStock(cart);

    //update stock
    try {
      const data = {
        cart: cartIds,
        action: "decrement",
      };

      await axios.put(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/stock"
          : "http://localhost:3000/api/stock",
        data
      );
    } catch (err) {
      console.log("unable to update stock:", err);
      setErrorMessage("Hubo un error con nuestra DB. /dbstock.");
      setShowErrorModal(true);
      setLoading(false);
      return;
    }

    //generar order y boton de pago
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

      if (customerData.paymentMethod === "efectivo") {
        console.log(res.data);
        setShowOrderModal(true);
        return;
      }

      const { id, init_point } = res.data;
      console.log(id, init_point);
      setPreferenceId(id);
      // window.open(init_point, "_blank");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setErrorMessage("Hubo un error creando la orden. /checkout.");
      setShowErrorModal(true);

      //restore stock cause order was not completed
      const data = {
        cart: cartIds,
        action: "increment",
      };

      await axios.put(
        process.env.NODE_ENV === "production"
          ? "https://donutshomero.vercel.app/api/stock"
          : "http://localhost:3000/api/stock",
        data
      );
    }
  };

  const handleClickModal = () => {
    router.push("/");
    setShowOrderModal(false);
    dispatch(cleanCart());
  };

  return (
    <>
      {showErrorModal && (
        <ErrorModal
          errorMessage={errorMessage}
          setShowErrorModal={setShowErrorModal}
        />
      )}
      {showOrderModal && <OrderModal handleClick={handleClickModal} />}
      <div className={s.container}>
        <GoBackButton handleOnClick={handleGoBack} />
        <p>CONFRIMACI??N DE PEDIDO</p>
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
              <span>Direcci??n:</span> {customerData.address}
            </p>
            <p>
              <span>N??mero:</span> {customerData.number}
            </p>
            <p>
              <span>Ubicaci??n:</span> {customerData.addressLink}
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
                    ? `Promo N?? ${item.name} - ${item.donutsQuantity} Donas`
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
            {preferenceId ? (
              <form id={FORM_ID} method="GET" />
            ) : (
              <LoadingButton
                loading={loading}
                handleClick={handleClickPedir}
                type="button"
              >
                {customerData.paymentMethod === "mercadopago"
                  ? "CONFIRMAR"
                  : "PEDIR"}
              </LoadingButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
