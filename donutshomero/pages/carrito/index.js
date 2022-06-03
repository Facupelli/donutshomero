import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Nav from "../../components/Nav/Nav";
import CartItemPromo from "../../components/CartItem/CartItemPromo/CartItemPromo";
import CartItemSingle from "../../components/CartItem/CartItemSingle/CartItemSingle";
import { useState } from "react";

import s from "./index.module.scss";
import PurchaseForm from "../../components/PurchaseForm/PurchaseForm";
import ConfirmOrder from "../../components/ConfirmOrder/ConfirmOrder";

export default function Carrito() {
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);

  const cart = useSelector((state) => state.cart.items);

  const orderedCart = [...cart].sort((a, b) => a.price - b.price);

  const totalPrice = cart.reduce((prev, acc, index, array) => {
    return prev + acc.price * acc.quantity;
  }, 0);

  const handleClickPagar = () => {
    if (cart.length > 0) setShowCustomerForm(true);
  };

  // console.log("cart", orderedCart);

  return (
    <div className={s.container}>
      <Nav route="carrito" />
      {!showCustomerForm && !confirmOrder && (
        <div className={s.main}>
          <div className={s.titles}>
            <p>CARRITO</p>
            <p>TOTAL</p>
          </div>
          {cart.length > 0 &&
            orderedCart.map((cartItem) =>
              cartItem.name ? (
                <CartItemSingle key={cartItem.id} cartItem={cartItem} />
              ) : (
                <CartItemPromo key={cartItem.id} cartItem={cartItem} />
              )
            )}
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
            <div className={s.pagar_btn_container}>
              <button onClick={handleClickPagar}>PAGAR</button>
            </div>
          </div>
        </div>
      )}

      {showCustomerForm && !confirmOrder && (
        <PurchaseForm
          setConfirmOrder={setConfirmOrder}
          setShowCustomerForm={setShowCustomerForm}
        />
      )}

      {confirmOrder && <ConfirmOrder />}
      <Footer />
    </div>
  );
}
