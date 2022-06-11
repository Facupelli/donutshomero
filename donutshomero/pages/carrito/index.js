import { useSelector } from "react-redux";
import { useState } from "react";

//COMPONENTS
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import CartItemCard from "../../components/CartItem/CartItemCard/CartItemCard";
import ConfirmOrder from "../../components/ConfirmOrder/ConfirmOrder";
import PurchaseForm from "../../components/PurchaseForm/PurchaseForm";

import s from "./index.module.scss";

export default function Carrito() {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [chooseMessage, setChooseMessage] = useState("");

  console.log(chooseMessage);

  const cart = useSelector((state) => state.cart.items);
  const orderedCart = [...cart].sort((a, b) => a.price - b.price);

  const totalPrice = cart.reduce((prev, acc, index, array) => {
    return prev + acc.price * acc.quantity;
  }, 0);

  const handleClickPagar = () => {
    const rellenas = [
      "cl40ncyij0039isuwsg8es48m",
      "cl40ncyik0041isuw2zpgilga",
      "cl40ncyik0051isuwl707iv9s",
    ];

    const promoChoose = cart.filter(
      (item) => item.id === "cl41rwcbi0205gcuwzxa71511"
    )[0];
    if (promoChoose) {
      const sumRellenasToal = (cartItem) => {
        const sum = cartItem.donutsPromo
          .filter((el) => rellenas.includes(el.donutId))
          .reduce((prev, acc) => {
            return prev + acc.donutQuantity;
          }, 0);
        return sum;
      };

      const rellenasTotal = sumRellenasToal(promoChoose);
      if (rellenasTotal < 4 * promoChoose.quantity) {
        setChooseMessage("TE FALTA ELEGIR TUS DONAS!");
        return;
      }
    }
    if (cart.length > 0) {
      setShowCustomerForm(true);
    }
  };

  // console.log("cart", orderedCart);

  return (
    <div className={s.container}>
      <Nav route="carrito" />
      {!showCustomerForm && !confirmOrder && (
        <div className={s.main}>
          <div className={s.titles}>
            <p>CARRITO</p>
            <p className={s.total_title}>TOTAL</p>
          </div>
          {cart.length > 0 &&
            orderedCart.map((cartItem) => (
              <CartItemCard key={cartItem.id} cartItem={cartItem} />
            ))}
          {cart.length <= 0 && (
            <p className={s.cart_empty}>
              Agregue productos a su carrito en Delivery!
            </p>
          )}
          <div className={s.total_container}>
            <p>TOTAL A PAGAR:</p>
            <p className={s.total}>
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumSignificantDigits: 12,
              }).format(totalPrice)}
            </p>
            <div className={s.pagar_btn_container_pc}>
              <button onClick={handleClickPagar}>SIGUIENTE</button>
            </div>
          </div>
          <div className={s.pagar_btn_container_mobile}>
            <button onClick={handleClickPagar}>SIGUIENTE</button>
          </div>
        </div>
      )}

      {showCustomerForm && !confirmOrder && (
        <PurchaseForm
          setConfirmOrder={setConfirmOrder}
          setShowCustomerForm={setShowCustomerForm}
        />
      )}

      {confirmOrder && (
        <ConfirmOrder
          setShowCustomerForm={setShowCustomerForm}
          setConfirmOrder={setConfirmOrder}
        />
      )}
      <Footer />
    </div>
  );
}
